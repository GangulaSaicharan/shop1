"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";

export default function NewArrivalsCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("a");
    if (!card) return;
    const step = card.offsetWidth + 16;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  }

  useEffect(() => {
    if (isPaused || products.length <= 1) return;
    
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused, products.length]);

  return (
    <div 
      className="relative -mx-4 sm:mx-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[72%] sm:auto-cols-[46%] md:auto-cols-[30%] lg:auto-cols-[22%] gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-0 pb-1"
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} badge="new" />
          </div>
        ))}
      </div>

      {/* Prev / Next — desktop only */}
      <button
        onClick={() => scroll("left")}
        aria-label="Previous"
        className="hidden lg:flex absolute -left-5 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Next"
        className="hidden lg:flex absolute -right-5 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
