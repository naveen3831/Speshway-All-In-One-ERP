import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import pricingRoutes from './pricingRoutes.js';
import { liveState } from '../services/socketService.js';
import { getProducts } from '../services/productStore.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Real-time state endpoint
router.get('/realtime/state', (req, res) => {
  res.json({
    success: true,
    data: {
      ...liveState,
      products: getProducts(),
    },
  });
});

// Direct Cloudinary upload endpoint
router.post('/upload', async (req, res) => {
  try {
    const { image, folder } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'Image data is required' });
    }
    const secureUrl = await uploadToCloudinary(image, folder || 'speshway_products');
    res.json({ success: true, url: secureUrl });
  } catch (err) {
    console.error('Error in /api/upload:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/employees', employeeRoutes);
router.use('/products', productRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/pricing', pricingRoutes);

export default router;
