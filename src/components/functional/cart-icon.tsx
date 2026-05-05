"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export function CartIcon() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Link
      href="/customer/cart"
      className="relative flex items-center justify-center"
    >
      <ShoppingCart className="size-6 text-white hover:opacity-80 transition" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
