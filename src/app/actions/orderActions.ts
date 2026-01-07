"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function placeOrder(formData: FormData) {
  try {
    const productId = formData.get("productId") as string;
    const quantity = Number(formData.get("quantity"));

    console.log("Place Order - Product ID:", productId, "Quantity:", quantity);

    if (!productId || !quantity || quantity < 1) {
      throw new Error("Invalid order data");
    }

    // Check if product has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    console.log("Product found:", product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // Create order and reduce stock
    const result = await prisma.$transaction([
      prisma.order.create({
        data: {
          productId,
          quantity,
          status: "pending",
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: {
          stock: product.stock - quantity,
        },
      }),
    ]);

    console.log("Order created successfully:", result[0]);

    // Revalidate both user and admin pages
    revalidatePath("/user/dashboard");
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/orders");

    return;

  } catch (error) {
    console.error("Order placement error:", error);
    throw error;
  }
}

export async function markAsDelivered(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "delivered" },
  });

  revalidatePath("/dashboard/orders");
}