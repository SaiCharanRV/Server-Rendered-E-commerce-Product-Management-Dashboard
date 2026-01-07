'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import cloudinary from '@/lib/cloudinary'; // Importing the configured instance

export async function addProduct(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const priceString = formData.get("price") as string
  const stockString = formData.get("stock") as string
  
  const imageFile = formData.get("image") as File;

  if (!name || !priceString || !stockString || !imageFile || imageFile.size === 0) {
    throw new Error("Please fill in all fields and select an image.")
  }

  try {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { tags: ['product_image'], folder: 'dashboard_products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const price = parseFloat(priceString)
    const stock = parseInt(stockString)

    await prisma.product.create({
      data: {
        name,
        price,
        stock,
        imageUrl,
      },
    })

    revalidatePath("/dashboard/products")
    revalidatePath("/dashboard")

    return

  } catch (error) {
    console.error("Upload/Database Error:", error)
    throw new Error("Failed to upload image or save product.")
  }
}

// Server action wrapper with signature (formData: FormData) => void
export async function addProductAction(formData: FormData) {
  return await addProduct(null, formData);
}

export async function deleteProduct(productId: string) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { isActive: false,stock: 0 },
    })
    
    revalidatePath("/dashboard/products")
    revalidatePath("/dashboard")
    return

  } catch (error) {
    console.error("Delete Error:", error)
    throw new Error("Failed to delete product")
  }
}

/* =====================================================
   ✅ UPDATE PRODUCT (PRICE + STOCK) — FIXED
   ===================================================== */

export async function updateProduct(
  productId: string,
  formData: FormData
) {
  const price = Number(formData.get("price"))
  const stock = Number(formData.get("stock"))

  if (isNaN(price) || isNaN(stock)) {
    throw new Error("Invalid price or stock value")
  }

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        price,
        stock,
      },
    })

    // Revalidate cache
    revalidatePath("/dashboard/products")
    revalidatePath("/dashboard")

    return

  } catch (error) {
    console.error("Update Error:", error)
    throw new Error("Failed to update product")
  }
}
