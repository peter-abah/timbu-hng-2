import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "./timbu/types";

export type ProductWithQuantity = Product & { quantity: number };
export type Cart = { items: Record<string, ProductWithQuantity> };

export type AppState = {
  cart: Cart;
  deliveryFee: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productID: string) => void;
  updateCartQuantity: (productID: string, quantity: number) => void;
  clearCart: () => void;
};

const DELIVERY_FEE = 1000;

export const createAppStore = () => {
  return createStore<AppState>()(
    immer((set) => ({
      cart: { items: {} },
      deliveryFee: DELIVERY_FEE,
      addToCart: (product, quantity = 1) => {
        set((state) => {
          if (state.cart.items[product.id]) {
            state.cart.items[product.id].quantity += 1;
          } else {
            state.cart.items[product.id] = { ...product, quantity };
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

      clearCart: () => {
        set((state) => {
          state.cart.items = {};
        });
      },
    }))
  );
};
