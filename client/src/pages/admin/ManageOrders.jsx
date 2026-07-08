import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
import { FiChevronDown, FiChevronUp, FiRefreshCw } from "react-icons/fi";

const ALL_STATUSES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_COLORS = {
  Pending:    { bg: "#FFF3E0", color: "#E65100" },
  Confirmed:  { bg: "#E3F2FD", color: "#1565C0" },
  Processing: { bg: "#EDE7F6", color: "#4527A0" },
  Shipped:    { bg: "#E8F5E9", color: "#2E7D32" },
  Delivered:  { bg: "#F1F8E9", color: "#558B2F" },
  Cancelled:  { bg: "#FFEBEE", color: "#C62828" },
};

function OrderRow({ order, onStatusUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [newStatus, setNewStatus] = useState(order.status);
  const [adminNote, setAdminNote] = useState(order.adminNote || "");
  const [saving, setSaving] = useState(false);
  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Pending;

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axios.put(
        `/api/orders/${order._id}/status`,
        { status: newStatus, adminNote },
        { headers: { Authorization: `Bearer ${localStorage.getItem("kashaf_admin_token")}` } }
      );
      toast.success("Order updated ✅");
      onStatusUpdate();
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Main Row */}
      <tr
        style={{ borderTop: "1px solid var(--border)", cursor: "pointer" }}
        onClick={() => setExpanded((e) => !e)}
      >
        <td style={{ padding: "14px 16px" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--rose)", fontWeight: 700 }}>
            #{order._id.slice(-6).toUpperCase()}
          </span>
        </td>
        <td style={{ padding: "14px 16px" }}>
          <p style={{ fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}>{order.customer.name}</p>
          <p style={{ fontSize: "0.75rem" }}>{order.customer.phone}</p>
        </td>
        <td style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: "0.82rem" }}>
            {order.shippingAddress.city}, {order.shippingAddress.district}
          </p>
        </td>
        <td style={{ padding: "14px 16px" }}>
          <p style={{ fontWeight: 600, color: "var(--dark)", whiteSpace: "nowrap" }}>
            Rs. {order.totalAmount.toLocaleString()}
          </p>
          <p style={{ fontSize: "0.75rem" }}>{order.paymentMethod}</p>
        </td>
        <td style={{ padding: "14px 16px" }}>
          <span style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "50px", fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
            {order.status}
          </span>
        </td>
        <td style={{ padding: "14px 16px" }}>
          <span style={{ fontSize: "0.8rem" }}>
            {new Date(order.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </td>
        <td style={{ padding: "14px 16px", color: "var(--text-light)" }}>
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </td>
      </tr>

      {/* Expanded Detail Row */}
      {expanded && (
        <tr style={{ background: "#FAFAFA" }}>
          <td colSpan={7} style={{ padding: "0" }}>
            <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>

                {/* Items */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark)", marginBottom: "10px" }}>
                    📦 Order Items
                  </h4>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                      <span>{item.name} × {item.quantity}</span>
                      <span style={{ fontWeight: 600 }}>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "8px", marginTop: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                      <span>Shipping</span><span>Rs. {order.shippingCost}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: "4px" }}>
                      <span>Total</span><span>Rs. {order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping & Payment */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark)", marginBottom: "10px" }}>
                    🚚 Shipping Details
                  </h4>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.district}<br />
                    Punjab, Pakistan
                  </p>
                  {order.customer.email && (
                    <p style={{ fontSize: "0.8rem", marginTop: "8px" }}>📧 {order.customer.email}</p>
                  )}

                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark)", marginTop: "14px", marginBottom: "6px" }}>
                    💳 Payment
                  </h4>
                  <p style={{ fontSize: "0.85rem" }}>{order.paymentMethod}</p>
                  {order.paymentDetails?.transactionId && (
                    <p style={{ fontSize: "0.8rem" }}>TXN: {order.paymentDetails.transactionId}</p>
                  )}
                  {order.customerNote && (
                    <div style={{ marginTop: "10px", padding: "10px", background: "var(--rose-pale)", borderRadius: "8px", fontSize: "0.82rem" }}>
                      💬 <strong>Customer Note:</strong> {order.customerNote}
                    </div>
                  )}
                </div>

                {/* Update Status */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark)", marginBottom: "10px" }}>
                    ✏️ Update Order
                  </h4>
                  <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "0.78rem" }}>Status</label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "0.78rem" }}>Admin Note (optional)</label>
                    <textarea
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="e.g. Dispatched via TCS, tracking #..."
                      style={{ minHeight: "70px", fontSize: "0.85rem" }}
                    />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleUpdate(); }}
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                  >
                    {saving ? "Saving..." : "Update Order"}
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function ManageOrders() {
  const token = localStorage.getItem("kashaf_admin_token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = filterStatus ? `/api/orders?status=${filterStatus}` : "/api/orders";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [filterStatus]);

  return (
    <AdminLayout>
      <div style={{ maxWidth: "1100px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "2px" }}>Orders</h1>
            <p>{orders.length} order{orders.length !== 1 ? "s" : ""} {filterStatus ? `· ${filterStatus}` : ""}</p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "10px", border: "1.5px solid var(--border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", outline: "none" }}
            >
              <option value="">All Orders</option>
              {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={fetchOrders}
              className="btn btn-outline"
              style={{ padding: "10px 16px" }}
              title="Refresh"
            >
              <FiRefreshCw />
            </button>
          </div>
        </div>

        {/* Status Summary Chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {ALL_STATUSES.map((s) => {
            const count = orders.filter((o) => o.status === s).length;
            if (count === 0) return null;
            const sc = STATUS_COLORS[s];
            return (
              <span key={s} style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "50px", fontSize: "0.78rem", fontWeight: 600 }}>
                {s}: {count}
              </span>
            );
          })}
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="loader"><div className="spinner" /></div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No orders found</h3>
            <p>Orders will appear here when customers place them!</p>
          </div>
        ) : (
          <div style={{ background: "var(--white)", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden" }}>
            <p style={{ padding: "12px 20px", fontSize: "0.78rem", color: "var(--text-light)", borderBottom: "1px solid var(--border)", background: "#F8F4F0" }}>
              💡 Click any row to expand order details and update status
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8F4F0" }}>
                    {["Order ID", "Customer", "Address", "Amount", "Status", "Date", ""].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <OrderRow key={order._id} order={order} onStatusUpdate={fetchOrders} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
