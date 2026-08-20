import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Illah Ecommerce
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Marketplace
            </Link>

            <Link
              href="/auth/login"
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Log in
            </Link>

            <Link
              href="/auth/signup"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Create Account
            </Link>
          </nav>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Welcome to Illah Ecommerce
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              Discover products.
              <br />
              Shop with confidence.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Illah Ecommerce connects customers with trusted sellers in a
              simple marketplace built for discovering products, managing
              your cart, and placing orders with ease.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/marketplace"
                className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              >
                Browse Marketplace
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-md border px-6 py-3 font-medium transition hover:bg-muted"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border p-6">
              <div className="text-2xl font-bold">01</div>
              <h2 className="mt-4 text-lg font-semibold">
                Discover Products
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse products from sellers and find what you need.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <div className="text-2xl font-bold">02</div>
              <h2 className="mt-4 text-lg font-semibold">
                Add to Cart
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Select products, manage quantities, and review your order.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <div className="text-2xl font-bold">03</div>
              <h2 className="mt-4 text-lg font-semibold">
                Place Your Order
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Complete checkout and keep track of your order history.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Illah Ecommerce. All rights reserved.</p>

          <Link href="/marketplace" className="hover:underline">
            Shop Marketplace
          </Link>
        </div>
      </footer>
    </main>
  );
}