"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";

type RecentItem = {
  id: string;
  name: string;
  price: number;
  actualPrice: number;
  image: string;
  categoryName: string;
  categorySlug: string;
};

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyViewed") ?? "[]") as RecentItem[];
      setItems(stored.filter((p) => p.id !== excludeId));
    } catch {}
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <section className="py-8 border-t border-slate-100">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => {
          const discount =
            item.actualPrice > item.price
              ? Math.round(((item.actualPrice - item.price) / item.actualPrice) * 100)
              : 0;
          return (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group flex-shrink-0 w-36 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <div className="relative aspect-square bg-slate-50 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="144px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <Package className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs text-indigo-600 font-semibold truncate mb-0.5">{item.categoryName}</p>
                <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors mb-1.5">
                  {item.name}
                </p>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-sm font-bold text-slate-900">₹{item.price.toFixed(0)}</span>
                  {discount > 0 && (
                    <span className="text-xs text-slate-400 line-through">₹{item.actualPrice.toFixed(0)}</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
