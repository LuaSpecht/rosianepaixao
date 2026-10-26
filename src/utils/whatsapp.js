function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/** Monta o texto que chega no WhatsApp da Rosiane a partir do formulário. */
export function buildContactMessage({ nome, data, local, servico, mensagem }) {
  const lines = ['Olá, Rosiane! Vim pelo seu site.', `Meu nome é ${nome}.`];
  if (data) lines.push(`Data do casamento: ${formatDate(data)}`);
  if (local) lines.push(`Local: ${local}`);
  if (servico) lines.push(`Procuro: ${servico}`);
  if (mensagem) lines.push('', mensagem);
  return lines.join('\n');
}
