"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ---------- Categories ----------

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!name || !slug) return;

  await supabaseAdmin
    .from("categories")
    .insert({ name, slug, sort_order: sortOrder });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCategory(formData: FormData) {
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  await supabaseAdmin
    .from("categories")
    .update({ name, slug, sort_order: sortOrder })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get("id"));

  await supabaseAdmin.from("categories").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------- Products ----------

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!name || !price || !categoryId) return;

  await supabaseAdmin.from("products").insert({
    name,
    description: description || null,
    price,
    image_url: imageUrl || null,
    category_id: categoryId,
    sort_order: sortOrder,
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isActive = formData.get("is_active") === "on";

  await supabaseAdmin
    .from("products")
    .update({
      name,
      description: description || null,
      price,
      image_url: imageUrl || null,
      category_id: categoryId,
      sort_order: sortOrder,
      is_active: isActive,
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id"));

  await supabaseAdmin.from("products").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}