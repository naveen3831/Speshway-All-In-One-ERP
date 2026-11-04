import express from 'express';
import { getIO } from '../services/socketService.js';
import {
  getPricingPlans,
  updatePricingPlan,
  updateAllPricingPlans,
  DEFAULT_PRICING_PLANS,
} from '../services/pricingStore.js';

const router = express.Router();

// @desc    Get all pricing plans
// @route   GET /api/pricing
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await getPricingPlans();
    res.json({ success: true, count: plans.length, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update all pricing plans in bulk
// @route   PUT /api/pricing
// @access  Public (Admin)
router.put('/', async (req, res) => {
  try {
    const { plans } = req.body;
    if (!Array.isArray(plans)) {
      return res.status(400).json({ success: false, message: 'Invalid plans payload. Expected an array.' });
    }

    const updatedPlans = await updateAllPricingPlans(plans);

    // Broadcast real-time update via WebSocket
    const io = getIO();
    if (io) {
      io.emit('pricing:updated', updatedPlans);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'pricing',
        text: 'Pricing tiers were updated in the Admin Console',
        time: 'Just now',
      });
    }

    res.json({ success: true, message: 'Pricing plans updated successfully', data: updatedPlans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update a specific pricing plan
// @route   PUT /api/pricing/:slug
// @access  Public (Admin)
router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const data = req.body;

    const updated = await updatePricingPlan(slug, data);
    const allPlans = await getPricingPlans();

    // Broadcast real-time update via WebSocket
    const io = getIO();
    if (io) {
      io.emit('pricing:updated', allPlans);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'pricing',
        text: `Pricing plan "${updated.name}" updated to ${updated.price}`,
        time: 'Just now',
      });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Reset pricing plans to defaults
// @route   POST /api/pricing/reset
// @access  Public (Admin)
router.post('/reset', async (req, res) => {
  try {
    const resetPlans = await updateAllPricingPlans(DEFAULT_PRICING_PLANS);

    const io = getIO();
    if (io) {
      io.emit('pricing:updated', resetPlans);
    }

    res.json({ success: true, message: 'Pricing plans reset to defaults', data: resetPlans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

