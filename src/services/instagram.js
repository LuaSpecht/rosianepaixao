/**
 * Busca o feed normalizado na Netlify Function (/api/instagram).
 *
 * Formato retornado:
 * {
 *   profile: { username, picture },
 *   items: [{ id, type, caption, permalink, timestamp, likes, comments, thumb,
 *             media: [{ type: 'IMAGE' | 'VIDEO', url, thumb }] }]
 * }
 *
 * Usa os dados de exemplo quando:
 * - está rodando `npm run dev` (Vite puro, sem as functions), ou
 * - a variável VITE_GALLERY_MOCK=true foi definida no build (útil para mostrar
 *   o site para a Rosiane antes de o token do Instagram estar configurado).
 */
async function loadMock() {
  const mock = await import('../data/instagram-mock.json');
  return mock.default;
}

export async function fetchInstagramFeed({ signal } = {}) {
  if (import.meta.env.VITE_GALLERY_MOCK === 'true') return loadMock();

  try {
    const res = await fetch('/api/instagram', { headers: { accept: 'application/json' }, signal });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('application/json')) {
      throw new Error(`Resposta inesperada da API (${res.status})`);
    }
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    if (import.meta.env.DEV) {
      console.info('[galeria] Usando dados de exemplo:', err.message);
      return loadMock();
    }
    throw err;
  }
}
