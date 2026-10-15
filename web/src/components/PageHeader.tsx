import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';
export function PageHeader({title,description,action}:{title:string;description:string;action?:ReactNode}){return <div className={styles.header}><div><p className="eyebrow muted">CENTRO DE OPERACIONES</p><h1>{title}</h1><p className="muted">{description}</p></div>{action}</div>;}
