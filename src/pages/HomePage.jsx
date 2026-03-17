import { useState } from 'react'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Lightbox from '../components/Lightbox'
import SystemStatus from '../components/SystemStatus'
import Stats from '../components/Stats'
import StationInfo from '../components/StationInfo'

export default function HomePage({ passes, loading, isLive, error }) {
    const [lightboxData, setLightboxData] = useState(null)

    const handleOpenLightbox = (pass, imageIndex = 0) => {
        if (pass.images && pass.images.length > 0) {
            setLightboxData({ images: pass.images, currentIndex: imageIndex, pass })
        }
    }

    return (
        <>
            <Hero />
            <Gallery passes={passes} onOpenLightbox={handleOpenLightbox} loading={loading} />
            <SystemStatus isLive={isLive} error={error} />
            <Stats passes={passes} />
            <StationInfo />
            {lightboxData && (
                <Lightbox
                    images={lightboxData.images}
                    currentIndex={lightboxData.currentIndex}
                    pass={lightboxData.pass}
                    onClose={() => setLightboxData(null)}
                />
            )}
        </>
    )
}
