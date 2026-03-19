const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// SAVE CONTACT FROM FRONTEND
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true });
  } catch (error) {
    console.log("Save Contact Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET ALL LEADS (ADMIN)
router.get("/admin/leads", async (req, res) => {
  try {
    const leads = await Contact.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.log("Get Leads Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// MARK VIEWED
router.post("/viewed/:id", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { viewed: "Viewed" });
    res.json({ success: true });
  } catch (error) {
    console.log("Viewed Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// SEND REPLY WITH EMAIL
// SEND REPLY WITH EMAIL
router.post("/reply/:id", async (req, res) => {
  try {

    const lead = await Contact.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    if (!req.body.message) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    // EMAIL TRANSPORT
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: `"BTMG Admin" <${process.env.MAIL_USER}>`,
      to: lead.email,
      subject: "Reply from BTMG Admin",
      text: req.body.message
    };

    await transporter.sendMail(mailOptions);

    await Contact.findByIdAndUpdate(req.params.id, { replied: "Yes" });

    res.json({
      success: true,
      message: "Reply sent successfully"
    });

  } catch (error) {
    console.log("Reply Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;