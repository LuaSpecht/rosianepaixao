import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { navLinks } from '../../data/content.js';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  // fecha o menu mobile sempre que a página muda
  useEffect(() => setMenuOpen(false), [pathname]);

  // Fundo do cabeçalho aparece depois que a página rola
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile: trava o scroll da página e fecha com Esc
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Rosiane Paixão, início">
          <span className="brand-name">Rosiane Paixão</span>
          <span className="brand-sub">maquiagem e penteado</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} id="menu" aria-label="Principal">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                {/* NavLink marca a página atual (classe .active + aria-current) */}
                <NavLink to={link.to} end={link.to === '/'} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contato" className="btn nav-cta" onClick={closeMenu}>
            Agendar uma conversa
          </Link>
        </nav>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </div>
    </header>
  );
}
