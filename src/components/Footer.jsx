export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__brand">
                <img src="/logo.png" alt="Sat4Life" className="footer__logo" />
                <span className="footer__name">SAT4LIFE</span>
            </div>
            <p className="footer__text">
                Estación terrena de recepción satelital · CICESE, Ensenada, Baja California, México.
                Imágenes captadas de satélites meteorológicos METEOR en órbita polar.
            </p>
            <div className="footer__links">
                <a href="https://t.me/sat4life_channel" target="_blank" rel="noopener noreferrer" className="footer__link">
                    📨 Canal de Telegram
                </a>
                <a href="https://www.cicese.edu.mx" target="_blank" rel="noopener noreferrer" className="footer__link">
                    🏛️ CICESE
                </a>
            </div>
        </footer>
    )
}
