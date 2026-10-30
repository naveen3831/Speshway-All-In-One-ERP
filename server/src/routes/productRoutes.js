import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { getIO } from '../services/socketService.js';

const router = express.Router();

// Helper to find by MongoDB _id or custom slug
const getProductQuery = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ _id: id }, { slug: id }] };
  }
  return { slug: id };
};

// @desc    Get all products from MongoDB database
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ popularity: -1, createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Get single product by id or slug from MongoDB
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne(getProductQuery(req.params.id));
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Add new product directly to MongoDB database (CRUD Create)
// @route   POST /api/products
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      description,
      longDescription,
      features,
      technologies,
      websiteUrl,
      adminUrl,
      imageUrl,
      iconName,
      color,
      status,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Product name and description are required',
      });
    }

    const finalSlug =
      slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const createdProduct = await Product.create({
      name,
      slug: finalSlug,
      category: category || 'Business Operations',
      description,
      longDescription: longDescription || description,
      features: Array.isArray(features)
        ? features
        : typeof features === 'string'
        ? features.split(',').map((f) => f.trim()).filter(Boolean)
        : [],
      technologies: Array.isArray(technologies)
        ? technologies
        : typeof technologies === 'string'
        ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
      websiteUrl: websiteUrl || '',
      adminUrl: adminUrl || '/admin/products',
      imageUrl: imageUrl || '',
      iconName: iconName || 'Layers',
      color: color || 'green',
      status: status || 'active',
      popularity: 90,
    });

    // Real-time WebSocket broadcast to all connected clients
    const io = getIO();
    if (io) {
      io.emit('product:added', createdProduct);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `New ERP Product added to database: "${createdProduct.name}"`,
        time: 'Just now',
      });
    }

    res.status(201).json({ success: true, data: createdProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update product in MongoDB database (CRUD Update)
// @route   PUT /api/products/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.technologies && typeof body.technologies === 'string') {
      body.technologies = body.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }
    if (body.features && typeof body.features === 'string') {
      body.features = body.features.split(',').map((f) => f.trim()).filter(Boolean);
    }

    const updated = await Product.findOneAndUpdate(
      getProductQuery(req.params.id),
      body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }

    // Real-time WebSocket broadcast
    const io = getIO();
    if (io) {
      io.emit('product:updated', updated);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product updated in database: "${updated.name}" details refreshed`,
        time: 'Just now',
      });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete product from MongoDB database (CRUD Delete)
// @route   DELETE /api/products/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete(getProductQuery(req.params.id));
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }

    // Real-time WebSocket broadcast
    const io = getIO();
    if (io) {
      io.emit('product:deleted', { id: deleted.id, slug: deleted.slug });
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product "${deleted.name}" permanently deleted from database`,
        time: 'Just now',
      });
    }

    res.json({ success: true, message: 'Product deleted from database successfully', id: deleted.id, slug: deleted.slug });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
