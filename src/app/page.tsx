import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getPublishedProducts,
  getCategories,
} from "@/lib/api";
import NewArrivalsCarousel from "@/components/NewArrivalsCarousel";
import TopProductsSection from "@/components/TopProductsSection";
import ProductGrid from "@/components/ProductGrid";
import CategoryBar from "@/components/CategoryBar";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; inStock?: string; sortBy?: string; search?: string; minPrice?: string; maxPrice?: string }>;
}) {
  const sp = await searchParams;

  const [categories, newArrivals, topProducts, allProducts] =
    await Promise.all([
      getCategories(),
      getPublishedProducts({ newArrival: true }),
      getPublishedProducts({ featured: true }).then((p) => p.slice(0, 6)),
      getPublishedProducts({
        categorySlug: sp.category,
        inStock: sp.inStock === "true" ? true : sp.inStock === "false" ? false : undefined,
        sortBy: sp.sortBy,
        search: sp.search,
        minPrice: sp.minPrice ? parseFloat(sp.minPrice) : undefined,
        maxPrice: sp.maxPrice ? parseFloat(sp.maxPrice) : undefined,
        limit: 10,
      }),
    ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 border-b border-slate-100">
          <CategoryBar categories={categories} selected={sp.category ?? ""} />
        </div>

        {newArrivals.length > 0 && (
          <section className="py-2 lg:-4">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">Just In</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  New Arrivals
                  <span className="text-2xl">✨</span>
                </h2>
              </div>
            </div>
            <NewArrivalsCarousel products={newArrivals} />
          </section>
        )}

        {topProducts.length > 0 && (
          <section className="py-3 lg--8 border-t border-slate-100">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">Best Sellers</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  Top Products
                  <span className="text-2xl">⭐</span>
                </h2>
              </div>
            </div>
            <TopProductsSection products={topProducts} />
          </section>
        )}

        <section className="py-3 lg:py-6 border-t border-slate-100 pb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              {/* <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Browse All</p> */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">All Products</h2>
            </div>
          </div>
          <ProductGrid
            products={allProducts}
            categories={categories}
            selectedCategory={sp.category ?? ""}
            selectedInStock={sp.inStock ?? ""}
            selectedSortBy={sp.sortBy ?? ""}
            selectedSearch={sp.search ?? ""}
            selectedMinPrice={sp.minPrice ?? ""}
            selectedMaxPrice={sp.maxPrice ?? ""}
            hideAvailabilityDropdown={true}
          />
          <div className="mt-10 flex justify-center">
            <Link
              href={`/category/${sp.category || 'all'}${(() => {
                const qs = new URLSearchParams();
                if (sp.inStock) qs.set("inStock", sp.inStock);
                if (sp.sortBy) qs.set("sortBy", sp.sortBy);
                if (sp.search) qs.set("search", sp.search);
                const qString = qs.toString();
                return qString ? `?${qString}` : '';
              })()}`}
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold tracking-wide hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
    </div>
  );
}
