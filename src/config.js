// Dados da Rosiane centralizados aqui — troque quando ela enviar.
export const config = {
  // Só números, com DDI 55 + DDD. Ex.: 5521999999999
  whatsapp: '5521980227073', // (21) 98022-7073
  instagram: 'rosianepaixaonoivas', // @rosianepaixaonoivas
  // Quantas fotos a galeria mostra por vez
  galleryPageSize: 9,
  // Endereço oficial do site (sem barra no final). Usado no canonical e no sitemap.
  siteUrl: 'https://rosianepaixao.com.br',
};

export const instagramUrl = `https://www.instagram.com/${config.instagram}/`;

export const defaultWhatsAppMessage =
  'Olá, Rosiane! Vim pelo seu site e gostaria de conversar sobre o meu casamento.';

export function whatsappLink(text = '') {
  const base = `https://wa.me/${config.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
