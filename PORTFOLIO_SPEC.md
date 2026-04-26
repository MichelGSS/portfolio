# SPEC: Portfolio Pessoal — Michel Silveira (Technical Writer)

## Objetivo
Criar um portfolio pessoal single-page em React (Vite) + Tailwind CSS, pronto para deploy no GitHub Pages. O site deve funcionar como cartão de visita profissional de um Technical Writer com background Full Stack. Esquema de cores preto e branco, altamente interativo com animações fluidas.

---

## Stack Técnica
- **Framework:** React 18+ com Vite
- **Estilização:** Tailwind CSS (utility-first)
- **Deploy:** GitHub Pages (configurar com pacote `gh-pages`)
- **Responsividade:** Mobile-first, breakpoints sm/md/lg/xl
- **Animações:** Framer Motion (react) para scroll-triggered reveals, hover states, page transitions, parallax e micro-interactions
- **Fontes:** Google Fonts — sugestões: "Space Grotesk" ou "Syne" para headings, "IBM Plex Mono" ou "JetBrains Mono" para detalhes técnicos, "Plus Jakarta Sans" para body. NÃO usar Inter, Roboto, Arial ou system fonts genéricas
- **Ícones:** Lucide React
- **Smooth scroll:** entre seções via anchor links no navbar

---

## Direção Visual

### Estética: "Terminal Meets Editorial"
Um design que mistura a estética de terminal/código (monospace, cursor piscando, syntax highlighting) com layout editorial limpo e sofisticado. Deve parecer que um developer designer criou, não um template genérico.

### Paleta de Cores (Preto e Branco)
```
--bg-primary: #0A0A0A          (preto profundo, background principal)
--bg-secondary: #111111         (preto levemente mais claro, cards/seções alternadas)
--bg-tertiary: #1A1A1A          (hover states, elementos elevados)
--text-primary: #FAFAFA          (branco quase puro, texto principal)
--text-secondary: #A0A0A0        (cinza médio, texto secundário/muted)
--text-tertiary: #666666         (cinza escuro, labels e metadata)
--accent: #FFFFFF               (branco puro, usado com parcimônia para destaques)
--border: #2A2A2A               (bordas sutis)
--border-hover: #444444          (bordas em hover)
--gradient-glow: rgba(255,255,255,0.05)  (glow sutil em cards)
```

### Efeitos Visuais Obrigatórios
1. **Cursor customizado:** círculo branco pequeno que segue o mouse com delay suave (CSS ou JS leve)
2. **Grain overlay:** textura granulada sutil sobre todo o site (CSS noise filter, opacity 3-5%)
3. **Glow hover nos cards:** ao passar o mouse, o card emite um glow branco sutil na borda
4. **Scroll progress bar:** barra fina branca no topo da página indicando progresso de scroll
5. **Texto revelado por scroll:** cada seção entra com fade-in + slide-up ao entrar no viewport (Framer Motion, stagger nos filhos)
6. **Typing effect:** na hero section, o subtítulo digita letra por letra como um terminal
7. **Parallax leve:** elementos de background com velocidade diferente do foreground
8. **Magnetic buttons:** botões que "puxam" levemente na direção do cursor quando próximo
9. **Line draw animations:** linhas/bordas que se desenham ao scroll
10. **Hover tilt nos cards:** cards de skills/projetos inclinam levemente na direção do cursor (3D transform perspective)

### Tipografia
- Headings (h1, h2): fonte display bold, tracking wide (letter-spacing: 0.05-0.1em), uppercase ou title case
- Body: fonte sans-serif limpa, line-height generoso (1.7-1.8)
- Destaques técnicos: fonte monospace (nomes de ferramentas, código, tags)
- Tamanhos: h1 hero = 4-6rem (responsivo), h2 seções = 2-2.5rem, body = 1rem-1.125rem

### Layout
- Full-width sections alternando background entre --bg-primary e --bg-secondary
- Max-width de conteúdo: 1200px, centralizado
- Padding lateral generoso: 2rem mobile, 4rem desktop
- Espaçamento vertical entre seções: 120-160px
- Grid assimétrico quando possível (ex: 60/40 em vez de 50/50)

---

## Estrutura do Site (Seções)

### 1. NAVBAR (fixo no topo)
- Fundo transparente que fica --bg-primary com blur (backdrop-filter) ao scrollar
- Logo/Nome: "MICHEL SILVEIRA" em monospace, lado esquerdo
- Links de navegação lado direito: About / Skills / Experience / Certifications / Contact
- Smooth scroll para as seções
- Hamburger menu em mobile (animação de X)
- Indicador de seção ativa (underline ou dot)

