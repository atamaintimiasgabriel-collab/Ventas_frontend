"use client";

import { CartProvider } from "@/context/CartContext";
import { CartModal } from "@/components/CartModal";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartModal />
    </CartProvider>
  );
}
