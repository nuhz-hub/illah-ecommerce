import type { Metadata } from "next";

import "./globals.css";

import { CartProvider } from "@/components/cart/cart-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Illah Ecommerce",
  description:
    "A modern ecommerce marketplace connecting buyers and sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
              {children}
            </main>

            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
