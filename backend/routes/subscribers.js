const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

const nodemailer = require("nodemailer");

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
/*
-----------------------------------
SUBSCRIBE API
-----------------------------------
*/

router.post("/subscribe", async (req, res) => {

  try {

    console.log("BODY RECEIVED:", req.body);

    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid email format"
  });
}

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already subscribed"
      });
    }

    const subscriber = new Subscriber({
      email
    });

    await subscriber.save();

    console.log("Subscriber saved:", subscriber);

    res.json({
      message: "Subscribed successfully"
    });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/*
-----------------------------------
GET ALL SUBSCRIBERS (ADMIN)
-----------------------------------
*/

router.get("/subscribers", async (req, res) => {

  try {

    const subscribers = await Subscriber.find().sort({ createdAt: -1 });

    res.json(subscribers);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});

/*
-----------------------------------
SEND MESSAGE TO SUBSCRIBERS
-----------------------------------
*/
/*
-----------------------------------
SEND MESSAGE TO SUBSCRIBERS
-----------------------------------
*/

router.post("/send-message", async (req, res) => {

  try {

    const { emails, message } = req.body;

    if (!emails || emails.length === 0) {
      return res.status(400).json({
        message: "No recipients selected"
      });
    }

    if (!message) {
      return res.status(400).json({
        message: "Message required"
      });
    }

    let success = [];
    let failed = [];

    for (const email of emails) {

      try {

        const mailOptions = {
          from: `"BTMG Trainings" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Message from BTMG Training",
          html: `
            <div style="font-family:Arial;padding:20px">
              
              <h2 style="color:#09637E">
                BTMG Trainings
              </h2>

              <p>${message}</p>

              <br>

              <p style="font-size:13px;color:#777">
                This email was sent to you because you subscribed to BTMG trainings.
              </p>

            </div>
          `
        };

        await transporter.sendMail(mailOptions);

        success.push(email);

      } catch (err) {

        console.log("Failed email:", email, err);
        failed.push(email);

      }

    }

    res.json({
      message: "Emails processed",
      sent: success.length,
      failed: failed.length,
      success,
      failed
    });

  } catch (error) {

    console.log("EMAIL ERROR:", error);

    res.status(500).json({
      message: "Email sending failed"
    });

  }

});

module.exports = router;