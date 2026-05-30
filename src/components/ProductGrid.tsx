"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Package, SlidersHorizontal, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Category = { id: string; name: string; slug: string };
type Brand = { id: string; name: string; logoUrl: string } | null;
type ProductVariant = {
  id: string;
  name: string;
  stock: number;
  actualPrice: number | null;
  price: number | null;
  attributes: { key: string; value: string }[];
  images: { id: string; url: string; order: number }[];
};
type Product = {
  id: string;
  name: string;
  description: string;
  actualPrice: number;
  price: number;
  category: Category;
  brand: Brand;
  variants: ProductVariant[];
};

function discountPercent(actual: number, price: number) {
  if (actual <= price) return 0;
  return Math.round(((actual - price) / actual) * 100);
}

export default function ProductGrid({
  products,
  categories,
  selectedCategory,
  selectedInStock,
  selectedSortBy = "",
  selectedSearch = "",
  selectedMinPrice = "",
  selectedMaxPrice = "",
  hideCategoryDropdown = false,
  hideAvailabilityDropdown = false,
}: {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  selectedInStock: string;
  selectedSortBy?: string;
  selectedSearch?: string;
  selectedMinPrice?: string;
  selectedMaxPrice?: string;
  hideCategoryDropdown?: boolean;
  hideAvailabilityDropdown?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(selectedSearch);
  const [minPriceInput, setMinPriceInput] = useState(selectedMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(selectedMaxPrice);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== selectedSearch) updateFilter("search", searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm, selectedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (minPriceInput !== selectedMinPrice) updateFilter("minPrice", minPriceInput);
    }, 600);
    return () => clearTimeout(handler);
  }, [minPriceInput, selectedMinPrice]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (maxPriceInput !== selectedMaxPrice) updateFilter("maxPrice", maxPriceInput);
    }, 600);
    return () => clearTimeout(handler);
  }, [maxPriceInput, selectedMaxPrice]);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams();
    let path = pathname;

    if (pathname.startsWith("/category")) {
      let newCategory = selectedCategory;
      if (key === "category") newCategory = value || "all";
      path = `/category/${newCategory}`;
    } else {
      if (key === "category" && value) params.set("category", value);
      else if (key !== "category" && selectedCategory) params.set("category", selectedCategory);
      path = "/";
    }

    if (key === "inStock" && value) params.set("inStock", value);
    else if (key !== "inStock" && selectedInStock) params.set("inStock", selectedInStock);

    if (key === "sortBy" && value) params.set("sortBy", value);
    else if (key !== "sortBy" && selectedSortBy) params.set("sortBy", selectedSortBy);

    if (key === "search" && value) params.set("search", value);
    else if (key !== "search" && selectedSearch) params.set("search", selectedSearch);

    if (key === "minPrice" && value) params.set("minPrice", value);
    else if (key !== "minPrice" && selectedMinPrice) params.set("minPrice", selectedMinPrice);

    if (key === "maxPrice" && value) params.set("maxPrice", value);
    else if (key !== "maxPrice" && selectedMaxPrice) params.set("maxPrice", selectedMaxPrice);

    const qs = params.toString();
    router.push(qs ? `${path}?${qs}` : path, { scroll: false });
  }

  const hasFilters = selectedCategory || selectedInStock || selectedMinPrice || selectedMaxPrice;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 mb-8 p-4 sm:p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center justify-between w-full xl:w-auto xl:justify-start gap-4 text-slate-600 flex-shrink-0 pr-2 xl:pr-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-wide uppercase text-slate-700">Filter</span>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            {products.reduce((sum, p) => sum + p.variants.length, 0)} result{products.reduce((sum, p) => sum + p.variants.length, 0) !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 w-full xl:w-auto pb-2 xl:pb-0">
          <div className="relative group flex-1 sm:flex-none sm:w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border bg-slate-50/50 text-slate-700 border-slate-200 hover:bg-white focus:bg-white hover:border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 w-full placeholder:text-slate-400 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
            {!hideCategoryDropdown && (
              <select
                value={selectedCategory}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border bg-slate-50/50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer appearance-none pr-9 relative shadow-sm"
                style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.65rem auto' }}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            )}

            <select
              value={selectedSortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border bg-slate-50/50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer appearance-none pr-9 relative shadow-sm"
              style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.65rem auto' }}
            >
              <option value="">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            {!hideAvailabilityDropdown && (
              <select
                value={selectedInStock}
                onChange={(e) => updateFilter("inStock", e.target.value)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border bg-slate-50/50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer appearance-none pr-9 relative shadow-sm"
                style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.65rem auto' }}
              >
                <option value="">All Availability</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            )}

            {/* Price range */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number" min="0" placeholder="Min"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="w-24 pl-6 pr-2 py-2 rounded-xl text-sm font-medium border bg-slate-50/50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm"
                />
              </div>
              <span className="text-slate-300 text-xs font-bold">—</span>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number" min="0" placeholder="Max"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="w-24 pl-6 pr-2 py-2 rounded-xl text-sm font-medium border bg-slate-50/50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm"
                />
              </div>
            </div>
          </div>
          {hasFilters && (
            <button onClick={() => {
              setMinPriceInput("");
              setMaxPriceInput("");
              if (pathname.startsWith("/category")) router.push("/category/all", { scroll: false });
              else router.push("/", { scroll: false });
            }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border bg-white text-slate-500 border-slate-200 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 shadow-sm ml-auto xl:ml-0">
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-semibold text-lg mb-1">No products found</p>
          <p className="text-slate-400 text-sm mb-4">Try adjusting your filters</p>
          {hasFilters && (
            <button onClick={() => router.push("/")}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline transition">
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products
            .flatMap((product) => product.variants.map((variant) => ({ product, variant })))
            .sort(() => Math.random() - 0.5)
            .map(({ product, variant }) => {
              const image = variant.images[0]?.url;
              const price = variant.price ?? product.price;
              const actualPrice = variant.actualPrice ?? product.actualPrice;
              const inStock = variant.stock > 0;
              const discount = discountPercent(actualPrice, price);

              return (
                <Link
                  key={variant.id}
                  href={`/products/${product.id}?variant=${variant.id}`}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square bg-white overflow-hidden">
                    {image ? (
                      <Image src={image} alt={`${product.name} – ${variant.name}`}
                        fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Package className="w-10 h-10" />
                      </div>
                    )}

                    {!inStock && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">Out of Stock</span>
                      </div>
                    )}

                    {discount > 0 && inStock && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">-{discount}%</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-xs font-semibold text-indigo-600">{product.category.name}</p>
                      {product.brand && <span className="text-xs text-slate-400">· {product.brand.name}</span>}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    {variant.name && (
                      <p className="text-xs text-slate-400 mt-0.5 mb-2 line-clamp-1">{variant.name}</p>
                    )}

                    <div className="mt-auto pt-2.5 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">₹{price.toFixed(0)}</span>
                        <span className="text-xs text-slate-400 line-through ml-1.5">₹{actualPrice.toFixed(0)}</span>
                      </div>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        inStock ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-400"
                      )}>
                        {inStock ? "In Stock" : "Sold Out"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

        </div>
      )}
    </div>
  );
}
