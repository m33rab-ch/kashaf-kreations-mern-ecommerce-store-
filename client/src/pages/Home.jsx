import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { FiArrowRight, FiHeart, FiPackage, FiTruck } from "react-icons/fi";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/products/featured")
      .then((res) => setFeatured(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "88vh",
          background: "linear-gradient(135deg, #F7ECEC 0%, #FAF3EB 40%, #F5EDD8 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,132,138,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "10%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          {/* Left: Text */}
          <div style={{ animation: "fadeUp 0.8s ease both" }}>
            <span className="badge badge-rose" style={{ marginBottom: "20px", display: "inline-block" }}>
              🌸 Handmade in Arifwala, Punjab
            </span>
            <h1 style={{ marginBottom: "20px", lineHeight: 1.15 }}>
              Handcrafted with Heart,{" "}
              <em style={{ color: "var(--rose)", fontStyle: "italic" }}>Worn with Love</em>
            </h1>
            <p style={{ fontSize: "1.05rem", marginBottom: "36px", maxWidth: "440px", lineHeight: 1.8 }}>
              Discover unique crochet bags, keychains, scrunchies, and gorgeous
              artificial jewellery — each piece lovingly made by Dure-e-Kashaf.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => navigate("/products")}>
                Shop Now <FiArrowRight />
              </button>
              <button className="btn btn-outline" onClick={() => navigate("/about")}>
                Our Story
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "32px", marginTop: "48px" }}>
              {[
                { num: "100%", label: "Handmade" },
                { num: "50+", label: "Products" },
                { num: "❤️", label: "Made with Love" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--dark)" }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero Image Placeholder */}
          <div
            style={{
              animation: "fadeUp 0.8s 0.2s ease both",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "12px",
              height: "480px",
            }}
          >
            {/* 🔁 REPLACE these with actual product images */}
            {[
              { bg: "#E8C4C7", label: "Crochet Bag", emoji: "👜", rowSpan: true },
              { bg: "#F0E6D8", label: "Earrings", emoji: "💎" },
              { bg: "#FAF3EB", label: "Keychain", emoji: "🔑" },
              { bg: "#E8D5A0", label: "Necklace", emoji: "📿" },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: card.bg,
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  gridRow: card.rowSpan ? "span 2" : undefined,
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "var(--transition)",
                }}
                onClick={() => navigate("/products")}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <span>{card.emoji}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text)", marginTop: "8px" }}>
                  {card.label}
                </span>
                <span style={{ fontSize: "0.65rem", color: "var(--rose)", marginTop: "2px" }}>
                  Add image here
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────────────────── */}
      <section style={{ background: "var(--dark)", padding: "28px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
            {[
              { icon: <FiHeart />, text: "100% Handmade" },
              { icon: <FiPackage />, text: "Careful Packaging" },
              { icon: <FiTruck />, text: "Punjab Delivery — Rs. 150" },
              { icon: "💳", text: "COD · EasyPaisa · JazzCash" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--cream)" }}>
                <span style={{ color: "var(--rose-light)", fontSize: "1.1rem" }}>{f.icon}</span>
                <span style={{ fontSize: "0.9rem" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <div className="divider" />
            <p>Explore our handcrafted collections</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            {/* Crochet Category Card */}
            <Link to="/products?category=crochet">
              <div
                style={{
                  background: "linear-gradient(135deg, #F7ECEC, #E8C4C7)",
                  borderRadius: "20px",
                  padding: "48px 32px",
                  textAlign: "center",
                  border: "1px solid var(--border)",
                  transition: "var(--transition)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(201,132,138,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🧶</div>
                <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "8px" }}>Crochet</h3>
                <p style={{ fontSize: "0.85rem" }}>Bags · Keychains · Scrunchies</p>
                <span className="btn btn-primary" style={{ marginTop: "20px", display: "inline-flex" }}>
                  View All <FiArrowRight />
                </span>
              </div>
            </Link>

            {/* Jewelry Category Card */}
            <Link to="/products?category=jewelry">
              <div
                style={{
                  background: "linear-gradient(135deg, #FBF5E6, #E8D5A0)",
                  borderRadius: "20px",
                  padding: "48px 32px",
                  textAlign: "center",
                  border: "1px solid #E8D5A0",
                  transition: "var(--transition)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(201,168,76,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💎</div>
                <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "8px" }}>Jewellery</h3>
                <p style={{ fontSize: "0.85rem" }}>Earrings · Necklaces · Bracelets · Rings</p>
                <span className="btn btn-gold" style={{ marginTop: "20px", display: "inline-flex" }}>
                  View All <FiArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="section-title">
            <h2>Featured Pieces</h2>
            <div className="divider" />
            <p>Our most loved creations 🌸</p>
          </div>

          {loading ? (
            <div className="loader"><div className="spinner" /></div>
          ) : featured.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌸</div>
              <h3>Products coming soon!</h3>
              <p>Dure-e-Kashaf is busy crafting beautiful pieces.</p>
            </div>
          ) : (
            <div className="grid-4">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button className="btn btn-outline" onClick={() => navigate("/products")}>
              View All Products <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ─────────────────────────────────────────── */}
      <section
        className="section"
        style={{ background: "linear-gradient(135deg, var(--rose-pale), var(--cream-dark))" }}
      >
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          {/* Image placeholder — 🔁 Replace with actual photo */}
          <div
            style={{
              background: "linear-gradient(135deg, #E8C4C7, #C9848A)",
              borderRadius: "24px",
              height: "360px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "4rem" }}>👩‍🎨</span>
            <p style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
              Dure-e-Kashaf's Photo Here
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>🔁 Replace with real image</p>
          </div>

          {/* Text */}
          <div>
            <span className="badge badge-rose" style={{ marginBottom: "16px", display: "inline-block" }}>
              Our Story
            </span>
            <h2 style={{ marginBottom: "20px" }}>Made by Dure-e-Kashaf,<br />Made with Love 🌸</h2>
            <p style={{ marginBottom: "16px", lineHeight: 1.8 }}>
              Hi! I'm Dure-e-Kashaf, a 15-year-old girl from Arifwala, Punjab,
              with a passion for handmade art. What started as a hobby of crocheting
              for my friends and family grew into Kashaf's Kreations.
            </p>
            <p style={{ marginBottom: "28px", lineHeight: 1.8 }}>
              Every piece I make is crafted with care, creativity, and love.
              From crochet bags to delicate jewellery, each item is unique — just like you.
            </p>
            <Link to="/about" className="btn btn-primary">
              Read Our Story <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
