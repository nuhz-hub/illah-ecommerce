import { createClient } from "@/lib/supabase/server";

export async function getMyFavorites() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "You must be logged in to view your favorites.",
    };
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("product_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "Error fetching favorites:",
      error.message,
    );

    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data ?? [],
    error: null,
  };
}

export async function isFavorite(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: false,
      error: null,
    };
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    console.error(
      "Error checking favorite:",
      error.message,
    );

    return {
      data: false,
      error: error.message,
    };
  }

  return {
    data: Boolean(data),
    error: null,
  };
}

export async function addFavorite(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "You must be logged in to add favorites.",
    };
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: user.id,
      product_id: productId,
    })
    .select("id, product_id, created_at")
    .single();

  if (error) {
    console.error(
      "Error adding favorite:",
      error.message,
    );

    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data,
    error: null,
  };
}

export async function removeFavorite(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "You must be logged in to remove favorites.",
    };
  }

  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(
      "Error removing favorite:",
      error.message,
    );

    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data,
    error: null,
  };
}