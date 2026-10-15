import { Search, X } from 'lucide-react';
import styles from './SearchField.module.css';
export function SearchField({value,onChange,placeholder='Buscar…',label='Buscar'}:{value:string;onChange:(value:string)=>void;placeholder?:string;label?:string}){return <div className={styles.search}><Search size={17} aria-hidden="true"/><input aria-label={label} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/>{value&&<button aria-label="Limpiar búsqueda" onClick={()=>onChange('')}><X size={15}/></button>}</div>;}
