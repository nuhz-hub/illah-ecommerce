
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-muted-foreground">
            Illah Ecommerce
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Welcome to your dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage your shopping experience, orders, profile, and seller
            activities from one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-5 text-sm text-muted-foreground">
                Browse products and discover what is available.
              </p>

              <Button asChild>
                <Link href="/marketplace">
                  Browse Marketplace
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-5 text-sm text-muted-foreground">
                Manage your account and personal information.
              </p>

              <Button variant="outline" asChild>
                <Link href="/profile">
                  View Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-5 text-sm text-muted-foreground">
                View your purchases and order history.
              </p>

              <Button variant="outline" asChild>
                <Link href="/orders">
                  My Orders
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

       <Card className="mt-8">
  <CardHeader>
    <CardTitle>Seller Tools</CardTitle>
  </CardHeader>

  <CardContent>
    <p className="text-sm text-muted-foreground">
      Manage your marketplace listings, add new products, and keep
      your seller inventory up to date.
    </p>

    <div className="mt-5 flex flex-wrap gap-3">
      <Button asChild>
        <Link href="/dashboard/products">
          My Listings
        </Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href="/dashboard/products/new">
          Add New Product
        </Link>
      </Button>
    </div>
  </CardContent>
</Card>

      </div>
    </main>
  );
}