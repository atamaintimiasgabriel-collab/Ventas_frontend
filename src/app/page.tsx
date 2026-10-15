import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import BuscadorRepuestos from "@/components/BuscadorRepuestos";
import { CartIcon } from "@/components/CartIcon";
import { LoginButton } from "@/components/LoginButton";
import { TrackingButton } from "@/components/TrackingButton";
import { SearchBar } from "@/components/SearchBar";
import { API_URL } from "@/config/api";

interface Categoria {
  idCategoria: number;
  nombre: string;
  activo: boolean;
}

interface Marca {
  idMarca: number;
  nombre: string;
  activo: boolean;
}

interface Producto {
  idProducto: number;
  sku: string;
  nombreComercial: string;
  nombreMarca: string;
  precioVenta: number;
  rutaImagen: string;
}

// Mapeo para mantener los iconos y descripciones ya que el backend solo retorna 'nombre'
const categoryMap: Record<string, { icon: string; desc: string }> = {
  "Motor": { icon: "⚙️", desc: "Cilindros, pistones, válvulas" },
  "Frenos": { icon: "◉", desc: "Discos, pastillas, bombas" },
  "Transmisión": { icon: "⛓️", desc: "Cadenas, piñones, embrague" },
  "Eléctrico": { icon: "🔋", desc: "Baterías, bobinas, luces" },
  "Suspensión": { icon: "🔩", desc: "Amortiguadores, horquillas" },
  "Carrocería": { icon: "🏍️", desc: "Plásticos, faros, espejos" },
  "Lubricantes": { icon: "🛢️", desc: "Aceites, aditivos, filtros" },
  "Accesorios": { icon: "⛑️", desc: "Cascos, maleteros, etc." },
};

