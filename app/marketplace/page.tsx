import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { ProductGrid } from "@/components/marketplace/product-grid";
import { getMyFavorites } from "@/services/favorites";
import { getProducts } from "@/services/products";

export default async function MarketplacePage() {
  const products = await getProducts();
  const favoritesResult = await getMyFavorites();
  const favoriteProductIds =
    favoritesResult.data?.map((favorite) => favorite.product_id) ?? [];

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <MarketplaceHeader />

        <section className="mt-10">
          <ProductGrid products={products} favoriteProductIds={favoriteProductIds} />
        </section>
      </div>
    </main>
  );
}