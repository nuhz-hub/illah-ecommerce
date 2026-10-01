import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function MyProductsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: products, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, category, stock, seller_id, created_at, updated_at",
    )
    .eq("seller_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Seller Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              My Listings
            </h1>

            <p className="mt-2 text-muted-foreground">
              View and manage the products you have listed on Illah
              Ecommerce.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>

            <Button asChild>
              <Link href="/dashboard/products/new">
                Add New Product
              </Link>
            </Button>
          </div>
        </div>

        {error ? (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold">
                Unable to load your listings
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {error.message}
              </p>
            </CardContent>
          </Card>
        ) : products && products.length > 0 ? (
          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle>{product.name}</CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.category || "Uncategorized"}
                      </p>
                    </div>

                        <div className="flex gap-3">
                          <Button variant="outline" asChild>
                            <Link href={`/marketplace/${product.slug}`}>
                              View Listing
                            </Link>
                          </Button>

                          <Button asChild>
                            <Link href={`/dashboard/products/${product.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                <CardContent>
                  <div className="grid gap-5 sm:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Price
                      </p>

                      <p className="mt-1 font-medium">
                        ₦{Number(product.price).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Stock
                      </p>

                      <p className="mt-1 font-medium">
                        {product.stock}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date Listed
                      </p>

                      <p className="mt-1 font-medium">
                        {product.created_at
                          ? new Date(
                              product.created_at,
                            ).toLocaleDateString()
                          : "Not available"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Listing ID
                      </p>

                      <p className="mt-1 truncate font-mono text-xs">
                        {product.id}
                      </p>
                    </div>
                  </div>

                  {product.description && (
                    <div className="mt-5 border-t pt-5">
                      <p className="text-sm text-muted-foreground">
                        Description
                      </p>

                      <p className="mt-1 text-sm">
                        {product.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="text-lg font-semibold">
                You have no listings yet
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Products you create will appear here so you can view
                and manage your listings.
              </p>

              <Button asChild className="mt-5">
                <Link href="/dashboard/products/new">
                  Add Your First Product
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}