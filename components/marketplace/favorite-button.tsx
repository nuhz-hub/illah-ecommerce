"use client";

import { useState, useTransition } from "react";

import {
  addFavoriteAction,
  removeFavoriteAction,
} from "@/app/favorites/actions";

type FavoriteButtonProps = {
  productId: string;
  initialFavorite: boolean;
};

export function FavoriteButton({
  productId,
  initialFavorite,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] =
    useState(initialFavorite);

  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const nextValue = !isFavorite;

    startTransition(async () => {
      const result = nextValue
        ? await addFavoriteAction(productId)
        : await removeFavoriteAction(productId);

      if (result.error) {
        console.error(
          "Favorite action failed:",
          result.error,
        );
        return;
      }

      setIsFavorite(nextValue);
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      aria-pressed={isFavorite}
      className="flex h-10 w-10 items-center justify-center rounded-full border bg-background/90 text-xl shadow-sm backdrop-blur transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}