import { useNavigate } from 'react-router-dom'

export default function PassCard({ pass, onOpen }) {
    const navigate = useNavigate()
    const hasImages = pass.images && pass.images.length > 0
    const mainImage = hasImages ? pass.images[0] : null

    const badgeClass = mainImage ? ({
        FILLED: 'pass-card__badge--filled',
        RAW: 'pass-card__badge--raw',
        RAW_MCIR: 'pass-card__badge--raw_mcir',
    }[mainImage.type] || 'pass-card__badge--raw') : ''

    const formatTime = (ts) => {
        try {
            const d = new Date(ts)
            return d.toLocaleString('es-MX', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            })
        } catch { return ts }
    }

    const handleClick = () => {
        if (hasImages) {
            navigate(`/pase/${pass.id}`)
        }
    }

    return (
        <article className="pass-card" onClick={handleClick} style={{ cursor: hasImages ? 'pointer' : 'default' }}>
            <div className="pass-card__image-wrapper">
                {hasImages ? (
                    <>
                        <img src={mainImage.thumbnail_url || mainImage.image_url} alt={`${pass.satellite} - ${mainImage.label}`} className="pass-card__image" loading="lazy" />
                        <span className={`pass-card__badge ${badgeClass}`}>{mainImage.type.replace('_', ' ')}</span>
                        {pass.images.length > 1 && (
                            <span className="pass-card__multi-badge">
                                +{pass.images.length - 1} más
                            </span>
                        )}
                    </>
                ) : (
                    <div className="pass-card__no-image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                            <path d="m1 5 11 6 11-6" />
                        </svg>
                        <span style={{ fontSize: '0.8rem' }}>Sin imagen útil</span>
                    </div>
                )}
            </div>

            <div className="pass-card__body">
                <div className="pass-card__satellite">
                    <span className="pass-card__sat-name">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a5 5 0 0 1 5 5c0 4-5 11-5 11S7 11 7 7a5 5 0 0 1 5-5z" /><circle cx="12" cy="7" r="1" /></svg>
                        {pass.satellite}
                    </span>
                    <span className={`pass-card__status ${hasImages ? 'pass-card__status--ok' : 'pass-card__status--fail'}`}>
                        {hasImages ? '● OK' : '● SIN DATOS'}
                    </span>
                </div>

                <div className="pass-card__label">
                    {hasImages ? mainImage.label : 'Sin datos'}
                </div>

                <div className="pass-card__meta">
                    <span className="pass-card__time">{formatTime(pass.timestamp)}</span>
                    <div className="pass-card__counts">
                        <span className="pass-card__count-item">
                            📷 {pass.pngCount} PNG
                        </span>
                        {pass.rawCount > 0 && (
                            <span className="pass-card__count-item">
                                R: {pass.rawCount}
                            </span>
                        )}
                        {pass.filledCount > 0 && (
                            <span className="pass-card__count-item">
                                F: {pass.filledCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}
