import { useEffect, useState } from 'react'

export default function Lightbox({ images, currentIndex = 0, pass, onClose }) {
    const [index, setIndex] = useState(currentIndex)

    useEffect(() => {
        setIndex(currentIndex)
    }, [currentIndex])

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight' && index < images.length - 1) setIndex(i => i + 1)
            if (e.key === 'ArrowLeft' && index > 0) setIndex(i => i - 1)
        }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose, index, images.length])

    if (!images || images.length === 0) return null

    const current = images[index]

    const formatTime = (ts) => {
        try {
            const d = new Date(ts)
            return d.toLocaleString('es-MX', {
                weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            })
        } catch { return ts }
    }

    return (
        <div className="lightbox" onClick={onClose}>
            <div className="lightbox__content" onClick={e => e.stopPropagation()}>
                <button className="lightbox__close" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Flecha izquierda */}
                {index > 0 && (
                    <button className="lightbox__nav lightbox__nav--prev" onClick={() => setIndex(i => i - 1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                )}

                <img
                    src={current.image_url}
                    alt={`${pass?.satellite || 'Satélite'} — ${current.label}`}
                    className="lightbox__image"
                />

                {/* Flecha derecha */}
                {index < images.length - 1 && (
                    <button className="lightbox__nav lightbox__nav--next" onClick={() => setIndex(i => i + 1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                )}

                <div className="lightbox__info">
                    <div className="lightbox__sat">{pass?.satellite || 'Satélite'}</div>
                    <div className="lightbox__detail">
                        {current.label} · {current.type} · {formatTime(pass?.timestamp)}
                    </div>
                    {images.length > 1 && (
                        <div className="lightbox__counter">
                            {index + 1} / {images.length}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
