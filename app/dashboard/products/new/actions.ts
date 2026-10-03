"use server";

import {
  createProduct,
  type CreateProductInput,
} from "@/services/products";

export async function createProductAction(input: CreateProductInput) {
  return createProduct(input);
}