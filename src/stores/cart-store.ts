"use client";

import { create } from "zustand";
import type { CartStore } from "@/interfaces/cart";

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (pizza, variant, quantity) => {
    const itemId = `${pizza.id}-${variant.id}`;

    set((state) => {
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: itemId,
            pizza,
            variant,
            quantity,
          },
        ],
      };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + (item.variant.price || 0) * item.quantity,
      0,
    );
  },
}));
