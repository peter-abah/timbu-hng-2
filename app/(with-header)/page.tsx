"use client";

import ProductCard from "@/components/product-card";
import { groupBy } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import cartIcon from "@/public/images/cart.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cartItemsNo = useAppContext((state) => Object.values(state.cart.items).length);
  const products = useAppContext((state) => state.products);
  const productsByCategory = groupBy(products, (p) => p.category);
  const categories = Object.keys(productsByCategory);

  return (
    <main className="max-w-full lg:max-w-[1072px] mx-auto md:my-[55px] flex flex-col gap-8 pl-6 md:px-6">
      <header className="md:flex justify-between hidden">
        <h1 className="text-[2rem] font-semibold">Product Listing</h1>
        <Link
          href="/cart"
          className="grid place-items-center w-10 h-10 rounded-full border-gray border bg-white relative hover:box-shadow-purple"
        >
          <Image src={cartIcon} alt="" />
          {cartItemsNo > 0 && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-purple"></span>
          )}
        </Link>
      </header>

      <section className="stack gap-12 md:gap-8 py-4 md:py-0">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-gray-4 md:text-xl font-semibold">{category}</h2>
            <ul className="flex overflow-x-auto shrink grow-0 gap-4 md:gap-8">
              {productsByCategory[category].map((product, i) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
