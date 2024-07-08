import greenCheckIcon from "@/public/images/green-check.svg";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="grid grow place-items-center">
      <div className="stack items-center">
        <div className="mb-10 border-[22px] rounded-full w-fit border-green-1/30">
          <Image src={greenCheckIcon} alt="" />
        </div>

        <div className="max-w-[392px] text-center mb-6">
          <h1 className="font-semibold text-[32px]">Order Successful!</h1>
          <p>
            Thank you for your purchase! A confirmation email has been sent to your email address
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2.5 bg-gray-3 text-white text-sm font-semibold rounded-lg text-center w-fit box-shadow-purple"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
