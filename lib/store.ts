import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Product = { id: string; name: string; price: number; image: string; category: string };
export type ProductWithQuantity = Product & { quantity: number };
export type Cart = { items: Record<string, ProductWithQuantity> };

const PRODUCTS: Product[] = [
  {
    id: "stellar-gear",
    name: "Stellar Gear",
    price: 50000,
    image: "/images/stellar-gear.png",
    category: "Smartwatches",
  },
  {
    id: "zenith-wave",
    name: "Zenith Wave",
    price: 50000,
    image: "/images/zenith-wave.png",
    category: "Smartwatches",
  },
  {
    id: "fusion-chrono",
    name: "Fusion Chrono",
    price: 50000,
    image: "/images/fusion-chrono.png",
    category: "Smartwatches",
  },
  {
    id: "q-pulse",
    name: "Quantum Pulse",
    price: 52000,
    image: "/images/quantum-pulse.png",
    category: "Smartwatches",
  },
  {
    id: "bhphones",
    name: "Bluetooth Headphones",
    price: 50000,
    image: "/images/bt-headphones.png",
    category: "Headphones and Airpods",
  },
  {
    id: "e-flux",
    name: "Echo Flux",
    price: 50000,
    image: "/images/echo-flux.png",
    category: "Headphones and Airpods",
  },
  {
    id: "s-breeze",
    name: "Sonic Breeze",
    price: 50000,
    image: "/images/s-breeze.png",
    category: "Headphones and Airpods",
  },
  {
    id: "b-surge",
    name: "Bass Surge",
    price: 50000,
    image: "/images/b-surge.png",
    category: "Headphones and Airpods",
  },
];

const DELIVERY_FEE = 1000;

export type AppState = {
  products: Product[];
  cart: Cart;
  deliveryFee: number;
  addToCart: (productID: string) => void;
  removeFromCart: (productID: string) => void;
  updateCartQuantity: (productID: string, quantity: number) => void;
};

export const createAppStore = () => {
  return createStore<AppState>()(
    immer((set) => ({
      products: PRODUCTS,
      cart: { items: {} },
      deliveryFee: DELIVERY_FEE,
      addToCart: (productID) => {
        set((state) => {
          if (state.cart.items[productID]) {
            state.cart.items[productID].quantity += 1;
          } else {
            const product = state.products.find(({ id }) => id === productID);
            if (!product) return;

            state.cart.items[productID] = { ...product, quantity: 1 };
          }
        });
      },
      removeFromCart: (productID) => {
        set((state) => {
          delete state.cart.items[productID];
        });
      },
      updateCartQuantity: (productID, quantity) => {
        set((state) => {
          if (state.cart.items[productID]) {
            state.cart.items[productID].quantity = quantity;
          }
        });
      },
    }))
  );
};
