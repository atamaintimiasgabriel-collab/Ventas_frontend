import type { Product } from '../types/demo';
// Fuente común de existencias: catálogo, inventario y POS muestran el mismo stock.
export const products: Product[] = [
 {id:1,sku:'MR-00124',name:'Kit de arrastre 428H · 125/150 cc',category:'Transmisión',brand:'Riffel',price:145,stock:4,minimum:8,warehouse:'Almacén principal',location:'A-01-03',active:true},
 {id:2,sku:'MR-00125',name:'Aceite Motul 5100 10W-40 · 1 L',category:'Lubricantes',brand:'Motul',price:58,stock:32,minimum:10,warehouse:'Almacén principal',location:'B-02-01',active:true},
 {id:3,sku:'MR-00126',name:'Pastillas de freno cerámicas',category:'Frenos',brand:'Brembo',price:89,stock:6,minimum:10,warehouse:'Almacén principal',location:'C-01-02',active:true},
 {id:4,sku:'MR-00127',name:'Bujía NGK CR7HSA',category:'Motor',brand:'NGK',price:22,stock:48,minimum:12,warehouse:'Almacén principal',location:'A-03-01',active:true},
 {id:5,sku:'MR-00128',name:'Llanta City Pro 90/90-18',category:'Neumáticos',brand:'Michelin',price:215,stock:0,minimum:4,warehouse:'Almacén secundario',location:'D-01-01',active:true},
 {id:6,sku:'MR-00129',name:'Batería sellada 12V · 7 Ah',category:'Eléctrico',brand:'Yuasa',price:185,stock:12,minimum:5,warehouse:'Almacén principal',location:'E-02-04',active:true},
 {id:7,sku:'MR-00130',name:'Filtro de aire para XR 150',category:'Motor',brand:'Hiflofiltro',price:42,stock:3,minimum:6,warehouse:'Almacén secundario',location:'A-02-02',active:true},
 {id:8,sku:'MR-00131',name:'Disco de freno delantero · 240 mm',category:'Frenos',brand:'Brembo',price:169,stock:15,minimum:5,warehouse:'Almacén principal',location:'C-03-01',active:true},
 {id:9,sku:'MR-00132',name:'Cadena reforzada 428 · 120 eslabones',category:'Transmisión',brand:'Riffel',price:76,stock:21,minimum:8,warehouse:'Almacén secundario',location:'B-01-04',active:true},
 {id:10,sku:'MR-00133',name:'Faro LED auxiliar · 20 W',category:'Eléctrico',brand:'Osram',price:120,stock:8,minimum:4,warehouse:'Almacén principal',location:'E-01-01',active:false},
 {id:11,sku:'MR-00134',name:'Aceite de horquilla 10W · 1 L',category:'Lubricantes',brand:'Motul',price:65,stock:18,minimum:6,warehouse:'Almacén secundario',location:'B-02-03',active:true},
 {id:12,sku:'MR-00135',name:'Llanta Pilot Street 100/80-17',category:'Neumáticos',brand:'Michelin',price:249,stock:10,minimum:4,warehouse:'Almacén secundario',location:'D-02-01',active:true}
];
