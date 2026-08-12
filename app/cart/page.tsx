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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Cart</h1>

          <Link
            href="/marketplace"
            className="text-sm font-medium underline"
          >
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border p-10 text-center">
            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-muted-foreground">
              Add products from the marketplace to get started.
            </p>

            <Link
              href="/marketplace"
              className="mt-6 inline-block rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        ₦{item.price.toLocaleString()} each
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

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                          )
                        }
                        className="h-9 w-9 rounded-md border"
                      >
                        -
                      </button>

                      <span className="min-w-6 text-center">
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
                        className="h-9 w-9 rounded-md border disabled:cursor-not-allowed disabled:opacity-50"
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

            <div className="h-fit rounded-xl border p-6">
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}