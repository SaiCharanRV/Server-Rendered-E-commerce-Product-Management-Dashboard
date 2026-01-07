"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // CHANGE: Changed "/login" to "/" to redirect to the home page (localhost:3000)
    router.push("/"); 
  };

  // Helper component to handle link logic and active states
  const NavLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        style={{
          display: "block",
          padding: "12px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          color: "white",
          fontSize: "16px",
          fontWeight: "500",
          background: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isActive ? "rgba(255, 255, 255, 0.2)" : "transparent";
        }}
      >
        {icon} {label}
      </Link>
    );
  };

  return (
    <aside
      style={{
        width: "256px",
        minHeight: "100vh",
        background: "#2563eb",
        color: "white",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: "0",
        top: "0",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
          Admin's Menu
        </h1>
      </div>

      <nav style={{ flex: "1", padding: "0 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <NavLink href="/dashboard" label="Overview" icon="📊" />
        <NavLink href="/dashboard/products" label="Products" icon="📦" />
        <NavLink href="/dashboard/orders" label="Orders" icon="🛒" />
        <NavLink href="/dashboard/onboard" label="Onboard Admin" icon="👤" />
      </nav>

      <div style={{ padding: "16px", marginTop: "auto" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            background: "#dc2626",
            color: "white",
            fontWeight: "bold",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background 0.2s",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#dc2626"; }}
        >
           Logout
        </button>
      </div>
    </aside>
  );
}