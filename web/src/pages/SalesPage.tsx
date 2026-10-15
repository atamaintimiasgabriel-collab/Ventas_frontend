import { useState } from 'react';
import { Monitor, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PosCatalog } from '../components/PosCatalog';
import { PosCart } from '../components/PosCart';
import { Modal } from '../components/Modal';
import { demoClients, paymentMethods } from '../mocks/pos.mock';
import type { CartLine, Product } from '../types/demo';
import styles from './SalesPage.module.css';

export function SalesPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [client, setClient] = useState(demoClients[0]);
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [completed, setCompleted] = useState(false);

  // Representa el flujo Desktop/POS en memoria, sin registrar una venta real.
  function addProduct(product: Product) {
    setLines(current => {
      const existing = current.find(line => line.product.id === product.id);
      if (!product.active || product.stock === 0 || (existing && existing.quantity >= product.stock)) return current;
      return existing ? current.map(line => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { product, quantity: 1 }];
    });
  }
  function setQuantity(id: number, quantity: number) {
    setLines(current => current.map(line => line.product.id === id ? { ...line, quantity: Math.max(0, Math.min(quantity, line.product.stock)) } : line).filter(line => line.quantity > 0));
  }

  return <div className="stack">
    <PageHeader title="Ventas / POS" description="Explora el flujo de atención de mostrador, de principio a fin." />
    <div className={styles.notice}><Monitor size={22} /><div><strong>DEMOSTRACIÓN VISUAL DEL FLUJO POS</strong><p>Operación real en Desktop · No se conecta con la API ni genera ventas.</p></div><span>LOCAL / DEMO</span></div>
    <div className={styles.workspace}><PosCatalog onAdd={addProduct} lines={lines} /><PosCart lines={lines} client={client} payment={payment} onClient={setClient} onPayment={setPayment} onQuantity={setQuantity} onClear={() => setLines([])} onProcess={() => setCompleted(true)} /></div>
    {completed && <Modal title="Simulación completada" onClose={() => { setCompleted(false); setLines([]); }}><div className={styles.success}><CheckCircle2 size={42} /><h3>Simulación completada.</h3><p>No se registró una venta ni se modificó el inventario.</p><small>El detalle local se limpiará al cerrar este mensaje. El POS operativo pertenece al cliente Desktop.</small></div></Modal>}
  </div>;
}
