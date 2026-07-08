import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark)",
        color: "var(--cream)",
        padding: "60px 0 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            paddingBottom: "40px",
          }}
        >
          {/* Brand Column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                color: "var(--cream)",
                marginBottom: "12px",
              }}
            >
              Kashaf's <span style={{ color: "var(--rose-light)" }}>Kreations</span>
            </h3>
            <p style={{ color: "#C5A8A8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "20px" }}>
              Handcrafted with Heart, Worn with Love.
              <br />
              Each piece is made with care and creativity
              by Dure-e-Kashaf, Arifwala, Punjab.
            </p>
            {/* Social Links */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: <FiInstagram />, href: "https://instagram.com/kashafskreations", label: "Instagram" },
                { icon: <FiFacebook />, href: "https://facebook.com/kashafskreations", label: "Facebook" },
                { icon: <FaWhatsapp />, href: "https://wa.me/923001234567", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    color: "var(--cream)",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--rose)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "var(--gold-light)", fontFamily: "var(--font-display)", marginBottom: "20px", fontSize: "1.1rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Home", to: "/" },
                { label: "Shop All", to: "/products" },
                { label: "Crochet Items", to: "/products?category=crochet" },
                { label: "Jewellery", to: "/products?category=jewelry" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{ color: "#C5A8A8", fontSize: "0.9rem", transition: "var(--transition)" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--rose-light)")}
                    onMouseLeave={(e) => (e.target.style.color = "#C5A8A8")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "var(--gold-light)", fontFamily: "var(--font-display)", marginBottom: "20px", fontSize: "1.1rem" }}>
              Get In Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: <FiMapPin />, text: "Arifwala, Punjab, Pakistan" },
                { icon: <FiPhone />, text: "+92 300 123 4567" },         // 🔁 REPLACE with real number
                { icon: <FiMail />, text: "kashafskreations@gmail.com" }, // 🔁 REPLACE with real email
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--rose-light)", marginTop: "2px", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ color: "#C5A8A8", fontSize: "0.9rem" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h4 style={{ color: "var(--gold-light)", fontFamily: "var(--font-display)", marginBottom: "20px", fontSize: "1.1rem" }}>
              Payments & Shipping
            </h4>
            <p style={{ color: "#C5A8A8", fontSize: "0.9rem", lineHeight: 1.7 }}>
              We accept:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              {["💵 Cash on Delivery (COD)", "📱 EasyPaisa", "📱 JazzCash"].map((m) => (
                <span
                  key={m}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    color: "var(--cream)",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
            <p style={{ color: "#C5A8A8", fontSize: "0.85rem", marginTop: "14px" }}>
              🚚 Shipping across Punjab — Rs. 150 flat
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 0",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#8B6565", fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} Kashaf's Kreations · Made with 🌸 in Arifwala, Punjab
        </p>
      </div>
    </footer>
  );
}
