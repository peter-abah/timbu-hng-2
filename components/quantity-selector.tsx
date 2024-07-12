import addIcon from "@/public/images/add.svg";
import subtractIcon from "@/public/images/subtract.svg";
import Image from "next/image";

type Props = {
  increaseQuantity: () => void;
  quantity: number;
  decreaseQuantity: () => void;
};
export default function QuantitySelector({ increaseQuantity, quantity, decreaseQuantity }: Props) {
  return (
    <div className="flex gap-1 px-2 items-center border border-gray-2 rounded-lg w-fit">
      <button
        aria-label="Decrease quantity"
        onClick={decreaseQuantity}
        className="hover:bg-gray-1/30 rounded-full transition-all"
      >
        <Image src={subtractIcon} alt="" />
      </button>
      <p className="py-2 px-2.5 font-semibold">{quantity}</p>
      <button
        aria-label="Increase quantity"
        onClick={increaseQuantity}
        className="hover:bg-gray-1/30 rounded-full transition-all"
      >
        <Image src={addIcon} alt="" />
      </button>
    </div>
  );
}
