import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

 const { data: profile, error } = await supabase
  .from("profiles")
  .select(
  "id, full_name, avatar_url, phone, location, bio, created_at, updated_at",
)
  .eq("id", user.id)
  .maybeSingle();

  if (error) {
    console.error("Profile fetch error:", error);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">My Account</p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mt-2 text-muted-foreground">
              View your Illah Marketplace profile.
            </p>
          </div>

          <Link
            href="/profile/edit"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="space-y-6 rounded-xl border p-6">
        <div>
          <p className="text-sm text-muted-foreground">Full name</p>
          <p className="mt-1 text-lg font-medium">
            {profile?.full_name || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="mt-1">{user.email || "Not available"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="mt-1">{profile?.phone || "Not provided"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="mt-1">{profile?.location || "Not provided"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Bio</p>
          <p className="mt-1">
            {profile?.bio || "No bio added yet."}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">User ID</p>
          <p className="mt-1 break-all text-sm">{user.id}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Dashboard
        </Link>

        <Link
          href="/orders"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          My Orders
        </Link>
      </div>
    </main>
  );
}