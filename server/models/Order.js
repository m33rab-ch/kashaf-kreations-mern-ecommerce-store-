const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  image: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    // Customer Info
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    // Shipping Address
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      province: { type: String, default: "Punjab" },
    },

    // Order Items
    items: [orderItemSchema],

    // Payment
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "EasyPaisa", "JazzCash"],
    },
    paymentDetails: {
      // For EasyPaisa / JazzCash — customer's transaction ID or number
      transactionId: { type: String, default: "" },
      accountNumber: { type: String, default: "" },
    },

    // Pricing
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 150 }, // Rs. 150 flat shipping
    totalAmount: { type: Number, required: true },

    // Status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // Notes
    customerNote: { type: String, default: "" },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
