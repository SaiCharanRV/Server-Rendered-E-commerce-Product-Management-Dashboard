import DeleteButton from "./DeleteButton";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export default function ProductTable({ data }: { data: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Product Name</th>
            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Price</th>
            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Stock Status</th>
            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-8 text-center text-gray-500">
                No products found. Use the form above to add one.
              </td>
            </tr>
          ) : (
            data.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-900 font-medium capitalize">
                  {product.name}
                </td>
                <td className="p-4 text-gray-600 font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </td>
                <td className="p-4">
                  {/* Logic to change color based on stock quantity */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {/* We pass the specific Product ID to the button component */}
                  <DeleteButton id={product.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}