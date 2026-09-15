"use client";

import { useState } from "react";
import CategoryManager from "./CategoryManager";
import ProductManager from "./ProductManager";
import type { AdminCategory, AdminProduct } from "@/lib/admin";

type Actions = {
  createCategory: (formData: FormData) => void;
  updateCategory: (formData: FormData) => void;
  deleteCategory: (formData: FormData) => void;
  createProduct: (formData: FormData) => void;
  updateProduct: (formData: FormData) => void;
  deleteProduct: (formData: FormData) => void;
};

export default function AdminDashboard({
  categories,
  products,
  actions,
}: {
  categories: AdminCategory[];
  products: AdminProduct[];
  actions: Actions;
}) {
  const [tab, setTab] = useState<"products" | "categories">("products");

  return (
    <div className="max-w-[560px] mx-auto px-4 py-5">
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setTab("products")}
          className={`flex-1 rounded-btn py-2.5 text-[14px] transition-colors duration-400 ${
            tab === "products"
              ? "bg-forest text-cream"
              : "bg-white border border-ink/10 text-ink/60"
          }`}
        >
          Produk ({products.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("categories")}
          className={`flex-1 rounded-btn py-2.5 text-[14px] transition-colors duration-400 ${
            tab === "categories"
              ? "bg-forest text-cream"
              : "bg-white border border-ink/10 text-ink/60"
          }`}
        >
          Kategori ({categories.length})
        </button>
      </div>

      {tab === "products" ? (
        <ProductManager
          categories={categories}
          products={products}
          actions={actions}
        />
      ) : (
        <CategoryManager categories={categories} actions={actions} />
      )}
    </div>
  );
}