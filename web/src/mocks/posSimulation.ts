import type { CartLine } from '../types/demo';
// Aritmética ilustrativa del carrito; no sustituye al Tax Engine del backend.
export function simulateTotals(lines: CartLine[]) { const total = Math.round(lines.reduce((sum,line)=>sum+line.product.price*line.quantity,0)*100)/100; const subtotal = Math.round(total/1.18*100)/100; return {subtotal,tax:Math.round((total-subtotal)*100)/100,total}; }
