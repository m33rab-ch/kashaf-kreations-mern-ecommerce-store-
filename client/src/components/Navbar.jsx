import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-height)",
          background: scrolled
            ? "rgba(250,243,235,0.96)"
            : "rgba(250,243,235,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "var(--transition)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--dark)",
              letterSpacing: "0.02em",
            }}
          >
            Kashaf's{" "}
            <span style={{ color: "var(--rose)" }}>Kreations</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "32px",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: isActive(link.to) ? 600 : 400,
                    color: isActive(link.to) ? "var(--rose)" : "var(--text)",
                    borderBottom: isActive(link.to)
                      ? "2px solid var(--rose)"
                      : "2px solid transparent",
                    paddingBottom: "2px",
                    transition: "var(--transition)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side: Cart + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Cart Icon */}
            <button
              onClick={() => navigate("/cart")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: "8px",
                color: "var(--dark)",
                fontSize: "1.3rem",
                display: "flex",
              }}
              aria-label="Cart"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "var(--rose)",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.4rem",
                color: "var(--dark)",
                display: "none",
                padding: "4px",
              }}
              className="hamburger"
              aria-label="Menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-height)",
            left: 0,
            right: 0,
            background: "var(--cream)",
            zIndex: 999,
            borderBottom: "1px solid var(--border)",
            padding: "24px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "20px" }}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "1.1rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: isActive(link.to) ? 600 : 400,
                    color: isActive(link.to) ? "var(--rose)" : "var(--dark)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div style={{ height: "var(--nav-height)" }} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
