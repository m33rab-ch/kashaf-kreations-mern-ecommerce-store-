import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

// Placeholder image while real images are loaded
const PLACEHOLDER = "https://placehold.co/400x400/F7ECEC/C9848A?text=Kashaf%27s+Kreations";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛍️`);
  };

  const imgSrc = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`
    : PLACEHOLDER;

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      style={{
        background: "var(--white)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        cursor: "pointer",
        transition: "var(--transition)",
        boxShadow: "0 2px 12px rgba(61,32,32,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,132,138,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(61,32,32,0.06)";
      }}
    >
      {/* Product Image */}
      <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden", background: "var(--rose-pale)" }}>
        <img
          src={imgSrc}
          alt={product.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />

        {/* Featured Badge */}
        {product.isFeatured && (
          <span
            className="badge badge-gold"
            style={{ position: "absolute", top: "12px", left: "12px" }}
          >
            ⭐ Featured
          </span>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(61,32,32,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>Sold Out</span>
          </div>
        )}

        {/* Hover: Quick View overlay */}
        <div
          className="quick-view-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(61,32,32,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "var(--transition)",
          }}
        >
          <span style={{ color: "white", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem" }}>
            <FiEye /> View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--rose)", textTransform: "capitalize", marginBottom: "4px" }}>
          {product.subcategory}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "var(--dark)",
            marginBottom: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </h3>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, color: "var(--dark)", fontSize: "1rem" }}>
            Rs. {product.price.toLocaleString()}
          </span>

          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{ padding: "8px 16px", fontSize: "0.8rem" }}
          >
            <FiShoppingCart style={{ fontSize: "0.9rem" }} />
            Add
          </button>
        </div>
      </div>

      <style>{`
        div:hover .quick-view-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
