import { fetchProducts } from "@/lib/timbu";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Product from "./product";

export async function generateStaticParams() {
  const { items: products } = await fetchProducts();
  return products.map(({ id }) => ({ id }));
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const product = await fetchProduct(id);

  return {
    title: product?.name,
    description: product?.description,
  };
}

const fetchProduct = async (id: string) => {
  // For some reason the current_price field in the product is null when I use the GET product endpoint,
  // while the current_price is available when GET products endpoint is used.
  // This is the reason I fetching all the products and filtering to get the specific product
  // Though it looks wasteful, since this is a server component nextjs automatically caches the request the
  // first time it is run in and the cached data is used for subsequent requests,
  // so the endpoint should be called once.
  const { items: products } = await fetchProducts();
  return products.find((p) => p.id === id);
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  return <Product product={product} />;
}
