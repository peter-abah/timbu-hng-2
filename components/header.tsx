"use client";

import { useAppContext } from "@/lib/store-context";
import cartIcon from "@/public/images/cart.svg";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};
export default function Header({ className }: Props) {
  const cartItemsNo = useAppContext((state) => Object.values(state.cart.items).length);

  return (
    <header
      className={clsx(
        className,
        "flex items-center justify-between md:justify-center px-6 py-3 md:py-8 border-b border-gray-1"
      )}
    >
      <Link href="/" className="font-semibold text-xl text-purple-3">
        TIMBU
      </Link>
      <Link
        href="/cart"
        className="grid md:hidden place-items-center w-10 h-10 rounded-full border-gray border bg-white relative hover:box-shadow-purple"
      >
        <Image src={cartIcon} alt="" />
        {cartItemsNo > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-purple"></span>
        )}
      </Link>
    </header>
  );
}
