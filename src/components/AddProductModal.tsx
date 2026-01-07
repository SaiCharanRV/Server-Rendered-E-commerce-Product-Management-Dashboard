"use client";

import { useActionState, useState } from "react";
import { addProduct } from "@/app/actions/productActions";

export default function AddProductModal() {
  const [state, formAction, isPending] = useActionState(addProduct, null);
  // State for image preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Function to handle file selection and show preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-black">Add New Product</h2>
      
      <form action={formAction} className="flex flex-col gap-4">
        
        {/* --- NEW IMAGE UPLOAD FIELD --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            name="image" // Must match server action parameter
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {/* Image Preview */}
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-md" />
          )}
        </div>
        {/* ------------------------------ */}

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input name="name" type="text" placeholder="e.g. Tesla Model Y" required className="w-full border p-2 rounded text-black border-gray-300" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Price</label>
             <input name="price" type="number" step="0.01" placeholder="0.00" required className="w-full border p-2 rounded text-black border-gray-300" />
          </div>
          <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Stock</label>
             <input name="stock" type="number" placeholder="0" required className="w-full border p-2 rounded text-black border-gray-300" />
          </div>
        </div>


        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 mt-2"
        >
          {isPending ? "Uploading & Saving..." : "Add to Database"}
        </button>

        {state?.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
        {state?.success && <p className="text-green-600 text-sm text-center">Product Added Successfully!</p>}
      </form>
    </div>
  );
}