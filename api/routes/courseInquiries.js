// backend/routes/courseInquiries.js

const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const nodemailer = require("nodemailer");
 // your inquiry model


// =============================
// ADD NEW INQUIRY
// =============================
router.post("/", async (req, res) => {
  try {
    const { course_name, name, email, phone, message } = req.body;

    if (!course_name || !name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newInquiry = new Inquiry({
      course_name,
      name,
      email,
      phone,
      message,
      createdAt: new Date(),
      replied: false,
      viewed: false,
      replyMessage: ""
    });

    await newInquiry.save();

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry: newInquiry
    });

  } catch (err) {
    console.error("Error adding inquiry:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// =============================
// GET ALL INQUIRIES
// =============================
router.get("/", async (req, res) => {
  try {

    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 });

    res.status(200).json(inquiries);

  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// =============================
// DELETE INQUIRY
// =============================
router.delete("/:id", async (req, res) => {
  try {

    await Inquiry.findByIdAndDelete(req.params.id);

    res.json({ message: "Inquiry deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// =============================
// SEND REPLY TO INQUIRY
// =============================
router.post("/:id/reply", async (req, res) => {

  console.log("Reply API called"); // debugging

  try {

    const { replyMessage } = req.body;
    const inquiryId = req.params.id;

    if (!replyMessage) {
      return res.status(400).json({
        message: "Reply message is required"
      });
    }

    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found"
      });
    }

    // =============================
    // EMAIL TRANSPORT
    // =============================

    const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,       // your SMTP host
  port: process.env.MAIL_PORT,       // SMTP port
  secure: false,                     // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,     // email address
    pass: process.env.MAIL_PASS      // app password
  }
});

    // =============================
    // EMAIL CONTENT
    // =============================

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: inquiry.email,
      subject: `Reply to your inquiry about ${inquiry.course_name}`,
      html: `
        <h3>Hello ${inquiry.name},</h3>

        <p>Thank you for contacting <b>BTMG Trainings</b>.</p>

        <p><b>Your Message:</b></p>
        <p>${inquiry.message}</p>

        <hr/>

        <p><b>Our Reply:</b></p>
        <p>${replyMessage}</p>

        <br/>

        <p>Best Regards</p>
        <p><b>BTMG Trainings Team</b></p>
      `
    };

    // =============================
    // SEND EMAIL
    // =============================

    await transporter.sendMail(mailOptions);

    // =============================
    // UPDATE DATABASE
    // =============================

    inquiry.replied = true;
    inquiry.replyMessage = replyMessage;

    await inquiry.save();

    res.json({
      message: "Reply sent successfully"
    });

  } catch (error) {

    console.error("Reply error:", error);

    res.status(500).json({
      message: "Failed to send reply"
    });
  }
});
router.patch("/course-inquiries/:id/viewed", async (req, res) => {
  try {
    const inquiry = await CourseInquiry.findByIdAndUpdate(
      req.params.id,
      { viewed: true },
      { new: true }
    );

    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: "Error updating viewed status" });
  }
});

module.exports = router;