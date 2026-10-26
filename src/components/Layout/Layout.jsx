import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import WhatsAppFloat from '../WhatsAppFloat/WhatsAppFloat.jsx';

/** Estrutura comum a todas as páginas. */
export default function Layout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;

    // Endereço com âncora (ex.: /noivas#depoimentos): rola até a seção.
    // O React Router não faz isso sozinho em SPA.
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }

    // Ao trocar de página: volta ao topo e leva o foco para o conteúdo
    // (quem usa leitor de tela "sente" a troca de página, como num site tradicional)
    if (isFirst) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {/* na página de contato o formulário já está na tela */}
      {pathname !== '/contato' && <WhatsAppFloat />}
    </>
  );
}
