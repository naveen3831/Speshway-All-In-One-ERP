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
 * @param {string} fileData - Base64 data URL, image buffer data URI, or URL
 * @param {object} options - Upload options (folder, publicId, tags, etc.)
 * @returns {Promise<{ success: boolean, url: string, public_id?: string }>}
 */
export const uploadToCloudinary = async (fileData, options = {}) => {
  if (!fileData) {
    throw new Error('No image data provided for Cloudinary upload');
  }

  if (!isCloudinaryConfigured()) {
    console.warn('[Cloudinary] Missing credentials in environment, cannot upload to Cloudinary');
    return { success: false, url: null, error: 'Cloudinary not configured' };
  }

  try {
    const { folder = 'speshway_erp/products', publicId } = options;

    const uploadOptions = {
      folder,
      resource_type: 'image',
      overwrite: true,
      invalidate: true,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const result = await cloudinary.uploader.upload(fileData, uploadOptions);

    console.log(`[Cloudinary] Image successfully uploaded to ${result.secure_url}`);
    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('[Cloudinary] Upload failed:', error.message);
    return {
      success: false,
      url: null,
      error: error.message
    };
  }
};

/**
 * Delete an image from Cloudinary by its public ID
 * @param {string} publicId - The public ID of the resource
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
