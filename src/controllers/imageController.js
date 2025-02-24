const { v4: uuidv4 } = require('uuid');
const { processingQueue } = require('../config/queueConfig');

const ProcessingRequest = require('../models/request');

const uploadCSV = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file provided' });
    }

    const requestId = uuidv4();
    const webhookUrl = req.body.webhookUrl;

    // Create processing request
    const processingRequest = new ProcessingRequest({
      requestId,
      webhookUrl
    });
    await processingRequest.save();

    // Add to processing queue
    await processingQueue.add({
      requestId,
      filePath: req.file.path,
      webhookUrl
    });

    res.json({ requestId });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const checkStatus = async (req, res) => {
  try {
    const request = await ProcessingRequest.findOne({
      requestId: req.params.requestId
    }).populate('products');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({
      status: request.status,
      products: request.products,
      createdAt: request.createdAt,
      completedAt: request.completedAt
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  uploadCSV,
  checkStatus
};
