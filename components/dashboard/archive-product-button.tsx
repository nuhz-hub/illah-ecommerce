"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type ArchiveProductButtonProps = {
  productId: string;
};

export default function ArchiveProductButton({
  productId,
}: ArchiveProductButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  async function handleArchive() {
    const confirmed = window.confirm(
      "Are you sure you want to archive this listing? It will no longer be available for new purchases."
    );

    if (!confirmed) return;

    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in to archive this listing.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({
        is_active: false,
        archived_at: new Date().toISOString(),
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
        onClick={handleArchive}
        disabled={loading}
        className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Archiving..." : "Archive"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}