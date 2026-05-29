import Link from "next/link";
import { PackageSearch, ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6">
        <PackageSearch className="w-10 h-10 text-indigo-400" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">404</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
        Page not found
      </h1>
      <p className="text-slate-500 text-base max-w-sm mb-8 leading-relaxed">
        We couldn&apos;t find what you were looking for. It may have been removed or the link might be wrong.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {site.name}
        </Link>
        <Link
          href="/category/all"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition"
        >
          Browse all products
        </Link>
      </div>
    </div>
  );
}
