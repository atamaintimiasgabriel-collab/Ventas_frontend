import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Gauge, ChevronsLeft, ChevronsRight, X, ShieldCheck } from 'lucide-react';
import { navigation, futureNavigation } from '../config/navigation';
import styles from './Sidebar.module.css';
export function Sidebar({ collapsed, mobileOpen, onCollapse, onClose }: {
    collapsed: boolean;
    mobileOpen: boolean;
    onCollapse: () => void;
    onClose: () => void;
}) {
    const panel = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 900px)').matches);
    useEffect(() => {
        const media = window.matchMedia('(max-width: 900px)');
        const update = () => setIsMobile(media.matches);
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);
    useEffect(() => {
        if (!mobileOpen || !isMobile) return;
        const previous = document.activeElement as HTMLElement | null;
        panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
        return () => previous?.focus();
    }, [mobileOpen, isMobile]);
    // El panel móvil conserva el foco y se cierra con Escape.
    function handleKeyboard(event: KeyboardEvent<HTMLElement>) {
        if (!isMobile || !mobileOpen) return;
        if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
        if (event.key !== 'Tab') return;
        const controls = Array.from(panel.current?.querySelectorAll<HTMLElement>('a, button') ?? []).filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    return <>
    <button hidden={!mobileOpen} className={styles.backdrop} aria-label="Cerrar menú" onClick={onClose}/>
    <aside ref={panel} inert={isMobile && !mobileOpen} role={isMobile ? 'dialog' : undefined} aria-modal={isMobile && mobileOpen ? true : undefined} onKeyDown={handleKeyboard} className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.open : ''}`} aria-label="Navegación principal">
    <div className={styles.brand}>
    <span className={styles.mark}>
    <Gauge size={24}/>
    </span>
    <div>
    <strong>MOTORREPUESTOS</strong>
    <small>PRO / SISTEMA INTEGRAL</small>
    </div>
    <button className={styles.mobileClose} aria-label="Cerrar menú" onClick={onClose}>
    <X />
    </button>
    </div>
    <p className={styles.label}>WORKSPACE / DEMO</p>
    <nav>{navigation.map(({ to, label, icon: Icon }) => <NavLink title={label} to={to} key={to} onClick={onClose} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
        <Icon size={19}/>
        <span>{label}</span>{to === '/pedidos' && <small>07</small>}</NavLink>)}</nav>
    <p className={styles.label}>PRÓXIMAMENTE</p>
    <div className={styles.future}>{futureNavigation.map(({ label, icon: Icon }) => <div title={`${label} · Próximamente`} key={label}>
        <Icon size={18}/>
        <span>{label}</span>
        </div>)}</div>
    <div className={styles.bottom}>
    <div className={styles.demo}>
    <ShieldCheck size={19}/>
    <span>Entorno de demostración<small>Sin conexión al backend</small>
    </span>
    </div>
    <button onClick={onCollapse} className={styles.collapse} aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}>{collapsed ? <ChevronsRight size={18}/> : <>
        <ChevronsLeft size={18}/>
        <span>Colapsar menú</span>
        </>}</button>
    </div>
    </aside>
    </>;
}
