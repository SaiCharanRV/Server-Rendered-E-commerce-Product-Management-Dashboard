import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

// This prevents the "OverwriteModelError" in Next.js development
export default models.Product || model("Product", ProductSchema);