"use client";
import { formatPrice } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import CheckoutForm from "./form";

export default function Checkout() {
  const cart = useAppContext((state) => state.cart);
  const deliveryFee = useAppContext((state) => state.deliveryFee);
  const products = Object.values(cart.items);
  const subtotal = products.reduce((res, curr) => res + curr.price * curr.quantity, 0);

  return (
    <main className="min-h-screen relative lg:pl-[50%]">
      <section className="hidden lg:block top-0 left-0 pt-[72px] px-[5.4%] fixed w-[50%]">
        <div className="w-full stack gap-1">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="stack gap-4 p-4 bg-white border-gray-1 border rounded-lg">
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
        </div>
      </section>

      <CheckoutForm />
    </main>
  );
}
