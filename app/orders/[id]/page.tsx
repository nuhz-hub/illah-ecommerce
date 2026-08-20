import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getMyOrder } from "@/services/orders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type OrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: OrderPageProps) {
  const { id } = await params;

  const result = await getMyOrder(id);

  if (result.error) {
    if (
      result.error ===
      "You must be logged in to view your orders."
    ) {
      redirect(`/auth/login?redirect=/orders/${id}`);
    }

    notFound();
  }

  if (!result.data) {
    notFound();
  }

  if (Array.isArray(result.data)) {
    notFound();
  }

  const { order, items } = result.data;

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/orders"
            className="text-sm font-medium underline"
          >
            ← Back to orders
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Order details
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Order #{order.id.slice(0, 8)}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium capitalize">
            {order.status}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.product_name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        ₦
                        {Number(
                          item.unit_price,
                        ).toLocaleString()}{" "}
                        × {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₦
                      {Number(
                        item.subtotal,
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₦
                    {Number(
                      order.subtotal,
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-bold">
                      ₦
                      {Number(
                        order.total,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    Customer
                  </p>

                  <p className="mt-1 font-medium">
                    {order.customer_name}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 font-medium break-all">
                    {order.customer_email}
                  </p>
                </div>

                {order.customer_phone && (
                  <div>
                    <p className="text-muted-foreground">
                      Phone
                    </p>

                    <p className="mt-1 font-medium">
                      {order.customer_phone}
                    </p>
                  </div>
                )}

                {order.shipping_address && (
                  <div>
                    <p className="text-muted-foreground">
                      Delivery address
                    </p>

                    <p className="mt-1 font-medium">
                      {order.shipping_address}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/marketplace"
            className="inline-block rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}