import { prisma } from "@/lib/prisma";
import OverviewChart from "@/components/OverviewChart";
import SalesChart from "@/components/SalesChart";

export default async function DashboardOverview() {
  // 1. Fetch products
  const products = await prisma.product.findMany({
    orderBy: { price: "desc" },
  });

  // 2. Fetch orders with product details
  const orders = await prisma.order.findMany({
    include: { product: true },
  });

  // 3. Calculate total revenue
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.product.price * order.quantity,
    0
  );

  // 4. Prepare sales data
  const salesByProduct = orders.reduce((acc, order) => {
    acc[order.product.name] = (acc[order.product.name] || 0) + order.quantity;
    return acc;
  }, {} as Record<string, number>);

  const salesChartData = Object.entries(salesByProduct).map(
    ([name, quantity]) => ({ name, quantity })
  );

  // 5. Metrics
  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalInventoryValue = products.reduce(
    (acc, p) => acc + p.price * p.stock,
    0
  );

  // 6. Pie chart data
  const productValues = products.map((p) => ({
    name: p.name,
    value: p.price * p.stock,
  }));

  const sortedByValue = [...productValues].sort(
    (a, b) => b.value - a.value
  );
  const top5ForChart = sortedByValue.slice(0, 5);
  const othersValue = sortedByValue
    .slice(5)
    .reduce((acc, curr) => acc + curr.value, 0);

  const chartData = [
    ...top5ForChart,
    ...(othersValue > 0 ? [{ name: "Others", value: othersValue }] : []),
  ];

  // 7. Top 5 assets
  const top5HighPriceAssets = products.slice(0, 5);

  return (
    <div
      style={{
        marginLeft: "256px",
        padding: "36px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        {/* Header */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            marginBottom: "28px",
            color: "#111827",
          }}
        >
          Dashboard Overview
        </h1>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <StatCard
            title="Total Inventory Cost"
            value={`₹${totalInventoryValue.toLocaleString("en-IN")}`}
            color="#2563eb"
          />
          <StatCard
            title="Total Units in Stock"
            value={totalUnits}
            color="#059669"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            color="#7c3aed"
          />
        </div>

        {/* Charts Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginBottom: "32px",
          }}
        >
          <OverviewChart data={chartData} />

          {/* Top Assets */}
          <div
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
                🏆 Top 5 High Value Assets
              </h2>
              <span
                style={{
                  fontSize: "12px",
                  background: "#f1f5f9",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontWeight: "600",
                }}
              >
                By Unit Price
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {top5HighPriceAssets.map((product, index) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #f1f5f9",
                    background: "#fafafa",
                  }}
                >
                  <div style={{ display: "flex", gap: "14px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#e0e7ff",
                        color: "#1e3a8a",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      #{index + 1}
                    </div>

                    <div>
                      <div style={{ fontWeight: "700" }}>{product.name}</div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        Stock: {product.stock} units
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "800" }}>
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      Unit Price
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <SalesChart data={salesChartData} />
      </div>
    </div>
  );
}

/* ---------- Small reusable stat card ---------- */
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: "700",
          textTransform: "uppercase",
          color,
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "32px", fontWeight: "800" }}>{value}</div>
    </div>
  );
}
