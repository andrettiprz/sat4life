import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import usePassDetail from '../hooks/usePassDetail'
import Lightbox from '../components/Lightbox'

export default function PassDetailPage() {
    const { id } = useParams()
    const { pass, loading, error } = usePassDetail(id)
    const [lightboxData, setLightboxData] = useState(null)

    const formatTime = (ts) => {
        try {
            const d = new Date(ts)
            return d.toLocaleString('es-MX', {
                weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            })
        } catch { return ts }
    }

    const formatTimeUTC = (ts) => {
        try {
            const d = new Date(ts)
            return d.toLocaleString('en-US', {
                weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false,
                timeZone: 'UTC'
            }) + ' UTC'
        } catch { return ts }
    }

    const badgeClass = (type) => ({
        FILLED: 'pass-card__badge--filled',
        RAW: 'pass-card__badge--raw',
        RAW_MCIR: 'pass-card__badge--raw_mcir',
    }[type] || 'pass-card__badge--raw')

    if (loading) {
        return (
            <section className="section pass-detail">
                <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--text-dim)' }}>
                    <div style={{
                        width: 40, height: 40, margin: '0 auto 16px',
                        border: '3px solid var(--border)',
                        borderTopColor: 'var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin-slow 1s linear infinite'
                    }} />
                    Cargando pase...
                </div>
            </section>
        )
    }

    if (!pass) {
        return (
            <section className="section pass-detail">
                <div style={{ textAlign: 'center', padding: '120px 0' }}>
                    <h2 style={{ color: 'var(--text-dim)' }}>Pase no encontrado</h2>
                    <Link to="/" className="pass-detail__back" style={{ marginTop: 24, display: 'inline-block' }}>
                        ← Volver al inicio
                    </Link>
                </div>
            </section>
        )
    }

    const hasImages = pass.images && pass.images.length > 0
    const mainImage = hasImages ? pass.images[0] : null

    return (
        <section className="section pass-detail">
            {/* Breadcrumb */}
            <div className="pass-detail__breadcrumb">
                <Link to="/" className="pass-detail__back">← Inicio</Link>
                <span className="pass-detail__sep">/</span>
                <Link to="/pases" className="pass-detail__back">Pases</Link>
                <span className="pass-detail__sep">/</span>
                <span className="pass-detail__current">{pass.satellite}</span>
            </div>

            {/* Hero del pase */}
            <div className="pass-detail__hero">
                <div className="pass-detail__hero-info">
                    <h1 className="pass-detail__title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 28, height: 28, marginRight: 8, verticalAlign: 'middle' }}>
                            <path d="M12 2a5 5 0 0 1 5 5c0 4-5 11-5 11S7 11 7 7a5 5 0 0 1 5-5z" />
                            <circle cx="12" cy="7" r="1" />
                        </svg>
                        {pass.satellite}
                    </h1>
                    <div className={`pass-detail__status ${hasImages ? 'pass-detail__status--ok' : 'pass-detail__status--fail'}`}>
                        {hasImages ? '● COMPLETADO' : '● SIN DATOS'}
                    </div>
                </div>

                <div className="pass-detail__meta-grid">
                    <div className="pass-detail__meta-item">
                        <span className="pass-detail__meta-label">Fecha Local</span>
                        <span className="pass-detail__meta-value">{formatTime(pass.timestamp)}</span>
                    </div>
                    <div className="pass-detail__meta-item">
                        <span className="pass-detail__meta-label">Fecha UTC</span>
                        <span className="pass-detail__meta-value">{formatTimeUTC(pass.timestamp)}</span>
                    </div>
                    <div className="pass-detail__meta-item">
                        <span className="pass-detail__meta-label">Imágenes</span>
                        <span className="pass-detail__meta-value">{pass.images ? pass.images.length : 0} procesadas</span>
                    </div>
                    <div className="pass-detail__meta-item">
                        <span className="pass-detail__meta-label">Archivos PNG</span>
                        <span className="pass-detail__meta-value">{pass.pngCount} totales</span>
                    </div>
                    <div className="pass-detail__meta-item">
                        <span className="pass-detail__meta-label">Raw</span>
                        <span className="pass-detail__meta-value">{pass.rawCount}</span>
                    </div>
                    <div className="pass-detail__meta-item">
                        <span className="pass-detail__meta-label">Filled</span>
                        <span className="pass-detail__meta-value">{pass.filledCount}</span>
                    </div>
                </div>
            </div>

            {/* Grid de imágenes */}
            {hasImages ? (
                <>
                    <div className="pass-detail__section-title">
                        🖼️ Imágenes del Pase ({pass.images.length})
                    </div>
                    <div className="pass-detail__images-grid">
                        {pass.images.map((img, idx) => (
                            <div
                                key={img.id}
                                className="pass-detail__image-card"
                                onClick={() => setLightboxData({ images: pass.images, currentIndex: idx, pass })}
                            >
                                <div className="pass-detail__image-wrapper">
                                    <img
                                        src={img.thumbnail_url || img.image_url}
                                        alt={`${pass.satellite} — ${img.label}`}
                                        className="pass-detail__image"
                                        loading="lazy"
                                    />
                                    <span className={`pass-card__badge ${badgeClass(img.type)}`}>
                                        {img.type.replace('_', ' ')}
                                    </span>
                                    <div className="pass-detail__image-overlay">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 32, height: 32 }}>
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.35-4.35" />
                                            <path d="M11 8v6M8 11h6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="pass-detail__image-info">
                                    <span className="pass-detail__image-label">{img.label}</span>
                                    <span className="pass-detail__image-type">{img.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="pass-detail__no-images">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 48, height: 48, opacity: 0.4 }}>
                        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                        <path d="m1 5 11 6 11-6" />
                    </svg>
                    <p>Este pase no generó imágenes procesables.</p>
                </div>
            )}

            {/* Lightbox */}
            {lightboxData && (
                <Lightbox
                    images={lightboxData.images}
                    currentIndex={lightboxData.currentIndex}
                    pass={lightboxData.pass}
                    onClose={() => setLightboxData(null)}
                />
            )}
        </section>
    )
}
