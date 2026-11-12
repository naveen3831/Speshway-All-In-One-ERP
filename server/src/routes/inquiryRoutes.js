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
        phone: memoryItem.phone,
        company: memoryItem.company,
        module: memoryItem.module,
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

// @desc    Update inquiry status & optionally notify customer via email (Sequential forward-only with automatic skipped steps execution)
// @route   PATCH /api/inquiries/:id/status
// @access  Public
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notifyCustomer = true, note } = req.body;
    const { id } = req.params;

    const STATUS_FLOW = ['new', 'contacted', 'qualified', 'closed'];

    // 1. Locate existing inquiry in MongoDB or in-memory liveState
    let inqDoc = null;
    try {
      inqDoc = await Inquiry.findOne(getInquiryQuery(id));
    } catch (e) {
      console.warn('[Inquiry] findOne DB lookup notice:', e.message);
    }

    const memInq = liveState.modulesData.demoRequests.find(
      (inq) => inq.id === id || inq._id?.toString() === id
    );

    if (!inqDoc && !memInq) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry record not found.',
      });
    }

    const currentStatus = inqDoc?.status || memInq?.status || 'new';
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    const targetIndex = STATUS_FLOW.indexOf(status);

    if (targetIndex === -1) {
      return res.status(400).json({
        success: false,
        message: `Invalid target status "${status}". Allowed values: ${STATUS_FLOW.join(', ')}`,
      });
    }

    // Forward-only enforcement: past stages cannot be re-selected / moved backwards
    if (currentIndex !== -1 && targetIndex < currentIndex) {
      return res.status(400).json({
        success: false,
        message: `Status cannot be moved backwards from "${currentStatus}" to "${status}". Stages are strictly forward-only.`,
      });
    }

    // Already at target status
    if (targetIndex === currentIndex) {
      return res.json({
        success: true,
        data: inqDoc || memInq,
        message: `Status is already "${currentStatus}".`,
      });
    }

    // Determine all steps to execute sequentially from currentIndex + 1 up to targetIndex
    const startIdx = currentIndex === -1 ? 0 : currentIndex;
    const stepsToExecute = STATUS_FLOW.slice(startIdx + 1, targetIndex + 1);

    const recipientEmail = inqDoc?.email || memInq?.email;
    const recipientName = inqDoc?.name || memInq?.name;
    const moduleName = inqDoc?.module || memInq?.module;
    const io = getIO();

    let lastUpdatedDoc = inqDoc;

    console.log(
      `[Inquiry] Advancing inquiry ${id} (${recipientName || recipientEmail}) from "${currentStatus}" to "${status}". Steps to execute: [${stepsToExecute.join(', ')}]`
    );

    // Execute each step in sequence (including all skipped intermediate steps and final target step)
    for (let i = 0; i < stepsToExecute.length; i++) {
      const step = stepsToExecute[i];
      const isTargetStep = i === stepsToExecute.length - 1;

      // 1. Update Database
      try {
        const updated = await Inquiry.findOneAndUpdate(
          getInquiryQuery(id),
          { status: step },
          { new: true }
        );
        if (updated) lastUpdatedDoc = updated;
      } catch (dbErr) {
        console.warn(`[Inquiry] DB status update warning for step "${step}":`, dbErr.message);
      }

      // 2. Update liveState in-memory
      liveState.modulesData.demoRequests = liveState.modulesData.demoRequests.map((inq) =>
        inq.id === id || inq._id?.toString() === id ? { ...inq, status: step } : inq
      );

      // 3. Emit real-time WebSocket update for this step
      if (io) {
        io.emit('demo:status_updated', { id, status: step });
      }

      // 4. Send status notification email via SMTP for this step
      if (notifyCustomer && recipientEmail) {
        try {
          const stepNote = isTargetStep ? (note || '') : '';
          await sendInquiryStatusEmail({
            to: recipientEmail,
            customerName: recipientName,
            customerPhone: inqDoc?.phone || memInq?.phone,
            company: inqDoc?.company || memInq?.company,
            newStatus: step,
            inquiryModule: moduleName,
            note: stepNote,
          });
          console.log(`✉️ [Inquiry] Notification email sent to ${recipientEmail} for stage: "${step}"`);
        } catch (mailErr) {
          console.warn(`⚠️ [Inquiry] Error sending status email for step "${step}":`, mailErr.message);
        }

        // Delay 500ms between emails when executing multiple steps to preserve SMTP delivery sequence
        if (!isTargetStep && stepsToExecute.length > 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    res.json({
      success: true,
      data: lastUpdatedDoc || { id, status },
      executedSteps: stepsToExecute,
      message:
        stepsToExecute.length > 1
          ? `Automatically completed ${stepsToExecute.length} stages (${stepsToExecute.join(' ➔ ')}) and dispatched notification emails.`
          : `Status updated to ${status} and notification email dispatched.`,
    });
  } catch (err) {
    console.error('Status update error:', err);
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
      customerPhone: inq.phone,
      company: inq.company,
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
