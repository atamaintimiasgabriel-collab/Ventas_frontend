export type Product = { id: number; sku: string; name: string; category: string; brand: string; price: number; stock: number; minimum: number; warehouse: string; location: string; active: boolean };
export type OrderStatus = 'PENDIENTE' | 'EN_PROCESO' | 'CONFIRMADO' | 'ATENDIDO' | 'CANCELADO' | 'RECHAZADO';
export type Order = { id: string; client: string; channel: 'WEB' | 'APP'; date: string; status: OrderStatus; productId: number; quantity: number };
export type CartLine = { product: Product; quantity: number };
