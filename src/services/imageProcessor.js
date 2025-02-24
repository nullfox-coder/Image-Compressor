const sharp = require('sharp');
const axios = require('axios');
const StorageService = require('../config/storage');
const crypto = require('crypto');
const fs = require('fs').promises;

class ImageProcessor {
  static async compressImage(imageUrl, provider = 'cloudinary') {
    try {
      let buffer;

      // Fetch image from URL or local file
      if (imageUrl.startsWith('http')) {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        buffer = Buffer.from(response.data);
      } else {
        buffer = await fs.readFile(imageUrl);
      }

      // Compress image using sharp
      const compressedBuffer = await sharp(buffer)
        .jpeg({ quality: 50 }) // Reduce quality to 50%
        .toBuffer();

      // Generate unique filename using a hash
      const filename = crypto.createHash('md5').update(imageUrl).digest('hex');

      // Upload compressed image to selected storage provider
      const uploadedUrl = await StorageService.uploadImage(compressedBuffer, filename, provider);

      console.log('Uploaded Image URL:', uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error('Image processing error:', error);
      throw error;
    }
  }
}

module.exports = ImageProcessor;
