import Image from "next/image";
import { notFound } from "next/navigation";

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
                No image available
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {product.category && (
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {product.category}
              </p>
            )}

            <h1 className="mt-2 text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-6 text-3xl font-bold">
              ₦{product.price.toLocaleString()}
            </p>

            {product.description && (
              <p className="mt-6 leading-7 text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-sm">
                  <span className="font-medium">In stock:</span>{" "}
                  {product.stock} available
                </p>
              ) : (
                <p className="font-medium text-red-600">
                  Out of stock
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={product.stock === 0}
              className="mt-8 w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}