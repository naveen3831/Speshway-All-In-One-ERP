import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import { getIO } from '../services/socketService.js';
import { getProducts, getProductById, updateProduct as updateMemoryProduct, addProduct as addMemoryProduct } from '../services/productStore.js';
import { uploadToCloudinary, isCloudinaryConfigured } from '../services/cloudinaryService.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to save base64 image data to Cloudinary (primary) or client public directory (fallback)
const saveBase64Image = async (dataUrl, slug) => {
  try {
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      return dataUrl;
    }

    const safeSlug = (slug || 'product').toLowerCase().replace(/[^a-z0-9_-]/g, '-');

    // 1. Primary: Upload directly to Cloudinary if configured
    if (isCloudinaryConfigured()) {
      try {
        const cloudResult = await uploadToCloudinary(dataUrl, {
          folder: 'speshway_products',
          publicId: `${safeSlug}-${Date.now()}`,
        });

        if (cloudResult && (cloudResult.url || cloudResult.secure_url)) {
          const finalUrl = cloudResult.url || cloudResult.secure_url;
          console.log(`[Cloudinary] Successfully stored image for ${safeSlug}: ${finalUrl}`);
          return finalUrl;
        }
      } catch (cloudErr) {
        console.warn('[Cloudinary] Upload failed, falling back to local file storage:', cloudErr.message);
      }
    }

    // 2. Fallback: Save to local client public folder
    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return dataUrl;

    let ext = matches[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    if (ext.includes('svg')) ext = 'svg';
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `${safeSlug}-${Date.now()}.${ext}`;

    // Target directory: client/public/images/products
    const publicProductsDir = path.resolve(__dirname, '../../../client/public/images/products');
    if (!fs.existsSync(publicProductsDir)) {
      fs.mkdirSync(publicProductsDir, { recursive: true });
    }

    const filePath = path.join(publicProductsDir, filename);
    fs.writeFileSync(filePath, buffer);

    return `/images/products/${filename}`;
  } catch (err) {
    console.warn('Could not save base64 image to public directory, preserving as data URL:', err.message);
    return dataUrl;
  }
};

// Helper to find by MongoDB _id or custom slug or string id or name
const getProductQuery = (id) => {
  const cleanId = String(id || '').trim();
  const conditions = [
    { slug: cleanId },
    { slug: new RegExp('^' + cleanId + '$', 'i') },
    { id: cleanId },
    { name: new RegExp('^' + cleanId + '$', 'i') },
  ];
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
      price,
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

    let finalImageUrl = imageUrl || '';
    if (finalImageUrl) {
      if (typeof finalImageUrl === 'string' && finalImageUrl.startsWith('data:image/')) {
        finalImageUrl = await saveBase64Image(finalImageUrl, finalSlug);
      } else {
        const cloud = await uploadToCloudinary(finalImageUrl, 'speshway_products');
        finalImageUrl = (cloud && typeof cloud === 'object') ? (cloud.url || cloud.secure_url || finalImageUrl) : (cloud || finalImageUrl);
      }
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
      imageUrl: finalImageUrl || '',
      price: price ? String(price).trim() : '',
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

    if (body.imageUrl) {
      if (typeof body.imageUrl === 'string' && body.imageUrl.startsWith('data:image/')) {
        body.imageUrl = await saveBase64Image(body.imageUrl, body.slug || rawId);
      } else {
        const cloud = await uploadToCloudinary(body.imageUrl, 'speshway_products');
        body.imageUrl = (cloud && typeof cloud === 'object') ? (cloud.url || cloud.secure_url || body.imageUrl) : (cloud || body.imageUrl);
      }
    }

    // 1. Update in-memory store so changes reflect immediately even without MongoDB
    let memUpdated = updateMemoryProduct(rawId, body);
    if (!memUpdated) {
      memUpdated = addMemoryProduct({ ...body, id: rawId, slug: body.slug || rawId });
    }

    // 2. Update or insert in MongoDB database
    let updated = null;
    try {
      let existingDoc = await Product.findOne(getProductQuery(rawId));
      if (!existingDoc && body.name) {
        existingDoc = await Product.findOne({ name: new RegExp('^' + body.name.trim() + '$', 'i') });
      }

      if (existingDoc) {
        Object.assign(existingDoc, body);
        if (body.slug) existingDoc.slug = body.slug;
        if (body.imageUrl) existingDoc.imageUrl = body.imageUrl;
        updated = await existingDoc.save();
      } else {
        updated = await Product.create({
          ...body,
          id: rawId,
          slug: body.slug || rawId.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB Product update error (fallback to memory store):', dbErr.message);
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

    let deleted = null;
    try {
      deleted = await Product.findOneAndDelete(getProductQuery(rawId));
    } catch (dbErr) {
      console.warn('MongoDB Product.findOneAndDelete error:', dbErr.message);
    }

    const { deleteProduct: deleteMemoryProduct } = await import('../services/productStore.js');
    deleteMemoryProduct(rawId);

    const targetSlug = deleted?.slug || rawId;
    const targetId = deleted?._id || deleted?.id || rawId;

    // Real-time WebSocket broadcast
    const io = getIO();
    if (io) {
      io.emit('product:deleted', { id: targetId, slug: targetSlug });
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product deleted: "${deleted?.name || rawId}" removed`,
        time: 'Just now',
      });
    }

    res.json({
      success: true,
      message: `Product "${deleted?.name || rawId}" permanently deleted`,
      deletedId: targetId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
