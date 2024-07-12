"use client";

import { useAppContext } from "@/lib/store-context";
import cartIcon from "@/public/images/cart.svg";
import Image from "next/image";
import Link from "next/link";

export default function CartButton() {
  const cartItemsNo = useAppContext((state) => Object.values(state.cart.items).length);
  return (
    <Link
      href="/cart"
      className="grid place-items-center w-10 h-10 rounded-full border-gray border bg-white relative hover:box-shadow-purple"
    >
      <Image src={cartIcon} alt="" />
      {cartItemsNo > 0 && (
        <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-purple"></span>
      )}
    </Link>
  );
}
