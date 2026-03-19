require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

require('../backend/config/db');
require('../backend/routes/courses')

const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// DB middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }
});

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

// Root
app.get('/', (req, res) => {
  res.send('🔥 BTMG Backend LIVE (Vercel)');
});

module.exports = serverless(app);