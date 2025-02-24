const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


class StorageService {
  static async uploadImage(buffer, filename, provider = 'cloudinary') {
    if (provider === 'cloudinary') {
      return this.uploadToCloudinary(buffer);
    } else if (provider === 's3') {
      return this.uploadToS3(buffer, filename);
    } else {
      throw new Error('Invalid storage provider');
    }
  }

  static uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', format: 'jpg', quality: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(buffer);
    });
  }
  
}

module.exports = StorageService;
