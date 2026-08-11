export function MarketplaceHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

      <div className="text-sm text-muted-foreground">
        Browse products
      </div>
    </div>
  );
}