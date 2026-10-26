# Rosiane Paixão — site

SPA em **React 19 + Vite + React Router** hospedada no **Netlify**. Maquiagem e penteado para noivas.

## Páginas

| Rota           | Página       | Conteúdo                                           |
| -------------- | ------------ | -------------------------------------------------- |
| `/`            | Início       | Hero, história da Rosiane, manifesto e atalhos     |
| `/atendimento` | Atendimento  | Serviços e etapas do atendimento                   |
| `/noivas`      | Noivas       | Galeria do Instagram + depoimentos das noivas      |
| `/contato`     | Contato      | Formulário que abre o WhatsApp                     |

O endereço antigo `/depoimentos` redireciona para `/noivas#depoimentos`.
Links com âncora (`/pagina#id-da-secao`) rolam até a seção automaticamente (ver `Layout.jsx`).

Para criar uma página nova: componente em `src/pages/`, rota em `src/App.jsx` e item no menu em `src/data/content.js` (`navLinks`).
O `netlify.toml` já tem o redirect que faz as rotas funcionarem ao abrir o link direto ou dar F5.

## Rodando localmente

```bash
npm install
npm run dev            # só o front (http://localhost:5173) — galeria usa dados de exemplo
npm run dev:netlify    # front + functions (http://localhost:8888) — precisa do Netlify CLI
```

Para o `dev:netlify`: `npm i -g netlify-cli`, depois `netlify login` e `netlify link`.

## Estrutura

```
index.html                       → só o "esqueleto" (meta tags/SEO + <div id="root">)
src/
  main.jsx                       → monta o React, importa fontes e estilos globais
  App.jsx                        → rotas (qual página aparece em cada endereço)
  pages/                         → uma página por rota; só monta os componentes
  config.js                      → WhatsApp, @ do Instagram, fotos por página  ← EDITAR AQUI
  data/content.js                → menu, atalhos da Home, serviços, etapas, depoimentos ← TEXTOS
  data/instagram-mock.json       → dados de exemplo da galeria
  components/                    → um componente por pasta, com o seu CSS ao lado
    Layout/                      → cabeçalho + página atual + rodapé (comum a todas)
    Header/  Hero/  About/  Manifesto/  Shortcuts/  Services/  PageCta/
    Gallery/ (Gallery + GalleryTile)    PostModal/ (lightbox do post)
    Testimonials/  Contact/  Footer/  WhatsAppFloat/
    Arch/                        → moldura em arco reutilizável (hero e "sobre")
    Icon/                        → ícones SVG (<Icon name="whatsapp" />)
  hooks/
    usePageTitle.js              → título da aba por página
    useInstagramFeed.js          → carrega o feed (loading / ready / error)
    useInView.js                 → "está visível na tela?" (animações de entrada)
    useParallax.js               → swatches flutuando nos depoimentos
    useReducedMotion.js          → respeita "reduzir movimento" do sistema
  services/instagram.js          → chamada à /api/instagram (cai no mock no dev)
  utils/                         → funções puras (mensagem do WhatsApp, resumo de texto)
  styles/base.css                → tokens (cores, fontes, espaçamentos) e reset
  styles/shared.css              → botões, links, títulos de seção, marca
public/images/                   → fotos e swatches de maquiagem (SVG)
netlify/functions/
  instagram.mjs                  → proxy da API do Instagram com cache
  refresh-instagram-token.mjs    → renova o token toda semana (agendada)
```

**Onde mexer para cada coisa:**
- Texto de lista (serviços, etapas, depoimentos, menu) → `src/data/content.js`
- Texto corrido de uma seção → o `.jsx` do componente
- Visual de uma seção → o `.css` na mesma pasta do componente
- Cores e fontes do site inteiro → `src/styles/base.css` (variáveis no `:root`)

## Pendências com a Rosiane

- [ ] Número do WhatsApp e @ do Instagram → `src/config.js`
- [ ] História dela → seção `#sobre` no `index.html`
- [ ] Confirmar etapas do atendimento (conversa → prova → grande dia)
- [ ] Depoimentos reais (com autorização das noivas) → seção `#depoimentos`
- [ ] Fotos do editorial → foto da seção "Sobre" e, se quiser, trocar a do hero
- [ ] Logo (se existir)
- [ ] Converter o Instagram em conta **Profissional** (Criador ou Empresa)

## Conectando o Instagram

A API antiga (Basic Display) foi desligada pela Meta em dez/2024. Usamos a
**Instagram API com login do Instagram**, que exige conta Profissional (não precisa de Página no Facebook).

1. No app do Instagram da Rosiane: *Configurações → Tipo de conta e ferramentas → Mudar para conta profissional*.
2. Em [developers.facebook.com](https://developers.facebook.com): criar um app (tipo **Empresa**) e adicionar o produto **Instagram** → *API setup with Instagram login*.
3. Em *Generate access tokens*, adicionar a conta da Rosiane (ela precisa aceitar o convite em
   *Configurações → Apps e sites → Convites de testador* no Instagram, se o app estiver em modo de desenvolvimento) e gerar o token.
   Esse token já é de **longa duração (60 dias)**.
4. No Netlify: *Site configuration → Environment variables* → `INSTAGRAM_TOKEN` = token gerado.
5. Fazer um novo deploy. A galeria passa a vir de `/api/instagram`.

**Por que uma function e não chamar a API direto do navegador?** O token dá acesso à conta da Rosiane.
No front ele ficaria visível para qualquer pessoa no código-fonte. A function guarda o token no servidor,
faz cache do feed por 1h (Netlify Blobs + CDN) e, se o Instagram cair, devolve o último feed bom.

**Renovação:** `refresh-instagram-token` roda toda semana, renova o token (mais 60 dias) e guarda no Netlify Blobs.
Se um dia for preciso gerar um token novo manualmente, é só trocar a variável `INSTAGRAM_TOKEN` —
a function percebe a troca e passa a usar o novo.

### Mostrar o site para a Rosiane antes do token

Defina `VITE_GALLERY_MOCK=true` nas variáveis de ambiente do Netlify e faça deploy: a galeria usa os
dados de exemplo. Remova a variável quando o token estiver configurado.

## Deploy no Netlify

1. Subir o projeto para o GitHub.
2. Netlify → *Add new site → Import an existing project* → escolher o repositório.
   O `netlify.toml` já define build (`npm run build`), pasta (`dist`) e functions.
3. Configurar `INSTAGRAM_TOKEN` (ou `VITE_GALLERY_MOCK=true` por enquanto).
4. Domínio: *Domain management → Add a domain*.
