"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/api";

interface MarcaVehiculo {
  idMarca: number;
  nombre: string;
}

interface ModeloVehiculo {
  idModelo: number;
  nombre: string;
}

export default function BuscadorRepuestos() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"vehiculo" | "oem" | "nombre">("vehiculo");

  // Data states
  const [marcas, setMarcas] = useState<MarcaVehiculo[]>([]);
  const [modelos, setModelos] = useState<ModeloVehiculo[]>([]);
  const [anios, setAnios] = useState<number[]>([]);
  const [cilindradas, setCilindradas] = useState<string[]>([]);

  // Selection states
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [selectedModelo, setSelectedModelo] = useState<string>("");
  const [selectedAnio, setSelectedAnio] = useState<string>("");
  const [selectedCilindrada, setSelectedCilindrada] = useState<string>("");

  const [oemInput, setOemInput] = useState("");
  const [nombreInput, setNombreInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Fetch Marcas on mount
  useEffect(() => {
    fetch(`${API_URL}/vehiculos/marcas`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMarcas(data);
      })
      .catch(console.error);
  }, []);

  // Fetch Modelos when Marca changes
  useEffect(() => {
    setSelectedModelo("");
    setSelectedAnio("");
    setSelectedCilindrada("");
    setModelos([]);
    setAnios([]);
    setCilindradas([]);

    if (selectedMarca) {
      fetch(`${API_URL}/vehiculos/marcas/${selectedMarca}/modelos`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setModelos(data);
        })
        .catch(console.error);
    }
  }, [selectedMarca]);

  // Fetch Años & Cilindradas when Modelo changes
  useEffect(() => {
    setSelectedAnio("");
    setSelectedCilindrada("");
    setAnios([]);
    setCilindradas([]);

    if (selectedModelo) {
      fetch(`${API_URL}/vehiculos/modelos/${selectedModelo}/anios`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setAnios(data);
        })
        .catch(console.error);

      fetch(`${API_URL}/vehiculos/modelos/${selectedModelo}/cilindradas`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setCilindradas(data.filter(Boolean));
        })
        .catch(console.error);
    }
  }, [selectedModelo]);

  const handleSearch = () => {
    setIsLoading(true);
    let query = "";

    if (activeTab === "vehiculo") {
      const params = new URLSearchParams();
      if (selectedMarca) params.append("idMarcaVehiculo", selectedMarca);
      if (selectedModelo) params.append("idModeloVehiculo", selectedModelo);
      if (selectedAnio) params.append("anio", selectedAnio);
      if (selectedCilindrada) params.append("cilindrada", selectedCilindrada);

      query = params.toString();
    } else if (activeTab === "oem") {
      if (oemInput.trim()) {
        query = `codigoOem=${encodeURIComponent(oemInput.trim())}`;
      }
    } else if (activeTab === "nombre") {
      if (nombreInput.trim()) {
        query = `nombre=${encodeURIComponent(nombreInput.trim())}`;
      }
    }

    if (query) {
      router.push(`/resultados?${query}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border border-slate-600 bg-[#0b1823]/95 p-3 shadow-2xl">
      <h2 className="px-2 pb-3 font-bold">🏍 BUSCA REPUESTOS PARA TU MOTO</h2>
      <div className="grid grid-cols-3 overflow-hidden rounded-t-md text-xs text-center">
        <button
          onClick={() => setActiveTab("vehiculo")}
          className={`p-3 font-bold ${activeTab === "vehiculo" ? "bg-brand" : "bg-slate-800 hover:bg-slate-700"}`}
        >
          Por vehículo
        </button>
        <button
          onClick={() => setActiveTab("oem")}
          className={`p-3 font-bold ${activeTab === "oem" ? "bg-brand" : "bg-slate-800 hover:bg-slate-700"}`}
        >
          Por código OEM
        </button>
        <button
          onClick={() => setActiveTab("nombre")}
          className={`p-3 font-bold ${activeTab === "nombre" ? "bg-brand" : "bg-slate-800 hover:bg-slate-700"}`}
        >
          Por nombre
        </button>
      </div>

      <div className="bg-white text-slate-900 p-3 grid grid-cols-2 gap-3 rounded-b-md">

        {activeTab === "vehiculo" && (
          <>
            <select
              value={selectedMarca}
              onChange={e => setSelectedMarca(e.target.value)}
              className="border rounded p-3"
            >
              <option value="">Marca</option>
              {marcas.map(m => (
                <option key={m.idMarca} value={m.idMarca}>{m.nombre}</option>
              ))}
            </select>

            <select
              value={selectedModelo}
              onChange={e => setSelectedModelo(e.target.value)}
              className="border rounded p-3"
              disabled={!selectedMarca}
            >
              <option value="">Modelo</option>
              {modelos.map(m => (
                <option key={m.idModelo} value={m.idModelo}>{m.nombre}</option>
              ))}
            </select>

            <select
              value={selectedAnio}
              onChange={e => setSelectedAnio(e.target.value)}
              className="border rounded p-3"
              disabled={!selectedModelo || anios.length === 0}
            >
              <option value="">Año</option>
              {anios.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            <select
              value={selectedCilindrada}
              onChange={e => setSelectedCilindrada(e.target.value)}
              className="border rounded p-3"
              disabled={!selectedModelo || cilindradas.length === 0}
            >
              <option value="">Cilindrada</option>
              {cilindradas.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </>
        )}

        {activeTab === "oem" && (
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Ingrese código OEM (ej. 12345-ABC)"
              value={oemInput}
              onChange={e => setOemInput(e.target.value)}
              className="w-full border rounded p-3"
            />
          </div>
        )}

        {activeTab === "nombre" && (
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Ingrese nombre de repuesto..."
              value={nombreInput}
              onChange={e => setNombreInput(e.target.value)}
              className="w-full border rounded p-3"
            />
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="col-span-2 bg-brand hover:bg-red-700 transition text-white font-bold rounded p-3 disabled:opacity-50"
        >
          {isLoading ? "Buscando..." : "⌕ Buscar repuestos"}
        </button>
      </div>
    </div>
  );
}
