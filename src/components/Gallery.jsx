import PassCard from './PassCard'

export default function Gallery({ passes, onOpenLightbox, loading }) {
    return (
        <section className="section" id="galeria">
            <div className="section__header">
                <div className="section__tag">📡 Últimos Pases</div>
                <h2 className="section__title">Galería de Imágenes</h2>
                <p className="section__subtitle">
                    Imágenes recibidas directamente desde satélites METEOR en órbita polar,
                    decodificadas en tiempo real por la estación terrena.
                </p>
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
                <div className="gallery__grid">
                    {passes.slice(0, 6).map(pass => (
                        <PassCard key={pass.id} pass={pass} onOpen={onOpenLightbox} />
                    ))}
                </div>
            )}
        </section>
    )
}
