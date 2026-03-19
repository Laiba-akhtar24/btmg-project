const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  course_name: { type: String, required: true },       // Course title
  student_name: { type: String, required: true },     // Student full name
  email: { type: String, required: true },            // Student email
  phone: { type: String },                             // Optional
  registration_type: { type: String, required: true }, // Individual / Corporate
  message: { type: String },                           // Optional message
  status: { type: String, default: "Pending" },       // Pending / Approved / Rejected
  createdAt: { type: Date, default: Date.now },
  replyMessage: { type: String, default: "" },        // Admin can reply if needed
  viewed: { type: Boolean, default: false }          // Admin can track if viewed
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);