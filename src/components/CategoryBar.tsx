"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Category = { id: string; name: string; slug: string };

const COLORS = [
  { bg: "bg-indigo-50 border-indigo-100", active: "bg-indigo-600 border-indigo-600 text-white shadow-indigo-200", text: "text-indigo-700" },
  { bg: "bg-violet-50 border-violet-100", active: "bg-violet-600 border-violet-600 text-white shadow-violet-200", text: "text-violet-700" },
  { bg: "bg-pink-50 border-pink-100", active: "bg-pink-600 border-pink-600 text-white shadow-pink-200", text: "text-pink-700" },
  { bg: "bg-amber-50 border-amber-100", active: "bg-amber-500 border-amber-500 text-white shadow-amber-200", text: "text-amber-700" },
  { bg: "bg-emerald-50 border-emerald-100", active: "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200", text: "text-emerald-700" },
  { bg: "bg-cyan-50 border-cyan-100", active: "bg-cyan-600 border-cyan-600 text-white shadow-cyan-200", text: "text-cyan-700" },
  { bg: "bg-rose-50 border-rose-100", active: "bg-rose-600 border-rose-600 text-white shadow-rose-200", text: "text-rose-700" },
];

export default function CategoryBar({ categories, selected }: { categories: Category[]; selected: string }) {
  const router = useRouter();

  function handleClick(slug: string) {
    router.push(`/category/${slug}`);
  }

  function handleAllClick() {
    router.push("/category/all");
  }

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide">
      {/* All button */}
      <button
        onClick={handleAllClick}
        className={cn(
          "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all shadow-sm",
          !selected
            ? "bg-slate-900 border-slate-900 text-white shadow-slate-200"
            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
        All
      </button>

      {categories.map((cat, i) => {
        const c = COLORS[i % COLORS.length];
        const isActive = selected === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.slug)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all shadow-sm",
              isActive
                ? `${c.active} shadow-md`
                : `${c.bg} ${c.text} hover:shadow-md hover:scale-105`
            )}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
