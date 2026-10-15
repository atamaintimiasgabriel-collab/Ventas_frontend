"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL } from "@/config/api";

interface Producto {
  idProducto: number;
  sku: string;
  nombreComercial: string;
  nombreMarca: string;
  precioVenta: number;
  rutaImagen: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Producto[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown si hacen clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce y Fetch a la Base de Datos
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        // Llama a la API Real en tiempo real
        const res = await fetch(`${API_URL}/productos/buscar?nombre=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          // Solo mostrar top 5 resultados para no saturar la pantalla
          setResults(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error buscando productos:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce para no saturar el servidor

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div ref={wrapperRef} className="hidden md:flex flex-1 max-w-3xl relative z-50">
      <div className="flex w-full relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`w-full border px-5 py-3 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all ${
            isFocused && (query.length > 0 || results.length > 0) ? "rounded-tl-xl" : "rounded-l-md"
          }`}
          placeholder="Buscar repuestos por nombre, código OEM, marca o modelo..."
        />
        {query && (
          <button 
            onClick={() => { setQuery(""); setResults([]); }}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        )}
        <button className={`bg-brand px-6 text-white text-xl transition-all ${
          isFocused && (query.length > 0 || results.length > 0) ? "rounded-tr-xl" : "rounded-r-md"
        }`}>
          ⌕
        </button>
      </div>

      {/* DROPDOWN INTERACTIVO */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-brand rounded-b-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
          
          {/* ESTADO VACÍO (Historial / Trending) */}
          {query.trim().length < 2 && (
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                  <span>🕒</span> Búsquedas recientes
                </h4>
                <ul className="space-y-2">
                  {["Casco integral MT", "Batería YTX7L-BS", "Espejos pulsar ns200"].map(item => (
                    <li key={item} className="text-sm font-medium hover:text-brand hover:bg-red-50 p-2 rounded cursor-pointer transition-colors" onClick={() => setQuery(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                  <span className="text-orange-500">🔥</span> Lo más buscado
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Pastillas freno", "Aceite Motul", "Kit arrastre", "Llanta Pirelli"].map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full cursor-pointer font-bold transition-colors" onClick={() => setQuery(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CARGANDO */}
          {isLoading && query.trim().length >= 2 && (
            <div className="p-8 text-center text-slate-500">
              <span className="animate-spin inline-block w-6 h-6 border-2 border-brand border-t-transparent rounded-full mb-2"></span>
              <p className="text-sm font-bold animate-pulse">Buscando en la base de datos...</p>
            </div>
          )}

          {/* RESULTADOS DE LA BASE DE DATOS */}
          {!isLoading && results.length > 0 && query.trim().length >= 2 && (
            <div className="py-2">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <span className="text-xs font-bold text-slate-500 uppercase">Resultados ({results.length})</span>
                <span className="text-xs font-bold text-brand cursor-pointer hover:underline">Ver todos →</span>
              </div>
              <ul>
                {results.map((prod) => (
                  <li 
                    key={prod.idProducto} 
                    className="flex items-center gap-4 p-3 hover:bg-red-50 border-b border-slate-50 last:border-0 cursor-pointer transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white rounded border border-slate-200 flex-shrink-0 flex items-center justify-center p-1 group-hover:border-brand/30">
                      <img src={prod.rutaImagen || "https://placehold.co/100"} alt={prod.nombreComercial} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-brand transition-colors">{prod.nombreComercial}</h4>
                      <p className="text-xs text-slate-400 font-medium">SKU: {prod.sku} • Marca: <span className="font-bold text-slate-600">{prod.nombreMarca}</span></p>
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-slate-800 group-hover:text-brand">S/ {prod.precioVenta.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* NO HAY RESULTADOS */}
          {!isLoading && results.length === 0 && query.trim().length >= 2 && (
            <div className="p-8 text-center">
              <span className="text-4xl block mb-2">🤔</span>
              <h4 className="font-bold text-slate-800 mb-1">No encontramos "{query}"</h4>
              <p className="text-sm text-slate-500">Intenta buscar con el código OEM o por marca.</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
