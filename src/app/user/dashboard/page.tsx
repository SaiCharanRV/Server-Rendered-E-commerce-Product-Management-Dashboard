import { prisma } from "@/lib/prisma";
import { placeOrder } from "@/app/actions/orderActions";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header with Logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          Inventory Management
        </h1>
        <Link
          href="/"
          style={{
            display: "block",
            padding: "10px 24px",
            background: "#dc2626",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </Link>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Current Stock ({products.length} Items)
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
          maxWidth: "1200px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", height: "160px" }}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                  }}
                >
                  No Image
                </div>
              )}

              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  background: product.stock > 0 ? "#10b981" : "#ef4444",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {product.stock > 0 ? `In stock • ${product.stock}` : "Out of stock"}
              </span>
            </div>

            <div style={{ padding: "14px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "600" }}>
                {product.name}
              </h3>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "6px 0 12px",
                }}
              >
                ₹ {product.price.toLocaleString("en-IN")}
              </p>

              <form method="post" action={placeOrder}>
                <input type="hidden" name="productId" value={product.id} />
                <label
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={product.stock}
                  placeholder="Please enter quantity"
                  required
                  disabled={product.stock === 0}
                  style={{
                    width: "100%",
                    padding: "9px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    marginBottom: "10px",
                  }}
                />
                <button
                  type="submit"
                  disabled={product.stock === 0}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    border: "none",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "80px", color: "#9ca3af" }}>
          No products found.
        </p>
      )}
    </div>
  );
}