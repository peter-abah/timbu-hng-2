import { formatPrice } from "@/lib";
import addIcon from "@/public/images/add.svg";
import backIcon from "@/public/images/back.svg";
import deleteIcon from "@/public/images/delete.svg";
import subtractIcon from "@/public/images/subtract.svg";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    name: "Bluetooth Headphones",
    price: 50000,
    image: "/images/bt-headphones.png",
    category: "Smartwatches",
    quantity: 2,
  },
  {
    name: "Bluetooth Headphones",
    price: 50000,
    image: "/images/bt-headphones.png",
    category: "Smartwatches",
    quantity: 2,
  },
  {
    name: "Bluetooth Headphones",
    price: 50000,
    image: "/images/bt-headphones.png",
    category: "Smartwatches",
    quantity: 2,
  },
];

export default function Cart() {
  return (
    <main className="w-fit mx-auto my-6 bg-white py-6 px-[4.5rem] stack gap-4 rounded-3xl">
      <header className="stack gap-1">
        <Link href="/" className="flex gap-1 items-center">
          <Image src={backIcon} alt="" />
          <span className="text-purple">Continue shopping</span>
        </Link>
        <h1 className="text-[32px] text-gray-9 font-semibold">My Cart</h1>
      </header>

      <div className="stack gap-10">
        <ul>
          {PRODUCTS.map((product, i) => (
            <li key={i} className="py-6 flex gap-20 border-b border-gray-1 first:border-t">
              <div className="flex gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-2">
                  <Image src={product.image} alt={product.name} width={100} height={100} />
                </div>
                <div className="stack justify-between">
                  <div className="stack gap-1">
                    <p className="text-sm">{product.category}</p>
                    <p className="text-xl font-semibold">{product.name}</p>
                  </div>

                  <div className="flex gap-1 px-2 items-center border border-gray-2 rounded-lg w-fit">
                    <button aria-label="Decrease quantity">
                      <Image src={subtractIcon} alt="" />
                    </button>
                    <p className="py-2 px-2.5 font-semibold text-xl">{product.quantity}</p>
                    <button aria-label="Increase quantity">
                      <Image src={addIcon} alt="" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="stack justify-between items-end">
                <button>
                  <Image src={deleteIcon} alt="" />
                </button>

                <p className="font-semibold text-xl">{formatPrice(product.price)}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="stack gap-4">
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

        <Link
          href="/checkout"
          className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
