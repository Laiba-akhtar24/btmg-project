const express = require("express");
const router = express.Router();

// Only ONE admin email and password
const ADMIN_EMAIL = "laibaakhtar9890@gmail.com";
const ADMIN_PASSWORD = "123456";

router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Login successful"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

module.exports = router;