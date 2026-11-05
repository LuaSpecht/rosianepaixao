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

Para criar uma página nova: componente em `src/pages/`, rota em `src/App.jsx`, item no menu em `src/data/content.js` (`navLinks`) e o endereço em `public/sitemap.xml`.
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
  config.js                      → WhatsApp, @ do Instagram, endereço do site  ← EDITAR AQUI
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

- [ ] História dela → texto da seção "Prazer, eu sou a Rosiane" em `src/components/About/About.jsx`
- [ ] Confirmar etapas do atendimento (conversa → prova → grande dia) → `steps` em `src/data/content.js`
- [ ] Confirmar serviços (só noivas? madrinhas, mães, convidadas?) → `services` em `src/data/content.js`
- [ ] Depoimentos reais (com autorização das noivas) → trocar os 3 exemplos marcados com `TODO` em `testimonials`
- [ ] Logo (se existir) → topo e ícone da aba (`public/favicon.svg`)
- [ ] Decidir se quer esconder algum post do Instagram no site

### Adicionando um depoimento

Em `src/data/content.js`, copie um bloco e cole dentro de `testimonials`:

```js
{
  text: 'O relato da noiva, de 2 a 4 linhas.',
  author: 'Mariana',
  date: 'Noiva de março de 2027', // opcional
},
```

Com 2 ou mais depoimentos o carrossel gira sozinho e mostra os pontinhos de navegação.

## Conectando o Instagram

A galeria lê os posts com um **token de Página do Facebook** (começa com `EAA` e **não expira**),
pela **API do Instagram com login do Facebook**. A function chama `graph.facebook.com/{id-do-instagram}/media`.

> **Por que não o "login unificado"?** Foi a primeira tentativa (out/2026). O token de usuário do sistema
> gerado por ele voltava `Unsupported get request ... Object with ID ... does not exist` ao ler a conta,
> um bug conhecido da Meta. O caminho abaixo é o que funcionou (03/11/2026).

### Como está configurado

- **Portfólio empresarial:** `rosianepaixaomakeup` (business.facebook.com). Ele contém a Página do Facebook
  **Rosiane Paixão Noivas** e o Instagram **@rosianepaixaonoivas** (ID `17841423540291265`), conectados entre si.
- **Pessoa:** Luana é administradora do portfólio **e está atribuída com acesso total à Página e à conta do
  Instagram**. Esse segundo ponto é obrigatório: só ser admin do portfólio não faz a Página aparecer no login.
  **Não remova essas atribuições**, porque o token depende delas.
- **App:** **App RosianePaixao** (ID `1521427640037481`, developers.facebook.com, conta da Luana), tipo **Empresa**,
  caso de uso "Outro", ligado ao portfólio. Produtos: **Instagram** (Configuração da API com login do Facebook)
  e **Login do Facebook para Empresas**. O app fica em **modo de desenvolvimento**, e não precisa ir "ao vivo"
  nem passar por análise, porque quem usa é a própria administradora.

### Gerando (ou refazendo) o token

1. **Explorador da Graph API** (developers.facebook.com/tools/explorer) → *Meta App*: **App RosianePaixao** →
   *Usuário ou Página*: **Token do usuário**.
2. Permissões, só estas (todas de leitura):
   `instagram_basic`, `pages_show_list`, `pages_read_engagement`, `business_management`, `ads_read`.
   **Não** adicione as de publicar ou gerenciar (`*_manage_*`, `*_publish`): o site só lê.
3. **Generate Access Token** → **Editar configurações** → marque **só** a Página *Rosiane Paixão Noivas*
   e o Instagram *@rosianepaixaonoivas*. Não troque de conta pelo menu do topo da janela.
4. Clique no **"i"** ao lado do token → *Abrir na ferramenta Token de Acesso* → **Extend Access Token**.
5. Cole o token estendido no Explorador e rode
   `me/accounts?fields=name,access_token,instagram_business_account`.
   O `access_token` do bloco da **Rosiane Paixão Noivas** é o **token da Página**, que não expira.
6. Teste com o token da Página: `17841423540291265?fields=username,media_count`
   deve responder `"username": "rosianepaixaonoivas"`.
7. Netlify → atualize `INSTAGRAM_TOKEN` → **Deploys → Trigger deploy → Deploy without cache**.

O token da Página para de funcionar se a Luana perder o acesso à Página, trocar a senha do Facebook
ou remover o app nas configurações dela. Nesses casos, refaça os passos acima.

### Variáveis no Netlify (*Project configuration → Environment variables*)

| Variável            | Obrigatória | O que é                                                                 |
| ------------------- | ----------- | ----------------------------------------------------------------------- |
| `INSTAGRAM_TOKEN`   | sim         | O token **da Página** (começa com `EAA`). Nunca coloque no código.      |
| `INSTAGRAM_USER_ID` | sim         | `17841423540291265` (ID da conta do Instagram da Rosiane).              |
| `GRAPH_API_VERSION` | não         | Versão da Graph API (padrão `v25.0`). Troque se a Meta avisar que a versão expirou. |

Variáveis só valem depois de um **novo deploy**. Para conferir, abra `https://rosianepaixao.com.br/api/instagram`:
se der erro, a resposta traz um campo `detail` com a mensagem da Meta.

### Erros que já apareceram

| Mensagem                                        | Causa / solução |
| ----------------------------------------------- | --------------- |
| `Unsupported get request. Object with ID ... does not exist` | Token do login unificado (bug da Meta). Use o token da Página. |
| `Missing Permission`                            | Variável alterada sem novo deploy, ou falta permissão no token. |
| `Invalid platform app` (ao gerar token)         | Falta o produto **Login do Facebook para Empresas** no app. |
| Página da Rosiane não aparece no login          | Atribuir a Luana à Página e ao Instagram no portfólio (acesso total). |

**Por que uma function e não chamar a API direto do navegador?** O token dá acesso à conta da Rosiane.
No front ele ficaria visível para qualquer pessoa no código-fonte. A function guarda o token no servidor,
faz cache do feed por 1h (Netlify Blobs + CDN) e, se o Instagram cair, devolve o último feed bom.
Posts novos aparecem no site em até 1 hora.

**Renovação:** tokens `EAA` de Página não vencem. A function `refresh-instagram-token` continua no projeto para o
caso de um dia usar um token do "login do Instagram" (`IG…`, vale 60 dias). Ela detecta o tipo sozinha
e não faz nada com tokens `EAA`.

### Mostrar o site para a Rosiane antes do token

Defina `VITE_GALLERY_MOCK=true` nas variáveis de ambiente do Netlify e faça deploy: a galeria usa os
dados de exemplo. Remova a variável quando o token estiver configurado.

## Deploy no Netlify

1. Subir o projeto para o GitHub.
2. Netlify → *Add new site → Import an existing project* → escolher o repositório.
   O `netlify.toml` já define build (`npm run build`), pasta (`dist`) e functions.
3. Configurar `INSTAGRAM_TOKEN` e `INSTAGRAM_USER_ID` (ou `VITE_GALLERY_MOCK=true` por enquanto).
4. Domínio: *Domain management → Add a domain*.
