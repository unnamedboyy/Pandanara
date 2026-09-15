"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import type { AdminCategory } from "@/lib/admin";

type Actions = {
  createCategory: (formData: FormData) => void;
  updateCategory: (formData: FormData) => void;
  deleteCategory: (formData: FormData) => void;
};

export default function CategoryManager({
  categories,
  actions,
}: {
  categories: AdminCategory[];
  actions: Actions;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {showAddForm ? (
        <form
          action={async (formData) => {
            await actions.createCategory(formData);
            setShowAddForm(false);
          }}
          className="rounded-card border border-forest/30 bg-white p-4 flex flex-col gap-3"
        >
          <div>
            <label className="text-[12px] text-ink/50">Nama kategori</label>
            <input
              name="name"
              required
              placeholder="mis. Snack Tampah"
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] text-ink/50">Slug</label>
            <input
              name="slug"
              required
              placeholder="mis. snack-tampah"
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] text-ink/50">Urutan tampil</label>
            <input
              name="sort_order"
              type="number"
              defaultValue={categories.length + 1}
              className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
            />
          </div>
          <div className="flex gap-2 mt-1">
            <button
              type="submit"
              className="flex-1 rounded-btn bg-forest text-cream py-2.5 text-[14px]"
            >
              Tambah
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
          <Plus size={16} /> Tambah Kategori
        </button>
      )}

      {categories.map((category) =>
        editingId === category.id ? (
          <form
            key={category.id}
            action={async (formData) => {
              await actions.updateCategory(formData);
              setEditingId(null);
            }}
            className="rounded-card border border-forest/30 bg-white p-4 flex flex-col gap-3"
          >
            <input type="hidden" name="id" value={category.id} />
            <div>
              <label className="text-[12px] text-ink/50">Nama kategori</label>
              <input
                name="name"
                defaultValue={category.name}
                required
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
              />
            </div>
            <div>
              <label className="text-[12px] text-ink/50">Slug</label>
              <input
                name="slug"
                defaultValue={category.slug}
                required
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
              />
            </div>
            <div>
              <label className="text-[12px] text-ink/50">Urutan tampil</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={category.sort_order}
                className="mt-1 w-full rounded-btn border border-ink/15 px-3 py-2 text-[14.5px] focus:border-forest outline-none"
              />
            </div>
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
            key={category.id}
            className="rounded-card border border-ink/10 bg-white p-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-[15px] text-ink truncate">{category.name}</p>
              <p className="text-[12.5px] text-ink/45">/{category.slug}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setEditingId(category.id)}
                aria-label={`Edit ${category.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sand text-ink/60"
              >
                <Pencil size={16} />
              </button>
              <form
                action={actions.deleteCategory}
                onSubmit={(e) => {
                  if (
                    !confirm(
                      `Hapus kategori "${category.name}"? Produk di dalamnya juga ikut terhapus.`
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="id" value={category.id} />
                <button
                  type="submit"
                  aria-label={`Hapus ${category.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sand text-ink/40 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        )
      )}
    </div>
  );
}