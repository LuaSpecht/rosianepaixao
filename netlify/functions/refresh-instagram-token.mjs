import { GRAPH, getToken, saveToken } from './_shared/instagram.mjs';

/**
 * Function agendada: renova o token de longa duração do Instagram.
 *
 * O token vale 60 dias. Ele pode ser renovado a qualquer momento depois de 24h de vida,
 * e cada renovação devolve um token novo com mais 60 dias. Rodando toda semana, o token
 * nunca chega perto de vencer — e a Rosiane não precisa fazer nada.
 *
 * Obs.: functions agendadas só rodam no site publicado (não no `netlify dev`).
 * Para testar manualmente: Netlify > Logs > Functions > refresh-instagram-token > "Run now".
 */
export default async () => {
  const token = await getToken();
  if (!token) {
    console.error('[refresh] INSTAGRAM_TOKEN não configurado');
    return;
  }

  const url = new URL(`${GRAPH}/refresh_access_token`);
  url.searchParams.set('grant_type', 'ig_refresh_token');
  url.searchParams.set('access_token', token);

  const res = await fetch(url);
  const body = await res.json();

  if (!res.ok || body.error) {
    console.error('[refresh] falha ao renovar token:', body.error?.message || res.status);
    return;
  }

  await saveToken(body.access_token, body.expires_in);
  console.log(`[refresh] token renovado, válido por mais ${Math.round(body.expires_in / 86400)} dias`);
};

export const config = {
  schedule: '@weekly',
};
