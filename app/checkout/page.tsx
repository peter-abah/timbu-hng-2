import backIcon from "@/public/images/back.svg";
import Image from "next/image";
import Link from "next/link";

export default function Checkout() {
  return (
    <main className="min-h-screen relative pl-[720px]">
      <section className="stack gap-1 top-[72px] left-[78px] fixed w-[564px]">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <div className="stack gap-4 p-4 bg-white border-gray-1 border rounded-lg">
          <p className="flex justify-between text-xl">
            <span>Subtotal</span>
            <span>₦150,000</span>
          </p>
          <p className="flex justify-between text-xl">
            <span>Delivery fee</span>
            <span>₦1,000</span>
          </p>
          <p className="flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span>₦151,000</span>
          </p>
        </div>
      </section>

      <section className="px-[4.5rem] py-[78px] w-full bg-white gap-2">
        <div className="stack gap-1">
          <Link href="/cart" className="flex gap-1 items-center">
            <Image src={backIcon} alt="" />
            <span className="text-purple">Back to cart</span>
          </Link>
          <h1 className="text-[32px] text-gray-9 font-semibold">Checkout</h1>
        </div>
        <form className="stack gap-16">
          <h2>Complete your purchase by providing your personal and payment details</h2>

          <div className="stack gap-4">
            <div className="stack gap-2">
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                className="rounded-lg border border-gray-2 py-3 px-4"
              />
            </div>

            <div className="stack gap-2">
              <label htmlFor="phone">Your Phone Number</label>
              <input type="text" id="phone" className="rounded-lg border border-gray-2 py-3 px-4" />
            </div>

            <div className="stack gap-2">
              <label htmlFor="address">Your Address</label>
              <input
                type="text"
                id="address"
                className="rounded-lg border border-gray-2 py-3 px-4"
              />
            </div>
          </div>

          <div className="stack gap-4">
            <div className="stack gap-2">
              <label htmlFor="card-no">Add Card Number</label>
              <input
                type="text"
                id="card-no"
                placeholder="**** **** 1234"
                className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-current"
              />
            </div>

            <div className="flex gap-4">
              <div className="stack gap-2">
                <label htmlFor="exp-date">Expiry date</label>
                <input
                  type="text"
                  id="exp-date"
                  placeholder="MM/YY"
                  className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-current"
                />
              </div>

              <div className="stack gap-2">
                <label htmlFor="exp-date">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  className="rounded-lg border border-gray-2 py-3 px-4 placeholder:text-current"
                />
              </div>
            </div>

            <div className="stack gap-2">
              <label htmlFor="card-pin">Card PIN</label>
              <input
                type="password"
                id="card-pin"
                className="rounded-lg border border-gray-2 py-3 px-4"
              />
            </div>
          </div>

          <Link
            href="/order-success"
            className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center"
          >
            Pay now
          </Link>
        </form>
      </section>
    </main>
  );
}
