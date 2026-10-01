import Link from "next/link";
import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/profile/profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, phone, location, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile fetch error:", error);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">My Account</p>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Update your Illah Marketplace profile information.
        </p>
      </div>

      <div className="rounded-xl border p-6">
        <ProfileForm
          userId={user.id}
          initialFullName={profile?.full_name ?? ""}
          initialPhone={profile?.phone ?? ""}
          initialLocation={profile?.location ?? ""}
          initialBio={profile?.bio ?? ""}
        />
      </div>

      <div className="mt-6">
        <Link
          href="/profile"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Back to Profile
        </Link>
      </div>
    </main>
  );
}
