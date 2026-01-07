"use client";

import { deleteProduct } from "@/app/actions/productActions";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  // useTransition allows us to show a loading state while the server works
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => deleteProduct(id))}
      disabled={isPending}
      className={`font-medium text-sm px-3 py-1 rounded transition-colors ${
        isPending
          ? "text-gray-400 cursor-not-allowed"
          // FIXED: Changed '?' to ':' below, and added underline style to match car image
          : "text-red-600 hover:text-red-800 hover:underline"
      }`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}