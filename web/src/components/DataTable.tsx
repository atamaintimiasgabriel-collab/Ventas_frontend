import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from './EmptyState';
export function DataTable({ headers, children, count }: {
    headers: string[];
    children: ReactNode;
    count: number;
}) {
    return count === 0 ? <EmptyState /> : <div className="table-wrap" tabIndex={0} role="region" aria-label="Tabla de resultados, desplazable horizontalmente">
    <table>
    <thead>
    <tr>{headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr>
    </thead>
    <tbody>{children}</tbody>
    </table>
    </div>;
}
export function Pagination({ page, total, pageSize, onChange }: {
    page: number;
    total: number;
    pageSize: number;
    onChange: (page: number) => void;
}) {
    const max = Math.max(1, Math.ceil(total / pageSize));
    return <div className="pagination">
    <span>{total ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} de ${total} registros` : '0 registros'}</span>
    <div>
    <button className="icon-button" disabled={page <= 1} aria-label="Página anterior" onClick={() => onChange(page - 1)}>
    <ChevronLeft size={16}/>
    </button>
    <span style={{ alignSelf: 'center' }}>Página {page} de {max}</span>
    <button className="icon-button" disabled={page >= max} aria-label="Página siguiente" onClick={() => onChange(page + 1)}>
    <ChevronRight size={16}/>
    </button>
    </div>
    </div>;
}
