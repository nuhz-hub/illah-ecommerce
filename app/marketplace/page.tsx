import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { ProductGrid } from "@/components/marketplace/product-grid";
import { getProducts } from "@/services/products";

export default async function MarketplacePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <MarketplaceHeader />

        <section className="mt-10">
          <ProductGrid products={products} />
        </section>
      </div>
    </main>
  );
}