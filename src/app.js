require("dotenv").config();

const express = require('express');
const Bull = require('bull');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
const { processingQueue } = require('./config/queueConfig');

const logger = require('./services/logger');

const processQueueJob = require('./services/queueProcessor');

const app = express();

// Connect to MongoDB
connectDB();

app.set('processingQueue', processingQueue);

// Use API routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "pong",
  });
});


processingQueue.process(processQueueJob);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server listening on http://0.0.0.0:${PORT}`);
});
