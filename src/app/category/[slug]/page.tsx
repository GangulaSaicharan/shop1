import { getPublishedProducts, getCategories } from "@/lib/api";
import InfiniteProductGrid from "@/components/InfiniteProductGrid";
import CategoryBar from "@/components/CategoryBar";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ inStock?: string; sortBy?: string; search?: string; minPrice?: string; maxPrice?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const categorySlug = slug === "all" ? undefined : slug;

  const [categories, initialProducts] = await Promise.all([
    getCategories(),
    getPublishedProducts({
      categorySlug,
      inStock: sp.inStock === "true" ? true : sp.inStock === "false" ? false : undefined,
      sortBy: sp.sortBy,
      search: sp.search,
      minPrice: sp.minPrice ? parseFloat(sp.minPrice) : undefined,
      maxPrice: sp.maxPrice ? parseFloat(sp.maxPrice) : undefined,
      limit: 10,
    }),
  ]);

  const categoryName = slug === "all"
    ? "All Products"
    : categories.find((c) => c.slug === slug)?.name || "Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
      <CategoryBar categories={categories} selected={slug} />

      <div className="my-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{categoryName}</h1>
      </div>

      <InfiniteProductGrid
        initialProducts={initialProducts}
        categories={categories}
        categorySlug={slug}
        inStock={sp.inStock ?? ""}
        sortBy={sp.sortBy ?? ""}
        search={sp.search ?? ""}
        minPrice={sp.minPrice ?? ""}
        maxPrice={sp.maxPrice ?? ""}
      />
    </div>
  );
}
