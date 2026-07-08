import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import {
  FiShoppingBag,
  FiPackage,
  FiClock,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

const STATUS_COLORS = {
  Pending:    { bg: "#FFF3E0", color: "#E65100" },
  Confirmed:  { bg: "#E3F2FD", color: "#1565C0" },
  Processing: { bg: "#EDE7F6", color: "#4527A0" },
  Shipped:    { bg: "#E8F5E9", color: "#2E7D32" },
  Delivered:  { bg: "#F1F8E9", color: "#558B2F" },
  Cancelled:  { bg: "#FFEBEE", color: "#C62828" },
};

function StatCard({ icon, label, value, color }) {
  return (
    <div
      style={{
        background: "var(--white)",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: color + "20",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          color: color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "4px" }}>
          {label}
        </p>
        <p
          style={{
            fontSize: "1.6rem",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            color: "var(--dark)",
            lineHeight: 1,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("kashaf_admin_token");
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          axios.get("/api/orders/admin/stats", authHeaders),
          axios.get("/api/orders", authHeaders),
        ]);
        setStats(statsRes.data.stats);
        setRecentOrders(ordersRes.data.orders.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div style={{ maxWidth: "1100px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "4px" }}>
            Welcome back, Dure-e-Kashaf! 🌸
          </h1>
          <p>Here's what's happening in your shop today.</p>
        </div>

        {/* Stat Cards */}
        {loading ? (
          <div className="loader"><div className="spinner" /></div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <StatCard
                icon={<FiShoppingBag />}
                label="Total Orders"
                value={stats?.totalOrders ?? 0}
                color="var(--rose)"
              />
              <StatCard
                icon={<FiClock />}
                label="Pending Orders"
                value={stats?.pendingOrders ?? 0}
                color="#E65100"
              />
              <StatCard
                icon={<FiPackage />}
                label="Delivered"
                value={stats?.deliveredOrders ?? 0}
                color="#2E7D32"
              />
              <StatCard
                icon={<FiTrendingUp />}
                label="Total Revenue"
                value={`Rs. ${(stats?.totalRevenue ?? 0).toLocaleString()}`}
                color="var(--gold)"
              />
            </div>

            {/* Recent Orders Table */}
            <div
              style={{
                background: "var(--white)",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                  Recent Orders
                </h3>
                <button
                  onClick={() => navigate("/admin/orders")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--rose)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  View All <FiArrowRight />
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <div className="empty-state" style={{ padding: "40px" }}>
                  <div className="empty-icon">📦</div>
                  <h3>No orders yet</h3>
                  <p>Orders will appear here once customers start shopping!</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#F8F4F0" }}>
                        {["Order ID", "Customer", "Amount", "Payment", "Status", "Date"].map(
                          (h) => (
                            <th
                              key={h}
                              style={{
                                padding: "12px 16px",
                                textAlign: "left",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                color: "var(--text-light)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => {
                        const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Pending;
                        return (
                          <tr
                            key={order._id}
                            style={{ borderTop: "1px solid var(--border)" }}
                          >
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ fontSize: "0.82rem", color: "var(--rose)", fontWeight: 600 }}>
                                #{order._id.slice(-6).toUpperCase()}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <p style={{ fontSize: "0.88rem", color: "var(--dark)", fontWeight: 500 }}>
                                {order.customer.name}
                              </p>
                              <p style={{ fontSize: "0.75rem" }}>{order.customer.phone}</p>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}>
                                Rs. {order.totalAmount.toLocaleString()}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ fontSize: "0.82rem" }}>{order.paymentMethod}</span>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span
                                style={{
                                  background: sc.bg,
                                  color: sc.color,
                                  padding: "4px 10px",
                                  borderRadius: "50px",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                }}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ fontSize: "0.8rem" }}>
                                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
