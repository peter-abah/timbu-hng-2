import { formatPrice } from "@/lib";
import { ProductWithQuantity } from "@/lib/store";
import { useAppContext } from "@/lib/store-context";
import addIcon from "@/public/images/add.svg";
import deleteIcon from "@/public/images/delete.svg";
import subtractIcon from "@/public/images/subtract.svg";
import Image from "next/image";

type Props = {
  product: ProductWithQuantity;
};
export default function CartProduct({ product }: Props) {
  const [updateCartQuantity, removeFromCart] = useAppContext((state) => [
    state.updateCartQuantity,
    state.removeFromCart,
  ]);

  const increaseQuantity = () => {
    updateCartQuantity(product.id, product.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (product.quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateCartQuantity(product.id, product.quantity - 1);
    }
  };

  return (
    <li className="py-4 md:py-6 flex justify-between border-b border-gray-1 first:border-t">
      <div className="flex gap-2.5 md:gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-1 shrink-0">
          <div className="relative w-[70px] aspect-square md:w-[100px]">
          <Image src={product.image} alt={product.name} fill />
          </div>
        </div>
        <div className="stack justify-between shrink-0">
          <div className="stack md:gap-1">
            <p className="text-[10px] md:text-sm">{product.category}</p>
            <p className=" text-sm md:text-xl font-semibold">{product.name}</p>
          </div>

          <div className="flex gap-1 px-2 items-center border border-gray-2 rounded-lg w-fit">
            <button
              aria-label="Decrease quantity"
              onClick={decreaseQuantity}
              className="hover:bg-gray-1/30 rounded-full transition-all"
            >
              <Image src={subtractIcon} alt="" />
            </button>
            <p className="py-2 px-2.5 font-semibold text-xl">{product.quantity}</p>
            <button
              aria-label="Increase quantity"
              onClick={increaseQuantity}
              className="hover:bg-gray-1/30 rounded-full transition-all"
            >
              <Image src={addIcon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="stack justify-between items-end">
        <button
          onClick={() => removeFromCart(product.id)}
          className="hover:bg-gray-1/30 rounded-full transition-all p-0.5"
        >
          <Image src={deleteIcon} alt="" />
        </button>

        <p className="font-semibold md:text-xl">{formatPrice(product.price)}</p>
      </div>
    </li>
  );
}
