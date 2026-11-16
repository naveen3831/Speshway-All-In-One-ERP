import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import { getIO } from '../services/socketService.js';
import {
  getProducts,
  getProductById,
  updateProduct as updateMemoryProduct,
  addProduct as addMemoryProduct,
  deleteProduct as deleteMemoryProduct,
  setProductsMemory,
  initialProducts,
} from '../services/productStore.js';
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

// @desc    Get all products (served from high-speed memory cache with <1ms latency)
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    let products = getProducts();
    if (!products || products.length === 0) {
      const sortField =
        req.query.sort === 'popularity'
          ? { popularity: -1, createdAt: -1 }
          : { createdAt: -1, popularity: -1 };
      products = await Product.find().sort(sortField).lean();
      if (products && products.length > 0) {
        setProductsMemory(products);
      } else {
        products = initialProducts;
      }
    } else if (req.query.sort === 'popularity') {
      products = [...products].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    const fallback = getProducts() || initialProducts;
    res.json({ success: true, count: fallback.length, data: fallback });
  }
});

// @desc    Get single product by id or slug (served from high-speed memory cache)
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let product = getProductById(req.params.id);
    if (!product) {
      try {
        product = await Product.findOne(getProductQuery(req.params.id)).lean();
        if (product) {
          addMemoryProduct(product);
        }
      } catch (dbErr) {
        console.warn('MongoDB Product.findOne warning:', dbErr.message);
      }
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

// @desc    Add new product (Instant response & background DB sync)
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

    let finalImageUrl = imageUrl || '';
    if (finalImageUrl) {
      if (typeof finalImageUrl === 'string' && finalImageUrl.startsWith('data:image/')) {
        finalImageUrl = await saveBase64Image(finalImageUrl, finalSlug);
      } else if (typeof finalImageUrl === 'string' && !finalImageUrl.includes('res.cloudinary.com') && /^https?:\/\//i.test(finalImageUrl)) {
        const cloud = await uploadToCloudinary(finalImageUrl, 'speshway_products');
        finalImageUrl = (cloud && typeof cloud === 'object') ? (cloud.url || cloud.secure_url || finalImageUrl) : (cloud || finalImageUrl);
      }
    }

    const productPayload = {
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
    };

    // 1. Immediately store in in-memory cache
    const memProduct = addMemoryProduct(productPayload);

    // 2. Real-time WebSocket broadcast to all connected clients immediately
    const io = getIO();
    if (io) {
      io.emit('product:added', memProduct);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `New ERP Product added: "${memProduct.name}"`,
        time: 'Just now',
      });
    }

    // 3. Return 201 immediately
    res.status(201).json({ success: true, data: memProduct });

    // 4. Background persistence to MongoDB Atlas
    (async () => {
      try {
        const existingProductWithSlug = await Product.findOne({ slug: finalSlug });
        let dbSlug = finalSlug;
        if (existingProductWithSlug) {
          dbSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
        }
        const created = await Product.create({ ...productPayload, slug: dbSlug });
        if (created && created._id) {
          updateMemoryProduct(finalSlug, { _id: created._id.toString() });
        }
      } catch (dbErr) {
        console.warn('MongoDB background Product.create notice:', dbErr.message);
      }
    })();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update product (Instant memory update & WebSocket broadcast, background DB sync)
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

    if (body.imageUrl !== undefined) {
      if (typeof body.imageUrl === 'string' && body.imageUrl.startsWith('data:image/')) {
        body.imageUrl = await saveBase64Image(body.imageUrl, body.slug || rawId);
      } else if (body.imageUrl && typeof body.imageUrl === 'string' && !body.imageUrl.includes('res.cloudinary.com') && /^https?:\/\//i.test(body.imageUrl)) {
        const cloud = await uploadToCloudinary(body.imageUrl, 'speshway_products');
        body.imageUrl = (cloud && typeof cloud === 'object') ? (cloud.url || cloud.secure_url || body.imageUrl) : (cloud || body.imageUrl);
      }
    }

    // 1. Instantly update in-memory cache
    let memUpdated = updateMemoryProduct(rawId, body);
    if (!memUpdated) {
      memUpdated = addMemoryProduct({ ...body, id: rawId, slug: body.slug || rawId });
    }

    // 2. Real-time WebSocket broadcast to all connected clients immediately
    const io = getIO();
    if (io) {
      io.emit('product:updated', memUpdated);
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product updated: "${memUpdated?.name || rawId}" details refreshed`,
        time: 'Just now',
      });
    }

    // 3. Return response immediately to client
    res.json({ success: true, data: memUpdated });

    // 4. Background update in MongoDB database
    (async () => {
      try {
        const isObjectId = mongoose.Types.ObjectId.isValid(rawId);
        const searchConditions = [];
        if (isObjectId) {
          searchConditions.push({ _id: rawId });
        }
        searchConditions.push({ slug: rawId });
        searchConditions.push({ slug: new RegExp('^' + rawId + '$', 'i') });
        if (body.slug && body.slug !== rawId) {
          searchConditions.push({ slug: body.slug });
          searchConditions.push({ slug: new RegExp('^' + body.slug + '$', 'i') });
        }
        if (body.name) {
          searchConditions.push({ name: new RegExp('^' + body.name + '$', 'i') });
        }

        let existing = await Product.findOne({ $or: searchConditions });
        if (existing) {
          const updateDoc = {
            ...body,
            slug: existing.slug || body.slug || rawId,
          };
          if (body.imageUrl !== undefined) {
            updateDoc.imageUrl = body.imageUrl;
          }
          await Product.findByIdAndUpdate(
            existing._id,
            { $set: updateDoc },
            { new: true, runValidators: false, lean: true }
          );
        } else {
          const cleanSlug = (body.slug || rawId).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
          await Product.create({
            ...body,
            slug: cleanSlug,
          });
        }
      } catch (dbErr) {
        console.warn('MongoDB Product background update notice:', dbErr.message);
      }
    })();
  } catch (err) {
    console.error('Error in PUT /api/products/:id:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete product (Instant memory deletion & WebSocket broadcast, background DB sync)
// @route   DELETE /api/products/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const rawId = req.params.id ? decodeURIComponent(req.params.id).trim() : '';

    // 1. Delete from memory immediately
    deleteMemoryProduct(rawId);

    // 2. Real-time WebSocket broadcast immediately
    const io = getIO();
    if (io) {
      io.emit('product:deleted', { id: rawId, slug: rawId });
      io.emit('activity:new', {
        id: Date.now(),
        type: 'product',
        text: `Product deleted: "${rawId}" removed`,
        time: 'Just now',
      });
    }

    // 3. Return response immediately
    res.json({
      success: true,
      message: `Product "${rawId}" permanently deleted`,
      deletedId: rawId,
    });

    // 4. Background delete in MongoDB
    (async () => {
      try {
        await Product.findOneAndDelete(getProductQuery(rawId));
      } catch (dbErr) {
        console.warn('MongoDB Product background delete notice:', dbErr.message);
      }
    })();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
