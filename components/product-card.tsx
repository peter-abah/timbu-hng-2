"use client";
import { formatPrice } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import { API_IMAGE_ROOT_URL } from "@/lib/timbu/constants";
import { Product } from "@/lib/timbu/types";
import checkIcon from "@/public/images/check.svg";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const _addToCart = useAppContext((state) => state.addToCart);
  const cart = useAppContext((state) => state.cart);
  const router = useRouter();

  const isProductInCart = cart.items[product.id] != undefined;

  const addToCart = () => {
    if (!isProductInCart) {
      _addToCart(product);
    } else {
      router.push("/cart");
    }
  };

  const imageLink = `${API_IMAGE_ROOT_URL}/${product.photos[0].url}`;

  return (
    <li className="stack gap-2 w-full">
      <Link href={`/products/${product.id}`} className="bg-white p-4 rounded-xl w-full">
        <div className="relative w-full aspect-square">
          <Image src={imageLink} alt={product.name} className="object-contain" fill />
        </div>
      </Link>

      <div className="stack gap-1">
        <Link
          href={`/products/${product.id}`}
          className="font-semibold leading-none text-sm md:text-base truncate"
        >
          {product.name}
        </Link>
        <p className="leading-none text-sm md:text-base">
          {formatPrice(product.current_price[0].NGN[0])}
        </p>
      </div>
      <button
        onClick={addToCart}
        className={clsx(
          "text-white px-4 py-2.5 rounded-lg w-fit text-sm font-semibold transition-all flex gap-1 items-center",
          {
            "bg-purple-3 hover:box-shadow-purple hover:bg-purple-3/90": !isProductInCart,
            "bg-gray-3 box-shadow-purple hover:bg-gray-3/60": isProductInCart,
          }
        )}
      >
        {isProductInCart ? (
          <>
            <Image src={checkIcon} alt="" width={16} height={16} />
            <span>Item added</span>
          </>
        ) : (
          <span>Add to cart</span>
        )}
      </button>
    </li>
  );
}
