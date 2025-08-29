const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { processData } = require('./utils/dataProcessor');
const { generateUserId } = require('./utils/userUtils');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'BFHL API is running successfully',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main BFHL endpoint
app.post('/bfhl', async (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input: data must be an array'
      });
    }

    if (data.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input: data array cannot be empty'
      });
    }

    // Process the data
    const processedData = processData(data);
    
    // Generate user ID (you can customize this)
    const user_id = generateUserId();
    
    // Prepare response
    const response = {
      is_success: true,
      user_id: user_id,
      email: "john@xyz.com",
      roll_number: "ABCD123",
      ...processedData
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    is_success: false,
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BFHL API server is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Main endpoint: http://localhost:${PORT}/bfhl`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

module.exports = app;
