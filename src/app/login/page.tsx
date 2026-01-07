"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #dbeafe, #f3f4f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 25px 40px -12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#2563eb",
              letterSpacing: "-0.03em",
            }}
          >
            Admin Login
          </h1>
          <p
            style={{
              marginTop: "6px",
              color: "#4b5563",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "16px",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "white",
              padding: "14px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "16px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 6px 12px rgba(37,99,235,0.25)",
            }}
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        {/* Footer */}
        <div style={{ marginTop: "28px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Not an admin?{" "}
            <Link
              href="/"
              style={{
                color: "#2563eb",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              User Login
            </Link>
          </p>

          <p style={{ marginTop: "16px", fontSize: "12px", color: "#9ca3af" }}>
            Authorized Administrator Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
