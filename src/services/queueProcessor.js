const csv = require('csv-parser');
const { processingQueue } = require('../config/queueConfig');
const fs = require('fs').promises; // Use Promises API for better async handling
const ProcessingRequest = require('../models/request');
const Product = require('../models/product');
const ImageProcessor = require('./imageProcessor');
const WebhookService = require('./webhookService');
const stream = require('stream');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);

const processQueueJob = async (job) => {
  const { requestId, filePath, webhookUrl } = job.data;
  
  try {
    const request = await ProcessingRequest.findOne({ requestId });
    request.status = 'PROCESSING';
    await request.save();

    const products = [];
    const results = [];

    // Read CSV file asynchronously
    const fileStream = await fs.readFile(filePath);
    const csvStream = stream.Readable.from(fileStream.toString());

    const rows = [];
    await pipeline(
      csvStream.pipe(csv()),
      new stream.Writable({
        objectMode: true,
        write: (row, _, callback) => {
          rows.push(row);
          callback();
        },
      })
    );

    // Process each row sequentially
    for (const row of rows) {
      const inputUrls = row['Input Image Urls'].split(',').map(url => url.trim());
      const serialNumber = row['S. No.'];

      if (!serialNumber) {
        console.error('Missing serial number for product:', row);
        continue;
      }

      const product = new Product({
        serialNumber,
        productName: row['Product Name'],
        inputImageUrls: inputUrls,
        outputImageUrls: []
      });

      // Process images one by one
      for (const url of inputUrls) {
        const outputUrl = await ImageProcessor.compressImage(url);
        product.outputImageUrls.push(outputUrl);
      }

      await product.save();
      products.push(product._id);
      results.push({
        serialNumber: product.serialNumber,
        productName: product.productName,
        inputImageUrls: product.inputImageUrls,
        outputImageUrls: product.outputImageUrls
      });
    }

    // Update request with processed products
    request.status = 'COMPLETED';
    request.products = products; // Now correctly populated
    request.completedAt = new Date();
    await request.save();

    // Send webhook notification if provided
    if (webhookUrl) {
      await WebhookService.notify(webhookUrl, {
        requestId,
        status: 'COMPLETED',
        results
      });
    }

  } catch (error) {
    console.error('Processing error:', error);
    const request = await ProcessingRequest.findOne({ requestId });
    request.status = 'FAILED';
    await request.save();

    if (webhookUrl) {
      await WebhookService.notify(webhookUrl, {
        requestId,
        status: 'FAILED',
        error: error.message
      });
    }
  }
};

module.exports = processQueueJob;
