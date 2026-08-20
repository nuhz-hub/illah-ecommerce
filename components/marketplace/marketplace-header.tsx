import Link from "next/link";

export function MarketplaceHeader() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Illah Ecommerce
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Marketplace
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Discover products from trusted sellers and find what you need.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Dashboard
        </Link>

        <Link
          href="/cart"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}