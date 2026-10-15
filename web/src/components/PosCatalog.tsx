import { useState } from 'react';
import { Plus, Package, Wrench, Droplets, Disc3, Zap, Circle } from 'lucide-react';
import { SearchField } from './SearchField';
import { EmptyState } from './EmptyState';
import { demoData, money } from '../services/demoDataService';
import type { Product, CartLine } from '../types/demo';
import styles from './PosCatalog.module.css';

const categoryIcons = { Transmisión: Wrench, Lubricantes: Droplets, Frenos: Disc3, Motor: Wrench, Eléctrico: Zap, Neumáticos: Circle };

export function PosCatalog({ onAdd, lines }: { onAdd: (product: Product) => void; lines: CartLine[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const products = demoData.products.filter(product => product.active && (!category || product.category === category) && `${product.name} ${product.sku}`.toLowerCase().includes(query.toLowerCase()));

  return <section className={`panel ${styles.catalog}`} aria-label="Catálogo para simulación POS">
    <div className="panel-heading"><div><h2>Encuentra el repuesto</h2><p className="muted">Catálogo de demostración</p></div><Package size={20} className="muted" /></div>
    <div className={styles.search}><SearchField value={query} onChange={setQuery} label="Buscar catálogo POS" placeholder="Nombre del producto o SKU…" /></div>
    <div className={styles.categories} aria-label="Categorías POS">
      {['', ...Object.keys(categoryIcons)].map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value || 'Todos'}</button>)}
    </div>
    {products.length === 0 ? <EmptyState /> : <div className={styles.grid}>
      {products.map(product => {
        const Icon = categoryIcons[product.category as keyof typeof categoryIcons] || Package;
        const reserved = lines.find(line => line.product.id === product.id)?.quantity || 0;
        return <article key={product.id} className={styles.product}>
          <div className={styles.illustration}><Icon size={38} strokeWidth={1.25} /><span>{product.brand}</span></div>
          <small className="muted">{product.sku}</small>
          <h3>{product.name}</h3>
          <p className={product.stock === 0 ? styles.out : ''}>{product.stock === 0 ? 'Agotado' : `${product.stock} unidades en stock`}</p>
          <div className={styles.action}><strong>{money(product.price)}</strong><button className="icon-button" aria-label={`Agregar ${product.name}`} disabled={reserved >= product.stock} onClick={() => onAdd(product)}><Plus size={18} /></button></div>
        </article>;
      })}
    </div>}
  </section>;
}
