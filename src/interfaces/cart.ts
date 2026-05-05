import type { IPizza } from "./pizza";
import type { IVariant } from "./variant";

export interface CartItem {
  id: string; // unique id combining pizza and variant
  pizza: IPizza;
  variant: IVariant;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (pizza: IPizza, variant: IVariant, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
