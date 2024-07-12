"use client";

import { BLUR_DATA_URL } from "@/lib";
import { API_IMAGE_ROOT_URL } from "@/lib/timbu/constants";
import { Product } from "@/lib/timbu/types";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  product: Product;
};
// TODO: Add arrow buttons, and update dot buttons when the image is scrolled, or prevent scrolling
export default function ProductImageSlider({ product }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);

  const handleImageButtonClick = (index: number) => {
    imagesRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setCurrentImageIndex(index);
  };
  const images = product.photos;

  return (
    <div>
      <div className="relative w-full">
        <div className="flex gap-0.5 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={clsx(
                "aspect-square w-full shrink-0 relative lg:rounded-xl overflow-hidden snap-center snap-always"
              )}
              ref={(ref) => {
                imagesRef.current[index] = ref;
              }}
            >
              <Image
                src={`${API_IMAGE_ROOT_URL}/${image.url}`}
                alt={product.name}
                fill
                blurDataURL={BLUR_DATA_URL}
                placeholder="blur"
              />
            </div>
          ))}
        </div>

        {/* dot buttons */}
        <div className="absolute bottom-4 left-0 right-0 z-10 py-2 px-4 mx-auto w-fit order-1 lg:-order-none flex rounded-full bg-white/70 gap-2.5">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => handleImageButtonClick(index)}
              className={twMerge(
                "w-2.5 aspect-square bg-current opacity-30 rounded-full",
                index === currentImageIndex && "opacity-100"
              )}
            >
              <span className="sr-only">Go to product image {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
