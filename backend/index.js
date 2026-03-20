require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// ===== MongoDB connect =====
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ===== CORS FIX =====
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://btmg-project-admin.vercel.app" // your frontend URL
  ],
  credentials: true
}));

// ===== Middleware =====
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Routes =====
app.use('/api/categories', require('./routes/categories'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api', require('./routes/subscribers'));
app.use('/api/launch-dates', require('./routes/launchDates'));
app.use('/api/course-inquiries', require('./routes/courseInquiries'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/recent-activities', require('./routes/recentActivities'));
app.use('/api/contact', require('./routes/contacts'));
app.use('/api', require('./routes/adminAuth'));

// ===== TEST ROUTE =====
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});