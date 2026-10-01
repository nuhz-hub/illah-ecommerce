import { notFound, redirect } from "next/navigation";

import { EditProductForm } from "@/components/dashboard/edit-product-form";
import { createClient } from "@/lib/supabase/server";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: product, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, category, stock, seller_id",
    )
    .eq("id", id)
    .eq("seller_id", user.id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground">
            Seller Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Edit Listing
          </h1>

          <p className="mt-2 text-muted-foreground">
            Update your product information.
          </p>
        </div>

        <EditProductForm product={product} />
      </div>
    </main>
  );
}