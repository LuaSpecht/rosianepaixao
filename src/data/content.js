// Textos em lista do site. Editar aqui muda o site sem mexer nos componentes.

// Menu principal (cada item é uma página).
// O Contato não entra aqui: ele é o botão em destaque no fim do menu (Header.jsx).
export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/atendimento', label: 'Atendimento' },
  { to: '/noivas', label: 'Noivas' },
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
    image: { src: '/images/atendimento/servico-maquiagem.webp', alt: 'Noiva sorrindo, já maquiada, de roupão branco e colar' },
    text: 'Pele leve e iluminada, que valoriza os seus traços e acompanha você do making of à última foto da festa.',
  },
  {
    title: 'Penteado de noiva',
    image: { src: '/images/atendimento/servico-penteado.webp', alt: 'Rosiane arrumando o coque da noiva, já de vestido, as duas de costas' },
    text: 'Do preso clássico às ondas soltas, um penteado pensado para o seu vestido, o seu véu e o estilo da cerimônia.',
  },
  {
    title: 'Acompanhantes',
    image: { src: '/images/atendimento/servico-acompanhantes.webp', alt: 'Rosiane maquiando uma senhora de cabelos curtos' },
    text: 'Também cuido de quem vai estar ao seu lado nesse dia. Faço cada maquiagem e penteado pessoalmente, por isso as vagas por casamento são limitadas: vale reservar junto com a sua.',
  },
];

// Etapas do atendimento (confirmadas em nov/2026)
export const steps = [
  {
    title: 'Primeira conversa',
    text: 'Você me conta sobre o casamento, o vestido e o que imagina. Tiro as suas dúvidas e envio o orçamento.',
  },
  {
    title: 'Acompanhamento',
    text: 'Ao longo dos meses, acompanho a sua pele e o seu cabelo com dicas de cuidado e lembretes carinhosos: dormir bem, beber água e comer direito.',
  },
  {
    title: 'Prova',
    text: 'Testamos maquiagem e penteado com calma, no meu studio ou onde você estiver, ajustando cada detalhe até você se reconhecer no espelho.',
  },
  {
    title: 'O grande dia',
    text: 'Tudo preparado no horário combinado, para você viver cada instante sem pressa e com uma beleza que dura do making of à última foto da festa.',
  },
];

// Faixa de fotos de bastidores na página Atendimento (entre as etapas e os serviços)
export const bastidores = [
  { src: '/images/atendimento/bastidor-pele.webp', alt: 'Rosiane preparando a pele de uma noiva de olhos fechados' },
  { src: '/images/atendimento/bastidor-espelho.webp', alt: 'Noiva de roupão sorrindo para a Rosiane em frente ao espelho' },
  { src: '/images/atendimento/bastidor-tiara.webp', alt: 'Rosiane colocando a tiara na noiva vestida' },
  { src: '/images/atendimento/bastidor-cachos.webp', alt: 'Penteado meio preso com cachos longos, visto de costas, em frente ao espelho' },
];

// Trecho de depoimento em destaque na página Atendimento (palavras da noiva)
export const atendimentoQuote = {
  text: 'A maquiagem não se moveu um centímetro (e olha que tava chovendo e eu não parei 1s!!)',
  author: 'Camila',
  date: 'Noiva de setembro de 2026',
};

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
  {
    text: [
      'Foi tudo simplesmente perfeito! Superou todas as minhas expectativas! Não só você ouviu todas as minhas preocupações e teve cuidado em atendê-las, mas também esteve comigo em todo o processo, não só no dia, mas desde o momento em que nos falamos a primeira vez! Me senti tão segura que fechei logo assim que falamos e foi a melhor decisão que tomei!',
      'A equipe inteira foi muito atenciosa e me fez sentir muito bem no meu dia!\nAmei muito, todo mundo falou que eu tava linda demais e a maquiagem não se moveu um centímetro (e olha que tava chovendo e eu não parei 1s!!)',
    ],
    author: 'Camila',
    date: 'Noiva de setembro de 2026',
  },
  {
    text: [
      'O dia 15/12/23 foi um momento muito marcante em minha vida: eu me casei com o amor da minha vida! Tive o privilégio de conhecer a Rosiane! Depois da maquiagem e do penteado pronto, ela me ajudou a colocar o vestido. Eu me senti a noiva mais linda do mundo!',
      'Esse dia foi como eu sonhei porque foi numa fase madura da minha vida. Tudo que decidi para o dia do meu casamento, por mais simples, foi exatamente o que eu queria!',
      'Quando conheci a Rosiane, a princípio foi pelo WhatsApp. Nesse momento eu já me senti acolhida! Ela se coloca no seu lugar! Ela tem a maior paciência para te ouvir! Ela absorveu os meus desejos e também deu muitas ideias! E no dia do casamento, ao chegar no seu espaço, me senti em casa!',
      'Desde a prévia e no dia oficial foi tudo feito com muito carinho e profissionalismo!',
      'O que mais marcou o nosso momento, foi a tua paciência, o teu ouvir, e a competência para fazer a maquiagem. Arrasou!!',
      'Quando cheguei no Cartório, meu noivo ficou radiante! E meus convidados amaram! E depois, vendo as fotos, só elogios!',
    ],
    author: 'Andressa',
    date: 'Noiva de dezembro de 2023',
  },
];

export const serviceOptions = [
  { value: 'maquiagem e penteado', label: 'Maquiagem e penteado' },
  { value: 'maquiagem', label: 'Só maquiagem' },
  { value: 'penteado', label: 'Só penteado' },
];
