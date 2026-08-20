"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Illah Ecommerce
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Review your items before proceeding to checkout.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="text-sm font-medium underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border bg-background p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-muted-foreground">
              Add products from the marketplace to get started.
            </p>

            <Link
              href="/marketplace"
              className="mt-6 inline-block rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border bg-background p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        ₦{item.price.toLocaleString()} each
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.stock} available
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                          )
                        }
                        className="h-9 w-9 rounded-md border transition hover:bg-muted"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                          )
                        }
                        disabled={item.quantity >= item.stock}
                        className="h-9 w-9 rounded-md border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold">
                      ₦
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-red-600 hover:underline"
              >
                Clear cart
              </button>
            </div>

            <div className="h-fit rounded-xl border bg-background p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                Checkout
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-muted-foreground">
                  Items
                </span>

                <span className="font-medium">
                  {items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-md bg-primary px-5 py-3 text-center font-medium text-primary-foreground transition hover:opacity-90"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}