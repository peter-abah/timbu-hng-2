import { formatPrice } from "@/lib";
import { Product } from "@/lib/store";
import { useAppContext } from "@/lib/store-context";
import checkIcon from "@/public/images/check.svg";
import clsx from "clsx";
import Image from "next/image";
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
      _addToCart(product.id);
    }
    router.push("/cart");
  };

  return (
    <li className="stack gap-2 w-fit">
      <div className="bg-white p-4 rounded-xl w-fit">
        <Image src={product.image} alt={product.name} width={200} height={200} />
      </div>
      <div className="stack gap-1">
        <p className="font-semibold leading-none">{product.name}</p>
        <p className="leading-none">{formatPrice(product.price)}</p>
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
