import { RefreshCw } from 'lucide-react';
import { useApiHealth } from '../hooks/useApiHealth';
import styles from './ApiHealthIndicator.module.css';

const labels = {
  loading: 'Comprobando API',
  online: 'API disponible',
  'not-ready': 'API no preparada',
  offline: 'API sin conexión',
} as const;

export function ApiHealthIndicator() {
  const { status, retry } = useApiHealth();
  const canRetry = status === 'not-ready' || status === 'offline';
  return <div className={`${styles.indicator} ${styles[status]}`} role="status" aria-live="polite">
    <span className={styles.dot} aria-hidden="true" />
    <span>{labels[status]}</span>
    {canRetry && <button type="button" onClick={() => void retry()} aria-label="Reintentar conexión con la API" title="Reintentar">
      <RefreshCw size={13} />
    </button>}
  </div>;
}
