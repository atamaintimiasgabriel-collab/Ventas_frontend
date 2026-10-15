import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, ChevronDown, LogOut, MapPin, Search } from 'lucide-react';
import { navigation } from '../config/navigation';
import { demoConfig } from '../config/demoConfig';
import { DemoSessionContext } from '../contexts/DemoSessionContext';
import { Modal } from './Modal';
import { demoData } from '../services/demoDataService';
import { ApiHealthIndicator } from './ApiHealthIndicator';
import styles from './Header.module.css';
export function Header({ onMenu }: {
    onMenu: () => void;
}) {
    const { logout } = useContext(DemoSessionContext);
    const [query, setQuery] = useState('');
    const [notices, setNotices] = useState(false);
    const location = useLocation();
    return <header className={styles.header}>
    <button className={`icon-button ${styles.menu}`} aria-label="Abrir menú" onClick={onMenu}>
    <Menu size={20}/>
    </button>
    <div className={styles.context}>
    <span className="muted">Workspace</span>
    <span>/</span>
    <strong>{navigation.find(n => n.to === location.pathname)?.label ?? 'Inicio'}</strong>
    </div>
    <div className={styles.search}>
    <Search size={16}/>
    <input aria-label="Buscar módulos" placeholder="Buscar en el sistema…" value={query} onChange={e => setQuery(e.target.value)}/>
    <kbd>⌕</kbd>{query && <div className={styles.results}>{navigation.filter(n => n.label.toLowerCase().includes(query.toLowerCase())).map(n => <Link key={n.to} to={n.to} onClick={() => setQuery('')}>{n.label}</Link>)}{!navigation.some(n => n.label.toLowerCase().includes(query.toLowerCase())) && <p>Sin módulos coincidentes</p>}</div>}</div>
    <ApiHealthIndicator />
    <span className={styles.branch}>
    <MapPin size={14}/>{demoConfig.branch}</span>
    <button className="icon-button" aria-label="Notificaciones demo" onClick={() => setNotices(true)}>
    <Bell size={18}/>
    </button>
    <div className={styles.user}>
    <span className={styles.avatar}>AD</span>
    <div>
    <strong>Administrador</strong>
    <small>Sesión demo <ChevronDown size={10}/>
    </small>
    </div>
    </div>
    <button className="icon-button" title="Cerrar sesión" aria-label="Cerrar sesión demo" onClick={logout}>
    <LogOut size={17}/>
    </button>{notices && <Modal title="Notificaciones de demostración" onClose={() => setNotices(false)}>
        <div className="stack">{demoData.activity.map(a => <div key={a.title}>
            <strong>{a.title}</strong>
            <p className="muted">{a.detail} · {a.time}</p>
            </div>)}<p className="notice">Estos avisos pertenecen a los datos de ejemplo. No hay sincronización con la API.</p>
        </div>
        </Modal>}</header>;
}
