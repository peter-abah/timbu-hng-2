"use client";

import CartButton from "@/components/cart-button";
import ProductImageSlider from "@/components/product-image-slider";
import QuantitySelector from "@/components/quantity-selector";
import { formatPrice, titleCase } from "@/lib";
import { useAppContext } from "@/lib/store-context";
import { type Product as TProduct } from "@/lib/timbu/types";
import backIcon from "@/public/images/back.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Product({ product }: { product: TProduct }) {
  const { name, current_price, description, categories } = product;
  const [_addToCart, updateCartQuantity, _removeFromCart] = useAppContext(
    ({ addToCart, updateCartQuantity, removeFromCart }) => [
      addToCart,
      updateCartQuantity,
      removeFromCart,
    ]
  );
  const cart = useAppContext((state) => state.cart);
  const isProductInCart = cart.items[product.id] != undefined;
  const [quantity, setQuantity] = useState(isProductInCart ? cart.items[product.id].quantity : 1);

  const router = useRouter();
  const addToCart = () => {
    if (!isProductInCart) {
      _addToCart(product, quantity);
      toast.success("Product added to cart");
    } else {
      updateCartQuantity(product.id, quantity);
      toast.success("Product cart quantity updated");
    }
  };

  const removeFromCart = () => {
    _removeFromCart(product.id);
    setQuantity(1);
    toast.success("Product removed from cart");
  };

  return (
    <main className="w-full lg:w-[1072px] mx-auto stack gap-4 lg:my-[55px] p-6 md:p-12 bg-white lg:rounded-3xl">
      <header className="flex gap-8 justify-between">
        <button onClick={() => router.back()} className="flex gap-0.5 md:gap-1 items-center group">
          <Image
            src={backIcon}
            alt=""
            className="group-hover:-translate-x-1.5 transition-transform"
          />
          <span className="text-xs md:text-base text-purple group-hover:underline">Back</span>
        </button>

        <div className="hidden md:block">
          <CartButton />
        </div>
      </header>

      <div className="stack md:grid grid-cols-2 gap-8">
        <ProductImageSlider product={product} />

        <div className="stack gap-6">
          {/* Replace with category */}
          <div className="stack gap-4">
            {categories[0] && (
              <p className="text-sm md:text-base opacity-70">{titleCase(categories[0].name)}</p>
            )}
            <h1 className="text-[2rem] font-semibold">{name}</h1>
            <p className="text-xl">{formatPrice(current_price[0].NGN[0])}</p>
          </div>

          <details className="stack gap-2">
            <summary className="font-semibold text-xl">Description</summary>
            <p className="text-lg leading-normal">{description}</p>
          </details>

          <hr />

          <div className="stack gap-2 mt-auto">
            <p>Quantity:</p>
            <QuantitySelector
              increaseQuantity={() => setQuantity((q) => q + 1)}
              quantity={quantity}
              decreaseQuantity={() => setQuantity((q) => q - 1 || q)}
            />
          </div>

          <div className="stack gap-4 my-auto">
            <button
              onClick={addToCart}
              className="px-4 py-3 bg-purple-3 text-white font-semibold rounded-lg text-center hover:bg-purple-3/90 hover:box-shadow-purple"
            >
              {isProductInCart ? "Update cart quantity" : "Add To Cart"}
            </button>
            {isProductInCart && (
              <button
                onClick={removeFromCart}
                className="px-4 py-3 bg-orange-700 text-white font-semibold rounded-lg text-center hover:bg-orange-700/90 hover:box-shadow-purple"
              >
                Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
