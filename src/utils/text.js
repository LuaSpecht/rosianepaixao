/** Resume um texto (ex.: legenda do Instagram) em uma linha. */
export function excerpt(text = '', size = 90) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > size ? `${clean.slice(0, size).trim()}…` : clean;
}
