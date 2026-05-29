"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Tag, Package, Phone, Mail, MapPin,
  ShoppingBag, CheckCircle2, XCircle, Share2, Check, ZoomIn, X,
} from "lucide-react";
import type { Product, ProductVariant } from "@/lib/api";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function discountPercent(actual: number, price: number) {
  if (actual <= price) return 0;
  return Math.round(((actual - price) / actual) * 100);
}

export default function ProductDetail({ product, variantId }: { product: Product; variantId?: string }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [showShopModal, setShowShopModal] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const target = variantId
      ? (product.variants.find((v) => v.id === variantId) ?? product.variants[0])
      : product.variants[0];
    if (!target) return {};
    return Object.fromEntries(target.attributes.map((a) => [a.key, a.value]));
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Save to recently viewed on mount
  useEffect(() => {
    try {
      const key = "recentlyViewed";
      const stored = JSON.parse(localStorage.getItem(key) ?? "[]") as { id: string }[];
      const filtered = stored.filter((p) => p.id !== product.id);
      const entry = {
        id: product.id,
        name: product.name,
        price: product.price,
        actualPrice: product.actualPrice,
        image: product.variants[0]?.images[0]?.url ?? "",
        categoryName: product.category.name,
        categorySlug: product.category.slug,
      };
      localStorage.setItem(key, JSON.stringify([entry, ...filtered].slice(0, 5)));
    } catch { }
  }, [product]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Unique attribute keys across all variants
  const attributeKeys = useMemo(() => {
    const keys: string[] = [];
    product.variants.forEach((v) =>
      v.attributes.forEach((a) => { if (!keys.includes(a.key)) keys.push(a.key); })
    );
    return keys;
  }, [product.variants]);

  // Values per key
  function valuesForKey(key: string) {
    const vals: string[] = [];
    product.variants.forEach((v) =>
      v.attributes.forEach((a) => { if (a.key === key && !vals.includes(a.value)) vals.push(a.value); })
    );
    return vals;
  }

  // Find matched variant from current selection
  const matchedVariant: ProductVariant | null = useMemo(() => {
    if (Object.keys(selected).length !== attributeKeys.length) return null;
    return (
      product.variants.find((v) =>
        Object.entries(selected).every(([key, val]) =>
          v.attributes.some((a) => a.key === key && a.value === val)
        )
      ) ?? null
    );
  }, [selected, product.variants, attributeKeys]);

  // Sync selected variant to URL so sharing preserves the selection
  useEffect(() => {
    const url = new URL(window.location.href);
    if (matchedVariant) {
      url.searchParams.set("variant", matchedVariant.id);
    } else {
      url.searchParams.delete("variant");
    }
    router.replace(url.pathname + url.search, { scroll: false });
  }, [matchedVariant?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if a value is available given current selections (excluding that key)
  function isValueAvailable(key: string, val: string) {
    const others = Object.entries(selected).filter(([k]) => k !== key);
    return product.variants.some((v) => {
      const hasThisAttr = v.attributes.some((a) => a.key === key && a.value === val);
      const matchesOthers = others.every(([k, sv]) => v.attributes.some((a) => a.key === k && a.value === sv));
      return hasThisAttr && matchesOthers;
    });
  }

  const displayActualPrice = matchedVariant?.actualPrice ?? product.actualPrice;
  const displayPrice = matchedVariant?.price ?? product.price;
  const displayStock = matchedVariant ? matchedVariant.stock : null;
  const inStock = displayStock !== null && displayStock > 0;
  const discount = discountPercent(displayActualPrice, displayPrice);
  const allSelected = Object.keys(selected).length === attributeKeys.length;

  const displayImages = matchedVariant?.images ?? [];
  const image = displayImages[activeImage]?.url;

  // Reset carousel position when active variant changes
  useEffect(() => { setActiveImage(0); }, [matchedVariant]);

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-600 flex items-center gap-1 transition">
          <ChevronLeft className="w-4 h-4" /> Shop
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-slate-600 transition">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-slate-600 truncate max-w-48">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div
            className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 group cursor-zoom-in"
            onClick={() => image && setLightboxOpen(true)}
          >
            {image ? (
              <Image src={image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200">
                <Package className="w-20 h-20" />
              </div>
            )}
            {image && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <div className="bg-white/90 rounded-full p-2 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-slate-700" />
                </div>
              </div>
            )}
          </div>
          {displayImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {displayImages.map((img, i) => (
                <button key={img.id} onClick={() => setActiveImage(i)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${activeImage === i ? "border-indigo-500" : "border-transparent hover:border-slate-200"
                    }`}>
                  <Image src={img.url} alt="" fill sizes="64px" className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Category + Brand */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              <Link href={`/category/${product.category.slug}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                {product.category.name}
              </Link>
            </div>
            {product.brand && (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                {product.brand.logoUrl ? (
                  <div className="relative h-4 w-12"><Image src={product.brand.logoUrl} alt={product.brand.name} fill sizes="48px" className="object-contain" /></div>
                ) : null}
                <span className="text-xs font-semibold text-slate-600">{product.brand.name}</span>
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <button
              onClick={handleShare}
              title="Copy link"
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition mt-1",
                copied
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              )}
            >
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Share2 className="w-3.5 h-3.5" /> Share</>}
            </button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-slate-900">₹{displayPrice.toFixed(2)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">₹{displayActualPrice.toFixed(2)}</span>
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-lg">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock status — only show when variant is fully selected */}
          {allSelected && (
            <div className={`inline-flex items-center gap-2 text-sm font-medium mb-5 ${inStock ? "text-green-700" : "text-red-500"}`}>
              {inStock ? (
                <><CheckCircle2 className="w-4 h-4" /> In Stock{displayStock !== null && ` (${displayStock} available)`}</>
              ) : (
                <><XCircle className="w-4 h-4" /> Out of Stock</>
              )}
            </div>
          )}

          {/* Variant selectors */}
          {attributeKeys.length > 0 && (
            <div className="mb-6 space-y-4">
              {attributeKeys.map((key) => (
                <div key={key}>
                  <p className="text-sm font-semibold text-slate-700 mb-2">
                    {key}
                    {selected[key] && <span className="font-normal text-slate-400 ml-1">— {selected[key]}</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {valuesForKey(key).map((val) => {
                      const available = isValueAvailable(key, val);
                      const isActive = selected[key] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setSelected((prev) => ({ ...prev, [key]: val }))}
                          disabled={!available}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium border transition",
                            isActive
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : available
                                ? "bg-white border-slate-200 text-slate-700 hover:border-indigo-400"
                                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed line-through"
                          )}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {Object.keys(selected).length < attributeKeys.length && (
                <p className="text-xs text-amber-600 font-medium">
                  Please select {attributeKeys.filter((k) => !selected[k]).join(", ")} to continue
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">Description</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{product.description}</p>
            </div>
          )}

          {/* Buy button */}
          <button
            onClick={() => setShowShopModal(true)}
            disabled={!inStock || !allSelected}
            className="mt-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold px-6 py-4 rounded-xl transition text-base w-full sm:w-auto"
          >
            <ShoppingBag className="w-5 h-5" />
            {!allSelected ? "Select options above" : inStock ? "Buy Now — Contact Shop" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          <Image
            src={image}
            alt={product.name}
            width={1200}
            height={1200}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          />

          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImage((i) => (i - 1 + displayImages.length) % displayImages.length); }}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImage((i) => (i + 1) % displayImages.length); }}
                className="absolute right-16 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 flex gap-1.5">
                {displayImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                    className={`w-2 h-2 rounded-full transition ${i === activeImage ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Shop contact modal */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Visit Our Shop</h2>
              <button onClick={() => setShowShopModal(false)}
                className="text-slate-400 hover:text-slate-600 transition text-xl leading-none">✕</button>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 mb-5 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-indigo-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-indigo-900">{site.name}</p>
                <p className="text-xs text-indigo-600">We&apos;d love to serve you!</p>
              </div>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Address</p>
                  <p className="text-sm text-slate-700 font-medium">{site.contact.address}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Phone</p>
                  <a href={site.contact.phoneHref} className="text-sm text-indigo-600 font-medium hover:underline">{site.contact.phone}</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Email</p>
                  <a href={site.contact.emailHref} className="text-sm text-indigo-600 font-medium hover:underline">{site.contact.email}</a>
                </div>
              </li>
            </ul>
            <button onClick={() => setShowShopModal(false)}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
