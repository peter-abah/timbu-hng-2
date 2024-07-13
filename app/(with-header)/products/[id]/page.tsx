import { fetchProduct, fetchProducts } from "@/lib/timbu";
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

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  return <Product product={product} />;
}
