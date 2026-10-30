import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import { liveState } from '../services/socketService.js';
import { getProducts } from '../services/productStore.js';

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

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);

export default router;
