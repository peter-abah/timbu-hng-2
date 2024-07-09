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
    <li className="py-6 flex justify-between gap-20 border-b border-gray-1 first:border-t">
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
            <button aria-label="Decrease quantity" onClick={decreaseQuantity}>
              <Image src={subtractIcon} alt="" />
            </button>
            <p className="py-2 px-2.5 font-semibold text-xl">{product.quantity}</p>
            <button aria-label="Increase quantity" onClick={increaseQuantity}>
              <Image src={addIcon} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="stack justify-between items-end">
        <button onClick={() => removeFromCart(product.id)}>
          <Image src={deleteIcon} alt="" />
        </button>

        <p className="font-semibold text-xl">{formatPrice(product.price)}</p>
      </div>
    </li>
  );
}
