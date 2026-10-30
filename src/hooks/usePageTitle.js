import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { config } from '../config.js';

const SITE = 'Rosiane Paixão';

/**
 * Define o título da aba e o "canonical" (endereço oficial) da página atual.
 *
 * O canonical diz ao Google qual é o endereço "de verdade" de cada página,
 * evitando que www/sem www ou links com ?parametros virem páginas duplicadas.
 */
export function usePageTitle(title) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Maquiagem e penteado para noivas`;
  }, [title]);

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.append(link);
    }
    link.href = config.siteUrl + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
  }, [pathname]);
}
