import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { getIO } from '../services/socketService.js';
import { getProducts, getProductById } from '../services/productStore.js';

const router = express.Router();

// Helper to find by MongoDB _id or custom slug
const getProductQuery = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ _id: id }, { slug: id }] };
  }
  return { slug: id };
};

// @desc    Get all products from MongoDB database (newest first)
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    let products = [];
    try {
      products = await Product.find().lean();
    } catch (dbErr) {
      console.warn('MongoDB Product.find warning:', dbErr.message);
    }

    if (!products || products.length === 0) {
      products = getProducts();
    }

    // Sort safely in JavaScript memory (never fails with MongoDB 32MB sort limit)
    products.sort((a, b) => {
      if (req.query.sort === 'popularity') {
        return (b.popularity || 0) - (a.popularity || 0) || new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0) || (b.popularity || 0) - (a.popularity || 0);
    });

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    const fallback = getProducts();
    res.json({ success: true, count: fallback.length, data: fallback });
  }
});

// @desc    Get single product by id or slug from MongoDB
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let product = null;
    try {
      product = await Product.findOne(getProductQuery(req.params.id)).lean();
    } catch (dbErr) {
      console.warn('MongoDB Product.findOne warning:', dbErr.message);
    }
    if (!product) {
      product = getProductById(req.params.id);
    }
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in database' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    const fallback = getProductById(req.params.id);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
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
      popularity,
    } = req.body;

    if (!name || !name.trim() || !description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Product name and description are required',
      });
    }

    let finalSlug =
      slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (!finalSlug) finalSlug = 'prod-' + Date.now();

    // Prevent duplicate slug crash
    const existingProductWithSlug = await Product.findOne({ slug: finalSlug });
    if (existingProductWithSlug) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const createdProduct = await Product.create({
      name: name.trim(),
      slug: finalSlug,
      category: category || 'Human Resources',
      description: description.trim(),
      longDescription: longDescription || description.trim(),
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
      popularity: typeof popularity === 'number' ? popularity : 100,
    });

    const plainProduct = createdProduct.toJSON ? createdProduct.toJSON() : createdProduct;

    // Real-time WebSocket broadcast to all connected clients
    const io = getIO();
    if (io) {
      io.emit('product:added', plainProduct);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `New ERP Product added to database: "${createdProduct.name}"`,
        time: 'Just now',
      });
    }

    res.status(201).json({ success: true, data: plainProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update product in MongoDB database (CRUD Update)
// @route   PUT /api/products/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const rawId = req.params.id ? decodeURIComponent(req.params.id).trim() : '';
    const body = { ...req.body };
    delete body._id;
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.__v;

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

    const plainUpdated = updated.toJSON ? updated.toJSON() : updated;

    // Real-time WebSocket broadcast
    const io = getIO();
    if (io) {
      io.emit('product:updated', plainUpdated);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product updated in database: "${updated.name}" details refreshed`,
        time: 'Just now',
      });
    }

    res.json({ success: true, data: plainUpdated });
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
