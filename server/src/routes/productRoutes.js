import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { getIO } from '../services/socketService.js';

const router = express.Router();

// Helper to find by MongoDB _id or custom slug or string id
const getProductQuery = (id) => {
  const cleanId = String(id || '').trim();
  const conditions = [{ slug: cleanId }, { id: cleanId }];
  if (mongoose.Types.ObjectId.isValid(cleanId)) {
    conditions.push({ _id: cleanId });
  }
  return { $or: conditions };
};

// @desc    Get all products from MongoDB database (newest first)
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const sortField =
      req.query.sort === 'popularity'
        ? { popularity: -1, createdAt: -1 }
        : { createdAt: -1, popularity: -1 };
    let products = await Product.find().sort(sortField);
    if (!products || products.length === 0) {
      const { getProducts, initialProducts } = await import('../services/productStore.js');
      products = getProducts ? getProducts() : initialProducts;
    }
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    try {
      const { getProducts, initialProducts } = await import('../services/productStore.js');
      const products = getProducts ? getProducts() : initialProducts;
      res.json({ success: true, count: products.length, data: products });
    } catch (fallbackErr) {
      res.status(500).json({ success: false, message: err.message });
    }
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

    // 1. Update in-memory store so changes reflect immediately even without MongoDB
    const { updateProduct: updateMemoryProduct, addProduct: addMemoryProduct } = await import(
      '../services/productStore.js'
    );
    let memUpdated = updateMemoryProduct(rawId, body);
    if (!memUpdated) {
      memUpdated = addMemoryProduct({ ...body, id: rawId, slug: body.slug || rawId });
    }

    // 2. Update or upsert in MongoDB database
    let updated = null;
    try {
      updated = await Product.findOneAndUpdate(
        getProductQuery(rawId),
        { ...body, slug: body.slug || rawId },
        { new: true, runValidators: false, upsert: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      console.warn('MongoDB Product.findOneAndUpdate error (fallback to memory store):', dbErr.message);
    }

    const plainUpdated = updated
      ? updated.toJSON
        ? updated.toJSON()
        : updated
      : memUpdated || { id: rawId, ...body };

    // Real-time WebSocket broadcast
    const io = getIO();
    if (io) {
      io.emit('product:updated', plainUpdated);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product updated: "${plainUpdated.name || rawId}" details refreshed`,
        time: 'Just now',
      });
    }

    res.json({ success: true, data: plainUpdated });
  } catch (err) {
    console.error('Error in PUT /api/products/:id:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete product from MongoDB database (CRUD Delete)
// @route   DELETE /api/products/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const rawId = req.params.id ? decodeURIComponent(req.params.id).trim() : '';

    const { deleteProduct: deleteMemoryProduct } = await import('../services/productStore.js');
    deleteMemoryProduct(rawId);

    let deleted = null;
    try {
      deleted = await Product.findOneAndDelete(getProductQuery(rawId));
    } catch (dbErr) {
      console.warn('MongoDB Product.findOneAndDelete error:', dbErr.message);
    }

    // Real-time WebSocket broadcast
    const io = getIO();
    if (io) {
      io.emit('product:deleted', { id: rawId, slug: rawId });
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product "${rawId}" deleted from products catalog`,
        time: 'Just now',
      });
    }

    res.json({ success: true, message: 'Product deleted successfully', id: rawId, slug: rawId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