async function getCategorias(): Promise<Categoria[]> {
  try {
    // Apuntamos al backend
    const res = await fetch(`${API_URL}/productos/categorias/disponibles`, {
      next: { revalidate: 60 } // Cache ISR
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}

async function getMarcas(): Promise<Marca[]> {
  try {
    const res = await fetch(`${API_URL}/productos/marcas/disponibles`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    return [];
  }
}

async function getProductos(filtro: string, idCategoria?: string): Promise<Producto[]> {
  try {
    let url = `${API_URL}/productos/catalogo?filtro=${filtro}&limite=16`;
    if (idCategoria) {
      url += `&idCategoria=${idCategoria}`;
    }
    const res = await fetch(url, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

const productsData = [
  ["-25%", "DID", "Kit de arrastre 428H con corona y piñón", "S/ 89.90", "⛓️"],
  ["-20%", "YAMAHA", "Pastillas de freno delanteras Yamaha FZ", "S/ 45.90", "◉"],
  ["-15%", "NGK", "Bujía NGK Iridium CR9EIX", "S/ 28.90", "🔩"],
  ["-30%", "RACING", "Amortiguador trasero regulable 340mm", "S/ 129.90", "🔧"],
  ["", "K&N", "Filtro de aire deportivo alto flujo", "S/ 49.90", "▰"],
  ["-18%", "BREMBO", "Disco de freno delantero ventilado", "S/ 139.90", "⚙️"],
  ["-22%", "MOTUL", "Aceite Motul 7100 10W-40 1L", "S/ 54.90", "🛢️"],
  ["-15%", "PIRELLI", "Llanta Pirelli 90/90-17 Sport Demon", "S/ 179.90", "◯"],
];

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const currentTab = typeof params.tab === 'string' ? params.tab : 'mas-vendidos';
  const currentCategoria = typeof params.categoria === 'string' ? params.categoria : undefined;
  
  const categorias = await getCategorias();
  const marcas = await getMarcas();
  const productos = await getProductos(currentTab, currentCategoria);

  // Si no hay categorías (backend apagado), mostraremos un placeholder para la demo
  const fallbackCategories = [
    { idCategoria: 1, nombre: "Motor", activo: true },
    { idCategoria: 2, nombre: "Frenos", activo: true },
  ];

  const displayCategorias = (categorias.length > 0 ? categorias : fallbackCategories).slice(0, 8);

  return (
    <>
      {/* TOP STRIP */}
      <div className="bg-ink text-white text-xs">
        <div className="mx-auto w-full px-6 py-2 flex justify-between gap-6">
          <div className="flex gap-7">
            <span>⌖ Envíos a todo el Perú</span>
            <span>▣ Envío rápido y seguro</span>
            <span>◆ Productos originales</span>
            <span>⚙ Garantía en todos los repuestos</span>
          </div>
          <div className="hidden lg:flex gap-5">
            <span>Ayuda</span>
            <span>☎ +51 987 654 321</span>
            <span>● ◉ ▶</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto w-full px-6 py-4 flex items-center gap-8">
          <Link
            className="min-w-fit flex items-center gap-3 font-black italic text-xl"
            href="/"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white text-2xl">
              ⚙
            </span>
            <span className="leading-5">
              MOTORREPUESTOS<br />
              <b className="text-brand">PRO ULTRA</b>
            </span>
          </Link>
          <SearchBar />
          <div className="ml-auto flex items-center gap-6 text-sm">
            <LoginButton />
            <TrackingButton />
            <CartIcon />
          </div>
        </div>

        <nav className="bg-ink text-white border-b border-slate-800">
          <div className="mx-auto w-full px-6 flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="bg-brand hover:bg-red-700 transition px-8 py-4 font-bold text-sm uppercase tracking-wider flex items-center gap-3">
              <span className="text-xl leading-none">☰</span> Todas las categorías
            </button>
            
            <div className="flex items-center text-sm font-semibold ml-4">
              <Link 
                prefetch={true}
                href={`/?${currentTab ? `tab=${currentTab}` : ''}`}
                className={`px-6 py-4 transition-all uppercase tracking-wider border-b-4 ${!currentCategoria ? 'border-brand text-white bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              >
                Inicio
              </Link>
              
              {displayCategorias.map((cat) => {
                const meta = categoryMap[cat.nombre] || { icon: "🏷️", desc: "Categoría general" };
                const isActive = currentCategoria === cat.idCategoria.toString();
                return (
                  <Link
                    prefetch={true}
                    key={cat.idCategoria}
                    href={`/?categoria=${cat.idCategoria}${currentTab ? `&tab=${currentTab}` : ''}`}
                    className={`px-6 py-4 flex items-center gap-2 transition-all uppercase tracking-wider border-b-4 ${isActive ? 'border-brand text-white bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                  >
                    <span className="text-lg opacity-80">{meta.icon}</span> 
                    {cat.nombre}
                  </Link>
                );
              })}
            </div>
            <button className="ml-auto flex items-center gap-2 text-brand hover:text-red-400 font-bold px-6 uppercase tracking-wider text-sm transition">
              <span className="text-xl">％</span> Ofertas Exclusivas
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative text-white overflow-hidden min-h-[450px] flex items-center">
        {/* Background Video (YouTube iframe) - 4K HD */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <iframe 
            className="absolute w-screen h-[56.25vw] min-h-[100%] min-w-[177.77vh] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/_Sb2KQwjvAs?autoplay=1&mute=1&controls=0&loop=1&playlist=_Sb2KQwjvAs&vq=hd1080&modestbranding=1&showinfo=0&rel=0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 z-10 hero pointer-events-none"></div>

        <div className="relative z-20 mx-auto w-full px-8 py-8 grid lg:grid-cols-[1fr_440px] gap-10 items-center min-h-[330px]">
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-[.95]">
              <span className="animate-flash-text block">Repuestos originales</span>
              <span className="text-brand animate-flash-brand block">para tu moto</span>
            </h1>
            <p className="mt-5 max-w-xl text-xl animate-flash-text">
              Las mejores marcas, máximo rendimiento y la calidad que tu moto necesita.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 animate-flash-text">
              <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/60 hover:border-brand/50 transition-all group">
                <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(239,16,29,0.8)] transition-all">🛡️</span>
                <span className="text-sm leading-tight text-slate-300">Productos<br /><b className="text-white text-base">100% Originales</b></span>
              </div>
              <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/60 hover:border-brand/50 transition-all group">
                <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(239,16,29,0.8)] transition-all">🚚</span>
                <span className="text-sm leading-tight text-slate-300">Envíos a<br /><b className="text-white text-base">Todo el Perú</b></span>
              </div>
              <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/60 hover:border-brand/50 transition-all group">
                <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(239,16,29,0.8)] transition-all">💳</span>
                <span className="text-sm leading-tight text-slate-300">Pagos seguros<br /><b className="text-white text-base">y confiables</b></span>
              </div>
              <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/60 hover:border-brand/50 transition-all group">
                <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(239,16,29,0.8)] transition-all">🎧</span>
                <span className="text-sm leading-tight text-slate-300">Soporte<br /><b className="text-white text-base">Especializado</b></span>
              </div>
            </div>
          </div>
          <BuscadorRepuestos />
        </div>
      </section>

      {/* BRANDS - FULL WIDTH */}
      <section className="relative z-10 -mt-8 w-full border-y border-slate-700/50 bg-gradient-to-r from-slate-900 via-ink to-slate-900 px-8 py-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-xl md:text-2xl font-black italic uppercase shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {marcas.length > 0 ? (
          marcas.slice(0, 10).map((marca, index) => {
            const realNames = ["HONDA", "YAMAHA", "BAJAJ", "SUZUKI", "KTM", "KAWASAKI", "TVS", "BMW", "DUCATI", "APRILIA"];
            const displayName = realNames[index] || marca.nombre;

            let colorClass = "neon-brand neon-brand-red"; // default
            if (["HONDA", "YAMAHA", "SUZUKI", "DUCATI", "APRILIA"].includes(displayName)) colorClass = "neon-brand neon-brand-red";
            else if (["BAJAJ", "TVS", "BMW"].includes(displayName)) colorClass = "neon-brand neon-brand-blue";
            else if (displayName === "KTM") colorClass = "neon-brand neon-brand-orange";
            else if (displayName === "KAWASAKI") colorClass = "neon-brand neon-brand-green";

            return (
              <span key={marca.idMarca} className={colorClass}>
                {displayName}
              </span>
            );
          })
        ) : (
          <>
            <span className="neon-brand neon-brand-red">HONDA</span>
            <span className="neon-brand neon-brand-red">YAMAHA</span>
            <span className="neon-brand neon-brand-blue">BAJAJ</span>
            <span className="neon-brand neon-brand-red">SUZUKI</span>
            <span className="neon-brand neon-brand-orange">KTM</span>
            <span className="neon-brand neon-brand-green">KAWASAKI</span>
            <span className="neon-brand neon-brand-blue">TVS</span>
            <span className="neon-brand neon-brand-blue">BMW</span>
            <span className="neon-brand neon-brand-red">DUCATI</span>
            <span className="neon-brand neon-brand-red">APRILIA</span>
          </>
        )}
      </section>

      <main className="mx-auto w-full px-6 pt-10">


        {/* PRODUCTS */}
        <section className="pb-12">
          <div className="flex gap-8 border-b border-slate-300 mb-6 text-lg uppercase">
            <Link href={`/?tab=mas-vendidos${currentCategoria ? `&categoria=${currentCategoria}` : ''}`} className={`py-4 ${currentTab === 'mas-vendidos' ? 'tab-neon-active' : 'tab-neon-inactive'}`}>
              🔥 Más vendidos
            </Link>
            <Link href={`/?tab=ofertas${currentCategoria ? `&categoria=${currentCategoria}` : ''}`} className={`py-4 ${currentTab === 'ofertas' ? 'tab-neon-active' : 'tab-neon-inactive'}`}>
              Ofertas
            </Link>
            <Link href={`/?tab=nuevos${currentCategoria ? `&categoria=${currentCategoria}` : ''}`} className={`py-4 ${currentTab === 'nuevos' ? 'tab-neon-active' : 'tab-neon-inactive'}`}>
              Nuevos ingresos
            </Link>
            <Link href={`/?tab=recomendados${currentCategoria ? `&categoria=${currentCategoria}` : ''}`} className={`py-4 ${currentTab === 'recomendados' ? 'tab-neon-active' : 'tab-neon-inactive'}`}>
              Recomendados
            </Link>
            <Link href="/catalogo" className="ml-auto text-brand font-black py-4 hover:animate-flash-brand">
              VER TODOS →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {productos.length > 0
              ? productos.map((p) => <ProductCard key={p.idProducto} productData={p} />)
              : productsData.map((p, i) => <ProductCard key={i} product={p} />)
            }
          </div>
        </section>
      </main>

      <footer className="bg-ink text-slate-300">
        <div className="mx-auto w-full px-6 py-8 flex flex-wrap justify-between gap-5">
          <b className="text-white">
            MOTORREPUESTOS <span className="text-brand">PRO ULTRA</span>
          </b>
          <span>© 2026 · Tienda online de motorrepuestos</span>
        </div>
      </footer>
    </>
  );
}
