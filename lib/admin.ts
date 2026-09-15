import { supabaseAdmin } from "./supabaseAdmin";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type AdminProduct = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  category_id: string;
  sort_order: number;
  is_active: boolean;
};

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("id, name, slug, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load categories:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      "id, name, description, price, image_url, category_id, sort_order, is_active"
    )
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load products:", error.message);
    return [];
  }
  return data ?? [];
}