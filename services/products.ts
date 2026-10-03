import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("is_active", true)
  .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "Error fetching products:",
      error.message,
    );

    return [];
  }

  return (data ?? []) as Product[];
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const supabase = await createClient();

  const decodedSlug = decodeURIComponent(slug);

 const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("slug", decodedSlug)
  .eq("is_active", true)
  .maybeSingle();
  if (error) {
    console.error(
      "Error fetching product:",
      error.message,
    );

    return null;
  }

  return data as Product | null;
}

export type CreateProductInput = {
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export async function createProduct(
  input: CreateProductInput,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error:
        "You must be logged in to create a product.",
    };
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...input,
      seller_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Error creating product:",
      error.message,
    );

    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data as Product,
    error: null,
  };
}