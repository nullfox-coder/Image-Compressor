const Bull = require('bull');

// Create processing queue
const processingQueue = new Bull('image-processing');

module.exports = { processingQueue };
