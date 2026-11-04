// Textos em lista do site. Editar aqui muda o site sem mexer nos componentes.

// Menu principal (cada item é uma página)
export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/atendimento', label: 'Atendimento' },
  { to: '/noivas', label: 'Noivas' },
  { to: '/contato', label: 'Contato' },
];

// Atalhos no fim da Home para as outras páginas
export const shortcuts = [
  {
    to: '/atendimento',
    title: 'Atendimento',
    text: 'Como funciona, da primeira conversa ao grande dia.',
    cta: 'Ver como funciona',
  },
  {
    to: '/noivas',
    title: 'Noivas reais',
    text: 'Fotos das noivas que a Rosiane preparou e o que elas contam sobre o dia.',
    cta: 'Ver as noivas',
  },
];

export const services = [
  {
    title: 'Maquiagem de noiva',
    text: 'Pele leve e iluminada, que valoriza os seus traços e acompanha você do making of à última foto da festa.',
  },
  {
    title: 'Penteado de noiva',
    text: 'Do preso clássico às ondas soltas, um penteado pensado para o seu vestido, o seu véu e o estilo da cerimônia.',
  },
];

// TODO: confirmar com a Rosiane as etapas reais do atendimento
export const steps = [
  {
    title: 'Primeira conversa',
    text: 'Você conta sobre o casamento, o vestido e o que imagina. Tiro as suas dúvidas e envio o orçamento.',
  },
  {
    title: 'Prova',
    text: 'Testamos maquiagem e penteado com calma, ajustando cada detalhe até você se reconhecer no espelho.',
  },
  {
    title: 'O grande dia',
    text: 'Chego no horário combinado, com tudo preparado, para você viver cada instante sem pressa.',
  },
];

// Depoimentos das noivas (sempre com autorização por escrito).
// Para adicionar: copie um bloco { text, author, date } e cole abaixo (date é opcional).
// Com 2 ou mais, o carrossel gira sozinho e mostra os pontinhos de navegação.
export const testimonials = [
  {
    text: 'Minha maquiagem durou a noite toda e o penteado ficou intacto até eu chegar em casa. Mas o mais importante foi o apoio e a amizade que criei com essa profissional, que deixou o meu dia mais leve e ainda mais lindo. As fotos ficaram perfeitas e o meu coração, calmo. Obrigada por estar lá por mim, Rosi! Você é inesquecível.',
    author: 'Luana',
    date: 'Noiva de outubro de 2026', // opcional
  },

  // TODO: EXEMPLOS provisórios — trocar pelos depoimentos reais que a Rosiane mandar
  {
    text: 'Espaço para o depoimento real de uma noiva da Rosiane. Aqui entra o relato de como ela se sentiu no dia, do jeitinho que escreveu.',
    author: 'Nome da noiva',
  },
  {
    text: 'Segundo depoimento de exemplo. Prints de conversa no WhatsApp ou comentários do Instagram servem como fonte, com a autorização da noiva.',
    author: 'Nome da noiva',
  },
  {
    text: 'Terceiro depoimento de exemplo. Textos curtos funcionam melhor aqui, com duas a quatro linhas.',
    author: 'Nome da noiva',
  },
];

export const serviceOptions = [
  { value: 'maquiagem e penteado', label: 'Maquiagem e penteado' },
  { value: 'maquiagem', label: 'Só maquiagem' },
  { value: 'penteado', label: 'Só penteado' },
];
