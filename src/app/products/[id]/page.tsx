import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";
import RecentlyViewed from "@/components/RecentlyViewed";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const { id } = await params;
  const { variant } = await searchParams;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductDetail product={product} variantId={variant} />
      <RecentlyViewed excludeId={id} />
    </div>
  );
}
