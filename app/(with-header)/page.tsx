"use client";

import { formatPrice, groupBy } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import cartIcon from "@/public/images/cart.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = useAppContext((state) => state.products);
  const productsByCategory = groupBy(products, (p) => p.category);
  const categories = Object.keys(productsByCategory);

  return (
    <main className="max-w-[1000px] mx-auto my-[55px] flex flex-col gap-8">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-semibold">Product Listing</h1>
        <Link
          href="/cart"
          className="grid place-items-center w-10 h-10 rounded-full border-gray border bg-white relative"
        >
          <Image src={cartIcon} alt="" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-purple"></span>
        </Link>
      </header>

      <section className="stack gap-8">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-gray-4 text-xl font-semibold">{category}</h2>
            <ul className="flex gap-8">
              {productsByCategory[category].map((product, i) => (
                <li key={i} className="stack gap-2 w-fit">
                  <div className="bg-white p-4 rounded-xl w-fit">
                    <Image src={product.image} alt={product.name} width={200} height={200} />
                  </div>
                  <div className="stack gap-1">
                    <p className="font-semibold leading-none">{product.name}</p>
                    <p className="leading-none">{formatPrice(product.price)}</p>
                  </div>
                  <Link
                    href="/cart"
                    className="bg-purple-3 text-white px-4 py-2.5 rounded-lg w-fit text-sm font-semibold"
                  >
                    Add to cart
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
