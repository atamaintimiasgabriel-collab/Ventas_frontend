import { useContext, useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Gauge, ArrowRight, Eye, EyeOff, UserRound, LockKeyhole, ShieldCheck, ArrowUpRight, Layers3 } from 'lucide-react';
import { DemoSessionContext } from '../contexts/DemoSessionContext';
import { demoConfig } from '../config/demoConfig';
import { Modal } from '../components/Modal';
import { MechanicalScene } from '../components/MechanicalScene';
import styles from './LoginPage.module.css';
export function LoginPage() {
    const session = useContext(DemoSessionContext);
    const [username, setUsername] = useState(demoConfig.username);
    const [password, setPassword] = useState(demoConfig.password);
    const [show, setShow] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [modal, setModal] = useState('');
    if (session.signedIn)
        return <Navigate to="/dashboard" replace/>;
    function submit(e: FormEvent) { e.preventDefault(); if (username.trim() !== demoConfig.username || password !== demoConfig.password) {
        setError('Utiliza las credenciales de demostración indicadas abajo.');
        return;
    } session.login(); }
    return <main className={styles.login}>
    <section className={styles.visual}>
    <div className={styles.brand}>
    <span>
    <Gauge size={26}/>
    </span>
    <div>MOTORREPUESTOS<strong>PRO / BUSINESS SYSTEM</strong>
    </div>
    <small>EST. 2026</small>
    </div>
    <div className={styles.headline}>
    <p className={styles.kicker}>
    <span /> TECNOLOGÍA QUE MUEVE TU NEGOCIO</p>
    <h1>Cada pieza cuenta.<br />Cada operación,<br />
    <em>bajo control.</em>
    </h1>
    <p>El motor de tu gestión. Inventario, pedidos y operaciones conectados en una sola visión.</p>
    </div>
    <MechanicalScene />
    <div className={styles.visualFooter}>
    <span>
    <Layers3 size={16}/> Una plataforma. Toda tu operación.</span>
    <span>01 — 06</span>
    </div>
    </section>
    <section className={styles.access}>
    <div className={styles.accessTop}>
    <span className={styles.demo}>● MODO DEMOSTRACIÓN</span>
    <span>ACCESO AL SISTEMA <ArrowUpRight size={13}/>
    </span>
    </div>
    <div className={styles.formWrap}>
    <p className={styles.overline}>SISTEMA INTEGRAL MOTORREPUESTOS</p>
    <h2>Bienvenido de nuevo<span>.</span>
    </h2>
    <p className={styles.subtitle}>Tu operación, lista para ponerse en marcha.</p>
    <form onSubmit={submit}>
    <label htmlFor="username">Usuario o correo<div className={styles.input}>
    <UserRound size={17}/>
    <input id="username" autoComplete="off" value={username} onChange={e => { setUsername(e.target.value); setError(''); }} required/>
    </div>
    </label>
    <label htmlFor="password">Contraseña<div className={styles.input}>
    <LockKeyhole size={17}/>
    <input id="password" autoComplete="off" type={show ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required/>
    <button type="button" aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShow(!show)}>{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
    </div>
    </label>
    <div className={styles.options}>
    <label>
    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}/> Recordar acceso</label>
    <button type="button" onClick={() => setModal('Recuperar contraseña')}>¿Olvidaste tu contraseña?</button>
    </div>{remember && <p className={styles.hint}>En la demo el acceso solo se mantiene durante esta sesión. No se guardan contraseñas.</p>}{error && <p role="alert" className="form-error">{error}</p>}<button className={styles.submit} type="submit">Iniciar sesión <ArrowRight size={18}/>
    </button>
    </form>
    <div className={styles.separator}>
    <span />o continuar con<span />
    </div>
    <div className={styles.social}>
    <button onClick={() => setModal('Continuar con Google')}>
    <span className={styles.google}>G</span>Continuar con Google</button>
    <button onClick={() => setModal('Continuar con Facebook')}>
    <span className={styles.facebook}>f</span>Continuar con Facebook</button>
    </div>
    <p className={styles.signup}>¿Aún no tienes acceso? <button onClick={() => setModal('Crear una cuenta')}>Crear una cuenta <ArrowUpRight size={12}/>
    </button>
    </p>
    <div className={styles.credentials}>
    <ShieldCheck size={20}/>
    <div>
    <strong>Explora la demo, sin conexión a la API</strong>
    <p>Usuario: <b>{demoConfig.username}</b> · Clave: <b>{demoConfig.password}</b>
    </p>
    <small>No ingreses credenciales reales. La sesión es local y temporal.</small>
    </div>
    </div>
    </div>
    <footer className={styles.accessFooter}>
    <span>© 2026 Motorrepuestos Pro</span>
    <span>Diseñado para avanzar.</span>
    </footer>
    </section>{modal && <Modal title={modal} onClose={() => setModal('')}>
        <p>
        <strong>Integración preparada para una fase posterior.</strong>
        </p>
        <p style={{ marginTop: 12 }}>Esta demostración no autentica con proveedores externos ni registra cuentas. La funcionalidad requerirá integración y reglas empresariales aprobadas.</p>
        <p className="notice" style={{ marginTop: 18 }}>No ingreses credenciales reales de Google o Facebook. No se enviará información a ningún servicio externo.</p>
        </Modal>}</main>;
}
