"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// PROJECT REQUIREMENT: Strong input validation using Zod
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AddProductPage() {
  const [step, setStep] = useState(1); // PROJECT REQUIREMENT: Multi-step form
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: any) => {
    // This will send the data to your MongoDB via an API
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Product added successfully!");
      router.push("/dashboard/products");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Product - Step {step} of 2</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 ? (
          /* STEP 1: Basic Details */
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input {...register("name")} className="w-full p-2 border rounded" placeholder="e.g. Wireless Headphones" />
              {errors.name?.message && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select {...register("category")} className="w-full p-2 border rounded">
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <button type="button" onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-2 rounded">Next Step</button>
          </div>
        ) : (
          /* STEP 2: Inventory & Description */
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input type="number" {...register("price")} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                <input type="number" {...register("stock")} className="w-full p-2 border rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea {...register("description")} className="w-full p-2 border rounded" rows={4}></textarea>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 py-2 rounded">Back</button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Finish & Save</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}