import Link from "next/link";
import { CartIcon } from "@/components/CartIcon";
import { LoginButton } from "@/components/LoginButton";
import { TrackingButton } from "@/components/TrackingButton";
import { API_URL } from "@/config/api";

interface Categoria {
  idCategoria: number;
  nombre: string;
  activo: boolean;
}

const categoryMap: Record<string, { icon: string; desc: string }> = {
  Motor: { icon: "⚙️", desc: "Pistones, bielas, válvulas" },
  Frenos: { icon: "🛑", desc: "Pastillas, discos, calipers" },
  Transmisión: { icon: "⛓️", desc: "Cadenas, piñones, coronas" },
  Eléctrico: { icon: "⚡", desc: "Baterías, faros, bujías" },
  Suspensión: { icon: "🏍️", desc: "Amortiguadores, retenes" },
  Carrocería: { icon: "🛡️", desc: "Carenados, espejos, asientos" },
  Lubricantes: { icon: "🛢️", desc: "Aceites, refrigerantes" },
  Accesorios: { icon: "🎒", desc: "Cascos, guantes, maletas" },
  Llantas: { icon: "🛞", desc: "Cámaras, llantas deportivas" },
};

export async function Header() {
  let categorias: Categoria[] = [];
  try {
    const resCat = await fetch(`${API_URL}/productos/categorias/disponibles`, {
      cache: "no-store",
    });
    if (resCat.ok) {
      categorias = await resCat.json();
    }
  } catch (error) {
    console.error("Error cargando categorias:", error);
  }

  const fallbackCategories = [
    { idCategoria: 1, nombre: "Motor", activo: true },
    { idCategoria: 2, nombre: "Frenos", activo: true },
  ];

  const displayCategorias = (categorias.length > 0 ? categorias : fallbackCategories).slice(0, 8);

  return (
    <>
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
          <div className="hidden md:flex flex-1 max-w-3xl">
            <input
              className="w-full rounded-l-md border px-5 py-3 outline-none focus:border-brand"
              placeholder="Buscar repuestos por nombre, código OEM, marca o modelo..."
            />
            <button className="bg-brand px-6 text-white rounded-r-md text-xl">
              ⌕
            </button>
          </div>
          <div className="ml-auto flex items-center gap-6 text-sm">
            <LoginButton />
            <TrackingButton />
            <CartIcon />
          </div>
        </div>

        <nav className="bg-ink text-white">
          <div className="mx-auto w-full flex overflow-x-auto whitespace-nowrap">
            <button className="bg-brand px-7 py-4 font-bold">
              ☰ &nbsp; Todas las categorías⌄
            </button>
            <div className="flex items-center text-sm font-semibold">
              {displayCategorias.map((cat) => {
                const meta = categoryMap[cat.nombre] || { icon: "🏷️", desc: "Categoría general" };
                return (
                  <Link
                    key={cat.idCategoria}
                    href={`/categoria/${cat.idCategoria}`}
                    className="px-5 py-4 hover:bg-slate-800 transition-colors"
                  >
                    {meta.icon} {cat.nombre}
                  </Link>
                );
              })}
            </div>
            <button className="ml-auto bg-brand px-8 font-bold">％ Ofertas</button>
          </div>
        </nav>
      </header>
    </>
  );
}
