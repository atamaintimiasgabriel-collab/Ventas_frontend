import { useState } from 'react';
import { Boxes, TriangleAlert, PackageX, ArrowLeftRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { demoData } from '../services/demoDataService';
export function InventoryPage() {
    const [warehouse, setWarehouse] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const products = demoData.products;
    const filtered = products.filter(p => (!warehouse || p.warehouse === warehouse) && (!category || p.category === category) && (!status || (status === 'low' ? p.stock > 0 && p.stock <= p.minimum : status === 'out' ? p.stock === 0 : p.stock > p.minimum)));
    return <div className="stack">
    <PageHeader title="Inventario y almacenes" description="Visibilidad de tus existencias, desde el almacén hasta cada ubicación."/>
    <div className="kpis">
    <StatCard label="Unidades en stock" value={products.reduce((s, p) => s + p.stock, 0)} detail="Todos los almacenes demo" icon={Boxes}/>
    <StatCard label="Referencias bajo mínimo" value={products.filter(p => p.stock > 0 && p.stock <= p.minimum).length} detail="Requieren reposición" icon={TriangleAlert} tone="amber"/>
    <StatCard label="Referencias agotadas" value={products.filter(p => !p.stock).length} detail="Sin unidades disponibles" icon={PackageX} tone="purple"/>
    <StatCard label="Movimientos recientes" value={demoData.movements.length} detail="Registros ilustrativos de hoy" icon={ArrowLeftRight} tone="green"/>
    </div>
    <p className="notice">
    <TriangleAlert size={19}/>Atención: {products.filter(p => p.stock <= p.minimum).length} referencias están bajo el mínimo o agotadas. Existencias compartidas con Productos y POS demo.</p>
    <section className="panel">
    <div className="filters">
    <label>Almacén<select value={warehouse} onChange={e => setWarehouse(e.target.value)}>
    <option value="">Todos los almacenes</option>{[...new Set(products.map(p => p.warehouse))].map(v => <option key={v}>{v}</option>)}</select>
    </label>
    <label>Categoría<select value={category} onChange={e => setCategory(e.target.value)}>
    <option value="">Todas</option>{[...new Set(products.map(p => p.category))].map(v => <option key={v}>{v}</option>)}</select>
    </label>
    <label>Estado de stock<select value={status} onChange={e => setStatus(e.target.value)}>
    <option value="">Todos</option>
    <option value="low">Stock bajo</option>
    <option value="out">Agotado</option>
    <option value="available">Disponible</option>
    </select>
    </label>
    </div>
    <DataTable headers={['SKU', 'Producto', 'Almacén', 'Ubicación', 'Stock', 'Mínimo', 'Estado']} count={filtered.length}>{filtered.map(p => <tr key={p.id}>
        <td className="muted">{p.sku}</td>
        <td className="product-name">{p.name}</td>
        <td>{p.warehouse}</td>
        <td>{p.location}</td>
        <td>
        <strong>{p.stock}</strong>
        </td>
        <td>{p.minimum}</td>
        <td>
        <StatusBadge status={p.stock === 0 ? 'AGOTADO' : p.stock <= p.minimum ? 'BAJO' : 'DISPONIBLE'}/>
        </td>
        </tr>)}</DataTable>
    </section>
    <div className="grid-2">
    <section className="panel">
    <div className="panel-heading">
    <h2>Movimientos recientes</h2>
    <small className="muted">Datos de ejemplo</small>
    </div>
    <DataTable headers={['Producto', 'Movimiento', 'Cantidad', 'Hora']} count={demoData.movements.length}>{demoData.movements.map(m => <tr key={m.id}>
        <td className="product-name">{m.product}<small>{m.warehouse}</small>
        </td>
        <td>{m.type}</td>
        <td>{m.quantity}</td>
        <td>{m.time}</td>
        </tr>)}</DataTable>
    </section>
    <section className="panel">
    <div className="panel-heading">
    <h2>Transferencias visuales</h2>
    <ArrowLeftRight size={18}/>
    </div>
    <div className="panel-body">{demoData.transfers.map(t => <div key={t.id}>
        <p className="eyebrow muted">{t.id} · {t.status}</p>
        <h3 style={{ margin: '12px 0' }}>{t.product} · {t.quantity} unidades</h3>
        <p className="muted" style={{ fontSize: 13 }}>{t.from} → {t.to}</p>
        <p className="notice" style={{ marginTop: 18 }}>Registro ilustrativo. No se ejecuta ninguna transferencia.</p>
        </div>)}</div>
    </section>
    </div>
    </div>;
}
