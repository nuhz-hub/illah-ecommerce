import Link from "next/link";

const CONTACT_PHONE = "+2348089120899";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gradient-to-r from-blue-950 via-purple-950 to-amber-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold">
            <span className="text-blue-200">Illah</span> Ecommerce
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            A modern marketplace connecting customers with trusted sellers
            and useful products.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>

          <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/marketplace"
              className="transition hover:text-white"
            >
              Marketplace
            </Link>

            <Link
              href="/orders"
              className="transition hover:text-white"
            >
              My Orders
            </Link>

            <Link
              href="/profile"
              className="transition hover:text-white"
            >
              My Profile
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>

          <p className="mt-3 text-sm text-white/70">
            Need assistance? Contact Illah Ecommerce.
          </p>

          <a
            href={`tel:${CONTACT_PHONE}`}
            className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-purple-950 transition hover:bg-blue-100"
          >
            ☎ Call Us
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Illah Ecommerce. All rights reserved.
          </p>

          <p>
            Built with Next.js, TypeScript and Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
