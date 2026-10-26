import { defaultWhatsAppMessage, whatsappLink } from '../../config.js';
import Icon from '../Icon/Icon.jsx';
import './WhatsAppFloat.css';

/** Botão flutuante do WhatsApp (o Layout esconde na página de contato). */
export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener"
      aria-label="Conversar com a Rosiane no WhatsApp"
    >
      <Icon name="whatsapp" />
    </a>
  );
}
