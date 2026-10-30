import express from 'express';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../services/productStore.js';
import { getIO } from '../services/socketService.js';

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {
  const products = getProducts();
  res.json({ success: true, count: products.length, data: products });
});

// @desc    Get single product by id or slug
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// @desc    Add new product (CRUD Create)
// @route   POST /api/products
// @access  Public (or Protected Admin)
router.post('/', (req, res) => {
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

    const createdProduct = addProduct({
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
      iconName: iconName || 'Layers',
      color: color || 'green',
      status: status || 'active',
    });

    // Real-time broadcast
    const io = getIO();
    if (io) {
      io.emit('product:added', createdProduct);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `New ERP Product added: "${createdProduct.name}"`,
        time: 'Just now',
      });
    }

    res.status(201).json({ success: true, data: createdProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update product (CRUD Update)
// @route   PUT /api/products/:id
// @access  Public (or Protected Admin)
router.put('/:id', (req, res) => {
  try {
    const body = { ...req.body };
    if (body.technologies && typeof body.technologies === 'string') {
      body.technologies = body.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }
    if (body.features && typeof body.features === 'string') {
      body.features = body.features.split(',').map((f) => f.trim()).filter(Boolean);
    }

    const updated = updateProduct(req.params.id, body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Real-time broadcast
    const io = getIO();
    if (io) {
      io.emit('product:updated', updated);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product updated: "${updated.name}" details & technologies refreshed`,
        time: 'Just now',
      });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete product (CRUD Delete)
// @route   DELETE /api/products/:id
// @access  Public (or Protected Admin)
router.delete('/:id', (req, res) => {
  try {
    const success = deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Real-time broadcast
    const io = getIO();
    if (io) {
      io.emit('product:deleted', { id: req.params.id });
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product removed from catalog`,
        time: 'Just now',
      });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
