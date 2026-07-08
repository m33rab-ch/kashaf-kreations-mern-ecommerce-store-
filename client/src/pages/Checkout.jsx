import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

const PAKISTAN_DISTRICTS = [
  "Arifwala", "Pakpattan", "Sahiwal", "Lahore", "Faisalabad",
  "Multan", "Gujranwala", "Rawalpindi", "Islamabad", "Sialkot",
  "Bahawalpur", "Sargodha", "Sheikhupura", "Okara", "Kasur",
  "Vehari", "Khanewal", "Lodhran", "Bahawalnagar", "Rahim Yar Khan",
  "Other",
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingCost, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Customer
    name: "",
    email: "",
    phone: "",
    // Address
    street: "",
    city: "Arifwala",
    district: "Arifwala",
    // Payment
    paymentMethod: "COD",
    transactionId: "",
    accountNumber: "",
    // Note
    customerNote: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!form.name || !form.phone || !form.street || !form.city || !form.district) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.phone.length < 11) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if ((form.paymentMethod === "EasyPaisa" || form.paymentMethod === "JazzCash") && !form.transactionId) {
      toast.error(`Please enter your ${form.paymentMethod} transaction ID`);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          street: form.street,
          city: form.city,
          district: form.district,
          province: "Punjab",
        },
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        paymentMethod: form.paymentMethod,
        paymentDetails: {
          transactionId: form.transactionId,
          accountNumber: form.accountNumber,
        },
        customerNote: form.customerNote,
      };

      const res = await axios.post("/api/orders", orderData);
      clearCart();
      navigate(`/order-confirmation/${res.data.order._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <button onClick={() => navigate("/cart")} className="btn btn-outline" style={{ marginBottom: "32px" }}>
        <FiArrowLeft /> Back to Cart
      </button>

      <h1 style={{ marginBottom: "8px" }}>Checkout</h1>
      <p style={{ marginBottom: "40px" }}>Complete your order below 🌸</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }}>
        {/* LEFT: Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Customer Info */}
          <div style={{ background: "var(--white)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "20px" }}>Customer Information</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sara Ahmed" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label>Phone Number * <span style={{ color: "var(--text-light)", fontWeight: 400 }}>(WhatsApp preferred)</span></label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" type="tel" />
              </div>
              <div className="form-group">
                <label>Email <span style={{ color: "var(--text-light)", fontWeight: 400 }}>(optional)</span></label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="sara@email.com" type="email" />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={{ background: "var(--white)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "20px" }}>Shipping Address</h3>
            <div className="form-group">
              <label>Street Address / House No. *</label>
              <input name="street" value={form.street} onChange={handleChange} placeholder="e.g. House 12, Block A, Model Town" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label>City *</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Arifwala" />
              </div>
              <div className="form-group">
                <label>District *</label>
                <select name="district" value={form.district} onChange={handleChange}>
                  {PAKISTAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Province</label>
              <input value="Punjab" disabled style={{ background: "var(--cream)", color: "var(--text-light)" }} />
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ background: "var(--white)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "20px" }}>Payment Method</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {[
                { value: "COD", label: "💵 Cash on Delivery (COD)", desc: "Pay when you receive your order" },
                { value: "EasyPaisa", label: "📱 EasyPaisa", desc: "Send to: 0300-1234567 (Dure-e-Kashaf)" },  // 🔁 REPLACE number
                { value: "JazzCash", label: "📱 JazzCash", desc: "Send to: 0300-1234567 (Dure-e-Kashaf)" },    // 🔁 REPLACE number
              ].map((method) => (
                <label
                  key={method.value}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "16px",
                    borderRadius: "12px",
                    border: `2px solid ${form.paymentMethod === method.value ? "var(--rose)" : "var(--border)"}`,
                    background: form.paymentMethod === method.value ? "var(--rose-pale)" : "var(--cream)",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={handleChange}
                    style={{ marginTop: "3px", accentColor: "var(--rose)" }}
                  />
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--dark)", marginBottom: "2px" }}>{method.label}</p>
                    <p style={{ fontSize: "0.82rem" }}>{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* EasyPaisa / JazzCash extra fields */}
            {(form.paymentMethod === "EasyPaisa" || form.paymentMethod === "JazzCash") && (
              <div
                style={{
                  background: "var(--rose-pale)",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid var(--rose-light)",
                }}
              >
                <p style={{ fontWeight: 600, color: "var(--dark)", marginBottom: "12px", fontSize: "0.9rem" }}>
                  📌 Instructions:
                </p>
                <p style={{ fontSize: "0.85rem", marginBottom: "12px", lineHeight: 1.6 }}>
                  1. Send Rs. <strong>{total.toLocaleString()}</strong> to:{" "}
                  <strong>0300-1234567</strong> ({form.paymentMethod})<br />{/* 🔁 REPLACE */}
                  2. Enter the Transaction ID below
                </p>
                <div className="form-group" style={{ marginBottom: "12px" }}>
                  <label>Transaction ID *</label>
                  <input
                    name="transactionId"
                    value={form.transactionId}
                    onChange={handleChange}
                    placeholder="e.g. TXN123456789"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Your {form.paymentMethod} Number</label>
                  <input
                    name="accountNumber"
                    value={form.accountNumber}
                    onChange={handleChange}
                    placeholder="0300-0000000"
                    type="tel"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Note */}
          <div style={{ background: "var(--white)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px" }}>Order Note <span style={{ fontWeight: 400, fontSize: "0.9rem", color: "var(--text-light)" }}>(optional)</span></h3>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <textarea
                name="customerNote"
                value={form.customerNote}
                onChange={handleChange}
                placeholder="Any special requests, colour preferences, or gift messages..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "16px",
            padding: "28px",
            border: "1px solid var(--border)",
            position: "sticky",
            top: "calc(var(--nav-height) + 16px)",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "20px" }}>Your Order</h3>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--dark)" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "0.78rem" }}>x{item.quantity}</p>
                </div>
                <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--dark)" }}>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Shipping</span>
              <span>Rs. {shippingCost}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--dark)" }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--dark)" }}>
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem" }}
          >
            {loading ? "Placing Order..." : "Place Order 🌸"}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.75rem", marginTop: "14px", color: "var(--text-light)" }}>
            By placing your order, you agree to our terms. We'll contact you via WhatsApp to confirm.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
