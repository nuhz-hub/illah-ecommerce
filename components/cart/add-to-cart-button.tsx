"use client";

import { useState } from "react";

import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/cart-context";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;

  function handleAddToCart() {
    console.log("ADD TO CART BUTTON CLICKED:", product);
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      onClick={handleAddToCart}
      className="mt-8 w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isOutOfStock
        ? "Out of stock"
        : added
          ? "✓ Added to cart"
          : "Add to cart"}
    </button>
  );
}