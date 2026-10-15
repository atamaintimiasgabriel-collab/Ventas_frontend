import type { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';
export function StatCard({label,value,detail,icon:Icon,tone='blue'}:{label:string;value:string|number;detail:string;icon:LucideIcon;tone?:string}){return <article className={styles.card}><div className={styles.top}><span>{label}</span><span className={`${styles.icon} ${styles[tone]}`}><Icon size={19}/></span></div><strong className="number">{value}</strong><p>{detail}</p></article>;}
