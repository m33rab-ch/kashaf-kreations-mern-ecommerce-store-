import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from "react-icons/fi";

const PLACEHOLDER = "https://placehold.co/100x100/F7ECEC/C9848A?text=Item";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, subtotal, shippingCost, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state" style={{ paddingTop: "80px" }}>
          <div className="empty-icon"><FiShoppingBag style={{ fontSize: "3rem", color: "var(--rose)" }} /></div>
          <h3 style={{ marginBottom: "12px" }}>Your cart is empty</h3>
          <p style={{ marginBottom: "24px" }}>Add some beautiful pieces to your cart 🌸</p>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            Shop Now <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: "8px" }}>Shopping Cart</h1>
      <p style={{ marginBottom: "40px" }}>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "32px", alignItems: "start" }}>
        {/* Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cartItems.map((item) => {
            const imgSrc = item.image
              ? item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`
              : PLACEHOLDER;

            return (
              <div
                key={item._id}
                style={{
                  background: "var(--white)",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                {/* Image */}
                <img
                  src={imgSrc}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "12px", background: "var(--rose-pale)" }}
                  onError={(e) => { e.target.src = PLACEHOLDER; }}
                />

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--rose)", textTransform: "capitalize", marginBottom: "2px" }}>
                    {item.subcategory}
                  </p>
                  <h3 style={{ fontSize: "1rem", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{item.name}</h3>
                  <p style={{ fontWeight: 600, color: "var(--dark)" }}>Rs. {item.price.toLocaleString()}</p>
                </div>

                {/* Quantity */}
                <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    style={{
                      width: "34px", height: "34px", border: "1.5px solid var(--border)",
                      borderRadius: "8px 0 0 8px", background: "var(--cream)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark)",
                    }}
                  >
                    <FiMinus size={12} />
                  </button>
                  <span
                    style={{
                      width: "44px", height: "34px", border: "1.5px solid var(--border)",
                      borderLeft: "none", borderRight: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 600, fontSize: "0.9rem",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    style={{
                      width: "34px", height: "34px", border: "1.5px solid var(--border)",
                      borderRadius: "0 8px 8px 0", background: "var(--cream)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark)",
                    }}
                  >
                    <FiPlus size={12} />
                  </button>
                </div>

                {/* Item Total */}
                <div style={{ minWidth: "100px", textAlign: "right" }}>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--dark)" }}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-light)", padding: "8px", borderRadius: "8px",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E53935")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-light)")}
                >
                  <FiTrash2 />
                </button>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
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
          <h3 style={{ marginBottom: "24px", fontFamily: "var(--font-display)" }}>Order Summary</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Shipping (Punjab)</span>
              <span style={{ fontWeight: 600 }}>Rs. {shippingCost}</span>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "var(--dark)", fontSize: "1rem" }}>Total</span>
              <span style={{ fontWeight: 700, color: "var(--dark)", fontSize: "1.1rem" }}>
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/checkout")}
            style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "1rem" }}
          >
            Proceed to Checkout <FiArrowRight />
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/products")}
            style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}
          >
            Continue Shopping
          </button>

          <p style={{ textAlign: "center", fontSize: "0.78rem", marginTop: "16px", color: "var(--text-light)" }}>
            💳 COD · EasyPaisa · JazzCash
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
