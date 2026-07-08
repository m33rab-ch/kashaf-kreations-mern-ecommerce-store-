const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

// ── Multer Setup for Image Uploads ──────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) cb(null, true);
    else cb(new Error("Only images (jpg, png, webp) are allowed"));
  },
});

// ── PUBLIC ROUTES ────────────────────────────────────────────────────────────

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, subcategory, minPrice, maxPrice, featured } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (featured === "true") filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/featured
// @desc    Get featured products for homepage
// @access  Public
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── ADMIN PROTECTED ROUTES ───────────────────────────────────────────────────

// @route   POST /api/products
// @desc    Add new product
// @access  Private (Admin)
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, subcategory, stock, isFeatured, tags } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      stock: Number(stock),
      isFeatured: isFeatured === "true",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      image,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updates = { ...req.body };
    if (req.file) updates.image = `/uploads/${req.file.filename}`;
    if (updates.tags && typeof updates.tags === "string") {
      updates.tags = updates.tags.split(",").map((t) => t.trim());
    }
    if (updates.isFeatured) updates.isFeatured = updates.isFeatured === "true";

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
