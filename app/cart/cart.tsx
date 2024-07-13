"use client";

import { formatPrice } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import backIcon from "@/public/images/back.svg";

import CartProduct from "@/components/cart-product";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cart = useAppContext((state) => state.cart);
  const clearCart = useAppContext((state) => state.clearCart);
  const deliveryFee = useAppContext((state) => state.deliveryFee);
  const products = Object.values(cart.items);
  const subtotal = products.reduce(
    (res, curr) => res + curr.current_price * curr.quantity,
    0
  );
  const router = useRouter();

  return (
    <>
      <Header className="!hidden !md:flex" />

      <main className="w-full md:max-w-[676px] min-h-screen md:min-h-0 mx-auto md:my-6 bg-white p-6 md:px-[4.5rem] stack gap-4 md:rounded-3xl">
        <header className="stack gap-1">
          <button
            onClick={() => router.back()}
            className="flex gap-0.5 md:gap-1 items-center group"
          >
            <Image
              src={backIcon}
              alt=""
              className="group-hover:-translate-x-1.5 transition-transform"
            />
            <span className="text-xs md:text-base text-purple group-hover:underline">
              Continue shopping
            </span>
          </button>
          <h1 className="text-xl md:text-[32px] text-gray-9 font-semibold">My Cart</h1>
        </header>

        {products.length > 0 ? (
          <div className="stack gap-10">
            <ul>
              {products.map((product, i) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </ul>

            <div className="stack gap-4">
              <p className="flex justify-between md:text-xl">
                <span>Sub-total</span>
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

            <div className="stack gap-2">
              <Link
                href="/checkout"
                className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center hover:bg-purple-3/90 hover:box-shadow-purple"
              >
                Checkout
              </Link>
              <button
                onClick={() => clearCart()}
                className="px-4 py-3 bg-orange-700 text-white font-semibold rounded-lg text-center hover:bg-orange-700/90 hover:box-shadow-purple"
              >
                Clear cart
              </button>
            </div>
          </div>
        ) : (
          <div className="py-40">
            <p className="text-center text-gray-4 text-2xl">Nothing in cart yet.</p>
          </div>
        )}
      </main>
    </>
  );
}
