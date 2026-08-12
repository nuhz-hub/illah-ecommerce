"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";

export default function CheckoutPage() {
  const { items } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold">Checkout</h1>

          <p className="mt-4 text-muted-foreground">
            Your cart is empty.
          </p>

          <Link
            href="/marketplace"
            className="mt-6 inline-block rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Checkout</h1>

          <Link
            href="/cart"
            className="text-sm font-medium underline"
          >
            Back to cart
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Order Items
            </h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      ₦{item.price.toLocaleString()} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₦
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-xl border p-6">
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

            <div className="mt-3 flex items-center justify-between">
              <span className="text-muted-foreground">
                Delivery
              </span>

              <span className="font-semibold">
                To be calculated
              </span>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Place Order
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}