### 2. HERO SECTION (100vh, tela cheia)
```
Layout:
- Centralizado vertical e horizontalmente
- Nome grande no centro

Conteúdo:
- Texto pequeno acima do nome: "Hello, I'm" (fade-in com delay)
- Nome: "MICHEL SILVEIRA" (revela letra por letra ou clip-path reveal)
- Subtítulo com typing effect: "Technical Writer who codes."
- Depois do typing, fade-in de uma linha secundária:
  "I design documentation that developers actually want to read."
- Dois botões CTA abaixo:
  [View my work ↓] (scroll para seção de samples)
  [Get in touch] (scroll para contact)
- Scroll indicator animado no bottom (seta ou mouse icon pulsando)

Animações:
- Entrada staggered: cada elemento aparece sequencialmente (0.2s delay entre cada)
- Background com grid pattern sutil animado (linhas que pulsam levemente)
- Ou partículas/dots brancos flutuando lentamente no background
```

### 3. ABOUT SECTION
```
Layout: Grid 60/40 (texto | visual/destaque)

Lado esquerdo — Texto:
Heading: "ABOUT" (com linha decorativa ao lado)

Parágrafo 1:
"Technical Writer who codes. I design documentation that developers
actually want to read, built to be clear, accurate, and validated
against the real system."

Parágrafo 2:
"With 5+ years of experience in the IT industry, I bridge Engineering,
Product, and end-users, producing API references, developer guides,
integration tutorials, user manuals, and UX copy. My Full Stack
background (MERN) means I can read the source, run the endpoints,
and ship docs that match what the software truly does, not just what
the spec claims."

Parágrafo 3:
"Before specializing in Technical Writing, I spent several years in
IT infrastructure and support, which gave me a hands-on grasp of
the full SDLC and a habit of writing procedures people can follow
under pressure."

Lado direito — Info cards ou stats:
- "5+" label "Years in IT"
- "C1" label "English (EF SET)"
- "MERN" label "Full Stack Background"
- Ou uma foto profissional (placeholder se não tiver)

Animação: fade-in + slide do texto pela esquerda, cards pela direita
```

### 4. SKILLS / TOOLS SECTION
```
Layout: Grid de cards/badges organizados por categoria

Heading: "SKILLS & TOOLS"

Categoria 1 — Doc Platforms:
[Docusaurus] [Redocly] [OpenAPI/Swagger] [Postman]

Categoria 2 — Documentation:
[Technical Writing] [API Docs (REST)] [Docs-as-Code] [Information Architecture]
[UX Writing] [Knowledge Base] [Developer Experience (DX)]

Categoria 3 — Tools & Workflow:
[Markdown] [Git/GitHub] [JIRA] [Agile (Scrum/Kanban)] [SDLC]

Categoria 4 — Technical Stack:
[JavaScript] [Node.js] [React] [MongoDB] [Express] [HTML5]
[Python] [JSON] [WCAG/WAI-ARIA]

Categoria 5 — Languages:
[Portuguese - Native] [English - C1 Advanced (EF SET)]

Design dos cards/badges:
- Fundo --bg-tertiary, borda --border
- Hover: borda branca + glow sutil + scale(1.05)
- Cada badge pode ter um ícone pequeno à esquerda (lucide icons)
- Stagger animation ao entrar no viewport (cada badge aparece com delay incremental)
- Tilt 3D leve no hover

Labels das categorias em monospace, uppercase, --text-tertiary
```

### 5. EXPERIENCE SECTION
```
Layout: Timeline vertical (linha central com dots nos marcos)

Heading: "EXPERIENCE"

Item 1:
- Dot na timeline: branco, pulsa ao hover
- Período: "Jan 2025 - Present"
- Cargo: "Technical Writer"
- Empresa: "AWRIT"
- Local: "Remote - Rio de Janeiro, Brazil"
- Descrição (3-4 bullets):
  • Authored REST API references, integration guides, developer
    tutorials, and end-user manuals, translating complex Engineering
    specs into action-driven content.
  • Architected Docs-as-Code workflows (Git + Markdown), applying
    the same review, PR, and versioning rigor used for source code.
  • Validated technical accuracy end-to-end by exercising REST
    endpoints, running code samples, and reproducing developer flows
    with hands-on MERN expertise.
  • Partnered asynchronously with distributed Engineering and Product
    teams to capture requirements and ship content in parallel with
    shipped code.

Item 2:
- Período: "Mar 2024 - Dec 2024"
- Cargo: "IT Intern: Production Support"
- Empresa: "Editora Globo"
- Local: "Hybrid - Rio de Janeiro, Brazil"
- Descrição:
  • Authored runbooks, incident playbooks, and knowledge base articles
    for LAN/WAN networks, switches, routers, and firewalls in a 24/7
    mission-critical environment.
  • Contributed to incident, change, and problem management using ITSM
    tooling, improving documentation consistency across recurring tickets.
  • Gained direct exposure to the full SDLC in production. This experience
    now informs documentation that reflects how systems actually behave.

Item 3:
- Período: "Jan 2018 - Present"
- Cargo: "IT Generalist"
- Empresa: "Self-employed"
- Local: "Rio de Janeiro, Brazil"
- Descrição:
  • Authored user guides, installation manuals, and troubleshooting
    articles for Windows/Linux environments and SOHO networks, reducing
    recurring support requests from long-term clients.
  • Produced training materials, cybersecurity best-practice documentation,
    and step-by-step runbooks for non-technical audiences.
  • Translated complex IT concepts into plain-language, actionable guidance
    over 8+ years of direct client work. Foundational, high-volume practice
    for the UX-writing side of my current role.

Animação:
- Timeline line draws itself as user scrolls
- Cada item faz fade-in + slide lateral ao entrar no viewport
- Dots na timeline pulsam quando o item está visível
- Hover no card expande levemente
```

