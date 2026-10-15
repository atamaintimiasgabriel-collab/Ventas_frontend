import { products } from '../mocks/products.mock';
import { orders } from '../mocks/orders.mock';
import { salesHistory, activity } from '../mocks/dashboard.mock';
import { movements, transfers } from '../mocks/inventory.mock';
// Adaptador exclusivamente local: ninguna función realiza solicitudes HTTP.
export const demoData = { products, orders, salesHistory, activity, movements, transfers };
export const money = (value:number) => new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN'}).format(value);
export const orderTotal = (productId:number,quantity:number) => (products.find(p=>p.id===productId)?.price ?? 0)*quantity;
