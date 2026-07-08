import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiStar, FiPackage } from "react-icons/fi";

export default function About() {
  return (
    <div>
      <div className="page-hero">
        <h1>Our Story</h1>
        <div className="divider" />
        <p>Made with love, from Arifwala to you 🌸</p>
      </div>

      <div className="container section">
        {/* Main Story */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          {/* Photo placeholder — 🔁 Replace with Kashaf's actual photo */}
          <div
            style={{
              background: "linear-gradient(135deg, #F7ECEC, #C9848A)",
              borderRadius: "24px",
              height: "460px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "5rem" }}>👩‍🎨</span>
            <p style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
              Dure-e-Kashaf
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>
              🔁 Replace with your photo
            </p>
          </div>

          <div>
            <span className="badge badge-rose" style={{ marginBottom: "16px", display: "inline-block" }}>
              👋 Meet the Maker
            </span>
            <h2 style={{ marginBottom: "20px" }}>Hi, I'm Dure-e-Kashaf!</h2>
            <p style={{ lineHeight: 1.9, marginBottom: "16px" }}>
              I'm a 15-year-old girl from Arifwala, Punjab, with a huge love for all things
              handmade and crafty. I started crocheting when I was just 13 — first it was just
              little keychains for my friends, then bags, scrunchies, and soon I was hooked! 🧶
            </p>
            <p style={{ lineHeight: 1.9, marginBottom: "16px" }}>
              I also design and curate beautiful artificial jewellery — earrings, necklaces,
              bracelets, and rings — pieces that are affordable, trendy, and unique.
              Each piece is selected or crafted with careful attention to detail.
            </p>
            <p style={{ lineHeight: 1.9, marginBottom: "28px" }}>
              <strong style={{ color: "var(--dark)" }}>Kashaf's Kreations</strong> is my small
              startup and my big dream. Every order means the world to me, and I pour my heart
              into every single piece I make. 💖
            </p>
            <Link to="/products" className="btn btn-primary">
              Shop My Creations <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Values */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "8px" }}>Why Kashaf's Kreations?</h2>
          <div className="divider" />
        </div>

        <div className="grid-3" style={{ marginBottom: "80px" }}>
          {[
            {
              icon: <FiHeart style={{ fontSize: "2rem", color: "var(--rose)" }} />,
              title: "Made with Love",
              desc: "Every single item is made or carefully chosen by me personally. You'll never get a generic, mass-produced piece.",
            },
            {
              icon: <FiStar style={{ fontSize: "2rem", color: "var(--gold)" }} />,
              title: "Unique & Aesthetic",
              desc: "Trendy, feminine, and one-of-a-kind. Perfect for gifting or treating yourself. Each piece is designed to be special.",
            },
            {
              icon: <FiPackage style={{ fontSize: "2rem", color: "var(--rose)" }} />,
              title: "Careful Packaging",
              desc: "Every order is packaged with care and love. Your order arrives safely and beautifully presented. 🎁",
            },
          ].map((val) => (
            <div
              key={val.title}
              style={{
                background: "var(--white)",
                borderRadius: "20px",
                padding: "36px 28px",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: "16px" }}>{val.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "12px" }}>{val.title}</h3>
              <p style={{ lineHeight: 1.7 }}>{val.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--rose-pale), var(--cream-dark))",
            borderRadius: "24px",
            padding: "60px 48px",
            textAlign: "center",
            border: "1px solid var(--border)",
          }}
        >
          <h2 style={{ marginBottom: "12px" }}>Let's create something beautiful together 🌸</h2>
          <p style={{ marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Browse my shop and find something that speaks to your heart.
            Custom orders are also welcome — just message me!
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/products" className="btn btn-primary">Shop Now <FiArrowRight /></Link>
            <Link to="/contact" className="btn btn-outline">Contact Me</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
