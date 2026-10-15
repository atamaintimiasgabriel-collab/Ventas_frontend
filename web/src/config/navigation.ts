import { LayoutDashboard, Package, Warehouse, ShoppingCart, ClipboardList, Users, Truck, Wallet, ChartNoAxesCombined, Settings } from 'lucide-react';
// Define la navegación disponible sin inventar rutas para los módulos futuros.
export const navigation = [ { to:'/dashboard', label:'Dashboard', icon:LayoutDashboard }, { to:'/productos', label:'Productos', icon:Package }, { to:'/inventario', label:'Inventario', icon:Warehouse }, { to:'/ventas', label:'Ventas / POS', icon:ShoppingCart }, { to:'/pedidos', label:'Pedidos', icon:ClipboardList } ];
export const futureNavigation = [{label:'Clientes',icon:Users},{label:'Compras',icon:Truck},{label:'Caja',icon:Wallet},{label:'Reportes',icon:ChartNoAxesCombined},{label:'Configuración',icon:Settings}];
