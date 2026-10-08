"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/cart/cart-context";
import type { Product } from "@/types/product";
import { FavoriteButton } from "@/components/marketplace/favorite-button";

type ProductCardProps = {
  product: Product;
  initialFavorite: boolean;
};

export function ProductCard({ product, initialFavorite }: ProductCardProps) {
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-card transition hover:shadow-md">
      <div className="relative">
        <Link href={`/marketplace/${product.slug}`} className="block">
          <div className="relative aspect-square bg-muted">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="p-5 pb-3">
            {product.category && (
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {product.category}
              </p>
            )}

            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>

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
                {isOutOfStock ? "Out of stock" : `${product.stock} available`}
              </p>
            </div>
          </div>
        </Link>

        <div className="absolute right-3 top-3">
          <FavoriteButton
            productId={product.id}
            initialFavorite={initialFavorite}
          />
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => addToCart(product)}
          className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isOutOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
