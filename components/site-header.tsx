"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/cart/cart-context";
import { createClient } from "@/lib/supabase/client";

const CONTACT_PHONE = "+2348089120899";

export function SiteHeader() {
  const router = useRouter();
  const { items } = useCart();

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  async function handleSignOut() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error.message);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-blue-950 via-purple-950 to-amber-950 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight transition hover:opacity-90 sm:text-2xl"
        >
          <span className="text-blue-200">Illah</span>{" "}
          <span className="text-white">Ecommerce</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          <Link
            href="/"
            className="transition hover:text-blue-200"
          >
            Home
          </Link>

          <Link
            href="/marketplace"
            className="transition hover:text-blue-200"
          >
            Marketplace
          </Link>

          <Link
            href="/orders"
            className="transition hover:text-purple-200"
          >
            Orders
          </Link>

          <Link
            href="/dashboard"
            className="transition hover:text-amber-200"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="transition hover:text-purple-200"
          >
            Profile
          </Link>

          <a
            href={`tel:${CONTACT_PHONE}`}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
          >
            ☎ Contact
          </a>

          <Link
            href="/cart"
            className="rounded-full bg-white px-4 py-2 font-semibold text-purple-950 shadow-sm transition hover:bg-blue-100"
          >
            Cart ({cartCount})
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full border border-amber-200/40 bg-amber-900/30 px-4 py-2 transition hover:bg-amber-800/50"
          >
            Sign Out
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/cart"
            className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-purple-950"
          >
            Cart ({cartCount})
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="hidden border-t border-white/10 bg-black/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-2 text-xs text-white/75">
          <span>Trusted Marketplace</span>
          <span>Secure Shopping</span>
          <span>Seller Friendly</span>
        </div>
      </div>
    </header>
  );
}
