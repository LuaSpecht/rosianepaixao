import { useEffect, useState } from 'react';
import { fetchInstagramFeed } from '../services/instagram.js';

/**
 * Carrega o feed do Instagram uma vez.
 * status: 'loading' | 'ready' | 'error'
 */
export function useInstagramFeed() {
  const [state, setState] = useState({ status: 'loading', items: [], profile: null });

  useEffect(() => {
    const controller = new AbortController();

    fetchInstagramFeed({ signal: controller.signal })
      .then((feed) => {
        const items = feed?.items ?? [];
        setState({
          status: items.length ? 'ready' : 'error',
          items,
          profile: feed?.profile ?? null,
        });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('[galeria]', err);
        setState({ status: 'error', items: [], profile: null });
      });

    // cancela a requisição se o componente sair da tela antes de terminar
    return () => controller.abort();
  }, []);

  return state;
}
