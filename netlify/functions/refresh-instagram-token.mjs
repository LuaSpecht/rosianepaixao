import { GRAPH_INSTAGRAM, getToken, isSystemUserToken, saveToken } from './_shared/instagram.mjs';

/**
 * Function agendada: renova o token do Instagram (só quando necessário).
 *
 * - Token de usuário do sistema ("EAA…", login unificado): NÃO vence. Não faz nada.
 * - Token do login do Instagram ("IG…"): vale 60 dias e pode ser renovado depois de 24h
 *   de vida. Rodando toda semana, nunca chega perto de vencer.
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

  if (isSystemUserToken(token)) {
    console.log('[refresh] token de usuário do sistema não expira — nada a fazer');
    return;
  }

  const url = new URL(`${GRAPH_INSTAGRAM}/refresh_access_token`);
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
