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
// text pode ser um texto único ou uma lista de parágrafos (veja o da Eliane).
// Com 2 ou mais, o carrossel gira sozinho e mostra os pontinhos de navegação.
export const testimonials = [
  {
    text: 'Minha maquiagem durou a noite toda e o penteado ficou intacto até eu chegar em casa. Mas o mais importante foi o apoio e a amizade que criei com essa profissional, que deixou o meu dia mais leve e ainda mais lindo. As fotos ficaram perfeitas e o meu coração, calmo. Obrigada por estar lá por mim, Rosi! Você é inesquecível.',
    author: 'Luana',
    date: 'Noiva de outubro de 2026', // opcional
  },

  {
    // Texto em parágrafos: cada item da lista vira um parágrafo, como a noiva escreveu.
    // \n dentro de um item quebra a linha sem abrir parágrafo novo.
    text: [
      'Rô, quando fiquei pronta, fui tomada por uma explosão de sentimentos: felicidade, alegria e uma emoção indescritível.',
      'Durante toda a preparação, me senti acolhida, tranquila e cuidada em cada detalhe. Tudo superou minhas expectativas. O que mais me marcou foi o amor e o carinho de vocês. Foi como estar em casa, junto à minha família, sentindo-me aconchegada e segura.',
      'A emoção do meu noivo ao me ver foi inesquecível. Ele precisou tirar um lenço do bolso para enxugar as lágrimas.\nE, durante todo o dia, só ouvia elogios: “Você está muito linda!!”',
      'Só tenho a agradecer por todo o cuidado, carinho e dedicação. Foi muito especial viver esse momento com vocês. Gratidão!',
    ],
    author: 'Eliane',
    date: 'Noiva de junho de 2025', // opcional
  },

  {
    text: [
      'Rosi você foi maravilhosa desde o começo! Me ouviu e compreendeu o que eu queria na maquiagem e no cabelo, mostrou técnica na execução e nos produtos utilizados, me acalmou quando foi preciso, organizou tudo para atender também as pessoas da minha família e foi muito pontual, tanto no dia do casamento como no dia do teste de maquiagem.',
      'Você é excelente! Recomendo muito!',
    ],
    author: 'Ana',
    date: 'Noiva de maio de 2026',
  },
  {
    text: [
      'Primeiramente eu gostaria de agradecer imensamente pelo trabalho e carinho de vocês não só por ontem, mas por esses 7 meses que você cuidou de mim, dando suporte, dicas e prévias. Nunca me senti tão linda 😍.',
      'Seu zelo e cuidado, fez tudo ficar cada vez mais especial. Muito obrigada de verdade. Vou recomendar para todas as pessoas sem medo. 🥰🥰🥰',
    ],
    author: 'Fernanda',
    date: 'Noiva de setembro de 2026',
  },
  {
    text: [
      'Vocês são excelentes profissionais! Muito prestativos, atenciosos e animados! ❤️',
      'Amei a maquiagem e o penteado! Me senti linda e especial. O carinho, a dedicação e a energia de vocês fizeram toda a diferença e tornaram meus preparativos ainda mais leves e felizes.',
      'Muito obrigada por fazerem parte desse momento tão especial e por deixarem meu dia ainda mais inesquecível! ❤️',
    ],
    author: 'Kelly',
    date: 'Noiva de outubro de 2026',
  },
  {
    text: [
      'Rosi, não tenho palavras para agradecer pelo carinho, atenção, profissionalismo e talento! No dia mais importante da minha vida você me acalmou, me deu conselhos e me fez linda e maravilhosa. Obrigado por tanto talento. Fico feliz com a nossa sintonia e mais feliz ainda por te confiar de olhos fechados, e aí sou uma pessoa super indecisa!',
      'Minha maquiagem e cabelo estavam lindos. Você captou exatamente o que eu queria. Delicadeza e elegância.',
      'Confesso que fiquei preocupada em ser aquela noiva chata, que não decide o que quer, mas você me deu muita tranquilidade e feedback que eu precisava pelo caminho.',
      'Te recomendo sem piscar pelo profissional e ser humano que você é. Muito obrigada por tudo',
    ],
    author: 'Djeneffer',
    date: 'Noiva de abril de 2024',
  },
  {
    text: [
      'Obrigada, de verdade, por tudo! Eu me senti muito linda e especial. Você conseguiu fazer exatamente do jeitinho que eu queria: uma beleza elegante, delicada e que respeitasse quem eu sou, sem deixar de me reconhecer no espelho.',
      'Tudo ficou perfeito! Foi um dia muito agradável, leve e cheio de carinho. Me senti acolhida e segura em cada momento.',
      'Você entendeu o que eu desejava e transformou em realidade. Sou muito grata por todo o cuidado e dedicação. Você é a melhor! ❤️🥹',
    ],
    author: 'Letícia',
    date: 'Noiva de dezembro de 2022',
  },
  {
    text: [
      'Rô, obrigada por tudo!!',
      'Eu estava preocupada se a maquiagem e o penteado durariam até a viagem que faria depois do casamento, mas fiquei encantada com o resultado! A maquiagem permaneceu linda e o penteado ficou intacto, só saiu quando lavei o cabelo!',
      'Me senti linda, a maquiagem ficou exatamente como eu queria e ainda pude aproveitar minha produção durante a viagem dos meus sonhos por Pernambuco e Alagoas. Foi incrível!',
      'Obrigada por todo o carinho e cuidado!!',
    ],
    author: 'Caroline',
    date: 'Noiva de dezembro de 2022',
  },
];

export const serviceOptions = [
  { value: 'maquiagem e penteado', label: 'Maquiagem e penteado' },
  { value: 'maquiagem', label: 'Só maquiagem' },
  { value: 'penteado', label: 'Só penteado' },
];
