// This component holds all the cards in a grid layout
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  createdAt: Date;
}

export default function ProductGrid({ data }: { data: Product[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No products found. Add your first one!</p>
      </div>
    );
  }

  // 🔒 FORCE EXACTLY 2 COLUMNS
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          stock={product.stock}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
}
