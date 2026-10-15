"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function CartModal() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  // Checkout States
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment_method" | "yape_form" | "plin_form" | "tarjeta_form" | "success">("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedItems(items.map(item => item.idProducto));
  }, [items.length]);

  if (!mounted || !isCartOpen) {
    return null; 
  }

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectedProductsCount = items.filter(i => selectedItems.includes(i.idProducto)).reduce((acc, i) => acc + i.cantidad, 0);
  const selectedSubtotal = items.filter(i => selectedItems.includes(i.idProducto)).reduce((acc, i) => acc + (i.precioVenta * i.cantidad), 0);
  const discount = 0;
  const shipping = selectedProductsCount > 0 ? 12.00 : 0;
  const finalTotal = selectedSubtotal - discount + shipping;

  const handleFakeCheckout = (method: string) => {
    setIsProcessing(true);
    // Simular conexión a base de datos para guardar el Pedido
    setTimeout(() => {
      setIsProcessing(false);
      setOrderNumber(`PED-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
      setCheckoutStep("success");
      clearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

      <div className="relative bg-slate-50 w-full max-w-7xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black italic text-slate-900 flex items-center gap-2">
              <span className="text-3xl">🛒</span> Mi Carrito de Compras
            </h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-red-500 transition text-4xl leading-none">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {checkoutStep === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto animate-in slide-in-from-bottom-8 duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner ring-4 ring-green-500/20">✓</div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">¡Pago Exitoso!</h2>
              <p className="text-slate-500 mb-6 text-lg">Tu pedido ha sido registrado en nuestra base de datos y pronto será despachado.</p>
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-6 w-full mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase">Número de Pedido</p>
                <p className="text-3xl font-black text-brand tracking-widest">{orderNumber}</p>
              </div>
              <button onClick={() => { setIsCartOpen(false); setCheckoutStep("cart"); }} className="bg-slate-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-900 transition shadow-lg">
                Cerrar y seguir comprando
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 h-full">
              {/* IZQUIERDA: CONTENIDO DINÁMICO (Carrito o Formularios de Pago) */}
              <div className="lg:col-span-2 space-y-4">
                
                {checkoutStep === "cart" && (
                  <div className="bg-white rounded-xl shadow-sm border overflow-hidden h-full flex flex-col">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-slate-50/50 text-sm font-semibold text-slate-600">
                      <div className="col-span-6 pl-2">Producto</div>
                      <div className="col-span-2 text-center">Precio unitario</div>
                      <div className="col-span-2 text-center">Cantidad</div>
                      <div className="col-span-1 text-center">Subtotal</div>
                      <div className="col-span-1 text-center">Acciones</div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {items.length === 0 ? (
                        <div className="p-16 text-center text-slate-500 h-full flex flex-col items-center justify-center">
                          <p className="text-5xl mb-4">🛒</p>
                          <p className="text-lg">Tu carrito está vacío</p>
                        </div>
                      ) : (
                        items.map((item) => (
                          <div key={item.idProducto} className="grid grid-cols-12 gap-4 p-4 border-b items-center hover:bg-slate-50 transition-colors">
                            <div className="col-span-6 flex gap-4 items-center">
                              <input type="checkbox" checked={selectedItems.includes(item.idProducto)} onChange={() => toggleSelection(item.idProducto)} className="w-4 h-4 text-brand rounded cursor-pointer" />
                              <div className="w-16 h-16 bg-slate-100 rounded-lg p-2 shrink-0 flex items-center justify-center">
                                <img src={item.rutaImagen} alt={item.nombreComercial} className="object-contain w-full h-full" />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-800 leading-tight line-clamp-2">{item.nombreComercial}</h3>
                                <p className="text-xs text-slate-500 mt-1">Código: {item.idProducto}</p>
                              </div>
                            </div>
                            <div className="col-span-2 text-center font-bold text-slate-800">S/ {item.precioVenta.toFixed(2)}</div>
                            <div className="col-span-2 flex justify-center">
                              <div className="flex items-center border rounded-md overflow-hidden bg-white">
                                <button className="px-3 py-1 hover:bg-slate-100 text-slate-600" onClick={() => updateQuantity(item.idProducto, item.cantidad - 1)}>−</button>
                                <span className="w-8 text-center font-semibold text-sm">{item.cantidad}</span>
                                <button className="px-3 py-1 hover:bg-slate-100 text-slate-600" onClick={() => updateQuantity(item.idProducto, item.cantidad + 1)}>+</button>
                              </div>
                            </div>
                            <div className="col-span-1 text-center font-bold text-brand">S/ {(item.precioVenta * item.cantidad).toFixed(2)}</div>
                            <div className="col-span-1 flex justify-center">
                              <button onClick={() => removeFromCart(item.idProducto)} className="text-red-400 hover:text-red-600 text-xl">🗑️</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {checkoutStep === "yape_form" && (
                  <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 h-full animate-in slide-in-from-right-8 duration-300">
                    <div className="flex items-center gap-4 mb-8 border-b pb-4">
                      <button onClick={() => setCheckoutStep("cart")} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-xl">←</button>
                      <div>
                        <h3 className="text-2xl font-black text-[#742284]">Pago con Yape</h3>
                        <p className="text-slate-500 text-sm">Escanea el código QR y confirma tu operación</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="text-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-2xl font-black text-slate-800 tracking-wider mb-1">987 654 321</p>
                        <p className="text-xs font-bold text-slate-400 mb-6 uppercase">MotoRepuestos Pro Ultra S.A.C.</p>
                        <div className="w-56 h-56 bg-white mx-auto rounded-xl border-4 border-[#742284] flex items-center justify-center relative overflow-hidden shadow-md">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" className="w-full h-full object-cover opacity-80" />
                           <span className="absolute font-bold text-[#742284] bg-white/90 px-4 py-1 rounded-full shadow-sm text-sm">QR Oficial</span>
                        </div>
                      </div>

                      <form onSubmit={(e) => { e.preventDefault(); handleFakeCheckout("YAPE"); }} className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">1. Tu número de celular</label>
                          <input required type="text" placeholder="Ej. 999 888 777" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#742284] transition" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">2. N° de Operación (Yape)</label>
                          <input required type="text" placeholder="Ej. 12345678" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#742284] transition" />
                        </div>
                        <button disabled={isProcessing} type="submit" className="w-full bg-[#742284] hover:bg-[#5a1a66] disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all mt-6 flex justify-center items-center gap-2">
                          {isProcessing ? "Verificando pago en BD..." : `Confirmar Pago de S/ ${finalTotal.toFixed(2)}`}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {checkoutStep === "plin_form" && (
                  <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 h-full animate-in slide-in-from-right-8 duration-300">
                    <div className="flex items-center gap-4 mb-8 border-b pb-4">
                      <button onClick={() => setCheckoutStep("cart")} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-xl">←</button>
                      <div>
                        <h3 className="text-2xl font-black text-[#00D0A5]">Pago con Plin</h3>
                        <p className="text-slate-500 text-sm">Escanea el código QR y confirma tu operación</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="text-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-2xl font-black text-slate-800 tracking-wider mb-1">987 654 321</p>
                        <p className="text-xs font-bold text-slate-400 mb-6 uppercase">MotoRepuestos Pro Ultra S.A.C.</p>
                        <div className="w-56 h-56 bg-white mx-auto rounded-xl border-4 border-[#00D0A5] flex items-center justify-center relative overflow-hidden shadow-md">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" className="w-full h-full object-cover opacity-80 filter hue-rotate-[160deg] contrast-150" />
                           <span className="absolute font-bold text-[#00D0A5] bg-white/90 px-4 py-1 rounded-full shadow-sm text-sm">QR Oficial</span>
                        </div>
                      </div>

                      <form onSubmit={(e) => { e.preventDefault(); handleFakeCheckout("PLIN"); }} className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">1. Tu número de celular</label>
                          <input required type="text" placeholder="Ej. 999 888 777" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#00D0A5] transition" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">2. N° de Operación (Plin)</label>
                          <input required type="text" placeholder="Ej. 87654321" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#00D0A5] transition" />
                        </div>
                        <button disabled={isProcessing} type="submit" className="w-full bg-[#00D0A5] hover:bg-[#00b08a] disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-teal-500/30 transition-all mt-6 flex justify-center items-center gap-2">
                          {isProcessing ? "Verificando pago en BD..." : `Confirmar Pago de S/ ${finalTotal.toFixed(2)}`}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {checkoutStep === "tarjeta_form" && (
                  <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 h-full animate-in slide-in-from-right-8 duration-300">
                    <div className="flex items-center gap-4 mb-8 border-b pb-4">
                      <button onClick={() => setCheckoutStep("cart")} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-xl">←</button>
                      <div>
                        <h3 className="text-2xl font-black text-slate-800">Pago Seguro con Tarjeta</h3>
                        <p className="text-slate-500 text-sm">Ingresa los datos de tu tarjeta de crédito o débito</p>
                      </div>
                    </div>
                    
                    <form onSubmit={(e) => { e.preventDefault(); handleFakeCheckout("TARJETA"); }} className="space-y-5 max-w-xl mx-auto">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Número de Tarjeta</label>
                        <input required type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-slate-800 font-mono transition text-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Vencimiento</label>
                          <input required type="text" placeholder="MM/AA" maxLength={5} className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-slate-800 font-mono transition text-lg" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CVV</label>
                          <input required type="password" placeholder="123" maxLength={4} className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-slate-800 font-mono transition text-lg" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre en la tarjeta</label>
                        <input required type="text" placeholder="Ej. Juan Pérez" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-slate-800 uppercase transition text-lg" />
                      </div>
                      <button disabled={isProcessing} type="submit" className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-slate-500/30 transition-all mt-6 flex justify-center items-center gap-2">
                        {isProcessing ? "Procesando pago seguro..." : `Procesar Pago S/ ${finalTotal.toFixed(2)}`}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* DERECHA: PAGO Y RESUMEN (Siempre visible) */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
                  <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-4 mb-4">🛒 Resumen del pedido</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600"><span>Subtotal ({selectedProductsCount})</span><span className="font-bold text-slate-800">S/ {selectedSubtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-slate-600 items-center"><span>Envío (Lima Metropolitana)</span><span className="font-bold text-slate-800">S/ {shipping.toFixed(2)}</span></div>
                  </div>
                  
                  <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Total a pagar</span>
                    <span className="text-3xl font-black text-brand">S/ {finalTotal.toFixed(2)}</span>
                  </div>
                  
                  {checkoutStep === "cart" && (
                    <div className="mt-6 space-y-3 animate-in fade-in duration-300">
                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase">Elige cómo pagar</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button disabled={selectedItems.length === 0} onClick={() => setCheckoutStep("yape_form")} className="w-full bg-[#742284] hover:bg-[#5a1a66] disabled:bg-slate-200 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all"><span className="text-2xl">📱</span> Yape</button>
                        <button disabled={selectedItems.length === 0} onClick={() => setCheckoutStep("plin_form")} className="w-full bg-[#00D0A5] hover:bg-[#00b08a] disabled:bg-slate-200 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all"><span className="text-2xl">📱</span> Plin</button>
                      </div>
                      
                      <button disabled={selectedItems.length === 0} onClick={() => setCheckoutStep("tarjeta_form")} className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all mt-2"><span className="text-xl">💳</span> Tarjeta Débito / Crédito</button>
                    </div>
                  )}

                  {checkoutStep !== "cart" && (
                    <div className="mt-6 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                      <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                        <span className="text-lg">🔒</span> Transacción 100% segura y encriptada
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
