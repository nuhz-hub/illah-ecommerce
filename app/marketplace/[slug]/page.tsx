import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { getProductBySlug } from "@/services/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/marketplace"
            className="text-sm font-medium underline"
          >
            ← Back to marketplace
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {product.category}
              </p>
            )}

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-bold">
              ₦{product.price.toLocaleString()}
            </p>

            {product.description && (
              <p className="mt-6 leading-7 text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}