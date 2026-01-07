import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from your .env.local file");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}