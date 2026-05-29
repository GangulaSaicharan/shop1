"use client";

import { useState, useRef, useCallback } from "react";
import ProductGrid from "@/components/ProductGrid";
import type { Product, Category } from "@/lib/api";
import { fetchNextProducts } from "@/lib/actions";

export default function InfiniteProductGrid({
  initialProducts,
  categories,
  categorySlug,
  inStock,
  sortBy,
  search,
  minPrice = "",
  maxPrice = "",
}: {
  initialProducts: Product[];
  categories: Category[];
  categorySlug: string;
  inStock: string;
  sortBy: string;
  search: string;
  minPrice?: string;
  maxPrice?: string;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.length >= 10);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  async function loadMore() {
    setIsLoading(true);
    const nextProducts = await fetchNextProducts(
      page * 10,
      10,
      categorySlug,
      inStock,
      sortBy,
      search,
      minPrice,
      maxPrice,
    );
    
    if (nextProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => {
        // filter out duplicates just in case
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNext = nextProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNext];
      });
      setPage((prev) => prev + 1);
      if (nextProducts.length < 10) setHasMore(false);
    }
    setIsLoading(false);
  }

  return (
    <div className="pb-16">
      <ProductGrid
        products={products}
        categories={categories}
        selectedCategory={categorySlug === "all" ? "" : categorySlug}
        selectedInStock={inStock}
        selectedSortBy={sortBy}
        selectedSearch={search}
        selectedMinPrice={minPrice}
        selectedMaxPrice={maxPrice}
        hideCategoryDropdown={true}
      />
      
      {hasMore && (
        <div ref={lastElementRef} className="py-8 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="py-12 text-center text-slate-500 font-medium">
          You have reached the end of the list!
        </div>
      )}
    </div>
  );
}
