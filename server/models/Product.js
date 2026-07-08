const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["crochet", "jewelry"],
    },
    subcategory: {
      // e.g. bag, keychain, scrunchie / earrings, necklace, bracelet, ring
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "", // URL or filename
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [String], // e.g. ["handmade", "gift", "aesthetic"]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
