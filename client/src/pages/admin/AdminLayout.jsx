import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <FiGrid /> },
  { label: "Products", to: "/admin/products", icon: <FiPackage /> },
  { label: "Orders", to: "/admin/orders", icon: <FiShoppingBag /> },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = localStorage.getItem("kashaf_admin_name") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("kashaf_admin_token");
    localStorage.removeItem("kashaf_admin_name");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  const Sidebar = () => (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--dark)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--cream)",
            fontSize: "1.3rem",
            marginBottom: "4px",
          }}
        >
          Kashaf's{" "}
          <span style={{ color: "var(--rose-light)" }}>Kreations</span>
        </h2>
        <p style={{ fontSize: "0.75rem", color: "#8B6565" }}>Admin Panel</p>
      </div>

      {/* Admin Info */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--rose)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            {adminName[0]}
          </div>
          <div>
            <p
              style={{
                color: "var(--cream)",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {adminName}
            </p>
            <p style={{ color: "#8B6565", fontSize: "0.72rem" }}>
              Shop Owner
            </p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "10px",
              marginBottom: "4px",
              color: isActive(item.to) ? "var(--cream)" : "#8B6565",
              background: isActive(item.to)
                ? "rgba(201,132,138,0.25)"
                : "transparent",
              fontSize: "0.9rem",
              fontWeight: isActive(item.to) ? 600 : 400,
              transition: "var(--transition)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.to)) {
                e.currentTarget.style.color = "var(--cream)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.to)) {
                e.currentTarget.style.color = "#8B6565";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <span style={{ fontSize: "1rem" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 14px",
            borderRadius: "10px",
            width: "100%",
            background: "none",
            border: "none",
            color: "#8B6565",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#E57373";
            e.currentTarget.style.background = "rgba(229,115,115,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#8B6565";
            e.currentTarget.style.background = "none";
          }}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      <div className="admin-sidebar-desktop">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 998,
            }}
          />
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 999,
              animation: "fadeIn 0.2s ease",
            }}
          >
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Bar */}
        <header
          style={{
            background: "var(--white)",
            borderBottom: "1px solid var(--border)",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <button
            className="admin-hamburger"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.3rem",
              color: "var(--dark)",
              display: "none",
            }}
          >
            <FiMenu />
          </button>

          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                color: "var(--dark)",
              }}
            >
              {NAV_ITEMS.find((n) => n.to === location.pathname)?.label ||
                "Admin"}
            </h2>
          </div>

          <Link
            to="/"
            target="_blank"
            style={{
              fontSize: "0.82rem",
              color: "var(--rose)",
              fontWeight: 500,
            }}
          >
            View Shop ↗
          </Link>
        </header>

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            padding: "28px 24px",
            background: "#F8F4F0",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
