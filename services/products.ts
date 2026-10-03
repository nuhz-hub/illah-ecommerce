import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

const createProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Product slug is required"),
  description: z.string().min(5, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  image_url: z.string(),
  category: z.string().min(2, "Category is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

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
  const validation = createProductSchema.safeParse(input);

  if (!validation.success) {
    return {
      data: null,
      error: validation.error.issues[0].message,
    };
  }

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
      ...validation.data,
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