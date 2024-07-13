
import { Metadata } from "next";
import Cart from "./cart";

export const metadata: Metadata = {
  title: "Cart",
};

export default function Page() {
  return <Cart />;
}