### 6. CERTIFICATIONS SECTION
```
Layout: Grid de cards (2-3 colunas desktop, 1 mobile)

Heading: "CERTIFICATIONS"

Card 1:
- Ícone: 🎓 ou graduation cap icon
- Título: "CS50x: Introduction to Computer Science"
- Instituição: "HarvardX / edX"
- Ano: "2024"

Card 2:
- Título: "WAI0.1x: Web Accessibility"
- Instituição: "W3Cx / edX"
- Ano: "2026"

Card 3:
- Título: "EF SET English Certificate - C1 Advanced"
- Instituição: "EF SET"
- Ano: "2024"
- Detalhe: "Score: 68/100"

Card 4:
- Título: "Principles of Agile Development"
- Instituição: "ITA (Instituto Tecnológico de Aeronáutica)"
- Ano: "2024"

Design dos cards:
- Borda --border, fundo --bg-secondary
- Hover: borda branca, translateY(-4px), shadow glow
- Ícone ou logo da instituição no topo
- Animação: stagger fade-in dos cards
```

### 7. EDUCATION SECTION (compacta, pode ser sub-seção de Certifications)
```
- Curso: "Technologist Degree in Internet Systems"
- Instituição: "Centro Universitário IBMR"
- Ano: "2026"
- Pode ser um banner/card simples abaixo dos certs
```

### 8. CONTACT SECTION
```
Layout: Centralizado, clean

Heading: "LET'S CONNECT" ou "GET IN TOUCH"
Subtítulo: "Open to mid and mid-senior Technical Writer opportunities, remote-first."

Links (com ícones):
- Email: michelfixingit@gmail.com (mailto link)
- LinkedIn: linkedin.com/in/michelthedev (external link)
- GitHub: github.com/michelgss (external link)

Design:
- Cada link é um botão/card com ícone + texto
- Hover: slide lateral, glow, ou fill animation
- Background pode ter pattern/grid sutil diferente das outras seções
- CTA button grande: "Send me an email" com magnetic effect

Animação: fade-in staggered dos links
```

### 9. FOOTER
```
- Linha fina --border no topo
- Texto: "Built with React + Tailwind CSS" (fonte monospace, pequena, --text-tertiary)
- Ano: "© 2026 Michel Silveira"
- Minimalista, não precisa de muita coisa
```

---

## Dados de Contato (usar em todo o site)
```
Nome completo: Michel Silveira
Email: michelfixingit@gmail.com
Telefone: +55 21 99709-3040
LinkedIn: https://linkedin.com/in/michelthedev
GitHub: https://github.com/michelgss
Localização: Rio de Janeiro, Brazil
```

---

## Requisitos Técnicos

### Performance
- Lighthouse score > 90 em todas as categorias
- Lazy loading de imagens (se houver)
- Code splitting por rota (se multi-page)
- Fontes com display: swap

### SEO
- Meta tags: title, description, og:image, og:title, og:description
- Title: "Michel Silveira - Technical Writer | Developer Experience (DX)"
- Description: "Technical Writer who codes. API documentation, developer guides, and UX copy using Docs-as-Code workflows."

### Acessibilidade
- Semântica HTML5 (header, main, section, nav, footer)
- Alt text em todas as imagens
- Focus states visíveis em todos os interativos
- Contraste mínimo AA (branco sobre preto passa fácil)
- Keyboard navigation funcional
- Skip to content link
- aria-labels nos ícones de redes sociais

### Estrutura de Arquivos
```
portfolio/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── CustomCursor.jsx
│   │   └── GrainOverlay.jsx
│   ├── data/
│   │   ├── skills.js
│   │   ├── experience.js
│   │   └── certifications.js
│   ├── hooks/
│   │   ├── useScrollReveal.js
│   │   └── useMousePosition.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

### Deploy (GitHub Pages)
- Configurar `vite.config.js` com `base: '/nome-do-repo/'`
- Script no package.json: `"deploy": "vite build && gh-pages -d dist"`
- Branch: `gh-pages`

---

## Resumo para a IA

Crie um portfolio pessoal single-page para Michel Silveira, Technical Writer com background Full Stack (MERN). O site deve ter estética "Terminal Meets Editorial": fundo preto profundo (#0A0A0A), texto branco (#FAFAFA), fontes com personalidade (display + mono + sans-serif), e ser ALTAMENTE interativo com animações (Framer Motion): typing effect no hero, scroll-triggered reveals com stagger, timeline que se desenha, cards com tilt 3D e glow hover, cursor customizado, grain overlay, scroll progress bar, e magnetic buttons. Stack: React (Vite) + Tailwind CSS + Framer Motion + Lucide React. Deploy para GitHub Pages. O conteúdo completo (textos, skills, experiência, certificações, contato) está detalhado acima. Todo o conteúdo do site deve ser em INGLÊS.
