"use client";

import { formatPrice } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import backIcon from "@/public/images/back.svg";

import CartProduct from "@/components/cart-product";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const cart = useAppContext((state) => state.cart);
  const deliveryFee = useAppContext((state) => state.deliveryFee);
  const products = Object.values(cart.items);
  const subtotal = products.reduce((res, curr) => res + curr.price * curr.quantity, 0);

  return (
    <main className="w-full max-w-[676px] mx-auto my-6 bg-white py-6 px-[4.5rem] stack gap-4 rounded-3xl">
      <header className="stack gap-1">
        <Link href="/" className="flex gap-1 items-center group">
          <Image
            src={backIcon}
            alt=""
            className="group-hover:-translate-x-1.5 transition-transform"
          />
          <span className="text-purple group-hover:underline">Continue shopping</span>
        </Link>
        <h1 className="text-[32px] text-gray-9 font-semibold">My Cart</h1>
      </header>

      {products.length > 0 ? (
        <div className="stack gap-10">
          <ul>
            {products.map((product, i) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </ul>

          <div className="stack gap-4">
            <p className="flex justify-between text-xl">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </p>
            <p className="flex justify-between text-xl">
              <span>Delivery fee</span>
              <span>{formatPrice(deliveryFee)}</span>
            </p>
            <p className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal + deliveryFee)}</span>
            </p>
          </div>

          <Link
            href="/checkout"
            className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center hover:bg-purple-3/90 hover:box-shadow-purple"
          >
            Checkout
          </Link>
        </div>
      ) : (
        <div className="py-40">
          <p className="text-center text-gray-4 text-2xl">Nothing in cart yet.</p>
        </div>
      )}
    </main>
  );
}
