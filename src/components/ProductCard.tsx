"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, productData }: { product?: string[], productData?: any }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  let p0, p1, p2, p3, p4, imageUrl;
  
  if (productData) {
    p0 = productData.esOferta ? "¡OFERTA!" : "";
    p1 = productData.nombreMarca;
    p2 = productData.nombreComercial;
    
    if (productData.esOferta && productData.precioOferta) {
      p3 = (
        <div className="flex items-center gap-2">
          <span>S/ {productData.precioOferta.toFixed(2)}</span>
          <span className="text-sm line-through text-slate-400 font-normal">S/ {productData.precioVenta.toFixed(2)}</span>
        </div>
      );
    } else {
      p3 = `S/ ${productData.precioVenta.toFixed(2)}`;
    }
    
    p4 = "";
    imageUrl = productData.rutaImagen;
  } else if (product) {
    [p0, p1, p2, p3, p4] = product;
  }

  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddCart = () => {
    if (productData) {
      addToCart({
        idProducto: productData.idProducto,
        nombreComercial: productData.nombreComercial,
        precioVenta: productData.esOferta && productData.precioOferta ? productData.precioOferta : productData.precioVenta,
        rutaImagen: productData.rutaImagen,
        cantidad: 1,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isQuickViewOpen) {
    return (
      <article className="relative rounded-2xl border bg-white shadow-2xl transition-all duration-500 flex flex-col md:flex-row col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4 row-span-2 overflow-hidden z-20 scale-100 ring-2 ring-brand ring-offset-2">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsQuickViewOpen(false); }}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 w-8 h-8 rounded-full flex items-center justify-center font-bold transition"
        >
          ✕
        </button>

        {/* Left Column: Image (Rotating) */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center relative min-h-[250px] shrink-0 border-r border-slate-100">
          {p0 && (
            <span className="absolute top-4 left-4 rounded bg-brand px-2 py-1 text-xs font-bold text-white z-10 shadow-lg shadow-red-500/40">
              {p0}
            </span>
          )}
          {imageUrl ? (
            <div className="relative w-64 h-64 perspective-1000">
              <img 
                src={imageUrl} 
                alt={p2} 
                className="object-contain w-full h-full drop-shadow-2xl animate-[spin_15s_linear_infinite] hover:animate-none transition-transform" 
                style={{ transformStyle: 'preserve-3d' }}
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-[100%]"></div>
            </div>
          ) : (
            <span className="text-8xl">{p4}</span>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="p-6 md:p-8 flex flex-col flex-1 justify-center bg-white">
          <small className="text-brand font-bold uppercase tracking-wider text-xs">{p1}</small>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mt-1 leading-tight">{p2}</h2>
          
          <div className="mt-4 flex items-baseline gap-3 pb-4 border-b">
            <span className="text-4xl font-black text-brand">{p3}</span>
          </div>
          
          <div className="mt-6 space-y-4 flex-1">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Producto</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {productData?.descripcionTecnica || "Este repuesto de alta calidad está diseñado para ofrecer el mejor rendimiento y durabilidad en tu motocicleta. Cumple con los más altos estándares de fabricación OEM."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Stock Disponible</p>
                  <p className="text-sm font-bold text-green-600">{productData?.stockDisponible || 15} unidades</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Envío Rápido</p>
                  <p className="text-sm font-bold text-slate-700">A todo el Perú</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón Agregar al Carrito */}
          <div className="mt-8 pt-4 border-t relative shrink-0">
            {/* Toast animado dentro del detalle */}
            <div 
              className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-full bg-green-500 text-white text-sm font-bold py-2 px-3 rounded-lg shadow-lg text-center flex items-center justify-center gap-2 transition-all duration-300 pointer-events-none ${
                added ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span className="text-xl">✨</span> ¡Agregado exitosamente al carrito!
            </div>

            <button
              onClick={handleAddCart}
              className={`w-full rounded-xl py-4 text-base font-black uppercase tracking-wide text-white transition-all duration-300 transform active:scale-95 shadow-xl flex items-center justify-center gap-2 ${
                added 
                  ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" 
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-red-600/40 hover:shadow-red-600/60"
              }`}
            >
              {added ? (
                <>
                  <span className="animate-bounce">✓</span> LISTO
                </>
              ) : (
                <>
                  <span className="text-xl leading-none">🛒</span> AGREGAR AL CARRITO
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative rounded-lg border bg-white p-3 shadow-sm hover:shadow-card transition flex flex-col z-0 h-full">
      {p0 && (
        <span className="absolute rounded bg-brand px-2 py-1 text-[11px] font-bold text-white z-10">
          {p0}
        </span>
      )}
      <button className="absolute right-3 text-lg z-10 hover:text-red-500 transition">♡</button>
      <div 
        className="h-28 grid place-items-center text-6xl bg-gradient-to-b from-white to-slate-50 relative overflow-hidden cursor-pointer group-hover:scale-105 transition-transform rounded"
        onClick={() => setIsQuickViewOpen(true)}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={p2} className="object-contain h-full w-full p-2" />
        ) : (
          p4
        )}
      </div>
      <div className="flex-1 flex flex-col mt-2">
        <small className="text-slate-500 cursor-pointer" onClick={() => setIsQuickViewOpen(true)}>{p1}</small>
        <h3 className="text-sm leading-4 min-h-12 mt-1 cursor-pointer hover:text-brand transition-colors" onClick={() => setIsQuickViewOpen(true)}>{p2}</h3>
        <b className="mt-2 text-lg text-brand">{p3}</b>
        <span className="text-xs text-green-600">En stock</span>
      </div>
      <div className="relative mt-3 pt-2 border-t">
        {/* Toast animado que flota arriba del botón */}
        <div 
          className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[110%] bg-green-500 text-white text-[10px] sm:text-xs font-bold py-1.5 px-2 rounded shadow-lg text-center flex items-center justify-center gap-1 transition-all duration-300 pointer-events-none ${
            added ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-sm">✨</span> ¡Agregado exitosamente!
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-500"></div>
        </div>

        <button
          onClick={handleAddCart}
          className={`w-full rounded-md py-2.5 text-sm font-black uppercase tracking-wide text-white transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2 ${
            added 
              ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" 
              : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-red-600/30 hover:shadow-red-600/50"
          }`}
        >
          {added ? (
            <>
              <span className="animate-bounce">✓</span> LISTO
            </>
          ) : (
            <>
              <span className="text-lg leading-none">🛒</span> AGREGAR
            </>
          )}
        </button>
      </div>
    </article>
  );
}
