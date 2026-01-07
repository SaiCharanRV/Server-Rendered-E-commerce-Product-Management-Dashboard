"use client";
import { useState } from "react";

export default function OnboardPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Processing...");

    try {
      const res = await fetch("/api/admin/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Success! New admin created.");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage("❌ Error: Email may already be registered.");
      }
    } catch (error) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginLeft: "256px", // ✅ aligns with sidebar
        padding: "40px",
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Onboard New Admin
        </h2>

        <form onSubmit={handleOnboard}>
          <input
            type="text"
            placeholder="Full Name"
            required
            disabled={loading}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            disabled={loading}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Set Password"
            required
            disabled={loading}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "white",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: message.startsWith("✅") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
