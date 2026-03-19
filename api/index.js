import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes (VERY IMPORTANT: correct path)
import courseRoutes from '../backend/routes/courses.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
if (!mongoose.connections[0].readyState) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
}

// Routes
app.use('/api/courses', courseRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

export default app;