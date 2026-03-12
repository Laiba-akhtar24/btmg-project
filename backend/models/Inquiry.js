// backend/models/Inquiry.js
const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // 🔹 Reply tracking
  replied: { type: Boolean, default: false },
  replyMessage: { type: String, default: "" }
});

module.exports = mongoose.model("Inquiry", InquirySchema);