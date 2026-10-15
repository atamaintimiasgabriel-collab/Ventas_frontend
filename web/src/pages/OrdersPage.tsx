import { useState } from 'react';
import { Smartphone, Globe, ArrowRight, Server, Monitor, ReceiptText, ClipboardList, Eye } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { SearchField } from '../components/SearchField';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { demoData, money, orderTotal } from '../services/demoDataService';
import type { Order } from '../types/demo';
import styles from './OrdersPage.module.css';
export function OrdersPage() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [channel, setChannel] = useState('');
    const [selected, setSelected] = useState<Order | null>(null);
    const filtered = demoData.orders.filter(o => `${o.id} ${o.client}`.toLowerCase().includes(query.toLowerCase()) && (!status || o.status === status) && (!channel || o.channel === channel));
    return <div className="stack">
    <PageHeader title="Pedidos digitales" description="Del canal digital a la operación física. Un flujo, una fuente central."/>
    <section className={styles.flow} aria-label="Web y App generan pedidos, la API centraliza y Desktop POS genera ventas">{[{ icon: Smartphone, title: 'WEB / APP', description: 'Origen digital' }, { icon: ClipboardList, title: 'PEDIDO', description: 'Solicitud del cliente' }, { icon: Server, title: 'API CENTRAL', description: 'Reglas de negocio' }, { icon: Monitor, title: 'DESKTOP / POS', description: 'Procesamiento' }, { icon: ReceiptText, title: 'VENTA', description: 'Operación registrada' }].map(({ icon: Icon, title, description }, i) => <div className={styles.step} key={title}>
        <span>
        <Icon size={21}/>
        </span>
        <section>
        <strong>{title}</strong>
        <small>{description}</small>
        </section>{i < 4 && <ArrowRight size={17} className={styles.arrow}/>}</div>)}</section>
    <section className="panel">
    <div className="filters">
    <SearchField value={query} onChange={setQuery} label="Buscar pedidos" placeholder="Número de pedido o cliente…"/>
    <label>Estado<select value={status} onChange={e => setStatus(e.target.value)}>
    <option value="">Todos los estados</option>{['PENDIENTE', 'EN_PROCESO', 'CONFIRMADO', 'ATENDIDO', 'CANCELADO', 'RECHAZADO'].map(s => <option key={s}>{s}</option>)}</select>
    </label>
    <label>Canal<select value={channel} onChange={e => setChannel(e.target.value)}>
    <option value="">Todos</option>
    <option>WEB</option>
    <option>APP</option>
    </select>
    </label>
    </div>
    <DataTable headers={['N° pedido', 'Cliente', 'Canal', 'Fecha', 'Estado', 'Total', 'Acciones']} count={filtered.length}>{filtered.map(o => <tr key={o.id}>
        <td>
        <strong>{o.id}</strong>
        </td>
        <td>{o.client}</td>
        <td>
        <span className={styles.channel}>{o.channel === 'WEB' ? <Globe size={13}/> : <Smartphone size={13}/>} {o.channel}</span>
        </td>
        <td className="muted">{o.date}</td>
        <td>
        <StatusBadge status={o.status}/>
        </td>
        <td className="number">{money(orderTotal(o.productId, o.quantity))}</td>
        <td>
        <button className="icon-button" aria-label={`Ver ${o.id}`} onClick={() => setSelected(o)}>
        <Eye size={16}/>
        </button>
        </td>
        </tr>)}</DataTable>
    </section>
    <p className="notice">Los estados coinciden con el backend. Esta vista utiliza únicamente pedidos de ejemplo y no ejecuta cambios de estado.</p>{selected && <Modal title={selected.id} onClose={() => setSelected(null)}>
        <StatusBadge status={selected.status}/>
        <dl className="details">
        <div>
        <dt>Cliente</dt>
        <dd>{selected.client}</dd>
        </div>
        <div>
        <dt>Canal</dt>
        <dd>{selected.channel}</dd>
        </div>
        <div>
        <dt>Producto</dt>
        <dd>{demoData.products.find(p => p.id === selected.productId)?.name}</dd>
        </div>
        <div>
        <dt>Cantidad</dt>
        <dd>{selected.quantity}</dd>
        </div>
        <div>
        <dt>Total de ejemplo</dt>
        <dd>{money(orderTotal(selected.productId, selected.quantity))}</dd>
        </div>
        </dl>
        <p className="notice">El pedido se procesa en Desktop/POS mediante la API central. Aquí no se crea una venta real.</p>
        </Modal>}</div>;
}
