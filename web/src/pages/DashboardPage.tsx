import { Link } from 'react-router-dom';
import { ArrowUpRight, Banknote, ClipboardList, Package, TriangleAlert, ArrowRight, Zap, Clock3 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { SalesSummary } from '../components/SalesSummary';
import { demoData, money, orderTotal } from '../services/demoDataService';
import { demoConfig } from '../config/demoConfig';
import styles from './DashboardPage.module.css';
export function DashboardPage() {
    const low = demoData.products.filter(p => p.stock <= p.minimum);
    return <div className="stack">
    <PageHeader title="Todo en marcha, Administrador" description={`${demoConfig.company} · ${demoConfig.branch}`} action={<span className={styles.date}>
        <Clock3 size={14}/> Lunes, {demoConfig.date}</span>}/>
    <div className={styles.hero}>
    <div>
    <p className="eyebrow">TU OPERACIÓN, EN UNA SOLA VISIÓN</p>
    <h2>Más control.<br />
    <span>Menos fricción.</span>
    </h2>
    <p>Conecta las piezas de tu negocio y mantén el ritmo.</p>
    <Link className={styles.heroLink} to="/pedidos">Explorar pedidos <ArrowUpRight size={17}/>
    </Link>
    </div>
    <div className={styles.heroVisual} aria-hidden="true">
    <div />
    <div />
    <div />
    <span>MR<span>CONTROL CENTER</span>
    </span>
    </div>
    <span className={styles.heroTag}>PRO / WORKSPACE 01</span>
    </div>
    <div className="kpis">
    <StatCard label="Ventas del día" value={money(demoData.salesHistory.at(-1)!.amount)} detail="Registro histórico de ejemplo" icon={Banknote}/>
    <StatCard label="Pedidos pendientes" value={demoData.orders.filter(o => o.status === 'PENDIENTE').length.toString().padStart(2, '0')} detail={`${demoData.orders.length} pedidos en el escenario demo`} icon={ClipboardList} tone="purple"/>
    <StatCard label="Productos registrados" value={demoData.products.length} detail="Catálogo de motorrepuestos" icon={Package} tone="green"/>
    <StatCard label="Stock bajo / agotado" value={low.length.toString().padStart(2, '0')} detail="Referencias que requieren atención" icon={TriangleAlert} tone="amber"/>
    </div>
    <div className="grid-2">
    <section className="panel">
    <div className="panel-heading">
    <div>
    <h2>Resumen de ventas</h2>
    <p className={styles.caption}>Últimos 7 días · Datos de ejemplo</p>
    </div>
    <span className={styles.legend}>● Ventas</span>
    </div>
    <div className="panel-body">
    <div className={styles.salesTotal}>{money(demoData.salesHistory.reduce((sum, s) => sum + s.amount, 0))}<span>Acumulado del periodo</span>
    </div>
    <SalesSummary />
    </div>
    </section>
    <section className="panel">
    <div className="panel-heading">
    <h2>Pedidos recientes</h2>
    <Link className={styles.textLink} to="/pedidos">Ver todos <ArrowRight size={14}/>
    </Link>
    </div>
    <div>{demoData.orders.slice(0, 4).map(o => <Link to="/pedidos" className={styles.order} key={o.id}>
        <span className={styles.orderIcon}>
        <ClipboardList size={17}/>
        </span>
        <div>
        <strong>{o.id}</strong>
        <small>{o.client}</small>
        </div>
        <div>
        <strong>{money(orderTotal(o.productId, o.quantity))}</strong>
        <StatusBadge status={o.status}/>
        </div>
        </Link>)}</div>
    </section>
    </div>
    <div className="grid-2">
    <section className="panel">
    <div className="panel-heading">
    <h2>Stock que necesita atención</h2>
    <Link className={styles.textLink} to="/inventario">Revisar inventario <ArrowRight size={14}/>
    </Link>
    </div>
    <div className="table-wrap">
    <table>
    <thead>
    <tr>
    <th>Producto</th>
    <th>Stock</th>
    <th>Estado</th>
    </tr>
    </thead>
    <tbody>{low.map(p => <tr key={p.id}>
        <td className="product-name">{p.name}<small>{p.sku}</small>
        </td>
        <td>
        <strong>{p.stock}</strong> <span className="muted">/ mín. {p.minimum}</span>
        </td>
        <td>
        <StatusBadge status={p.stock === 0 ? 'AGOTADO' : 'BAJO'}/>
        </td>
        </tr>)}</tbody>
    </table>
    </div>
    </section>
    <section className="panel">
    <div className="panel-heading">
    <h2>Actividad reciente</h2>
    <Zap size={17} className="muted"/>
    </div>
    <div className={styles.activity}>{demoData.activity.map(a => <div key={a.title}>
        <span />
        <section>
        <strong>{a.title}</strong>
        <p>{a.detail}</p>
        <small>Hoy · {a.time}</small>
        </section>
        </div>)}</div>
    </section>
    </div>
    <div className={styles.quick}>
    <span className="eyebrow muted">ACCESOS RÁPIDOS</span>
    <Link to="/productos">
    <Package size={16}/> Consultar catálogo <ArrowUpRight size={14}/>
    </Link>
    <Link to="/inventario">
    <TriangleAlert size={16}/> Revisar existencias <ArrowUpRight size={14}/>
    </Link>
    <Link to="/ventas">
    <Banknote size={16}/> Explorar POS demo <ArrowUpRight size={14}/>
    </Link>
    </div>
    </div>;
}
