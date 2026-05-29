const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
};

export type VariantImage = {
  id: string;
  url: string;
  order: number;
};

export type VariantAttribute = {
  id: string;
  key: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  actualPrice: number | null;
  price: number | null;
  stock: number;
  attributes: VariantAttribute[];
  images: VariantImage[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  actualPrice: number;
  price: number;
  published: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  categoryId: string;
  category: Category;
  brandId: string | null;
  brand: Brand | null;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
};


async function fetchAPI<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return (Array.isArray([]) ? [] : null) as T;
    return res.json();
  } catch {
    return ([] as unknown) as T;
  }
}

export async function getPublishedProducts(params?: {
  categorySlug?: string;
  inStock?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  brandSlug?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  const url = new URL(`${API_BASE}/api/products/published`);
  if (params?.categorySlug) url.searchParams.set("category", params.categorySlug);
  if (params?.inStock !== undefined) url.searchParams.set("inStock", String(params.inStock));
  if (params?.featured) url.searchParams.set("featured", "true");
  if (params?.newArrival) url.searchParams.set("newArrival", "true");
  if (params?.brandSlug) url.searchParams.set("brand", params.brandSlug);
  if (params?.limit !== undefined) url.searchParams.set("limit", String(params.limit));
  if (params?.skip !== undefined) url.searchParams.set("skip", String(params.skip));
  if (params?.sortBy) url.searchParams.set("sortBy", params.sortBy);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.minPrice !== undefined) url.searchParams.set("minPrice", String(params.minPrice));
  if (params?.maxPrice !== undefined) url.searchParams.set("maxPrice", String(params.maxPrice));

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/published/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>("/api/categories");
}

export async function getBrands(): Promise<Brand[]> {
  return fetchAPI<Brand[]>("/api/brands");
}

