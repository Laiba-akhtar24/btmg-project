require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

// ✅ FIXED PATH (backend folder)
require('./routes/courses')
require('./config/db')

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// ===== DB CONNECTION (SAFE FOR VERCEL) =====
let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;

  try {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    throw err; // important for error handling
  }
};

// Ensure DB connects before routes
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Database connection failed"
    });
  }
});

// ===== ROUTES (FIXED PATHS) =====
app.use('/api/courses', require('../backend/routes/courses'));
app.use('/api/topics', require('../backend/routes/topics'));
app.use('/api/subscribers', require('../backend/routes/subscribers'));
app.use('/api/categories', require('../backend/routes/categories'));
app.use('/api/launch-dates', require('../backend/routes/launchDates'));
app.use('/api/course-inquiries', require('../backend/routes/courseInquiries'));
app.use('/api/enrollments', require('../backend/routes/enrollments'));
app.use('/api/recent-activities', require('../backend/routes/recentActivities'));
app.use('/api/contact', require('../backend/routes/contacts'));
app.use('/api', require('../backend/routes/adminAuth'));

// ===== ROOT ROUTE =====
app.get('/', (req, res) => {
  res.send('🔥 BTMG Backend LIVE (Vercel)');
});

// ===== EXPORT =====
module.exports = serverless(app);