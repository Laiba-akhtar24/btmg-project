// backend/routes/recentActivities.js
const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const CourseInquiry = require("../models/Inquiry");
const Course = require("../models/Course");

// GET: recent enrollments
router.get("/enrollments", async (req, res) => {
  try {
    const recent = await Enrollment.find().sort({ createdAt: -1 }).limit(5);
    res.json(recent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: recent course inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const recent = await CourseInquiry.find().sort({ createdAt: -1 }).limit(5);
    res.json(recent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: recent courses added
router.get("/courses", async (req, res) => {
  try {
    const recent = await Course.find().sort({ createdAt: -1 }).limit(5);
    res.json(recent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;