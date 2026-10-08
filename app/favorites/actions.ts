"use server";

import {
  addFavorite,
  removeFavorite,
} from "@/services/favorites";

export async function addFavoriteAction(productId: string) {
  return addFavorite(productId);
}

export async function removeFavoriteAction(productId: string) {
  return removeFavorite(productId);
}