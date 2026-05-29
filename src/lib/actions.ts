"use server";

import { getPublishedProducts, type Product } from "./api";

export async function fetchNextProducts(
  skip: number,
  limit: number,
  categorySlug?: string,
  inStock?: string,
  sortBy?: string,
  search?: string,
  minPrice?: string,
  maxPrice?: string,
): Promise<Product[]> {
  return getPublishedProducts({
    skip,
    limit,
    categorySlug: categorySlug !== "all" ? categorySlug : undefined,
    inStock: inStock === "true" ? true : inStock === "false" ? false : undefined,
    sortBy,
    search,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  });
}
