"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setError("");

    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Validate email format
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please login.");
        router.push("/");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
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
      <div style={{ width: "100%", maxWidth: "448px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            padding: "32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#2563eb",
                letterSpacing: "-0.025em",
              }}
            >
              Create Account
            </h1>
            <p
              style={{
                marginTop: "8px",
                color: "#4b5563",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Join AdminDash today
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Name Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                disabled={loading}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                disabled={loading}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                disabled={loading}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                disabled={loading}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button - BLUE THEME */}
            <button
              onClick={handleRegister}
              disabled={loading}
              style={{
                width: "100%",
                display: "block",
                background: loading ? "#93c5fd" : "#2563eb",
                color: "white",
                padding: "12px 16px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          {/* Login Link */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              Already have an account?{" "}
              <Link
                href="/"
                style={{
                  color: "#2563eb",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}