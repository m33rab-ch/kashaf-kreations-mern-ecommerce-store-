import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <div>
      <div className="page-hero">
        <h1>Get In Touch</h1>
        <div className="divider" />
        <p>We'd love to hear from you 🌸</p>
      </div>

      <div className="container section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
          {/* Left: Contact Info */}
          <div>
            <h2 style={{ marginBottom: "12px" }}>Say Hello! 👋</h2>
            <p style={{ lineHeight: 1.8, marginBottom: "36px" }}>
              Have a question? Want to place a custom order? Or just want to chat
              about crochet and jewellery? I'm always happy to hear from you!
              The best way to reach me is via WhatsApp.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
              {[
                { icon: <FiMapPin />, label: "Location", value: "Arifwala, Punjab, Pakistan" },
                { icon: <FiPhone />, label: "WhatsApp / Phone", value: "+92 300 123 4567" },          // 🔁 REPLACE
                { icon: <FiMail />, label: "Email", value: "kashafskreations@gmail.com" },            // 🔁 REPLACE
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--rose-pale)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--rose)",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--dark)", fontSize: "0.85rem", marginBottom: "2px" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px" }}>Follow Along</h3>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/923001234567", color: "#25D366" },     // 🔁 REPLACE
                { icon: <FiInstagram />, label: "Instagram", href: "https://instagram.com/kashafskreations", color: "#E1306C" }, // 🔁 REPLACE
                { icon: <FiFacebook />, label: "Facebook", href: "https://facebook.com/kashafskreations", color: "#1877F2" },   // 🔁 REPLACE
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "50px",
                    border: "2px solid var(--border)",
                    color: "var(--dark)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.color;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = s.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--dark)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>

            {/* Custom Order Note */}
            <div
              style={{
                marginTop: "36px",
                background: "linear-gradient(135deg, var(--rose-pale), var(--cream-dark))",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid var(--rose-light)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "10px", fontSize: "1.2rem" }}>
                🎨 Custom Orders Welcome!
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                Want a specific colour crochet bag? A custom jewellery set for a wedding?
                I love custom orders! Message me on WhatsApp with your idea and
                let's make it happen. 🌸
              </p>
            </div>
          </div>

          {/* Right: WhatsApp CTA + Quick Info */}
          <div>
            <div
              style={{
                background: "var(--white)",
                borderRadius: "20px",
                padding: "40px",
                border: "1px solid var(--border)",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💬</div>
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "12px" }}>
                Chat on WhatsApp
              </h3>
              <p style={{ marginBottom: "24px", lineHeight: 1.7 }}>
                The fastest way to reach me is WhatsApp!
                I usually reply within a few hours. 🌸
              </p>
              <a
                href="https://wa.me/923001234567?text=Hi Kashaf! I have a question about your products."
                // 🔁 REPLACE with real number
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#25D366",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "50px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  transition: "var(--transition)",
                }}
              >
                <FaWhatsapp style={{ fontSize: "1.2rem" }} />
                Message on WhatsApp
              </a>
            </div>

            {/* Hours */}
            <div
              style={{
                background: "var(--white)",
                borderRadius: "16px",
                padding: "28px",
                border: "1px solid var(--border)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px", fontSize: "1.1rem" }}>
                ⏰ Response Hours
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { day: "Mon – Fri", time: "3 PM – 9 PM" },
                  { day: "Saturday", time: "10 AM – 9 PM" },
                  { day: "Sunday", time: "12 PM – 8 PM" },
                ].map((h) => (
                  <div
                    key={h.day}
                    style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}
                  >
                    <span style={{ color: "var(--text-light)" }}>{h.day}</span>
                    <span style={{ fontWeight: 600, color: "var(--dark)" }}>{h.time}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.8rem", marginTop: "14px", color: "var(--text-light)" }}>
                * School days may delay responses. I'll always reply as soon as I can! 😊
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
