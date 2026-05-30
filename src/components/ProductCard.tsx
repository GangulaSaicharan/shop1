import Image from "next/image";
import Link from "next/link";
import { Package, Sparkles, Star } from "lucide-react";
import type { Product } from "@/lib/api";

function discountPercent(actual: number, price: number) {
  if (actual <= price) return 0;
  return Math.round(((actual - price) / actual) * 100);
}

type Props = {
  product: Product;
  badge: "new" | "top";
};

export default function ProductCard({ product, badge }: Props) {
  const inStock = product.variants.some((v) => v.stock > 0);
  const image = product.variants[0]?.images[0]?.url;

  // Pricing — find variant with lowest selling price, use its MRP for discount
  const variantPrices = product.variants.map((v) => v.price ?? product.price);
  const minPrice = Math.min(...variantPrices);
  const isRanged = new Set(variantPrices).size > 1;
  const minVariant = product.variants.find((v) => (v.price ?? product.price) === minPrice) ?? null;
  const effectiveMrp = minVariant?.actualPrice ?? product.actualPrice;
  const discount = discountPercent(effectiveMrp, minPrice);

  // Variant swatches — collect unique values for the primary attribute key
  const attrKeys: string[] = [];
  product.variants.forEach((v) =>
    v.attributes.forEach((a) => { if (!attrKeys.includes(a.key)) attrKeys.push(a.key); })
  );
  const primaryKey = attrKeys[0] ?? null;
  const primaryValues = primaryKey
    ? [...new Set(product.variants.flatMap((v) =>
      v.attributes.filter((a) => a.key === primaryKey).map((a) => a.value)
    ))]
    : [];
  const isColor = !!primaryKey?.toLowerCase().includes("color") || !!primaryKey?.toLowerCase().includes("colour");
  const MAX_SWATCHES = 5;
  const overflow = Math.max(0, primaryValues.length - MAX_SWATCHES);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-square bg-white overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Package className="w-10 h-10" />
          </div>
        )}

        <div className="absolute top-2.5 left-2.5">
          {badge === "new" ? (
            <span className="flex items-center gap-1 bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-violet-200">
              <Sparkles className="w-3 h-3" /> New
            </span>
          ) : (
            <span className="flex items-center gap-0.5 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg shadow-amber-200">
              <Star className="w-3 h-3 fill-white" /> Top
            </span>
          )}
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              Out of Stock
            </span>
          </div>
        )}

        {discount > 0 && inStock && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-1.5 min-w-0">
          <p className="text-xs font-semibold text-indigo-600 truncate">{product.category.name}</p>
          {product.brand && (
            <span className="text-xs text-slate-400 truncate shrink-0">· {product.brand.name}</span>
          )}
        </div>
        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
          {product.name}
        </h3>

        {/* Variant swatches */}
        {/* {primaryKey && primaryValues.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            {primaryValues.slice(0, MAX_SWATCHES).map((val) =>
              isColor ? (
                <span
                  key={val}
                  title={val}
                  style={{ backgroundColor: val.toLowerCase().replace(/\s+/g, "") }}
                  className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0 shadow-sm"
                />
              ) : (
                <span
                  key={val}
                  className="text-xs px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium border border-slate-200 leading-tight"
                >
                  {val}
                </span>
              )
            )}
            {overflow > 0 && (
              <span className="text-xs text-slate-400 font-medium">+{overflow}</span>
            )}
          </div>
        )} */}

        <div className="mt-auto pt-2.5 border-t border-slate-50 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="font-bold text-slate-900 text-sm">
              {isRanged ? "From " : ""}₹{minPrice.toFixed(0)}
            </span>
            {!isRanged && (
              <span className="text-xs text-slate-400 line-through ml-1.5">
                ₹{effectiveMrp.toFixed(0)}
              </span>
            )}
          </div>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${inStock ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-400"
              }`}
          >
            {inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>
    </Link>
  );
}
