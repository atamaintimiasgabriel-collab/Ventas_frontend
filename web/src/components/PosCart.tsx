import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { money } from '../services/demoDataService';
import { demoClients, paymentMethods } from '../mocks/pos.mock';
import { simulateTotals } from '../mocks/posSimulation';
import type { CartLine } from '../types/demo';
import styles from './PosCart.module.css';
export function PosCart({ lines, client, payment, onClient, onPayment, onQuantity, onClear, onProcess }: {
    lines: CartLine[];
    client: string;
    payment: string;
    onClient: (value: string) => void;
    onPayment: (value: string) => void;
    onQuantity: (id: number, quantity: number) => void;
    onClear: () => void;
    onProcess: () => void;
}) {
    const totals = simulateTotals(lines);
    return <section className={`panel ${styles.cart}`} aria-label="Carrito de demostración">
    <div className="panel-heading">
    <h2>Detalle de la operación</h2>
    <span className={styles.count}>{lines.reduce((sum, line) => sum + line.quantity, 0)} uds.</span>
    </div>
    <div className={styles.body}>
      <label>Cliente de demostración<select value={client} onChange={event => onClient(event.target.value)}>{demoClients.map(value => <option key={value}>{value}</option>)}</select>
    </label>
      <div className={styles.items}>
        {!lines.length && <div className={styles.empty}>
        <ShoppingBag size={32} strokeWidth={1.4}/>
        <h3>Tu detalle comienza aquí</h3>
        <p>Agrega un repuesto del catálogo para explorar el flujo POS.</p>
        </div>}
        {lines.map(line => <article key={line.product.id} className={styles.item}>
        <div>
        <h3>{line.product.name}</h3>
        <small>{money(line.product.price)} / unidad</small>
        </div>
        <button className={styles.remove} aria-label={`Quitar ${line.product.name}`} onClick={() => onQuantity(line.product.id, 0)}>
        <Trash2 size={15}/>
        </button>
        <div className={styles.quantity}>
        <button aria-label={`Reducir cantidad de ${line.product.name}`} onClick={() => onQuantity(line.product.id, line.quantity - 1)}>
        <Minus size={13}/>
        </button>
        <span aria-live="polite">{line.quantity}</span>
        <button aria-label={`Aumentar cantidad de ${line.product.name}`} disabled={line.quantity >= line.product.stock} onClick={() => onQuantity(line.product.id, line.quantity + 1)}>
        <Plus size={13}/>
        </button>
        </div>
        <strong>{money(line.product.price * line.quantity)}</strong>
        </article>)}
      </div>
      {lines.length > 0 && <button className={styles.clear} onClick={onClear}>
        <Trash2 size={13}/> Vaciar detalle</button>}
      <dl className={styles.totals}>
    <div>
    <dt>Subtotal ilustrativo</dt>
    <dd>{money(totals.subtotal)}</dd>
    </div>
    <div>
    <dt>Impuesto ilustrativo (18%)</dt>
    <dd>{money(totals.tax)}</dd>
    </div>
    <div className={styles.total}>
    <dt>Total demo</dt>
    <dd>{money(totals.total)}</dd>
    </div>
    </dl>
      <fieldset className={styles.payment}>
    <legend>Medio de pago de ejemplo</legend>{paymentMethods.map(value => <label key={value}>
        <input type="radio" name="payment" value={value} checked={payment === value} onChange={() => onPayment(value)}/>{value}</label>)}</fieldset>
      <button className={`button primary ${styles.process}`} disabled={!lines.length} onClick={onProcess}>Simular procesamiento <ArrowRight size={16}/>
    </button>
      <p className={styles.disclaimer}>Simulación local. Sin venta, comprobante ni cambios de inventario.</p>
    </div>
  </section>;
}
