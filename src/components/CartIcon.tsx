"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function CartIcon() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      onClick={() => setIsCartOpen(true)}
      className="hidden xl:flex items-center gap-3 cursor-pointer group"
    >
      <div className="relative w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        {mounted && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 border-2 border-white text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
            {totalItems}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <b className="text-slate-800 text-sm tracking-wide group-hover:text-brand transition-colors">Carrito</b>
        <small className="text-brand font-black text-[12px]">
          {mounted ? `S/ ${totalPrice.toFixed(2)}` : "S/ 0.00"}
        </small>
      </div>
    </div>
  );
}
