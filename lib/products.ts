import { supabase } from "./supabase";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  category: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load categories:", error.message);
    return [];
  }

  return data ?? [];
}

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  category: { name: string } | { name: string }[] | null;
};

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, description, price, image_url, category:categories(name)"
    )
    .order("sort_order", { ascending: true })
    .returns<ProductRow[]>();

  if (error) {
    console.error("Failed to load products:", error.message);
    return [];
  }

  return (data ?? []).map((p) => {
    const categoryName = Array.isArray(p.category)
      ? p.category[0]?.name
      : p.category?.name;

    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image_url,
      category: categoryName ?? "",
    };
  });
}