import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FiShoppingCart, FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";

const PLACEHOLDER = "https://placehold.co/600x600/F7ECEC/C9848A?text=Kashaf%27s+Kreations";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(() => navigate("/products"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loader" style={{ minHeight: "60vh" }}><div className="spinner" /></div>;
  if (!product) return null;

  const imgSrc = product.image
    ? product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`
    : PLACEHOLDER;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart! 🛍️`);
  };

  return (
    <div className="container section">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline"
        style={{ marginBottom: "32px", padding: "10px 20px" }}
      >
        <FiArrowLeft /> Back
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
        {/* Product Image */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--rose-pale)",
            aspectRatio: "1",
          }}
        >
          <img
            src={imgSrc}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = PLACEHOLDER; }}
          />
        </div>

        {/* Product Info */}
        <div>
          <span className="badge badge-rose" style={{ textTransform: "capitalize", marginBottom: "12px", display: "inline-block" }}>
            {product.category} · {product.subcategory}
          </span>

          <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>{product.name}</h1>

          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--dark)", fontWeight: 600 }}>
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <p style={{ lineHeight: 1.8, marginBottom: "24px", fontSize: "0.95rem" }}>
            {product.description}
          </p>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
              {product.tags.map((tag) => (
                <span key={tag} className="badge badge-rose" style={{ fontSize: "0.75rem" }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Stock */}
          <div style={{ marginBottom: "28px" }}>
            {product.stock > 0 ? (
              <span style={{ color: "#4CAF50", fontWeight: 600, fontSize: "0.9rem" }}>
                ✅ In Stock ({product.stock} available)
              </span>
            ) : (
              <span style={{ color: "#E53935", fontWeight: 600, fontSize: "0.9rem" }}>
                ❌ Out of Stock
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "10px", color: "var(--dark)" }}>
                Quantity
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "40px", height: "40px", border: "1.5px solid var(--border)",
                    borderRadius: "10px 0 0 10px", background: "var(--white)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", color: "var(--dark)",
                  }}
                >
                  <FiMinus />
                </button>
                <span
                  style={{
                    width: "60px", height: "40px", border: "1.5px solid var(--border)",
                    borderLeft: "none", borderRight: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 600, fontSize: "1rem", color: "var(--dark)",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  style={{
                    width: "40px", height: "40px", border: "1.5px solid var(--border)",
                    borderRadius: "0 10px 10px 0", background: "var(--white)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", color: "var(--dark)",
                  }}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{ flex: 1, justifyContent: "center", padding: "14px 24px", fontSize: "1rem" }}
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              className="btn btn-gold"
              onClick={() => { handleAddToCart(); navigate("/checkout"); }}
              disabled={product.stock === 0}
              style={{ flex: 1, justifyContent: "center", padding: "14px 24px", fontSize: "1rem" }}
            >
              Buy Now
            </button>
          </div>

          {/* Shipping Info */}
          <div
            style={{
              marginTop: "28px",
              padding: "16px",
              background: "var(--cream)",
              borderRadius: "12px",
              fontSize: "0.85rem",
              color: "var(--text-light)",
              lineHeight: 1.7,
            }}
          >
            🚚 <strong>Delivery:</strong> Punjab, Pakistan — Rs. 150 flat shipping<br />
            💳 <strong>Payment:</strong> COD · EasyPaisa · JazzCash<br />
            🎁 <strong>Packaging:</strong> Carefully packed with love
          </div>
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
