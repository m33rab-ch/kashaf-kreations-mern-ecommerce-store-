const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { protect } = require("../middleware/authMiddleware");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        },
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/profile
// @desc    Get admin profile (protected)
// @access  Private
router.get("/profile", protect, async (req, res) => {
  res.json({ admin: req.admin });
});

// @route   POST /api/admin/setup
// @desc    Create first admin (run once)
// @access  Public — DISABLE AFTER FIRST USE
router.post("/setup", async (req, res) => {
  try {
    const exists = await Admin.findOne({});
    if (exists) {
      return res.status(400).json({ message: "Admin already exists. Setup disabled." });
    }

    const admin = await Admin.create({
      name: "Dure-e-Kashaf",
      email: process.env.ADMIN_EMAIL || "admin@kashafskreations.com",
      password: process.env.ADMIN_PASSWORD || "Admin@1234",
    });

    res.status(201).json({
      message: "Admin created successfully!",
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
