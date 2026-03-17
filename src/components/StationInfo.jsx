export default function StationInfo() {
    return (
        <section className="section station" id="estacion">
            <div className="section__header">
                <div className="section__tag">📍 Ubicación</div>
                <h2 className="section__title">Estación Terrena CICESE</h2>
                <p className="section__subtitle">
                    Centro de Investigación Científica y de Educación Superior de Ensenada, Baja California, México.
                </p>
            </div>

            <div className="station__grid">
                <div className="station__card">
                    <div className="station__detail">
                        <div className="station__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <div>
                            <div className="station__detail-label">Ubicación</div>
                            <div className="station__detail-value">Ensenada, Baja California, México</div>
                        </div>
                    </div>

                    <div className="station__detail">
                        <div className="station__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                        </div>
                        <div>
                            <div className="station__detail-label">Coordenadas</div>
                            <div className="station__detail-value">31.8681° N, 116.6647° W</div>
                        </div>
                    </div>

                    <div className="station__detail">
                        <div className="station__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2a7 7 0 0 1 0-8.4M16.2 7.8a7 7 0 0 1 0 8.4M19.1 4.9C23 8.8 23 15.2 19.1 19.1" /><circle cx="12" cy="12" r="1" /></svg>
                        </div>
                        <div>
                            <div className="station__detail-label">Frecuencia de Recepción</div>
                            <div className="station__detail-value">137.1 MHz / 137.9 MHz (Banda VHF)</div>
                        </div>
                    </div>

                    <div className="station__detail">
                        <div className="station__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49 2.83-2.83" /><circle cx="12" cy="12" r="4" /></svg>
                        </div>
                        <div>
                            <div className="station__detail-label">Satélites Objetivos</div>
                            <div className="station__detail-value">METEOR M2, M2-3, M2-4, M2-X</div>
                        </div>
                    </div>

                    <div className="station__detail">
                        <div className="station__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                        </div>
                        <div>
                            <div className="station__detail-label">Software</div>
                            <div className="station__detail-value">SatDump — Decodificación LRPT en vivo</div>
                        </div>
                    </div>
                </div>

                <div className="station__map">
                    <iframe
                        title="CICESE Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.0!2d-116.6647!3d31.8681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d89277d6e3e9c7%3A0x2e975ed3c63c7f1e!2sCICESE!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    )
}
