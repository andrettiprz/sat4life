import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ isLive }) {
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__brand">
                <img src="/logo.png" alt="Sat4Life Logo" className="navbar__logo" />
                <div>
                    <div className="navbar__name">SAT4LIFE</div>
                    <div className="navbar__sub">Estación Terrena</div>
                </div>
            </Link>
            <div className="navbar__links">
                {isHome ? (
                    <a href="#galeria">Galería</a>
                ) : (
                    <Link to="/#galeria">Galería</Link>
                )}
                <Link to="/pases" className={location.pathname === '/pases' ? 'navbar__link--active' : ''}>
                    Pases
                </Link>
                {isHome ? (
                    <a href="#estacion">Estación</a>
                ) : (
                    <Link to="/#estacion">Estación</Link>
                )}
                {isHome ? (
                    <a href="#estadisticas">Estadísticas</a>
                ) : (
                    <Link to="/#estadisticas">Estadísticas</Link>
                )}
            </div>
            <div className={`navbar__status ${isLive ? '' : 'demo'}`}>
                <span className="navbar__status-dot"></span>
                <span className="navbar__status-text">{isLive ? 'EN VIVO' : 'MODO DEMO'}</span>
            </div>
        </nav>
    )
}
