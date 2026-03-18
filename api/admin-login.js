import mongoose from "mongoose";

// Environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// MongoDB connection helper
async function connectDB() {
  if (mongoose.connections[0].readyState) return; // reuse connection
  await mongoose.connect(process.env.MONGO_URI);   // your Atlas URI
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Connect to MongoDB
  await connectDB();

  const { email, password } = req.body;

  // Check credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
}