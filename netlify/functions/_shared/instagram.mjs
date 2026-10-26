import { getStore } from '@netlify/blobs';

export const GRAPH = 'https://graph.instagram.com';
const STORE = 'instagram';

export const store = () => getStore(STORE);

/**
 * Token em uso.
 * - INSTAGRAM_TOKEN (variável de ambiente no Netlify) é o token "semente".
 * - A function agendada renova o token e grava a versão nova no Netlify Blobs.
 * - Se alguém trocar a variável de ambiente (ex.: gerou um token novo), a semente
 *   muda e passamos a usar o token novo, ignorando o renovado antigo.
 */
export async function getToken() {
  const seed = process.env.INSTAGRAM_TOKEN;
  const saved = await store().get('token', { type: 'json' });

  if (saved?.token && seed && saved.seed === fingerprint(seed)) return saved.token;
  return seed || saved?.token || null;
}

export async function saveToken(token, expiresIn) {
  const seed = process.env.INSTAGRAM_TOKEN;
  await store().setJSON('token', {
    token,
    seed: seed ? fingerprint(seed) : null,
    refreshedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
  });
}

// Não guardamos o token semente inteiro: só um "resumo" para detectar se mudou
function fingerprint(token) {
  return `${token.length}:${token.slice(-10)}`;
}
