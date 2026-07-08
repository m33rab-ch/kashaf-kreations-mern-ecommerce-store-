import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "DM Sans, sans-serif",
              borderRadius: "12px",
              background: "#3D2020",
              color: "#FAF3EB",
            },
            success: { iconTheme: { primary: "#C9848A", secondary: "#FAF3EB" } },
          }}
        />

        <Routes>
          {/* ── Public Routes with Navbar + Footer ── */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main style={{ minHeight: "calc(100vh - 70px)" }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />

          {/* ── Admin Routes (no Navbar/Footer) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ManageProducts />} />
                  <Route path="orders" element={<ManageOrders />} />
                </Routes>
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
