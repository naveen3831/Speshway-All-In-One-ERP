import express from 'express';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import { getIO, liveState } from '../services/socketService.js';

const router = express.Router();

// Helper to match inquiry by ID
const getInquiryQuery = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: id };
  }
  return { _id: new mongoose.Types.ObjectId() };
};

// @desc    Get all inquiries / demo requests from MongoDB
// @route   GET /api/inquiries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    if (inquiries && inquiries.length > 0) {
      // Keep liveState synced with DB
      liveState.modulesData.demoRequests = inquiries.map((inq) => ({
        id: inq._id.toString(),
        name: inq.name,
        email: inq.email,
        company: inq.company,
        phone: inq.phone,
        module: inq.module,
        teamSize: inq.teamSize,
        message: inq.message,
        source: inq.source,
        status: inq.status,
        date: inq.createdAt ? inq.createdAt.toISOString() : new Date().toISOString(),
      }));
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }

    // Fallback to in-memory if DB is empty
    return res.json({
      success: true,
      count: liveState.modulesData.demoRequests.length,
      data: liveState.modulesData.demoRequests,
    });
  } catch (err) {
    console.warn('MongoDB fetch inquiries fallback to liveState:', err.message);
    return res.json({
      success: true,
      count: liveState.modulesData.demoRequests.length,
      data: liveState.modulesData.demoRequests,
    });
  }
});

// @desc    Submit new inquiry / Get Started lead directly to MongoDB
// @route   POST /api/inquiries
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, company, phone, module, teamSize, message, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and Work Email are required.',
      });
    }

    let savedInquiry;
    try {
      savedInquiry = await Inquiry.create({
        name,
        email,
        company: company || 'Enterprise Client',
        phone: phone || '',
        module: module || 'All-In-One Complete Suite',
        teamSize: teamSize || '1-10',
        message: message || '',
        source: source || 'get-started',
        status: 'new',
      });
    } catch (dbErr) {
      console.warn('MongoDB Inquiry save error, falling back to memory object:', dbErr.message);
      savedInquiry = {
        _id: new mongoose.Types.ObjectId(),
        id: Date.now().toString(),
        name,
        email,
        company: company || 'Enterprise Client',
        phone: phone || '',
        module: module || 'All-In-One Complete Suite',
        teamSize: teamSize || '1-10',
        message: message || '',
        source: source || 'get-started',
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    const memoryItem = {
      id: savedInquiry._id ? savedInquiry._id.toString() : Date.now().toString(),
      _id: savedInquiry._id,
      name: savedInquiry.name,
      email: savedInquiry.email,
      company: savedInquiry.company,
      phone: savedInquiry.phone,
      module: savedInquiry.module,
      teamSize: savedInquiry.teamSize,
      message: savedInquiry.message,
      source: savedInquiry.source,
      status: savedInquiry.status,
      date: savedInquiry.createdAt ? savedInquiry.createdAt.toISOString() : new Date().toISOString(),
    };

    // Update liveState
    liveState.modulesData.demoRequests.unshift(memoryItem);
    liveState.stats.happyBusinesses += 1;

    const activity = {
      id: Date.now(),
      type: 'demo',
      text: `New ${memoryItem.source === 'get-started' ? 'free trial request' : 'inquiry'} from ${memoryItem.company || memoryItem.name}`,
      time: 'Just now',
    };
    liveState.recentActivity.unshift(activity);

    // Broadcast in real-time to all connected admin dashboards
    const io = getIO();
    if (io) {
      io.emit('demo:new', { request: memoryItem, stats: liveState.stats });
      io.emit('activity:new', activity);
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully and dispatched to admin.',
      data: savedInquiry,
    });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to submit inquiry.',
    });
  }
});

// @desc    Update inquiry status
// @route   PATCH /api/inquiries/:id/status
// @access  Public
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    let updated = await Inquiry.findOneAndUpdate(
      getInquiryQuery(id),
      { status },
      { new: true }
    );

    // Update in-memory
    liveState.modulesData.demoRequests = liveState.modulesData.demoRequests.map((inq) =>
      inq.id === id || inq._id?.toString() === id ? { ...inq, status } : inq
    );

    const io = getIO();
    if (io) {
      io.emit('demo:status_updated', { id, status });
    }

    res.json({ success: true, data: updated || { id, status } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findOneAndDelete(getInquiryQuery(id));

    liveState.modulesData.demoRequests = liveState.modulesData.demoRequests.filter(
      (inq) => inq.id !== id && inq._id?.toString() !== id
    );

    const io = getIO();
    if (io) {
      io.emit('demo:deleted', { id });
    }

    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
