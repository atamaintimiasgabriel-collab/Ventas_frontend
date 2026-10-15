import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';
export function Modal({ title, children, onClose }: {
    title: string;
    children: ReactNode;
    onClose: () => void;
}) {
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => { const element = dialog.current; const previous = document.activeElement as HTMLElement | null; element?.showModal(); return () => { element?.close(); previous?.focus(); }; }, []);
    return <dialog ref={dialog} className={styles.modal} aria-label={title} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget)
        onClose(); }}>
    <div className={styles.heading}>
    <h2>{title}</h2>
    <button autoFocus className="icon-button" onClick={onClose} aria-label="Cerrar diálogo">
    <X size={19}/>
    </button>
    </div>
    <div className={styles.body}>{children}</div>
    <footer>
    <button className="button primary" onClick={onClose}>Entendido</button>
    </footer>
    </dialog>;
}
