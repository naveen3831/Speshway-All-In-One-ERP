import express from 'express';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import { getIO, liveState } from '../services/socketService.js';
import {
  sendInquiryConfirmationEmail,
  sendInquiryReplyEmail,
  sendInquiryStatusEmail,
} from '../services/emailService.js';

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
      text: `New ${memoryItem.source === 'contact' ? 'contact message' : memoryItem.source === 'demo' ? 'demo request' : 'free trial request'} from ${memoryItem.company || memoryItem.name}`,
      time: 'Just now',
    };
    liveState.recentActivity.unshift(activity);

    // Broadcast in real-time to all connected admin dashboards
    const io = getIO();
    if (io) {
      io.emit('demo:new', { request: memoryItem, stats: liveState.stats });
      io.emit('inquiry:new', { request: memoryItem, stats: liveState.stats });
      io.emit('activity:new', activity);
    }

    // Send automated email confirmation to customer via SMTP
    if (memoryItem.email) {
      sendInquiryConfirmationEmail({
        name: memoryItem.name,
        email: memoryItem.email,
        module: memoryItem.module,
        company: memoryItem.company,
        message: memoryItem.message,
      }).catch((mailErr) =>
        console.warn('[Inquiry] Automated confirmation email notice:', mailErr.message)
      );
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

// @desc    Update inquiry status & optionally notify customer via email
// @route   PATCH /api/inquiries/:id/status
// @access  Public
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notifyCustomer, note } = req.body;
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

    // Optionally notify customer via SMTP if requested or if status changed to contacted/qualified
    if (notifyCustomer) {
      const recipientEmail = updated?.email || liveState.modulesData.demoRequests.find(i => i.id === id)?.email;
      const recipientName = updated?.name || liveState.modulesData.demoRequests.find(i => i.id === id)?.name;
      const moduleName = updated?.module || liveState.modulesData.demoRequests.find(i => i.id === id)?.module;

      if (recipientEmail) {
        sendInquiryStatusEmail({
          to: recipientEmail,
          customerName: recipientName,
          newStatus: status,
          inquiryModule: moduleName,
          note: note || '',
        }).catch((mailErr) => console.warn('[Inquiry] Status update email error:', mailErr.message));
      }
    }

    res.json({ success: true, data: updated || { id, status } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Reply to customer inquiry via SMTP Email
// @route   POST /api/inquiries/:id/reply
// @access  Public
router.post('/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, replyMessage, adminName } = req.body;

    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Reply message cannot be empty.',
      });
    }

    let inq = await Inquiry.findOne(getInquiryQuery(id));
    if (!inq) {
      inq = liveState.modulesData.demoRequests.find(
        (i) => i.id === id || i._id?.toString() === id
      );
    }

    if (!inq || !inq.email) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry or customer email address not found.',
      });
    }

    // Send email via Gmail SMTP (Nodemailer)
    const info = await sendInquiryReplyEmail({
      to: inq.email,
      customerName: inq.name,
      subject: subject?.trim(),
      replyMessage: replyMessage.trim(),
      inquiryModule: inq.module,
      adminName: adminName?.trim() || 'SPESHWAY Admin Team',
    });

    // Automatically update status to 'contacted' if it was 'new'
    if (inq.status === 'new') {
      await Inquiry.findOneAndUpdate(getInquiryQuery(id), { status: 'contacted' });
      liveState.modulesData.demoRequests = liveState.modulesData.demoRequests.map((i) =>
        i.id === id || i._id?.toString() === id ? { ...i, status: 'contacted' } : i
      );
      const io = getIO();
      if (io) {
        io.emit('demo:status_updated', { id, status: 'contacted' });
      }
    }

    return res.json({
      success: true,
      message: `Reply email successfully sent to ${inq.email}`,
      messageId: info?.messageId,
    });
  } catch (err) {
    console.error('Inquiry reply error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to dispatch email reply.',
    });
  }
});

// @desc    Test SMTP email dispatch
// @route   POST /api/inquiries/test-smtp
// @access  Public
router.post('/test-smtp', async (req, res) => {
  try {
    const { to } = req.body;
    const targetEmail = to || process.env.SMTP_USER || 'naveenkumar970100@gmail.com';
    const info = await sendInquiryReplyEmail({
      to: targetEmail,
      customerName: 'Naveen Kumar',
      subject: 'Test Email — SPESHWAY ERP Nodemailer SMTP',
      replyMessage:
        'This is a verification email from your SPESHWAY All-In-One ERP application.\nYour Gmail SMTP credentials (naveenkumar970100@gmail.com) are active and verified to send emails to customers who submit inquiries.',
      inquiryModule: 'SMTP System Diagnostics',
      adminName: 'SPESHWAY Automation',
    });

    return res.json({
      success: true,
      message: `Test email successfully sent to ${targetEmail}`,
      messageId: info?.messageId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
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
