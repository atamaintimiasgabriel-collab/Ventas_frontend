import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DemoBanner } from '../components/DemoBanner';
import styles from './MainLayout.module.css';
export function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    // Cada pantalla comienza arriba, sin heredar el desplazamiento de la anterior.
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
    return <>
    <a className={styles.skip} href="#contenido">Saltar al contenido</a>
    <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={() => setCollapsed(!collapsed)} onClose={() => setMobileOpen(false)}/>
    <div className={`${styles.workspace} ${collapsed ? styles.collapsed : ''}`}>
    <Header onMenu={() => setMobileOpen(true)}/>
    <main id="contenido" className={styles.content}>
    <DemoBanner />
    <div className="page-enter" key={location.pathname}>
    <Outlet />
    </div>
    <footer className={styles.footer}>
    <span>© 2026 Sistema Integral Motorrepuestos</span>
    <span>Demo local · Sin operaciones reales</span>
    </footer>
    </main>
    </div>
    </>;
}
