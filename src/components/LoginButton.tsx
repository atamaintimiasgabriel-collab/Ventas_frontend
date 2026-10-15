"use client";

import { useState } from "react";

export function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"options" | "email" | "whatsapp">("options");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const simulateLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  if (isLoggedIn) {
    return (
      <div className="hidden xl:flex items-center gap-3 cursor-pointer">
        <div className="text-right">
          <b className="block text-slate-800">Hola, Gabriel</b>
          <small className="block text-brand font-bold" onClick={() => setIsLoggedIn(false)}>Cerrar sesión</small>
        </div>
        <img src="https://ui-avatars.com/api/?name=Gabriel&background=ef4444&color=fff" className="w-10 h-10 rounded-full border-2 border-brand shadow-sm" alt="Perfil" />
      </div>
    );
  }

  return (
    <>
      <div 
        className="hidden xl:flex items-center gap-3 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <b className="text-slate-800 text-sm tracking-wide group-hover:text-brand transition-colors">Mi cuenta</b>
          <small className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Iniciar sesión</small>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 w-8 h-8 rounded-full flex items-center justify-center font-bold transition"
            >
              ✕
            </button>

            <div className="bg-ink text-white p-6 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white text-2xl mx-auto mb-2 shadow-lg shadow-red-500/50">
                ⚙
              </span>
              <h2 className="text-xl font-black italic">MOTORREPUESTOS <span className="text-brand">PRO</span></h2>
              <p className="text-slate-400 text-sm mt-1">Accede para ver tus pedidos e historial</p>
            </div>

            <div className="p-6 md:p-8">
              {loginMethod === "options" && (
                <div className="space-y-4">
                  <button 
                    onClick={simulateLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 py-3.5 px-4 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? "Conectando..." : (
                      <>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continuar con Google
                      </>
                    )}
                  </button>

                  <button 
                    onClick={simulateLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-lg shadow-blue-500/30 py-3.5 px-4 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? "Conectando..." : (
                      <>
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Continuar con Facebook
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setLoginMethod("whatsapp")}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 py-3.5 px-4 rounded-xl font-bold transition-all transform active:scale-95"
                  >
                    <span className="text-xl leading-none">💬</span>
                    Ingresar con WhatsApp
                  </button>

                  <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-bold tracking-wider">o</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  <button 
                    onClick={() => setLoginMethod("email")}
                    className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-4 rounded-xl font-bold transition-all transform active:scale-95"
                  >
                    ✉️ Ingresar con Correo
                  </button>
                </div>
              )}

              {loginMethod === "whatsapp" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-black text-lg text-slate-800 text-center">Ingreso Rápido</h3>
                  <p className="text-sm text-slate-500 text-center mb-6">Te enviaremos un código de seguridad a tu celular.</p>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Número de Celular</label>
                    <div className="flex gap-2">
                      <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 outline-none font-bold text-slate-700 focus:border-brand focus:ring-1 focus:ring-brand">
                        <option>+51</option>
                      </select>
                      <input 
                        id="wa-number"
                        type="tel" 
                        placeholder="Escribe tu número..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const num = (document.getElementById('wa-number') as HTMLInputElement)?.value;
                      if(num) window.open(`https://wa.me/51${num}?text=Hola,%20quiero%20vincular%20mi%20cuenta%20en%20Motorrepuestos%20Pro`, '_blank');
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-3.5 rounded-xl shadow-lg shadow-green-500/30 mt-4 transition-transform active:scale-95"
                  >
                    ENVIAR CÓDIGO POR WHATSAPP
                  </button>

                  <button 
                    onClick={() => setLoginMethod("options")}
                    className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 mt-2"
                  >
                    ← Volver atrás
                  </button>
                </div>
              )}

              {loginMethod === "email" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-black text-lg text-slate-800 text-center">Cuenta Tradicional</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      placeholder="tucorreo@empresa.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Contraseña</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium"
                    />
                  </div>

                  <div className="flex justify-end">
                    <a href="#" className="text-xs font-bold text-brand hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>

                  <button className="w-full bg-brand hover:bg-red-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-red-500/30 mt-2 transition-transform active:scale-95">
                    INICIAR SESIÓN
                  </button>

                  <button 
                    onClick={() => setLoginMethod("options")}
                    className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 mt-2"
                  >
                    ← Volver atrás
                  </button>
                </div>
              )}

              <p className="text-center text-[11px] text-slate-400 mt-8">
                Al continuar, aceptas nuestros <a href="#" className="underline">Términos de Servicio</a> y <a href="#" className="underline">Política de Privacidad</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
