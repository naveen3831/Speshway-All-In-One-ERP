import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Robust .env discovery regardless of process.cwd()
const candidateEnvPaths = [
  path.resolve(__dirname, '../../../server/.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(process.cwd(), 'server/.env'),
  path.resolve(process.cwd(), '.env'),
];

for (const p of candidateEnvPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p, override: false });
  }
}

// User-provided Cloudinary credentials with env overrides
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'ddgjubbbx';
const API_KEY = process.env.CLOUDINARY_API_KEY || '731672495256651';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'KT-7u5p3eD-kuZBEOsFWe5ZKWyw';

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

/**
 * Check if Cloudinary credentials are fully configured
 */
export const isCloudinaryConfigured = () => {
  return Boolean(CLOUD_NAME && API_KEY && API_SECRET);
};

/**
 * Upload an image (base64 data URL, file path, or remote URL) to Cloudinary
 * Handles both:
 *  - uploadToCloudinary(dataUrl, { folder: 'speshway_products' }) => { success: true, url: '...' }
 *  - uploadToCloudinary(dataUrl, 'speshway_products') => 'https://...'
 */
export const uploadToCloudinary = async (fileData, options = {}) => {
  const isFolderString = typeof options === 'string';
  if (!fileData) {
    return isFolderString ? '' : { success: false, url: null, error: 'No image data provided' };
  }

  const trimmed = typeof fileData === 'string' ? fileData.trim() : fileData;
  if (typeof trimmed === 'string' && trimmed.includes('res.cloudinary.com')) {
    return isFolderString ? trimmed : { success: true, url: trimmed, secure_url: trimmed };
  }

  if (!isCloudinaryConfigured()) {
    console.warn('[Cloudinary] Missing credentials, skipping remote upload');
    return isFolderString ? trimmed : { success: false, url: null, error: 'Cloudinary not configured' };
  }

  try {
    const folder = isFolderString ? options : options.folder || 'speshway_products';
    const publicId = isFolderString ? undefined : options.publicId;

    const uploadOptions = {
      folder,
      resource_type: 'auto',
      overwrite: true,
      invalidate: true,
    };
    if (publicId) uploadOptions.public_id = publicId;

    const result = await cloudinary.uploader.upload(trimmed, uploadOptions);

    if (result && result.secure_url) {
      console.log(`[Cloudinary] Image uploaded successfully to ${result.secure_url}`);
      if (isFolderString) return result.secure_url;
      return {
        success: true,
        url: result.secure_url,
        secure_url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      };
    }
  } catch (error) {
    console.error('[Cloudinary] Upload failed:', error.message);
  }

  if (isFolderString) return trimmed;
  return { success: false, url: null, error: 'Upload failed' };
};

/**
 * Delete an image from Cloudinary by its public ID
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!isCloudinaryConfigured() || !publicId) return { success: false };
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === 'ok' };
  } catch (error) {
    console.error('[Cloudinary] Deletion error:', error.message);
    return { success: false, error: error.message };
  }
};

export default {
  cloudinary,
  isCloudinaryConfigured,
  uploadToCloudinary,
  deleteFromCloudinary,
};
