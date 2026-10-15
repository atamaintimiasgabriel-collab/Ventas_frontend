import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
export function NotFoundPage(){return <section className="panel" style={{padding:24,textAlign:'center'}}><EmptyState message="Esta ruta no forma parte de la demostración."/><Link to="/dashboard" className="button primary">Volver al Dashboard</Link></section>;}
