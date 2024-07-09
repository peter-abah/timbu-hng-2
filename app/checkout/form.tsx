"use client";

import { formatPrice } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import backIcon from "@/public/images/back.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  phone: z.string().min(1, { message: "Enter phone number" }),
  address: z.string().min(1, { message: "Enter address" }),
  cardNo: z
    .string({ message: "Enter card number" })
    .regex(/^\d{8,19}$/, { message: "Invalid card number" }),
  expDate: z.string().min(1, { message: "Enter card expiry date" }),
  cvv: z.string().regex(/^\d{3}$/, { message: "Invalid CVV" }),
  cardPin: z.string().min(1, { message: "Enter PIN" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CheckoutForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const router = useRouter();
  const clearCart = useAppContext((state) => state.clearCart);
  const cart = useAppContext((state) => state.cart);
  const deliveryFee = useAppContext((state) => state.deliveryFee);
  const products = Object.values(cart.items);
  const subtotal = products.reduce((res, curr) => res + curr.price * curr.quantity, 0);

  const onSubmit = () => {
    router.push("/order-success");
    clearCart();
  };

  return (
    <section className="px-6 min-h-screen md:px-[4.5rem] pt-2 pb-14 md:py-[78px] w-full bg-white gap-2 stack">
      <header className="stack gap-1">
        <Link href="/cart" className="flex gap-0.5 md:gap-1 items-center group">
          <Image
            src={backIcon}
            alt=""
            className="group-hover:-translate-x-1.5 transition-transform"
          />
          <span className="text-xs md:text-base text-purple group-hover:underline">
            Back to cart
          </span>
        </Link>
        <h1 className="text-xl md:text-[32px] text-gray-9 font-semibold">Checkout</h1>
      </header>

      <form className="stack gap-6 md:gap-16" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-sm md:text-base">
          Complete your purchase by providing your personal and payment details
        </h2>
        <div className="stack gap-10 md:gap-16">
          <div className="stack gap-4 md:gap-16">
            <div className="stack gap-4">
              <div className="stack gap-2">
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  id="email"
                  className="rounded-lg border border-gray-2 py-3 px-4 focus-visible:outline-purple-3"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs">{errors.email.message}</p>}
              </div>

              <div className="stack gap-2">
                <label htmlFor="phone">Your Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  className="rounded-lg border border-gray-2 py-3 px-4 focus-visible:outline-purple-3"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-xs">{errors.phone.message}</p>}
              </div>

              <div className="stack gap-2">
                <label htmlFor="address">Your Address</label>
                <input
                  type="text"
                  id="address"
                  className="rounded-lg border border-gray-2 py-3 px-4 focus-visible:outline-purple-3"
                  {...register("address")}
                />
                {errors.address && <p className="text-xs">{errors.address.message}</p>}
              </div>
            </div>

            <div className="stack gap-4">
              <div className="stack gap-2">
                <label htmlFor="card-no">Add Card Number</label>
                <input
                  type="text"
                  id="card-no"
                  placeholder="Enter 12 digit card number"
                  className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-gray-2 focus-visible:outline-purple-3"
                  {...register("cardNo")}
                />
                {errors.cardNo && <p className="text-xs">{errors.cardNo.message}</p>}
              </div>

              <div className="flex gap-4">
                <div className="stack gap-2">
                  <label htmlFor="exp-date">Expiry date</label>
                  <input
                    type="text"
                    id="exp-date"
                    placeholder="MM/YY"
                    className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-gray-2 focus-visible:outline-purple-3"
                    {...register("expDate")}
                  />
                  {errors.expDate && <p className="text-xs">{errors.expDate.message}</p>}
                </div>

                <div className="stack gap-2">
                  <label htmlFor="exp-date">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="e.g 123"
                    className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-gray-2 focus-visible:outline-purple-3"
                    {...register("cvv")}
                  />
                  {errors.cvv && <p className="text-xs">{errors.cvv.message}</p>}
                </div>
              </div>

              <div className="stack gap-2">
                <label htmlFor="card-pin">Card PIN</label>
                <input
                  type="password"
                  id="card-pin"
                  placeholder="Enter your 4 digit PIN"
                  className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-gray-2 focus-visible:outline-purple-3"
                  {...register("cardPin")}
                />
                {errors.cardPin && <p className="text-xs">{errors.cardPin.message}</p>}
              </div>
            </div>
          </div>

          <div className="w-full stack gap-1 md:hidden">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="stack gap-4 p-4 bg-bg-main border-gray-1 border rounded-lg">
              <p className="flex justify-between">
                <span>Sub-total</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </p>
              <p className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal + deliveryFee)}</span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center hover:bg-purple-3/90 hover:box-shadow-purple"
          >
            Pay now
          </button>
        </div>
      </form>
    </section>
  );
}
