import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  favoriteProductIds: string[];
};

export function ProductGrid({
  products,
  favoriteProductIds,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <h2 className="text-lg font-semibold">No products yet</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Products will appear here when sellers add them.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          initialFavorite={favoriteProductIds.includes(product.id)}
        />
      ))}
    </div>
  );
}