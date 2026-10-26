import { usePageTitle } from '../hooks/usePageTitle.js';
import Services from '../components/Services/Services.jsx';
import PageCta from '../components/PageCta/PageCta.jsx';

export default function AtendimentoPage() {
  usePageTitle('Atendimento');
  return (
    <div className="page">
      <Services />
      <PageCta />
    </div>
  );
}
