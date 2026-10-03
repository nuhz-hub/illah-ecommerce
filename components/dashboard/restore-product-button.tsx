"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type RestoreProductButtonProps = {
  productId: string;
};

export default function RestoreProductButton({
  productId,
}: RestoreProductButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  async function handleRestore() {
    const confirmed = window.confirm(
      "Restore this listing? It will become visible to buyers again."
    );

    if (!confirmed) return;

    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in to restore this listing.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({
        is_active: true,
        archived_at: null,
      })
      .eq("id", productId)
      .eq("seller_id", user.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleRestore}
        disabled={loading}
        className="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Restoring..." : "Restore"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}