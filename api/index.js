require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const serverless = require('serverless-http');

const app = express();

// ===== DB =====
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

// ===== Middleware =====
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ===== Routes =====
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

// ===== ROOT ROUTE =====
app.get('/', (req, res) => {
  res.send('🔥 BTMG Backend is LIVE on Vercel');
});

// ===== EXPORT =====
module.exports = serverless(app);