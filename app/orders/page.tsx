import Link from "next/link";
import { redirect } from "next/navigation";

import { getMyOrders } from "@/services/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function OrdersPage() {
  const result = await getMyOrders();

  if (result.error) {
    if (
      result.error ===
      "You must be logged in to view your orders."
    ) {
      redirect("/auth/login?redirect=/orders");
    }

    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardContent className="p-8">
              <h1 className="text-xl font-semibold">
                Unable to load orders
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                {result.error}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const orders = result.data ?? [];

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              My Orders
            </h1>

            <p className="mt-2 text-muted-foreground">
              View your purchases and order history.
            </p>
          </div>

          <Button asChild>
            <Link href="/marketplace">
              Continue Shopping
            </Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="text-xl font-semibold">
                No orders yet
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Your completed purchases will appear here.
              </p>

              <Button asChild className="mt-6">
                <Link href="/marketplace">
                  Browse Marketplace
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(0, 8)}
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(
                          order.created_at,
                        ).toLocaleString()}
                      </p>
                    </div>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                      {order.status}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total
                      </p>

                      <p className="text-xl font-bold">
                        ₦{Number(order.total).toLocaleString()}
                      </p>
                    </div>

                    <Button variant="outline" asChild>
                      <Link href={`/orders/${order.id}`}>
                        View Order
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}