import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must be less than 100 characters"),
  price: z
    .number()
    .positive("Price must be greater than 0")
    .max(100000000, "Price is too high"),
  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .max(10000, "Stock is too high"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

export type ProductFormData = z.infer<typeof productSchema>;