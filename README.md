# Portfolio

Live at [michelgss.github.io/portfolio](https://michelgss.github.io/portfolio/).

This is my personal site. I'm a technical writer with a full stack background, and the design reflects that mix: dark, terminal-inspired, with editorial typography. It's a single React page with sections for experience, skills, writing samples, and certifications, and all content is available in English and Portuguese through a language toggle.

Built with React 18, Vite, Tailwind CSS, and Framer Motion. Icons come from Lucide.

## Running locally

```bash
npm install
npm run dev
```

Each section lives in its own component under [src/components/](src/components/), and the EN/PT strings are centralized in [src/translations/](src/translations/).

## Deploying

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch, which GitHub Pages serves.
