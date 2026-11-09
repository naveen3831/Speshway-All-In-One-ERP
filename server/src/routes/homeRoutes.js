import express from 'express';
import { getIO } from '../services/socketService.js';
import {
  getHomeContent,
  updateHomeContent,
  DEFAULT_HOME_CONTENT,
} from '../services/homeStore.js';

const router = express.Router();

// @desc    Get home page configuration
// @route   GET /api/home
// @access  Public
router.get('/', async (req, res) => {
  try {
    const content = await getHomeContent();
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update home page configuration
// @route   PUT /api/home
// @access  Public (Admin)
router.put('/', async (req, res) => {
  try {
    const data = req.body;
    const updated = await updateHomeContent(data);

    // Broadcast real-time update via WebSocket
    const io = getIO();
    if (io) {
      io.emit('home:updated', updated);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'home',
        text: 'Home page configuration was updated from the Admin Console',
        time: 'Just now',
      });
    }

    res.json({ success: true, message: 'Home content updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update navbar visibility configuration
// @route   PUT /api/home/navbar
// @access  Public (Admin)
router.put('/navbar', async (req, res) => {
  try {
    const navbarData = req.body;
    const updated = await updateHomeContent({ navbar: navbarData });

    const io = getIO();
    if (io) {
      io.emit('home:updated', updated);
    }

    res.json({ success: true, message: 'Navbar visibility updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Reset home page configuration to defaults
// @route   POST /api/home/reset
// @access  Public (Admin)
router.post('/reset', async (req, res) => {
  try {
    const resetContent = await updateHomeContent(DEFAULT_HOME_CONTENT);

    const io = getIO();
    if (io) {
      io.emit('home:updated', resetContent);
    }

    res.json({ success: true, message: 'Home content reset to defaults', data: resetContent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

