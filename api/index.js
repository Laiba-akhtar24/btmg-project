const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
require('dotenv').config();

const app = express();

// MongoDB
connectDB().then(() => console.log("✅ MongoDB connected"));

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/courses', require('../routes/courses'));
app.use('/api/topics', require('../routes/topics'));
app.use('/api/subscribers', require('../routes/subscribers'));
app.use('/api/categories', require('../routes/categories'));
app.use('/api/launch-dates', require('../routes/launchDates'));
app.use('/api/course-inquiries', require('../routes/courseInquiries'));
app.use('/api/enrollments', require('../routes/enrollments'));
app.use('/api/recent-activities', require('../routes/recentActivities'));
app.use('/api/contact', require('../routes/contacts'));
app.use('/api', require('../routes/adminAuth'));

// Test route
app.get('/', (req, res) => {
  res.send('✅ BTMG Backend is running');
});

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);