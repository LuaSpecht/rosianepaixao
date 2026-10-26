import { usePageTitle } from '../hooks/usePageTitle.js';
import Hero from '../components/Hero/Hero.jsx';
import About from '../components/About/About.jsx';
import Manifesto from '../components/Manifesto/Manifesto.jsx';
import Shortcuts from '../components/Shortcuts/Shortcuts.jsx';

/** Home: apresentação e história da Rosiane + atalhos para as outras páginas. */
export default function HomePage() {
  usePageTitle(null);
  return (
    <>
      <Hero />
      <About />
      <Manifesto />
      <Shortcuts />
    </>
  );
}
