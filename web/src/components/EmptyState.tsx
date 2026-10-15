import { SearchX } from 'lucide-react';
export function EmptyState({message='No hay resultados para estos filtros.'}:{message?:string}){return <div style={{textAlign:'center',padding:'48px 20px',color:'var(--muted)'}}><SearchX size={32}/><h3 style={{margin:'12px 0'}}>Nada por aquí todavía</h3><p>{message}</p></div>;}
