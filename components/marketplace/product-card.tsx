import Link from "next/link";
import Image from "next/image";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
<Link
  href={`/marketplace/${product.slug}`}
  className="block overflow-hidden rounded-xl border bg-card transition hover:shadow-md"
> 
<div className="relative aspect-square bg-muted">   
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="p-5">
        {product.category && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </p>
        )}

        <h2 className="mt-2 text-lg font-semibold">
          {product.name}
        </h2>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold">
            ₦{product.price.toLocaleString()}
          </p>

          <p className="text-xs text-muted-foreground">
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
        </div>
      </div>
    </Link>
  );
}