const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const nodemailer = require("nodemailer");

// ===== POST: Add new enrollment =====
router.post("/", async (req, res) => {
  try {
    const {
      course_name,
      student_name,
      email,
      phone,
      registration_type,
      message
    } = req.body;

    if (!course_name || !student_name || !email || !registration_type) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newEnrollment = new Enrollment({
      course_name,
      student_name,
      email,
      phone,
      registration_type,
      message,
      status: "Pending",
      createdAt: new Date(),
    });

    await newEnrollment.save();
    res.status(201).json({ message: "Enrollment submitted successfully" });
  } catch (err) {
    console.error("Error adding enrollment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== GET: Fetch all enrollments =====
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.status(200).json(enrollments);
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== DELETE: Remove an enrollment =====
router.delete("/:id", async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.json({ message: "Enrollment deleted successfully" });
  } catch (err) {
    console.error("Error deleting enrollment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== POST: Reply to enrollment (send email) =====
router.post("/:id/reply", async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const enrollmentId = req.params.id;

    if (!replyMessage) {
      return res.status(400).json({ message: "Reply message is required" });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Nodemailer transporter using .env
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: enrollment.email,
      subject: `Regarding your enrollment: ${enrollment.course_name}`,
      text: replyMessage,
    });

    // Update enrollment as replied
    enrollment.replyMessage = replyMessage;
    enrollment.status = "Replied";
    await enrollment.save();

    res.status(200).json({ message: "Reply sent successfully" });

  } catch (err) {
    console.error("Error replying to enrollment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;