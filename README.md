# 🌸 Kashaf's Kreations — Full Stack E-Commerce Website

A complete MERN stack e-commerce website for **Kashaf's Kreations**, a handmade crochet and artificial jewellery startup by **Dure-e-Kashaf**, Arifwala, Punjab.

---

## 📁 Project Structure

```
kashaf-kreations/
├── server/               ← Node.js + Express backend
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/           ← Mongoose models (Admin, Product, Order)
│   ├── routes/           ← API routes
│   ├── uploads/          ← Product images (auto-created)
│   ├── seed.js           ← Database seeder (dummy products)
│   ├── server.js         ← Main server entry
│   ├── .env.example      ← Copy this to .env
│   └── package.json
│
└── client/               ← React (Vite) frontend
    ├── src/
    │   ├── components/   ← Navbar, Footer, ProductCard, AdminRoute
    │   ├── context/      ← CartContext (global cart state)
    │   ├── pages/        ← All customer pages
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── OrderConfirmation.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   └── admin/    ← All admin pages
    │   │       ├── AdminLogin.jsx
    │   │       ├── AdminLayout.jsx
    │   │       ├── Dashboard.jsx
    │   │       ├── ManageProducts.jsx
    │   │       └── ManageOrders.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

---

### Step 1 — MongoDB Atlas Setup
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free account
2. Create a **free cluster**
3. Create a database user (username + password)
4. Whitelist your IP: Network Access → Add `0.0.0.0/0`
5. Get your connection string: Connect → Drivers → Copy URI

---

### Step 2 — Server Setup

```bash
cd server
npm install

# Copy the example env file
cp .env.example .env
```

Open `.env` and fill in your values:

```env
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/kashafskreations
JWT_SECRET=any_long_random_secret_string_here
PORT=5000
ADMIN_EMAIL=admin@kashafskreations.com
ADMIN_PASSWORD=YourStrongPassword123
```

---

### Step 3 — Seed the Database

```bash
cd server
node seed.js
```

This will:
- Create the admin account
- Add 18 dummy products (crochet + jewellery)

---

### Step 4 — Start the Server

```bash
cd server
npm run dev       # Development (with nodemon)
# OR
npm start         # Production
```

Server runs on: `http://localhost:5000`

---

### Step 5 — Client Setup

```bash
cd client
npm install
npm run dev
```

Client runs on: `http://localhost:5173`

---

## 🔑 Admin Access

After seeding, go to: `http://localhost:5173/admin/login`

| Field    | Value                              |
|----------|------------------------------------|
| Email    | your-admin@example.com        |
| Password | Ayour_secure_password         |

---

## 🌐 Key Pages

| Page                 | URL                          |
|----------------------|------------------------------|
| Homepage             | /                            |
| Shop                 | /products                    |
| Product Detail       | /products/:id                |
| Cart                 | /cart                        |
| Checkout             | /checkout                    |
| Order Confirmation   | /order-confirmation/:id      |
| About                | /about                       |
| Contact              | /contact                     |
| **Admin Login**      | /admin/login                 |
| **Admin Dashboard**  | /admin/dashboard             |
| **Manage Products**  | /admin/products              |
| **Manage Orders**    | /admin/orders                |

---

## 🛍️ Features

### Customer Side
- Browse all products with category + price filters
- Search products by name
- Product detail page with quantity selector
- Shopping cart (persists in localStorage)
- Checkout with COD, EasyPaisa, JazzCash
- Order confirmation page with WhatsApp link

### Admin Side
- Secure JWT login
- Dashboard with stats (total orders, revenue, etc.)
- Add / Edit / Delete products with image upload
- View all orders with expandable details
- Update order status (Pending → Confirmed → Shipped → Delivered)
- Add admin notes to orders

---

## 🔁 What to Replace (Dummy → Real)

Search for `🔁 REPLACE` comments in the code:

| File                    | What to replace                          |
|-------------------------|------------------------------------------|
| `Footer.jsx`            | WhatsApp, Instagram, Facebook handles    |
| `Checkout.jsx`          | EasyPaisa/JazzCash account number        |
| `Contact.jsx`           | Phone, email, social links               |
| `OrderConfirmation.jsx` | WhatsApp number                          |
| `Home.jsx`              | Hero images (4 colored boxes)            |
| `About.jsx`             | Kashaf's real photo                      |

---

## 🎨 Color Palette

| Name        | Hex       |
|-------------|-----------|
| Dusty Rose  | `#C9848A` |
| Rose Light  | `#E8C4C7` |
| Cream       | `#FAF3EB` |
| Gold        | `#C9A84C` |
| Dark        | `#3D2020` |

---

## 🚀 Deployment

### Backend (Railway / Render)
1. Push server folder to GitHub
2. Connect to Railway/Render
3. Add environment variables from `.env`
4. Deploy

### Frontend (Vercel)
1. Push client folder to GitHub
2. Connect to Vercel
3. Set `VITE_API_URL` if needed
4. Update `vite.config.js` proxy to point to your live backend URL

---

## 📞 Contact

Made with 🌸 by **Dure-e-Kashaf**, Arifwala, Punjab.

---

*Kashaf's Kreations — Handcrafted with Heart, Worn with Love.*
