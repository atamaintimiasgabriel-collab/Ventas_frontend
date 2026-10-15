import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-t-4 border-brand rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-4 border-slate-800 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">⚙️</div>
      </div>
      <h2 className="text-2xl font-black italic text-slate-800 uppercase animate-pulse">Cargando Repuestos...</h2>
      <p className="text-slate-500 font-semibold mt-2">Buscando en la base de datos</p>
    </div>
  );
}
