const express = require('express');
const serverless = require('serverless-http');

const connectDB = require('../backend/config/db');
const courseRoutes = require('../backend/routes/courses');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

module.exports = serverless(app);