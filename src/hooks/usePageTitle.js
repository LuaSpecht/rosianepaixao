import { useEffect } from 'react';

const SITE = 'Rosiane Paixão';

/** Define o título da aba do navegador para a página atual. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Maquiagem e penteado para noivas`;
  }, [title]);
}
