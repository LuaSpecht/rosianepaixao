import { usePageTitle } from '../hooks/usePageTitle.js';
import Contact from '../components/Contact/Contact.jsx';

export default function ContatoPage() {
  usePageTitle('Contato');
  return (
    <div className="page">
      <Contact />
    </div>
  );
}
