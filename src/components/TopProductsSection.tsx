import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";

export default function TopProductsSection({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} badge="top" />
      ))}
    </div>
  );
}
