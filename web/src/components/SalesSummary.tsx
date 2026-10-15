import { demoData, money } from '../services/demoDataService';
import styles from './SalesSummary.module.css';
export function SalesSummary() {
    const max = Math.max(...demoData.salesHistory.map(s => s.amount));
    return <div className={styles.chart} role="img" aria-label={`Ventas ficticias por día: ${demoData.salesHistory.map(s => `${s.day} ${money(s.amount)}`).join(', ')}`}>
    <div className={styles.axis}>
    <span>S/ 4 mil</span>
    <span>S/ 2 mil</span>
    <span>S/ 0</span>
    </div>
    <div className={styles.bars}>{demoData.salesHistory.map((s, i) => <div key={s.day} className={styles.column}>
        <span className={styles.value}>{money(s.amount)}</span>
        <div className={`${styles.bar} ${i === 6 ? styles.current : ''}`} style={{ height: `${s.amount / max * 140}px` }}/>
        <span className={styles.day}>{s.day}</span>
        </div>)}</div>
    </div>;
}
