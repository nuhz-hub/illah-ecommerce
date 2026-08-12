"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/cart-context";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      onClick={() => addToCart(product)}
      className="mt-8 w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isOutOfStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}