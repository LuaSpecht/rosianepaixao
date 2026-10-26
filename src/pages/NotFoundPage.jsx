import { Link } from 'react-router';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function NotFoundPage() {
  usePageTitle('Página não encontrada');
  return (
    <div className="page">
      <section className="section not-found">
        <div className="container">
          <h1 className="section-title">Esta página não existe.</h1>
          <p className="section-intro">
            O endereço pode ter mudado. Volte para o início e continue por lá.
          </p>
          <Link className="btn" to="/" style={{ marginTop: '2rem' }}>
            Voltar para o início
          </Link>
        </div>
      </section>
    </div>
  );
}
