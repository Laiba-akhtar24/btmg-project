const express = require('express');
const serverless = require('serverless-http');

const connectDB = require('../backend/config/db');   // ✅ FIXED
const courseRoutes = require('../backend/routes/courses'); // ✅ FIXED

const app = express();

app.use(express.json());

connectDB();

app.use('/api/courses', courseRoutes);

module.exports = serverless(app);