"use client";

import { useState } from "react";
import { z } from "zod";
import { productSchema } from "@/lib/validation";
import { addProduct } from "@/app/actions/productActions";

type FormData = {
  name: string;
  price: string;
  stock: string;
  image: File | null;
};

export default function ProductForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    image: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const totalSteps = 3;

  const validateStep1 = () => {
    try {
      productSchema.pick({ name: true }).parse({ name: formData.name });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zErr = error as z.ZodError;
        setErrors({ name: zErr.issues[0]?.message || 'Invalid name' });
      }
      return false;
    }
  };

  const validateStep2 = () => {
    try {
      productSchema.pick({ price: true, stock: true }).parse({
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        const zErr = error as z.ZodError;
        zErr.issues.forEach((err) => {
          const path = err.path?.[0];
          if (path) {
            fieldErrors[String(path)] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const validateStep3 = () => {
    try {
      if (!formData.image) {
        setErrors({ image: "Image is required" });
        return false;
      }
      productSchema.pick({ image: true }).parse({ image: formData.image });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zErr = error as z.ZodError;
        setErrors({ image: zErr.issues[0]?.message || 'Invalid image' });
      }
      return false;
    }
  };

  const handleNext = () => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    if (step === 2) isValid = validateStep2();

    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      productSchema.parse({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image,
      });

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // ✅ FIXED: Passed null as first argument to satisfy (prevState, formData) signature
      await addProduct(null, submitData);

      setSubmitMessage({ type: "success", text: "✅ Product added successfully!" });
      
      setTimeout(() => {
        setFormData({ name: "", price: "", stock: "", image: null });
        setStep(1);
        setSubmitMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage({ type: "error", text: "❌ Failed to add product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        ✨ Add New Product
      </h2>

      {/* Progress Bar */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ display: "flex", alignItems: "center", flex: "1" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  transition: "all 0.3s",
                  background: step >= num ? "#2563eb" : "#e5e7eb",
                  color: step >= num ? "white" : "#6b7280",
                }}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  style={{
                    flex: "1",
                    height: "4px",
                    margin: "0 8px",
                    transition: "all 0.3s",
                    background: step > num ? "#2563eb" : "#e5e7eb",
                    borderRadius: "2px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
          <span>📝 Basic Info</span>
          <span>💰 Pricing</span>
          <span>📸 Image</span>
        </div>
      </div>

      {/* Step Content */}
      <div style={{ minHeight: "250px" }}>
        {step === 1 && (
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({});
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: errors.name ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
              }}
              placeholder="e.g. iPhone 15 Pro Max"
            />
            {errors.name && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>{errors.name}</p>}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                Price (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: errors.price ? "2px solid #ef4444" : "1px solid #d1d5db", borderRadius: "8px" }}
              />
              {errors.price && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>{errors.price}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                Stock Quantity *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: errors.stock ? "2px solid #ef4444" : "1px solid #d1d5db", borderRadius: "8px" }}
              />
              {errors.stock && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>{errors.stock}</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Product Image *
            </label>
            <div style={{ border: errors.image ? "2px dashed #ef4444" : "2px dashed #d1d5db", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
              {formData.image ? (
                <div>
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" style={{ maxHeight: "200px", margin: "0 auto", borderRadius: "12px" }} />
                  <button type="button" onClick={() => setFormData({ ...formData, image: null })} style={{ color: "#ef4444", marginTop: "8px", background: "none", border: "none", cursor: "pointer" }}>
                    🗑️ Remove Image
                  </button>
                </div>
              ) : (
                <label style={{ cursor: "pointer" }}>
                  <div style={{ fontSize: "48px" }}>📸</div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Click to upload image</p>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files && setFormData({ ...formData, image: e.target.files[0] })} />
                </label>
              )}
            </div>
            {errors.image && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>{errors.image}</p>}
          </div>
        )}
      </div>

      {submitMessage && (
        <div style={{ marginTop: "16px", padding: "16px", borderRadius: "12px", background: submitMessage.type === "success" ? "#d1fae5" : "#fee2e2", color: submitMessage.type === "success" ? "#065f46" : "#991b1b" }}>
          {submitMessage.text}
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
        <button type="button" onClick={handleBack} disabled={step === 1} style={{ padding: "12px 24px", border: "1px solid #d1d5db", borderRadius: "8px", opacity: step === 1 ? "0.5" : "1" }}>
          ← Back
        </button>

        {step < totalSteps ? (
          <button type="button" onClick={handleNext} style={{ padding: "12px 24px", background: "#2563eb", color: "white", borderRadius: "8px", border: "none" }}>
            Next →
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={isSubmitting} style={{ padding: "12px 24px", background: isSubmitting ? "#86efac" : "#16a34a", color: "white", borderRadius: "8px", border: "none" }}>
            {isSubmitting ? "Adding..." : "✓ Add Product"}
          </button>
        )}
      </div>
    </div>
  );
}