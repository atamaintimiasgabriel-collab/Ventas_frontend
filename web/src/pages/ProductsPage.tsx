import { useState } from 'react';
import { Eye, Plus, Package } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { SearchField } from '../components/SearchField';
import { DataTable, Pagination } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { demoData, money } from '../services/demoDataService';
import type { Product } from '../types/demo';
export function ProductsPage() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Product | null>(null);
    const [create, setCreate] = useState(false);
    const filtered = demoData.products.filter(p => `${p.name} ${p.sku}`.toLowerCase().includes(query.toLowerCase()) && (!category || p.category === category) && (!brand || p.brand === brand) && (!status || (status === 'active' ? p.active : !p.active)));
    function filter(set: (v: string) => void, v: string) { set(v); setPage(1); }
    return <div className="stack">
    <PageHeader title="Catálogo de productos" description="Cada repuesto en su lugar. Consulta y explora tu catálogo." action={<button className="button primary" onClick={() => setCreate(true)}>
        <Plus size={16}/>Nuevo producto</button>}/>
    <section className="panel">
    <div className="panel-heading">
    <h2>
    <Package size={17} style={{ verticalAlign: 'middle', marginRight: 8 }}/>{demoData.products.length} productos de ejemplo</h2>
    <span className="muted" style={{ fontSize: 11 }}>Moneda · PEN</span>
    </div>
    <div className="filters">
    <SearchField label="Buscar productos" placeholder="Buscar por nombre o SKU…" value={query} onChange={v => filter(setQuery, v)}/>
    <label>Categoría<select value={category} onChange={e => filter(setCategory, e.target.value)}>
    <option value="">Todas</option>{[...new Set(demoData.products.map(p => p.category))].map(v => <option key={v}>{v}</option>)}</select>
    </label>
    <label>Marca<select value={brand} onChange={e => filter(setBrand, e.target.value)}>
    <option value="">Todas</option>{[...new Set(demoData.products.map(p => p.brand))].map(v => <option key={v}>{v}</option>)}</select>
    </label>
    <label>Estado<select value={status} onChange={e => filter(setStatus, e.target.value)}>
    <option value="">Todos</option>
    <option value="active">Activo</option>
    <option value="inactive">Inactivo</option>
    </select>
    </label>
    </div>
    <DataTable headers={['SKU', 'Producto', 'Categoría', 'Marca', 'Precio', 'Stock', 'Estado', 'Acciones']} count={filtered.length}>{filtered.slice((page - 1) * 6, page * 6).map(p => <tr key={p.id}>
        <td className="muted">{p.sku}</td>
        <td className="product-name">{p.name}</td>
        <td>{p.category}</td>
        <td>{p.brand}</td>
        <td className="number">{money(p.price)}</td>
        <td>
        <strong>{p.stock}</strong>{p.stock <= p.minimum && <small style={{ display: 'block', color: p.stock === 0 ? '#b42332' : '#8a530a', marginTop: 4 }}>{p.stock === 0 ? 'Agotado' : 'Stock bajo'}</small>}</td>
        <td>
        <StatusBadge status={p.active ? 'ACTIVO' : 'INACTIVO'}/>
        </td>
        <td>
        <button className="icon-button" aria-label={`Ver detalle de ${p.name}`} onClick={() => setSelected(p)}>
        <Eye size={16}/>
        </button>
        </td>
        </tr>)}</DataTable>
    <Pagination page={page} total={filtered.length} pageSize={6} onChange={setPage}/>
    </section>{selected && <Modal title="Detalle del producto" onClose={() => setSelected(null)}>
        <h3>{selected.name}</h3>
        <dl className="details">{[['SKU', selected.sku], ['Marca', selected.brand], ['Categoría', selected.category], ['Precio', money(selected.price)], ['Stock', `${selected.stock} unidades`], ['Almacén', selected.warehouse], ['Ubicación', selected.location], ['Stock mínimo', selected.minimum]].map(([key, value]) => <div key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
            </div>)}</dl>
        <StatusBadge status={selected.active ? 'ACTIVO' : 'INACTIVO'}/>
        </Modal>}{create && <Modal title="Alta de productos · Próximamente" onClose={() => setCreate(false)}>
        <p>El alta de productos se habilitará cuando exista un endpoint real y se aprueben sus reglas empresariales.</p>
        <p className="notice" style={{ marginTop: 16 }}>Esta demo permite consultar el catálogo. No se ha creado ni guardado ningún producto.</p>
        </Modal>}</div>;
}
