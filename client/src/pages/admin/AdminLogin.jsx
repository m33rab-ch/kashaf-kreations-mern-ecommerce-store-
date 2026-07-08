import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", form);
      localStorage.setItem("kashaf_admin_token", res.data.token);
      localStorage.setItem("kashaf_admin_name", res.data.admin.name);
      toast.success(`Welcome back, ${res.data.admin.name}! 🌸`);
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F7ECEC 0%, #FAF3EB 50%, #F5EDD8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "var(--white)",
          borderRadius: "24px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
          border: "1px solid var(--border)",
          boxShadow: "0 20px 60px rgba(201,132,138,0.15)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🌸</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              color: "var(--dark)",
              marginBottom: "4px",
            }}
          >
            Kashaf's <span style={{ color: "var(--rose)" }}>Kreations</span>
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
            Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: "relative" }}>
              <FiMail
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-light)",
                }}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@kashafskreations.com"
                style={{ paddingLeft: "40px" }}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <FiLock
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-light)",
                }}
              />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{ paddingLeft: "40px", paddingRight: "44px" }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-light)",
                  padding: 0,
                  display: "flex",
                }}
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px",
              fontSize: "1rem",
              marginTop: "8px",
            }}
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.78rem",
            marginTop: "20px",
            color: "var(--text-light)",
          }}
        >
          🔒 Admin access only · Kashaf's Kreations
        </p>
      </div>
    </div>
  );
}
