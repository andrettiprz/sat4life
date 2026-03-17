export default function SystemStatus({ isLive, error }) {
    const lastHeartbeat = new Date().toLocaleString('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false,
    })

    return (
        <section className="section">
            <div className="section__header">
                <div className="section__tag">⚡ Sistema</div>
                <h2 className="section__title">Estado del Sistema</h2>
            </div>

            <div className="system-status__container">
                <div className="system-status__main">
                    <div className={`system-status__indicator system-status__indicator--${isLive ? 'online' : 'offline'}`}>
                        {isLive ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49 2.83 2.83M2 12h4m12 0h4" /><circle cx="12" cy="12" r="4" /></svg>
                        )}
                    </div>
                    <div>
                        <div className="system-status__label">Estación Sat4Life</div>
                        <div className={`system-status__value system-status__value--${isLive ? 'online' : 'offline'}`}>
                            {isLive ? 'DATOS EN VIVO' : 'MODO DEMOSTRACIÓN'}
                        </div>
                        {error && (
                            <div style={{ fontSize: '0.7rem', color: '#ff4d6a', marginTop: 4 }}>
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                <div className="system-status__details">
                    <div className="system-status__detail">
                        <div className="system-status__detail-value">{isLive ? 'v6.0' : 'Demo'}</div>
                        <div className="system-status__detail-label">Versión Bot</div>
                    </div>
                    <div className="system-status__detail">
                        <div className="system-status__detail-value">{lastHeartbeat}</div>
                        <div className="system-status__detail-label">Última Consulta</div>
                    </div>
                    <div className="system-status__detail">
                        <div className="system-status__detail-value">{isLive ? 'Supabase' : 'Local'}</div>
                        <div className="system-status__detail-label">Fuente de Datos</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
