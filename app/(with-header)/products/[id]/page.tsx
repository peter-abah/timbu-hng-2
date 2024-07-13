import { fetchProducts } from "@/lib/timbu";
import { notFound } from "next/navigation";
import Product from "./product";

export async function generateStaticParams() {
  const { items: products } = await fetchProducts();
  return products.map(({ id }) => ({ id }));
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  // For some reason the current_price field in the product is null when I use the GET product endpoint,
  // while the current_price is available when GET products endpoint is used.
  // This is the reason I fetching all the products and filtering to get the specific product
  // Though it looks wasteful, since this is a server component nextjs automatically caches the request the
  // first time it is run in and the cached data is used for subsequent requests,
  // so the endpoint should be called once.
  const { items: products } = await fetchProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <Product product={product} />;
}
