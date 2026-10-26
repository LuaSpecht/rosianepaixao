import { defaultWhatsAppMessage, instagramUrl, whatsappLink } from '../../config.js';
import Icon from '../Icon/Icon.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-name">Rosiane Paixão</span>
          <span className="brand-sub">maquiagem e penteado para noivas</span>
        </div>
        <ul className="footer-links">
          <li>
            <a href={instagramUrl} target="_blank" rel="noopener">
              <Icon name="instagram" />
              Instagram
            </a>
          </li>
          <li>
            <a href={whatsappLink(defaultWhatsAppMessage)} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              WhatsApp
            </a>
          </li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} Rosiane Paixão</p>
      </div>
    </footer>
  );
}
