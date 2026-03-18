require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

// ===== MongoDB connect =====
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ===== Middleware =====
const allowedOrigins = [
'http://localhost:3000',
'http://localhost:3001',
'https://your-frontend.vercel.app'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `❌ CORS error: This origin (${origin}) is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE']
  
}));

app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Routes =====
// ===== Routes =====
const courseRoutes = require('./routes/courses');
const topicRoutes = require('./routes/topics');
const subscriberRoutes = require('./routes/subscribers');
const categoryRoutes = require('./routes/categories');
const launchDateRoutes = require('./routes/launchDates');
const contactRoutes = require('./routes/contacts');
const inquiryRoutes = require('./routes/courseInquiries'); 
const enrollmentRoutes = require('./routes/enrollments');
const recentActivitiesRoutes = require("./routes/recentActivities");
const adminAuthRoutes = require('./routes/adminAuth');          
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api', subscriberRoutes);
app.use('/api/launch-dates', launchDateRoutes);
app.use('/api/course-inquiries', inquiryRoutes); // ✅ matches frontend
app.use('/api/enrollments', enrollmentRoutes);
app.use("/api/recent-activities", recentActivitiesRoutes);
app.use('/api', adminAuthRoutes);
app.get('/api/course-inquiries/test', (req, res) => {
  res.send('✅ courseInquiries route loaded correctly');
});

/* CONTACT ROUTE */
app.use('/api/contact', contactRoutes);

// ===== Test route =====
app.get('/', (req, res) => {
  res.send('BTMG Trainings Backend is running');
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});