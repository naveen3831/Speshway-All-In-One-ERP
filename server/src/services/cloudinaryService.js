import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables and verified credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ddgjubbbx',
  api_key: process.env.CLOUDINARY_API_KEY || '731672495256651',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'KT-7u5p3eD-kuZBEOsFWe5ZKWyw',
  secure: true,
});

/**
 * Uploads an image (base64 data URI or remote HTTP/HTTPS URL) directly to Cloudinary.
 * Returns the permanent HTTPS CDN URL.
 */
export const uploadToCloudinary = async (imageInput, folder = 'speshway_products') => {
  if (!imageInput || typeof imageInput !== 'string') return imageInput;

  const trimmed = imageInput.trim();

  // If already hosted on Cloudinary, return as-is
  if (trimmed.includes('res.cloudinary.com')) {
    return trimmed;
  }

  // Must be either a base64 data URI or a remote HTTP(S) URL
  const isBase64 = trimmed.startsWith('data:image/');
  const isRemoteHttp = trimmed.startsWith('http://') || trimmed.startsWith('https://');

  if (!isBase64 && !isRemoteHttp) {
    return trimmed;
  }

  try {
    console.log(`☁️ Uploading project image (${Math.round(trimmed.length / 1024)} KB) to Cloudinary...`);

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ddgjubbbx',
      api_key: process.env.CLOUDINARY_API_KEY || '731672495256651',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'KT-7u5p3eD-kuZBEOsFWe5ZKWyw',
      secure: true,
    });

    const result = await cloudinary.uploader.upload(trimmed, {
      folder: folder,
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'gif', 'avif'],
    });

    if (result && result.secure_url) {
      console.log(`✅ Uploaded to Cloudinary CDN successfully: ${result.secure_url}`);
      return result.secure_url;
    }
  } catch (err) {
    console.error('⚠️ Cloudinary upload error:', err.message);
  }

  return trimmed;
};

export default cloudinary;
