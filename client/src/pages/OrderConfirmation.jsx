import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiCheckCircle, FiHome, FiShoppingBag } from "react-icons/fi";

export default function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/orders/${id}`)
      .then((res) => setOrder(res.data.order))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loader" style={{ minHeight: "60vh" }}><div className="spinner" /></div>;
  if (!order) return null;

  return (
    <div className="container section" style={{ maxWidth: "640px", textAlign: "center" }}>
      {/* Success Icon */}
      <div style={{ animation: "fadeUp 0.6s ease" }}>
        <div style={{ fontSize: "4rem", marginBottom: "16px", color: "var(--rose)" }}>
          <FiCheckCircle />
        </div>
        <h1 style={{ marginBottom: "12px" }}>Order Placed! 🌸</h1>
        <p style={{ fontSize: "1rem", marginBottom: "8px" }}>
          Thank you, <strong>{order.customer.name}</strong>!
        </p>
        <p style={{ marginBottom: "8px" }}>
          Your order has been received. Dure-e-Kashaf will contact you on{" "}
          <strong>{order.customer.phone}</strong> via WhatsApp to confirm.
        </p>
        <p style={{ color: "var(--text-light)", fontSize: "0.85rem", marginBottom: "36px" }}>
          Order ID: <strong style={{ color: "var(--rose)" }}>#{id.slice(-8).toUpperCase()}</strong>
        </p>

        {/* Order Summary Card */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "16px",
            padding: "28px",
            border: "1px solid var(--border)",
            textAlign: "left",
            marginBottom: "28px",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "20px" }}>Order Details</h3>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--dark)" }}>
                  {item.name} × {item.quantity}
                </span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>Shipping</span>
              <span>Rs. {order.shippingCost}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
              <strong style={{ color: "var(--dark)" }}>Total Paid</strong>
              <strong style={{ color: "var(--dark)", fontSize: "1.05rem" }}>Rs. {order.totalAmount.toLocaleString()}</strong>
            </div>
          </div>

          {/* Shipping Info */}
          <div style={{ marginTop: "20px", padding: "14px", background: "var(--cream)", borderRadius: "10px" }}>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--dark)", marginBottom: "4px" }}>
              📦 Shipping To:
            </p>
            <p style={{ fontSize: "0.85rem" }}>
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.district}, Punjab
            </p>
          </div>

          {/* Payment */}
          <div style={{ marginTop: "12px", padding: "14px", background: "var(--cream)", borderRadius: "10px" }}>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--dark)", marginBottom: "4px" }}>
              💳 Payment: {order.paymentMethod}
            </p>
            {order.paymentDetails?.transactionId && (
              <p style={{ fontSize: "0.85rem" }}>
                Transaction ID: {order.paymentDetails.transactionId}
              </p>
            )}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/923001234567?text=Hi! I just placed an order on Kashaf's Kreations. Order ID: #${id.slice(-8).toUpperCase()}`}
          /* 🔁 REPLACE number above */
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#25D366",
            color: "white",
            padding: "12px 24px",
            borderRadius: "50px",
            fontWeight: 500,
            marginBottom: "16px",
            transition: "var(--transition)",
          }}
        >
          💬 Message Us on WhatsApp
        </a>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
          <button className="btn btn-outline" onClick={() => navigate("/")}>
            <FiHome /> Home
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            <FiShoppingBag /> Shop More
          </button>
        </div>
      </div>
    </div>
  );
}
