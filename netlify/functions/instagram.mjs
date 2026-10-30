import {
  GRAPH_FACEBOOK,
  GRAPH_INSTAGRAM,
  getInstagramUserId,
  getToken,
  graph,
  isSystemUserToken,
  store,
} from './_shared/instagram.mjs';

/**
 * GET /api/instagram
 *
 * Proxy entre o site e a API do Instagram.
 * Por que existe: o token de acesso não pode ir para o navegador — qualquer um veria
 * no código-fonte e poderia usar a conta da Rosiane. Aqui ele fica só no servidor.
 *
 * Cache em duas camadas:
 *  1. Netlify Blobs: guarda o último feed por CACHE_TTL. Evita bater na API a cada visita
 *     e serve de "plano B" se o Instagram estiver fora do ar.
 *  2. CDN da Netlify: headers de cache para responder direto da borda.
 */
const CACHE_TTL = 60 * 60 * 1000; // 1 hora
const LIMIT = 30;

const MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
  'like_count',
  'comments_count',
  'children{media_type,media_url,thumbnail_url}',
].join(',');

export default async () => {
  const blobs = store();
  const cached = await blobs.get('feed', { type: 'json' }).catch(() => null);

  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
    return json(cached.data);
  }

  const token = await getToken();
  if (!token) {
    console.error('[instagram] INSTAGRAM_TOKEN não configurado');
    return cached ? json(cached.data) : json({ error: 'Galeria não configurada' }, 503);
  }

  try {
    const { profile, media } = await fetchInstagram(token);

    const data = {
      profile: { username: profile.username, picture: profile.profile_picture_url ?? null },
      items: (media.data ?? []).map(normalize).filter(Boolean),
    };

    await blobs.setJSON('feed', { fetchedAt: Date.now(), data });
    return json(data);
  } catch (err) {
    console.error('[instagram] falha ao buscar feed:', err.message);
    // Se o Instagram falhar, devolve o último feed bom (mesmo vencido).
    // A mensagem de erro da Meta não contém o token, então pode ir na resposta (ajuda a depurar).
    return cached
      ? json(cached.data)
      : json({ error: 'Não foi possível carregar o Instagram', detail: err.message }, 502);
  }
};

export const config = { path: '/api/instagram' };

// ---------------------------------------------------------------------------

/** Busca perfil + posts, escolhendo o endereço certo conforme o tipo de token. */
async function fetchInstagram(token) {
  if (isSystemUserToken(token)) {
    // Token de usuário do sistema (login unificado): graph.facebook.com/{id-do-instagram}
    const igId = await getInstagramUserId(token);
    const [profile, media] = await Promise.all([
      graph(GRAPH_FACEBOOK, `/${igId}`, { fields: 'username,profile_picture_url' }, token),
      graph(GRAPH_FACEBOOK, `/${igId}/media`, { fields: MEDIA_FIELDS, limit: LIMIT }, token),
    ]);
    return { profile, media };
  }

  // Token do login do Instagram: graph.instagram.com/me
  const [profile, media] = await Promise.all([
    graph(GRAPH_INSTAGRAM, '/me', { fields: 'username,profile_picture_url' }, token),
    graph(GRAPH_INSTAGRAM, '/me/media', { fields: MEDIA_FIELDS, limit: LIMIT }, token),
  ]);
  return { profile, media };
}

/** Converte o formato da API para o formato simples que o front usa. */
function normalize(m) {
  const toMedia = (x) => ({
    type: x.media_type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
    url: x.media_url ?? null,
    thumb: x.thumbnail_url ?? x.media_url ?? null,
  });

  const media =
    m.media_type === 'CAROUSEL_ALBUM' && m.children?.data?.length
      ? m.children.data.map(toMedia)
      : [toMedia(m)];

  const thumb = m.thumbnail_url ?? media[0]?.thumb;
  // Posts com mídia indisponível (ex.: direitos autorais) vêm sem URL
  if (!thumb) return null;

  return {
    id: m.id,
    type: m.media_type,
    caption: m.caption ?? '',
    permalink: m.permalink,
    timestamp: m.timestamp,
    likes: m.like_count ?? null,
    comments: m.comments_count ?? null,
    thumb,
    media,
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // navegador: sempre revalida; CDN da Netlify: 15 min, servindo versão antiga enquanto atualiza
      'cache-control': 'public, max-age=0, must-revalidate',
      'netlify-cdn-cache-control':
        status === 200 ? 'public, durable, s-maxage=900, stale-while-revalidate=3600' : 'no-store',
    },
  });
}
