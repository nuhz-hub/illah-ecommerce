import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your Illah Ecommerce account.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="mt-1 font-medium">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                User ID
              </p>

              <p className="mt-1 break-all text-sm">
                {user.id}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild>
                <Link href="/orders">
                  My Orders
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/marketplace">
                  Marketplace
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}