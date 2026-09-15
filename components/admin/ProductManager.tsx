"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import type { AdminCategory, AdminProduct } from "@/lib/admin";

type Actions = {
  createProduct: (formData: FormData) => void;
  updateProduct: (formData: FormData) => void;
  deleteProduct: (formData: FormData) => void;
};

export default function ProductManager({
  categories,
  products,
  actions,
}: {
  categories: AdminCategory[];
  products: AdminProduct[];
  actions: Actions;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? "-";

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) =>
        editingId === product.id ? (
          <form
            key={product.id}
            action={async (formData) => {
              await actions.updateProduct(formData);
              setEditingId(null);
            }}
            className="rounded-card border border-forest/30 bg-white p-4 flex flex-col gap-3"
          >
            <input type="hidden" name="id" value={product.id} />

            <div>
              <label className="text-[12px] text-ink/50">Nama produk</label>
              <input
                name="name"
                defaultValue={product.name}
                required
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] text-ink/50">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={product.description ?? ""}
                rows={2}
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] text-ink/50">Harga</label>
                <input
                  name="price"
                  defaultValue={product.price}
                  required
                  placeholder="Rp 20.000"
                  className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
                />
              </div>
              <div>
                <label className="text-[12px] text-ink/50">Urutan</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={product.sort_order}
                  className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] text-ink/50">Kategori</label>
              <select
                name="category_id"
                defaultValue={product.category_id}
                required
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] text-ink/50">
                URL foto (dari Supabase Storage)
              </label>
              <input
                name="image_url"
                defaultValue={product.image_url ?? ""}
                placeholder="https://xxxxx.supabase.co/storage/v1/object/public/..."
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[13.5px] focus:border-forest outline-none"
              />
            </div>

            <label className="flex items-center gap-2 text-[14px] text-ink/70">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={product.is_active}
                className="h-4 w-4 accent-forest"
              />
              Tampilkan di website
            </label>

            <div className="flex gap-2 mt-1">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-btn bg-forest text-cream py-2.5 text-[14px]"
              >
                <Check size={15} /> Simpan
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-btn border border-ink/15 text-ink/60 py-2.5 text-[14px]"
              >
                <X size={15} /> Batal
              </button>
            </div>
          </form>
        ) : (
          <div
            key={product.id}
            className="rounded-card border border-ink/10 bg-white p-4 flex items-center gap-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[15px] text-ink truncate">{product.name}</p>
                {!product.is_active && (
                  <span className="shrink-0 text-[10.5px] uppercase tracking-wide text-clay bg-clay/10 rounded-full px-2 py-0.5">
                    Nonaktif
                  </span>
                )}
              </div>
              <p className="text-[12.5px] text-ink/45 truncate">
                {categoryName(product.category_id)} · {product.price}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setEditingId(product.id)}
                aria-label={`Edit ${product.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sand text-ink/60"
              >
                <Pencil size={16} />
              </button>
              <form
                action={actions.deleteProduct}
                onSubmit={(e) => {
                  if (!confirm(`Hapus produk "${product.name}"?`)) {
                    e.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  aria-label={`Hapus ${product.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sand text-ink/40 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        )
      )}

      {showAddForm ? (
        <form
          action={async (formData) => {
            await actions.createProduct(formData);
            setShowAddForm(false);
          }}
          className="rounded-card border border-forest/30 bg-white p-4 flex flex-col gap-3"
        >
          <div>
            <label className="text-[12px] text-ink/50">Nama produk</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
            />
          </div>

          <div>
            <label className="text-[12px] text-ink/50">Deskripsi</label>
            <textarea
              name="description"
              rows={2}
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] text-ink/50">Harga</label>
              <input
                name="price"
                required
                placeholder="Rp 20.000"
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
              />
            </div>
            <div>
              <label className="text-[12px] text-ink/50">Urutan</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={0}
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-ink/50">Kategori</label>
            <select
              name="category_id"
              required
              defaultValue=""
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none bg-white"
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[12px] text-ink/50">
              URL foto (dari Supabase Storage)
            </label>
            <input
              name="image_url"
              placeholder="https://xxxxx.supabase.co/storage/v1/object/public/..."
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[13.5px] focus:border-forest outline-none"
            />
          </div>

          <div className="flex gap-2 mt-1">
            <button
              type="submit"
              className="flex-1 rounded-btn bg-forest text-cream py-2.5 text-[14px]"
            >
              Tambah Produk
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 rounded-btn border border-ink/15 text-ink/60 py-2.5 text-[14px]"
            >
              Batal
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 rounded-card border border-dashed border-ink/20 py-3.5 text-[14px] text-ink/60 hover:border-forest hover:text-forest"
        >
          <Plus size={16} /> Tambah Produk
        </button>
      )}
    </div>
  );
}