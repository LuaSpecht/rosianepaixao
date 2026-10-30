import { getStore } from '@netlify/blobs';

/**
 * Dois tipos de token são aceitos (o código detecta sozinho pelo prefixo):
 *
 * 1. Token de usuário do sistema (começa com "EAA") — o que usamos hoje.
 *    Gerado pela "API setup with Unified login" no app da Meta.
 *    - Fala com graph.facebook.com e precisa do ID da conta do Instagram.
 *    - NÃO VENCE. Não precisa de renovação.
 *
 * 2. Token do "login do Instagram" (começa com "IG") — formato antigo/alternativo.
 *    - Fala com graph.instagram.com usando /me.
 *    - Vence em 60 dias; a function agendada renova toda semana.
 */
export const GRAPH_INSTAGRAM = 'https://graph.instagram.com';
// Versão da Graph API do Facebook. Versões são aposentadas ~2 anos após o lançamento;
// se um dia a Meta avisar que expirou, basta trocar aqui ou na variável GRAPH_API_VERSION.
export const GRAPH_FACEBOOK = `https://graph.facebook.com/${process.env.GRAPH_API_VERSION || 'v25.0'}`;

const STORE = 'instagram';
export const store = () => getStore(STORE);

export const isSystemUserToken = (token) => token.startsWith('EAA');

/**
 * Token em uso.
 * - INSTAGRAM_TOKEN (variável de ambiente no Netlify) é o token "semente".
 * - Para tokens do login do Instagram, a function agendada renova e grava a versão nova
 *   no Netlify Blobs. Se alguém trocar a variável de ambiente, a semente muda e passamos
 *   a usar o token novo, ignorando o renovado antigo.
 */
export async function getToken() {
  const seed = process.env.INSTAGRAM_TOKEN?.trim();
  if (seed && isSystemUserToken(seed)) return seed; // não vence: usa direto

  const saved = await store().get('token', { type: 'json' }).catch(() => null);
  if (saved?.token && seed && saved.seed === fingerprint(seed)) return saved.token;
  return seed || saved?.token || null;
}

export async function saveToken(token, expiresIn) {
  const seed = process.env.INSTAGRAM_TOKEN?.trim();
  await store().setJSON('token', {
    token,
    seed: seed ? fingerprint(seed) : null,
    refreshedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
  });
}

/** Chamada genérica à Graph API, com erro legível. */
export async function graph(base, path, params, token) {
  const url = new URL(base + path);
  Object.entries({ ...params, access_token: token }).forEach(([k, v]) =>
    url.searchParams.set(k, String(v)),
  );
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok || body.error) {
    throw new Error(body.error?.message || `HTTP ${res.status}`);
  }
  return body;
}

/**
 * ID da conta do Instagram (necessário para o token de usuário do sistema).
 * Ordem: variável INSTAGRAM_USER_ID → valor já descoberto (Blobs) → descoberta automática.
 */
export async function getInstagramUserId(token) {
  const fromEnv = process.env.INSTAGRAM_USER_ID?.trim();
  if (fromEnv) return fromEnv;

  const blobs = store();
  const saved = await blobs.get('igUserId', { type: 'json' }).catch(() => null);
  if (saved?.id && saved.seed === fingerprint(token)) return saved.id;

  const id = await discoverInstagramUserId(token);
  await blobs.setJSON('igUserId', { id, seed: fingerprint(token) });
  return id;
}

async function discoverInstagramUserId(token) {
  const attempts = [
    // Contas do Instagram ligadas às Páginas que o token enxerga
    async () => {
      const r = await graph(GRAPH_FACEBOOK, '/me/accounts', {
        fields: 'instagram_business_account{id,username}',
      }, token);
      return r.data?.find((p) => p.instagram_business_account)?.instagram_business_account?.id;
    },
    // Contas do Instagram dos portfólios empresariais que o token enxerga
    async () => {
      const r = await graph(GRAPH_FACEBOOK, '/me/businesses', {
        fields: 'owned_instagram_accounts{id,username},instagram_accounts{id,username}',
      }, token);
      for (const b of r.data ?? []) {
        const acc = b.owned_instagram_accounts?.data?.[0] ?? b.instagram_accounts?.data?.[0];
        if (acc?.id) return acc.id;
      }
      return null;
    },
  ];

  const errors = [];
  for (const attempt of attempts) {
    try {
      const id = await attempt();
      if (id) return id;
    } catch (err) {
      errors.push(err.message);
    }
  }
  throw new Error(
    'Não foi possível descobrir o ID da conta do Instagram. ' +
      'Cadastre a variável INSTAGRAM_USER_ID no Netlify. ' +
      (errors.length ? `Detalhes: ${errors.join(' | ')}` : ''),
  );
}

// Não guardamos o token inteiro: só um "resumo" para detectar se mudou
function fingerprint(token) {
  return `${token.length}:${token.slice(-10)}`;
}
