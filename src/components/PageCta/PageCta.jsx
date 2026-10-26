import { Link } from 'react-router';
import './PageCta.css';

/** Fechamento das páginas internas: leva para o contato. */
export default function PageCta({
  title = 'Vamos conversar sobre o seu dia?',
  text = 'Conte a data e o local do casamento. A Rosiane responde pelo WhatsApp.',
}) {
  return (
    <section className="page-cta" aria-label="Fale com a Rosiane">
      <div className="container page-cta-inner">
        <p className="page-cta-title">{title}</p>
        <p className="page-cta-text">{text}</p>
        <Link className="btn" to="/contato">
          Falar com a Rosiane
        </Link>
      </div>
    </section>
  );
}
