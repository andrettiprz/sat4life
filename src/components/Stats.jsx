export default function Stats({ passes }) {
    const totalPasses = passes.length
    const withImages = passes.filter(p => p.status === 'completed' && p.pngCount > 0).length
    const totalPng = passes.reduce((s, p) => s + (p.pngCount || 0), 0)
    const satellites = [...new Set(passes.map(p => p.satellite))].length

    return (
        <section className="section" id="estadisticas">
            <div className="section__header">
                <div className="section__tag">📊 Métricas</div>
                <h2 className="section__title">Estadísticas</h2>
                <p className="section__subtitle">
                    Resumen de la actividad de recepción satelital.
                </p>
            </div>

            <div className="stats__grid">
                <div className="stat-card">
                    <div className="stat-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a5 5 0 0 1 5 5c0 4-5 11-5 11S7 11 7 7a5 5 0 0 1 5-5z" /><circle cx="12" cy="7" r="1" /></svg>
                    </div>
                    <div className="stat-card__value">{totalPasses}</div>
                    <div className="stat-card__label">Pases Totales</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                    </div>
                    <div className="stat-card__value">{withImages}</div>
                    <div className="stat-card__label">Con Imágenes</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                    </div>
                    <div className="stat-card__value">{totalPng}</div>
                    <div className="stat-card__label">Archivos PNG</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49 2.83-2.83" /><circle cx="12" cy="12" r="4" /></svg>
                    </div>
                    <div className="stat-card__value">{satellites}</div>
                    <div className="stat-card__label">Satélites</div>
                </div>
            </div>
        </section>
    )
}
