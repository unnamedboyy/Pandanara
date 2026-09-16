"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { uploadImage } from "@/lib/storage";

export type ActionResult = { success: boolean; message: string };

// ---------- Categories ----------

export async function createCategory(formData: FormData): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();

  if (!name || !slug) {
    return { success: false, message: "Nama dan slug wajib diisi." };
  }

  const { data: last } = await supabaseAdmin
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextSortOrder = (last?.[0]?.sort_order ?? 0) + 1;

  const { error } = await supabaseAdmin
    .from("categories")
    .insert({ name, slug, sort_order: nextSortOrder });

  if (error) {
    return { success: false, message: `Gagal menambah kategori: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: `Kategori "${name}" berhasil ditambahkan.` };
}

export async function updateCategory(formData: FormData): Promise<ActionResult> {
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();

  if (!name || !slug) {
    return { success: false, message: "Nama dan slug wajib diisi." };
  }

  const { error } = await supabaseAdmin
    .from("categories")
    .update({ name, slug })
    .eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menyimpan perubahan: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: `Kategori "${name}" berhasil disimpan.` };
}

export async function deleteCategory(formData: FormData): Promise<ActionResult> {
  const id = String(formData.get("id"));

  const { error } = await supabaseAdmin.from("categories").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus kategori: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Kategori berhasil dihapus." };
}

// ---------- Products ----------

export async function createProduct(formData: FormData): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const imageFile = formData.get("image_file");

  if (!name || !price || !categoryId) {
    return { success: false, message: "Nama, harga, dan kategori wajib diisi." };
  }

  let imageUrl: string | null = null;
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadImage(imageFile, "products");
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "Gagal upload foto.",
      };
    }
  }

  const { data: last } = await supabaseAdmin
    .from("products")
    .select("sort_order")
    .eq("category_id", categoryId)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextSortOrder = (last?.[0]?.sort_order ?? 0) + 1;

  const { error } = await supabaseAdmin.from("products").insert({
    name,
    description: description || null,
    price,
    image_url: imageUrl,
    category_id: categoryId,
    sort_order: nextSortOrder,
  });

  if (error) {
    return { success: false, message: `Gagal menambah produk: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: `Produk "${name}" berhasil ditambahkan.` };
}

export async function updateProduct(formData: FormData): Promise<ActionResult> {
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const isActive = formData.get("is_active") === "on";
  const imageFile = formData.get("image_file");

  if (!name || !price || !categoryId) {
    return { success: false, message: "Nama, harga, dan kategori wajib diisi." };
  }

  const updateData: Record<string, unknown> = {
    name,
    description: description || null,
    price,
    category_id: categoryId,
    is_active: isActive,
  };

  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      updateData.image_url = await uploadImage(imageFile, "products");
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "Gagal upload foto.",
      };
    }
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menyimpan perubahan: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: `Produk "${name}" berhasil disimpan.` };
}

export async function deleteProduct(formData: FormData): Promise<ActionResult> {
  const id = String(formData.get("id"));

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus produk: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Produk berhasil dihapus." };
}