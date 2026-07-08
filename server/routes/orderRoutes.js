const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

// ── PUBLIC ROUTES ────────────────────────────────────────────────────────────

// @route   POST /api/orders
// @desc    Place a new order
// @access  Public (no login required for customers)
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      items,
      paymentMethod,
      paymentDetails,
      customerNote,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Validate stock & get prices from DB (never trust client-side prices)
    let subtotal = 0;
    const enrichedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        });
      }

      enrichedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      subtotal += product.price * item.quantity;

      // Deduct stock
      product.stock -= item.quantity;
      await product.save();
    }

    const shippingCost = 150; // Flat Rs. 150 for Punjab
    const totalAmount = subtotal + shippingCost;

    const order = await Order.create({
      customer,
      shippingAddress,
      items: enrichedItems,
      paymentMethod,
      paymentDetails: paymentDetails || {},
      subtotal,
      shippingCost,
      totalAmount,
      customerNote: customerNote || "",
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID (for confirmation page)
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product", "name image");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── ADMIN PROTECTED ROUTES ───────────────────────────────────────────────────

// @route   GET /api/orders
// @desc    Get all orders (admin)
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (adminNote) order.adminNote = adminNote;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/admin/stats
// @desc    Dashboard statistics
// @access  Private
router.get("/admin/stats", protect, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
