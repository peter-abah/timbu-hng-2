import { formatPrice } from "@/lib";
import { Product } from "@/lib/store";
import { useAppContext } from "@/lib/store-context";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const _addToCart = useAppContext((state) => state.addToCart);
  const router = useRouter();

  const addToCart = () => {
    _addToCart(product.id);
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
        className="bg-purple-3 text-white px-4 py-2.5 rounded-lg w-fit text-sm font-semibold"
      >
        Add to cart
      </button>
    </li>
  );
}
