"use client";

import { BLUR_DATA_URL } from "@/lib";
import { API_IMAGE_ROOT_URL } from "@/lib/timbu/constants";
import { Product } from "@/lib/timbu/types";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  product: Product;
};

export default function ProductImageSlider({ product }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageButtonClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const images = product.photos;

  return (
    <div>
      <div className="relative w-full">
        <div className="gap-0.5 grid grid-cols-1 grid-rows-1 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={twMerge(
                "aspect-square w-full shrink-0 col-start-1 row-start-1 relative lg:rounded-xl overflow-hidden snap-center snap-always opacity-0 transition-opacity duration-300",
                index === currentImageIndex && "opacity-100"
              )}
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
          <button
            onClick={() => setCurrentImageIndex((c) => (c - 1 < 0 ? c : c - 1))}
            className={twMerge("w-2.5 aspect-square rounded-full")}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
          {product.photos.map((image, index) => (
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
          <button
            onClick={() => setCurrentImageIndex((c) => (c + 1 >= images.length ? c : c + 1))}
            className="w-2.5 aspect-square rounded-full"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
