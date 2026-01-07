// This component represents one single product card
import Image from "next/image";
import DeleteButton from "./DeleteButton";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null; // imageUrl might be null for old products
}

export default function ProductCard({ id, name, price, stock, imageUrl }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{name}</h3>
        
        <div className="mt-auto flex items-center justify-between">
           <div>
             <p className="text-xl font-extrabold text-blue-600">₹{price.toLocaleString()}</p>
             <p className="text-sm text-gray-500 mt-1">Stock: {stock}</p>
           </div>
           {/* Using existing DeleteButton component */}
           <DeleteButton id={id} />
        </div>
      </div>
    </div>
  );
}