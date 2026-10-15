import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { CartIcon } from '@/components/CartIcon';
import { API_URL } from '@/config/api';

async function buscarProductosPorCategoria(idCategoria: string) {
  const url = new URL(`${API_URL}/productos/buscar?idCategoria=${idCategoria}`);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

async function obtenerCategoria(idCategoria: string) {
  try {
    const res = await fetch(`${API_URL}/productos/categorias/disponibles`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const categorias = await res.json();
    return categorias.find((c: any) => c.idCategoria.toString() === idCategoria) || null;
  } catch (e) {
    return null;
  }
}

export default async function CategoriaPage({ params }: { params: Promise<{ idCategoria: string }> }) {
  const resolvedParams = await params;
  const productos = await buscarProductosPorCategoria(resolvedParams.idCategoria);
  const categoria = await obtenerCategoria(resolvedParams.idCategoria);
  
  const titulo = categoria ? `Categoría: ${categoria.nombre}` : 'Resultados de la categoría';

  return (
    <div className="bg-slate-50 min-h-screen">
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
          <div className="ml-auto flex items-center gap-6 text-sm">
            <CartIcon />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-slate-500 hover:text-brand font-semibold">← Volver</Link>
          <h1 className="text-2xl font-bold">{titulo}</h1>
        </div>
        
        {productos.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-xl">No se encontraron productos en esta categoría.</p>
            <Link href="/" className="mt-4 inline-block text-brand hover:underline">Volver al inicio</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productos.map((prod: any) => (
              <ProductCard key={prod.idProducto} productData={prod} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
