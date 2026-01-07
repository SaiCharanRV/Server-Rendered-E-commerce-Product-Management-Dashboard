import { prisma } from "@/lib/prisma";
import { deleteProduct, updateProduct } from "@/app/actions/productActions";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Fetches only active products on the server
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div 
      style={{ 
        marginLeft: "256px",
        padding: "32px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        Inventory Management
      </h1>

      <ProductForm />

      <div style={{ margin: "32px 0", borderBottom: "1px solid #e5e7eb" }} />

      <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#374151", marginBottom: "24px" }}>
        Current Stock ({products.length} Items)
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          maxWidth: "1400px",
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
            {/* PRODUCT IMAGE SECTION */}
            <div 
              style={{ 
                position: "relative", 
                width: "100%",
                paddingBottom: "56.25%",
                overflow: "hidden",
                background: "#f3f4f6"
              }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
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

              {/* STOCK STATUS BADGE */}
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

            {/* PRODUCT DETAILS SECTION */}
            <div style={{ padding: "14px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "600" }}>
                {product.name}
              </h3>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "6px 0 16px",
                  color: "#111827"
                }}
              >
                ₹ {product.price.toLocaleString("en-IN")}
              </p>

              {/* ADMIN ACTIONS: Clean Row for Edit and Delete */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "12px",
                  paddingTop: "12px",
                  borderTop: "1px solid #f3f4f6"
                }}
              >
                {/* DELETE BUTTON */}
                <form method="post" action={deleteProduct.bind(null, product.id)}>
                  <button
                    type="submit"
                    style={{
                      color: "#ef4444",
                      background: "none",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: "0",
                    }}
                  >
                    Delete Product
                  </button>
                </form>

                {/* EDIT BUTTON (Dropdown) */}
                <details key={`${product.id}-${product.price}-${product.stock}`}>
                  <summary
                    style={{
                      color: "#2563eb",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      listStyle: "none",
                    }}
                  >
                    Edit Details
                  </summary>

                  <div 
                    style={{ 
                      position: "absolute", 
                      zIndex: 10, 
                      background: "white", 
                      padding: "16px", 
                      borderRadius: "8px", 
                      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                      marginTop: "8px",
                      right: "14px",
                      width: "200px",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <form method="post" action={updateProduct.bind(null, product.id)}>
                      <div style={{ marginBottom: "10px" }}>
                        <label style={{ fontSize: "11px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Price (₹)</label>
                        <input
                          type="number"
                          name="price"
                          defaultValue={product.price}
                          required
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ fontSize: "11px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Stock Units</label>
                        <input
                          type="number"
                          name="stock"
                          defaultValue={product.stock}
                          required
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "8px",
                          background: "#2563eb",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "80px", color: "#9ca3af" }}>
          No active products found.
        </p>
      )}
    </div>
  );
}