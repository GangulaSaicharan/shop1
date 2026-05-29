"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-400" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">Something went wrong</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
        Unexpected error
      </h1>
      <p className="text-slate-500 text-base max-w-sm mb-8 leading-relaxed">
        An error occurred while loading this page. Please try again or go back to the shop.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>
      </div>
    </div>
  );
}
