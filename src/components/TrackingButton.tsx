"use client";

import { useState, useEffect } from "react";

export function TrackingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"search" | "tracking">("search");
  const [orderNumber, setOrderNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Simulación de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setStep("tracking");
    }, 1200);
  };

  return (
    <>
      <div 
        className="hidden xl:flex items-center gap-3 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <b className="text-slate-800 text-sm tracking-wide group-hover:text-brand transition-colors">Mis pedidos</b>
          <small className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Seguimiento</small>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 md:p-6">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={() => { setIsOpen(false); setStep("search"); }}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            {/* Header Modal */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="font-black text-xl italic text-slate-800 flex items-center gap-2">
                <span className="text-brand text-2xl">📦</span> SEGUIMIENTO DE PEDIDO
              </h2>
              <button 
                onClick={() => { setIsOpen(false); setStep("search"); }}
                className="w-8 h-8 flex justify-center items-center rounded-full bg-slate-200 text-slate-600 hover:bg-red-100 hover:text-red-600 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto overflow-x-hidden flex-1">
              {step === "search" && (
                <div className="p-8 md:p-12 text-center max-w-lg mx-auto">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <span className="text-5xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-slate-800">¿Dónde está mi repuesto?</h3>
                  <p className="text-slate-500 mb-8">Ingresa tu número de pedido para conocer la ubicación exacta en tiempo real.</p>
                  
                  <form onSubmit={handleSearch} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">N° de Pedido</label>
                      <input 
                        required
                        type="text" 
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Ej. PED-2026-001"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 font-bold text-slate-800 text-lg transition-all"
                      />
                    </div>
                    <button 
                      disabled={isSearching || !orderNumber}
                      type="submit"
                      className="w-full bg-brand hover:bg-red-700 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95 flex justify-center items-center gap-2 text-lg uppercase tracking-wider mt-4"
                    >
                      {isSearching ? "Buscando..." : "Rastrear Pedido"}
                    </button>
                  </form>
                </div>
              )}

              {step === "tracking" && (
                <div className="flex flex-col animate-in slide-in-from-right-8 duration-500">
                  
                  {/* FAKE MAP (Temu style) */}
                  <div className="relative h-[250px] w-full bg-slate-200 overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      loading="lazy" 
                      allowFullScreen 
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-77.0428%2C-12.0463%2C-77.0228%2C-12.0363&amp;layer=mapnik&amp;marker=-12.0413%2C-77.0328"
                      className="opacity-80 saturate-50 contrast-125 pointer-events-none"
                    ></iframe>
                    
                    {/* Animated Delivery Pin Overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center flex flex-col items-center">
                      <div className="bg-brand text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-md shadow-red-500/50 animate-bounce">
                        El motorizado está en camino
                      </div>
                      <div className="relative">
                        <span className="text-4xl filter drop-shadow-md">🏍️</span>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-black/20 rounded-[100%] blur-sm -z-10"></div>
                      </div>
                    </div>
                    
                    {/* Status Badge Over Map */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Tiempo estimado</span>
                        <span className="text-sm font-black text-slate-800">15 - 25 Minutos</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details & Timeline */}
                  <div className="p-6 md:p-8 bg-white">
                    <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pedido Confirmado</p>
                        <h4 className="text-xl font-black text-slate-800">{orderNumber || "PED-2026-001"}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total a pagar</p>
                        <h4 className="text-xl font-black text-brand">S/ 345.50</h4>
                      </div>
                    </div>

                    {/* Timeline Component */}
                    <div className="relative mt-8">
                      {/* Linea conectora */}
                      <div className="absolute left-[27px] top-4 bottom-10 w-[3px] bg-slate-100 rounded-full z-0"></div>
                      <div className="absolute left-[27px] top-4 h-1/2 w-[3px] bg-brand rounded-full z-0 transition-all duration-1000"></div>

                      <div className="space-y-8 relative z-10">
                        {/* Step 1: Pasado */}
                        <div className="flex gap-4 items-start">
                          <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-white text-xl font-bold shadow-md shadow-red-500/30 flex-shrink-0 ring-4 ring-white">
                            ✓
                          </div>
                          <div className="pt-2">
                            <h5 className="font-bold text-slate-800">Pedido Recibido</h5>
                            <p className="text-sm text-slate-500">Hemos recibido tu pedido y validado el pago.</p>
                            <span className="text-xs font-bold text-slate-400 mt-1 block">Hoy, 10:30 AM</span>
                          </div>
                        </div>

                        {/* Step 2: Pasado */}
                        <div className="flex gap-4 items-start">
                          <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-white text-xl font-bold shadow-md shadow-red-500/30 flex-shrink-0 ring-4 ring-white">
                            📦
                          </div>
                          <div className="pt-2">
                            <h5 className="font-bold text-slate-800">Preparando Paquete</h5>
                            <p className="text-sm text-slate-500">Tus repuestos han sido seleccionados del almacén.</p>
                            <span className="text-xs font-bold text-slate-400 mt-1 block">Hoy, 11:15 AM</span>
                          </div>
                        </div>

                        {/* Step 3: Actual (Parpadeando) */}
                        <div className="flex gap-4 items-start">
                          <div className="w-14 h-14 rounded-full bg-white border-4 border-brand flex items-center justify-center text-2xl font-bold shadow-lg shadow-red-500/20 flex-shrink-0 ring-4 ring-white relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-20"></span>
                            🏍️
                          </div>
                          <div className="pt-2">
                            <h5 className="font-black text-brand text-lg">En Camino</h5>
                            <p className="text-sm text-slate-800 font-medium">El motorizado se dirige a tu dirección.</p>
                            <div className="mt-3 bg-slate-50 border border-slate-100 rounded-lg p-3 flex gap-3 items-center">
                                <img src="https://ui-avatars.com/api/?name=Carlos+Repartidor&background=0D8ABC&color=fff" className="w-10 h-10 rounded-full" alt="Repartidor" />
                                <div>
                                  <p className="text-xs font-bold text-slate-800">Carlos Mendoza</p>
                                  <p className="text-[10px] text-slate-500">Moto Honda CB125 - Placa 345-XYZ</p>
                                </div>
                            </div>
                          </div>
                        </div>

                        {/* Step 4: Futuro */}
                        <div className="flex gap-4 items-start opacity-40 grayscale">
                          <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-2xl flex-shrink-0 ring-4 ring-white">
                            📍
                          </div>
                          <div className="pt-2">
                            <h5 className="font-bold text-slate-600">Entregado</h5>
                            <p className="text-sm text-slate-500">El paquete ha sido entregado exitosamente.</p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
