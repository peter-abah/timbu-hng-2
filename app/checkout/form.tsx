"use client";

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

  const onSubmit = () => {
    router.push("/order-success");
    clearCart();
  };

  return (
    <section className="px-[4.5rem] py-[78px] w-full bg-white gap-2">
      <div className="stack gap-1">
        <Link href="/cart" className="flex gap-1 items-center group">
          <Image
            src={backIcon}
            alt=""
            className="group-hover:-translate-x-1.5 transition-transform"
          />
          <span className="text-purple hover:underline">Back to cart</span>
        </Link>
        <h1 className="text-[32px] text-gray-9 font-semibold">Checkout</h1>
      </div>

      <form className="stack gap-16" onSubmit={handleSubmit(onSubmit)}>
        <h2>Complete your purchase by providing your personal and payment details</h2>

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
              placeholder="**** **** 1234"
              className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-current focus-visible:outline-purple-3"
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
                className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-current focus-visible:outline-purple-3"
                {...register("expDate")}
              />
              {errors.expDate && <p className="text-xs">{errors.expDate.message}</p>}
            </div>

            <div className="stack gap-2">
              <label htmlFor="exp-date">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="CVV"
                className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-current focus-visible:outline-purple-3"
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
              className="rounded-lg border border-gray-2 py-3 px-4 focus-visible:outline-purple-3"
              {...register("cardPin")}
            />
            {errors.cardPin && <p className="text-xs">{errors.cardPin.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center hover:bg-purple-3/90 hover:box-shadow-purple"
        >
          Pay now
        </button>
      </form>
    </section>
  );
}
