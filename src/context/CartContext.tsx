"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  idProducto: number;
  nombreComercial: string;
  precioVenta: number;
  rutaImagen: string;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (idProducto: number) => void;
  updateQuantity: (idProducto: number, cantidad: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error al cargar carrito", e);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.idProducto === newItem.idProducto);
      if (existingItem) {
        return prevItems.map((i) =>
          i.idProducto === newItem.idProducto ? { ...i, cantidad: i.cantidad + newItem.cantidad } : i
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (idProducto: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.idProducto !== idProducto));
  };

  const updateQuantity = (idProducto: number, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(idProducto);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.idProducto === idProducto ? { ...i, cantidad } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.precioVenta * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
