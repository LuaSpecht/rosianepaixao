import { usePageTitle } from '../hooks/usePageTitle.js';
import Gallery from '../components/Gallery/Gallery.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import PageCta from '../components/PageCta/PageCta.jsx';

/** Noivas: galeria do Instagram + depoimentos das noivas. */
export default function NoivasPage() {
  usePageTitle('Noivas reais');
  return (
    <div className="page">
      <Gallery />
      <Testimonials />
      <PageCta />
    </div>
  );
}
