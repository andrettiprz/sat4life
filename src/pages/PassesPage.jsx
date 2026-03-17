import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const SATELLITES = ['Todos', 'METEOR M2-3', 'METEOR M2-4', 'METEOR M2-X']
const PER_PAGE = 20

export default function PassesPage({ passes, loading }) {
    const [filterSat, setFilterSat] = useState('Todos')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        if (filterSat === 'Todos') return passes
        return passes.filter(p => p.satellite === filterSat)
    }, [passes, filterSat])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const formatTime = (ts) => {
        try {
            const d = new Date(ts)
            return d.toLocaleString('es-MX', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            })
        } catch { return ts }
    }

    const formatTimeUTC = (ts) => {
        try {
            const d = new Date(ts)
            return d.toLocaleString('en-US', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false,
                timeZone: 'UTC'
            }) + ' UTC'
        } catch { return ts }
    }

    return (
        <section className="section passes-page" id="pases-lista">
            <div className="section__header">
                <div className="section__tag">📋 Registro</div>
                <h2 className="section__title">Lista de Pases</h2>
                <p className="section__subtitle">
                    Registro completo de todos los pases satelitales recibidos por la estación terrena.
                </p>
            </div>

            {/* Filtros */}
            <div className="passes-filters">
                <div className="passes-filters__group">
                    <span className="passes-filters__label">Satélite:</span>
                    {SATELLITES.map(sat => (
                        <button
                            key={sat}
                            className={`passes-filters__btn ${filterSat === sat ? 'passes-filters__btn--active' : ''}`}
                            onClick={() => { setFilterSat(sat); setPage(1) }}
                        >
                            {sat}
                        </button>
                    ))}
                </div>
                <div className="passes-filters__count">
                    {filtered.length} pase{filtered.length !== 1 ? 's' : ''}
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
                    <div style={{
                        width: 40, height: 40, margin: '0 auto 16px',
                        border: '3px solid var(--border)',
                        borderTopColor: 'var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin-slow 1s linear infinite'
                    }} />
                    Cargando pases...
                </div>
            ) : (
                <>
                    {/* Tabla */}
                    <div className="passes-table-wrap">
                        <table className="passes-table">
                            <thead>
                                <tr>
                                    <th>Satélite</th>
                                    <th>Fecha Local</th>
                                    <th>Fecha UTC</th>
                                    <th>Imágenes</th>
                                    <th>PNGs</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(pass => {
                                    const hasImages = pass.images && pass.images.length > 0
                                    return (
                                        <tr key={pass.id} className={hasImages ? '' : 'passes-table__row--dim'}>
                                            <td>
                                                <span className="passes-table__sat">
                                                    📡 {pass.satellite}
                                                </span>
                                            </td>
                                            <td className="passes-table__time">{formatTime(pass.timestamp)}</td>
                                            <td className="passes-table__time">{formatTimeUTC(pass.timestamp)}</td>
                                            <td>
                                                <div className="passes-table__images-count">
                                                    {hasImages ? (
                                                        <>
                                                            <span className="passes-table__img-badge">
                                                                🖼️ {pass.images.length}
                                                            </span>
                                                            <span className="passes-table__img-types">
                                                                {pass.images.map(img => img.type).join(', ')}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="passes-table__no-img">—</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="passes-table__count">
                                                    {pass.pngCount > 0 ? pass.pngCount : '—'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`passes-table__status ${hasImages ? 'passes-table__status--ok' : 'passes-table__status--fail'}`}>
                                                    {hasImages ? '● OK' : '● SIN DATOS'}
                                                </span>
                                            </td>
                                            <td>
                                                {hasImages && (
                                                    <Link to={`/pase/${pass.id}`} className="passes-table__link">
                                                        Ver →
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="passes-pagination">
                            <button
                                className="passes-pagination__btn"
                                disabled={page <= 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                ← Anterior
                            </button>
                            <span className="passes-pagination__info">
                                Página {page} de {totalPages}
                            </span>
                            <button
                                className="passes-pagination__btn"
                                disabled={page >= totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}
