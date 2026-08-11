import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Illah Ecommerce",
  description: "Illah Ecommerce marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}