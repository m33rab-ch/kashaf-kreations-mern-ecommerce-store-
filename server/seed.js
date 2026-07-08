/**
 * ============================================================
 *  Kashaf's Kreations — Database Seed Script
 *  Run: node seed.js
 *  This creates the admin account and adds dummy products.
 * ============================================================
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const Admin = require("./models/Admin");
const Product = require("./models/Product");

const DUMMY_PRODUCTS = [
  // ── CROCHET BAGS ────────────────────────────────────────────
  {
    name: "Dusty Rose Crochet Tote Bag",
    description:
      "A beautiful handcrafted crochet tote bag in dusty rose. Perfect for everyday use, groceries, or the beach. Made with premium cotton yarn. Fully lined inside with a zipper pocket.",
    price: 1200,
    category: "crochet",
    subcategory: "bag",
    stock: 5,
    isFeatured: true,
    tags: ["handmade", "tote", "gift", "aesthetic", "summer"],
    image: "",
  },
  {
    name: "Cream Boho Crochet Shoulder Bag",
    description:
      "Elegant boho-style crochet shoulder bag in warm cream. Features long braided straps and a tassel detail. Fits your phone, wallet, and essentials perfectly.",
    price: 950,
    category: "crochet",
    subcategory: "bag",
    stock: 8,
    isFeatured: true,
    tags: ["boho", "handmade", "shoulder-bag", "cream"],
    image: "",
  },
  {
    name: "Mini Crochet Drawstring Bag",
    description:
      "Adorable mini crochet drawstring bag — great for outings, parties, or as a gift pouch. Available in rose, cream, and sage green.",
    price: 550,
    category: "crochet",
    subcategory: "bag",
    stock: 12,
    isFeatured: false,
    tags: ["mini", "drawstring", "cute", "gift"],
    image: "",
  },

  // ── CROCHET KEYCHAINS ────────────────────────────────────────
  {
    name: "Crochet Strawberry Keychain",
    description:
      "The cutest handmade crochet strawberry keychain! Perfect gift for friends. Each one is slightly unique. Comes with a metal key ring.",
    price: 250,
    category: "crochet",
    subcategory: "keychain",
    stock: 20,
    isFeatured: true,
    tags: ["cute", "keychain", "gift", "strawberry"],
    image: "",
  },
  {
    name: "Crochet Heart Keychain",
    description:
      "A sweet little crochet heart keychain — perfect for Valentine's Day, birthdays, or just because. Lightweight and adorable.",
    price: 200,
    category: "crochet",
    subcategory: "keychain",
    stock: 25,
    isFeatured: false,
    tags: ["heart", "keychain", "valentine", "gift"],
    image: "",
  },
  {
    name: "Crochet Ghost Keychain",
    description:
      "Spooky cute crochet ghost keychain in white with little black eyes. Everyone loves this one! Great for Halloween or year-round.",
    price: 230,
    category: "crochet",
    subcategory: "keychain",
    stock: 15,
    isFeatured: false,
    tags: ["ghost", "spooky", "cute", "halloween"],
    image: "",
  },

  // ── CROCHET SCRUNCHIES ───────────────────────────────────────
  {
    name: "Chunky Crochet Scrunchie Set (3 pcs)",
    description:
      "Set of 3 handmade chunky crochet scrunchies in dusty rose, cream, and gold. Gentle on hair, stylish, and durable. Perfect gift set!",
    price: 350,
    category: "crochet",
    subcategory: "scrunchie",
    stock: 18,
    isFeatured: true,
    tags: ["scrunchie", "set", "gift", "hair"],
    image: "",
  },
  {
    name: "Satin & Crochet Scrunchie",
    description:
      "Elegant combination of satin ribbon and crochet detailing. Looks beautiful as a hair accessory or wrist accessory.",
    price: 180,
    category: "crochet",
    subcategory: "scrunchie",
    stock: 22,
    isFeatured: false,
    tags: ["scrunchie", "satin", "elegant"],
    image: "",
  },

  // ── JEWELLERY: EARRINGS ──────────────────────────────────────
  {
    name: "Gold Pearl Drop Earrings",
    description:
      "Elegant gold-toned earrings with a delicate pearl drop. Lightweight and perfect for everyday wear or special occasions. Hypoallergenic hooks.",
    price: 450,
    category: "jewelry",
    subcategory: "earrings",
    stock: 15,
    isFeatured: true,
    tags: ["pearl", "gold", "elegant", "earrings"],
    image: "",
  },
  {
    name: "Rose Gold Hoop Earrings",
    description:
      "Trendy rose gold hoop earrings with a brushed finish. Lightweight and comfortable for all-day wear. Available in small and large sizes.",
    price: 380,
    category: "jewelry",
    subcategory: "earrings",
    stock: 20,
    isFeatured: false,
    tags: ["hoops", "rose-gold", "trendy"],
    image: "",
  },
  {
    name: "Crystal Star Stud Earrings",
    description:
      "Dainty crystal star stud earrings that catch the light beautifully. Perfect for everyday wear. Comes in a set of two pairs.",
    price: 320,
    category: "jewelry",
    subcategory: "earrings",
    stock: 18,
    isFeatured: true,
    tags: ["crystal", "star", "studs", "dainty"],
    image: "",
  },

  // ── JEWELLERY: NECKLACES ─────────────────────────────────────
  {
    name: "Layered Gold Chain Necklace",
    description:
      "A beautiful three-layer gold chain necklace with a small heart pendant. Trendy, lightweight, and adjustable length.",
    price: 750,
    category: "jewelry",
    subcategory: "necklace",
    stock: 10,
    isFeatured: true,
    tags: ["necklace", "layered", "gold", "heart"],
    image: "",
  },
  {
    name: "Pearl Choker Necklace",
    description:
      "Classic pearl choker necklace on a gold-toned chain. Timeless and elegant — perfect for formal events or adding a touch of class to everyday outfits.",
    price: 620,
    category: "jewelry",
    subcategory: "necklace",
    stock: 12,
    isFeatured: false,
    tags: ["pearl", "choker", "classic", "elegant"],
    image: "",
  },

  // ── JEWELLERY: BRACELETS ─────────────────────────────────────
  {
    name: "Beaded Charm Bracelet",
    description:
      "Handpicked gold and rose gold beaded charm bracelet with small flower and star charms. Stack multiple for a boho look!",
    price: 480,
    category: "jewelry",
    subcategory: "bracelet",
    stock: 14,
    isFeatured: false,
    tags: ["bracelet", "beaded", "charm", "boho"],
    image: "",
  },
  {
    name: "Adjustable Gold Bangle Set (3 pcs)",
    description:
      "Set of 3 thin gold bangle bracelets with different textures — plain, twisted, and diamond-cut. Mix and match beautifully.",
    price: 590,
    category: "jewelry",
    subcategory: "bracelet",
    stock: 11,
    isFeatured: true,
    tags: ["bangles", "gold", "set", "stackable"],
    image: "",
  },

  // ── JEWELLERY: RINGS ─────────────────────────────────────────
  {
    name: "Adjustable Butterfly Ring",
    description:
      "Cute adjustable butterfly ring in gold tone. Fits most finger sizes. Great as a gift or treat for yourself!",
    price: 280,
    category: "jewelry",
    subcategory: "ring",
    stock: 20,
    isFeatured: false,
    tags: ["ring", "butterfly", "adjustable", "cute"],
    image: "",
  },
  {
    name: "Vintage Floral Statement Ring",
    description:
      "A bold vintage-inspired floral statement ring with intricate detailing. Makes a beautiful centrepiece for any hand.",
    price: 420,
    category: "jewelry",
    subcategory: "ring",
    stock: 8,
    isFeatured: false,
    tags: ["ring", "vintage", "floral", "statement"],
    image: "",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert products
    const inserted = await Product.insertMany(DUMMY_PRODUCTS);
    console.log(`🌸 ${inserted.length} products inserted`);

    // Create admin if not exists
    const exists = await Admin.findOne({});
    if (!exists) {
      await Admin.create({
        name: "Dure-e-Kashaf",
        email: process.env.ADMIN_EMAIL || "admin@kashafskreations.com",
        password: process.env.ADMIN_PASSWORD || "Admin@1234",
      });
      console.log("👤 Admin account created");
      console.log(`   Email: ${process.env.ADMIN_EMAIL || "admin@kashafskreations.com"}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Admin@1234"}`);
    } else {
      console.log("👤 Admin already exists — skipped");
    }

    console.log("\n✅ Seed complete! Your shop is ready. 🌸\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();
