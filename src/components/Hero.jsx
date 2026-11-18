import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Terminal,
  Sparkles,
  ArrowUpRight,
  ArrowDown,
  FileText,
  Mail,
  Github,
  Linkedin,
  Code2,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  // Role switcher index
  const [roleIndex, setRoleIndex] = useState(0);
  // Dual-mode card state: 'hud' | 'cli'
  const [showcaseMode, setShowcaseMode] = useState('hud');

  // Interactive CLI state
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([]);
  const terminalBodyRef = useRef(null);

  // Initialize CLI welcome history when language changes
  useEffect(() => {
    setCliHistory([
      {
        type: 'system',
        text:
          lang === 'pt'
            ? 'MICHEL.DEV // DX-STUDIO KERNEL v2.6.0 — Digite ou clique em um comando abaixo:'
            : 'MICHEL.DEV // DX-STUDIO KERNEL v2.6.0 — Type or click a command chip below:',
      },
      {
        type: 'cmd',
        text: 'whoami --verbose',
      },
      {
        type: 'output',
        text:
          lang === 'pt'
            ? '→ Michel Silveira | Desenvolvedor Full Stack (JS/Python/MERN) & Technical Writer\n→ Base: Rio de Janeiro, BR (UTC-3) | Inglês C1 Advanced (EF SET 68/100)'
            : '→ Michel Silveira | Full Stack Engineer (JS/Python/MERN) & Technical Writer\n→ Base: Rio de Janeiro, BR (UTC-3) | C1 Advanced English (EF SET 68/100)',
      },
    ]);
  }, [lang]);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % t.hero.roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [t.hero.roles.length]);

  // Auto-scroll CLI output
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [cliHistory, showcaseMode]);

  // 3D Tilt & Spotlight Motion Values for Identity HUD Card
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 24 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setCliHistory([]);
      setCliInput('');
      return;
    }

    let response = '';
    if (cmd === 'help') {
      response =
        lang === 'pt'
          ? 'Comandos disponíveis:\n  whoami          Perfil de engenharia & escrita técnica\n  stack --json    Stack Full Stack + ferramentas Docs-as-Code\n  curl /api/weather  Simular request REST documentada (OpenWeather)\n  diataxis        Arquitetura de documentação em 4 quadrantes\n  projects        Listar projetos em produção\n  contact         Canais diretos de contato\n  clear           Limpar terminal'
          : 'Available commands:\n  whoami          Engineering & Technical Writing profile\n  stack --json    Full Stack + Docs-as-Code toolchain\n  curl /api/weather  Run documented REST endpoint check\n  diataxis        Inspect 4-quadrant documentation architecture\n  projects        List live production works\n  contact         Direct transmission channels\n  clear           Clear terminal buffer';
    } else if (cmd === 'whoami' || cmd === 'whoami --verbose') {
      response =
        lang === 'pt'
          ? '→ Michel Silveira | Full Stack Developer & Technical Writer @ AWRIT\n→ Em TI desde 2018 (Ex-Editora Globo Operação 24/7)\n→ Graduado em Sistemas para Internet (IBMR/MEC) | Inglês C1 (EF SET)'
          : '→ Michel Silveira | Full Stack Developer & Technical Writer @ AWRIT\n→ In IT since 2018 (Prev. Editora Globo 24/7 Production Support)\n→ Degree in Internet Systems (IBMR/MEC) | English C1 Certified';
    } else if (cmd === 'stack' || cmd === 'stack --json') {
      response = `{\n  "code": ["JavaScript", "Python", "React", "Next.js", "Node.js", "Express", "MongoDB", "SQL"],\n  "docsAsCode": ["Docusaurus", "Redocly", "OpenAPI 3.1", "Postman", "Git CI/CD"],\n  "frameworks": ["Diátaxis", "Microsoft Writing Style Guide", "WCAG/WAI-ARIA"]\n}`;
    } else if (cmd === 'curl /api/weather' || cmd === 'weather') {
      response = `HTTP/1.1 200 OK — api.openweathermap.org/data/2.5/weather?q=Rio\n{\n  "location": "Rio de Janeiro, BR",\n  "status": "Verified via Postman & OpenAPI Spec",\n  "docs_portal": "https://michelgss.github.io/openweather-docs/"\n}`;
    } else if (cmd === 'diataxis') {
      response =
        lang === 'pt'
          ? '[01] Tutoriais     → Onboarding prático de ponta a ponta\n[02] Guias How-To  → Receitas para problemas reais (webhooks, auth)\n[03] Referência    → Schemas OpenAPI exatos validados no código\n[04] Explicação    → Contexto arquitetural e decisões de sistema'
          : '[01] Tutorials     → Learning-oriented onboarding lessons\n[02] How-To Guides → Task-oriented recipes (webhooks, auth, rate-limits)\n[03] Reference     → Source-verified OpenAPI 3.1 schemas & status codes\n[04] Explanation   → Deep architectural context & trade-offs';
    } else if (cmd === 'projects') {
      response =
        '1. OpenWeather API Docs Portal → https://michelgss.github.io/openweather-docs/\n2. Bilingual DX Studio Portfolio → React 18 + Tailwind + Framer Motion';
    } else if (cmd === 'contact' || cmd === 'resume') {
      response =
        'Email:    michelfixingit@gmail.com\nGitHub:   github.com/michelgss\nLinkedIn: linkedin.com/in/michelthedev';
    } else {
      response =
        lang === 'pt'
          ? `Comando não reconhecido: "${rawCmd}". Digite "help" para listar os comandos.`
          : `Command not found: "${rawCmd}". Type "help" for available commands.`;
    }

    setCliHistory((prev) => [
      ...prev,
      { type: 'cmd', text: rawCmd },
      { type: 'output', text: response },
    ]);
    setCliInput('');
  };

  const handleCliSubmit = (e) => {
    e.preventDefault();
    executeCommand(cliInput);
  };

  const resumeUrl = `${import.meta.env.BASE_URL}${lang === 'pt' ? 'resume-pt.pdf' : 'resume.pdf'}`;
  const profileImgUrl = `${import.meta.env.BASE_URL}profile.jpg`;

  const cliChips = [
    { label: 'stack --json', cmd: 'stack --json' },
    { label: 'curl /api/weather', cmd: 'curl /api/weather' },
    { label: 'diataxis', cmd: 'diataxis' },
    { label: 'projects', cmd: 'projects' },
    { label: 'help', cmd: 'help' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen pt-28 pb-16 relative overflow-hidden flex items-center architectural-grid"
    >
      {/* Ambient Radial Orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full blur-[150px] opacity-20"
        style={{ background: 'var(--accent-hex)' }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 h-[420px] w-[420px] rounded-full blur-[160px] opacity-10"
        style={{ background: 'var(--accent-secondary-hex)' }}
      />

      {/* Subtle Architectural Coordinates Watermark */}
      <div className="pointer-events-none hidden xl:flex items-center justify-between absolute top-24 inset-x-10 font-mono text-[10px] tracking-[0.25em] text-white/20 uppercase">
        <span>SYS.NODE // 22.9068° S, 43.1729° W</span>
        <span>DOCS-AS-CODE // FULL STACK ENGINE</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN (7 cols): Monumental Kinetic Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2.5 rounded-full bg-white/[0.04] border border-white/10 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-hex)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-hex)]" />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-white uppercase">
                {t.hero.badge}
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="hidden sm:inline font-mono text-[10px] text-textSecondary">
                {t.hero.locationTag}
              </span>
            </motion.div>

            {/* Monumental Name & Greeting */}
            <div className="space-y-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-textSecondary flex items-center gap-2"
              >
                <span className="inline-block w-6 h-px bg-[var(--accent-hex)]" />
                <span>{t.hero.greeting}</span>
                <span className="font-serif italic text-base sm:text-lg text-[var(--accent-hex)] normal-case tracking-normal">
                  Full Stack & DX
                </span>
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="font-syne font-extrabold text-4xl sm:text-6xl xl:text-[68px] leading-[0.96] tracking-tight text-white"
              >
                <span className="block">MICHEL</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #FFFFFF 25%, var(--accent-hex) 100%)',
                  }}
                >
                  SILVEIRA.
                </span>
              </motion.h1>
            </div>

            {/* Dynamic Cycling Role Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] w-fit max-w-full overflow-hidden"
            >
              <Terminal className="w-4 h-4 text-[var(--accent-hex)] shrink-0" />
              <div className="relative h-6 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${lang}-${roleIndex}`}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="font-mono text-xs sm:text-sm text-white font-medium truncate"
                  >
                    {t.hero.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="w-1.5 h-4 bg-[var(--accent-hex)] animate-pulse shrink-0" />
            </motion.div>

            {/* Tagline & Editorial Pull-quote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="space-y-3.5 max-w-2xl"
            >
              <p className="text-base sm:text-lg text-textPrimary/90 font-normal leading-relaxed">
                {t.hero.tagline}
              </p>
              <blockquote className="pl-4 border-l-2 border-[var(--accent-hex)] text-xs sm:text-sm text-textSecondary italic font-sans leading-relaxed">
                {t.hero.editorialQuote}
              </blockquote>
            </motion.div>

            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#samples"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-sm text-black bg-[var(--accent-hex)] hover:brightness-110 transition-all shadow-[0_0_30px_-5px_rgba(var(--accent-rgb),0.55)]"
              >
                <span>{t.hero.viewWork}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-display font-semibold text-sm text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[var(--accent-hex)]/40 transition-all"
              >
                <Mail className="w-4 h-4 text-[var(--accent-hex)]" />
                <span>{t.hero.getInTouch}</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-textSecondary hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] transition-all"
              >
                <FileText className="w-4 h-4 text-[var(--accent-hex)]" />
                <span>{t.hero.resume}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Social Proof & Quick Links Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-4 pt-1 text-xs font-mono text-textTertiary"
            >
              <a
                href="https://github.com/michelgss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[var(--accent-hex)]" />
                <span>@michelgss</span>
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/michelthedev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[var(--accent-hex)]" />
                <span>/in/michelthedev</span>
              </a>
              <span>•</span>
              <a
                href="https://michelgss.github.io/openweather-docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 hover:text-[var(--accent-hex)] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-hex)]" />
                <span>OpenWeather Docs</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (5 cols): Interactive Dual-Mode Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Mode Switcher Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="inline-flex rounded-xl bg-white/[0.04] p-1 border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowcaseMode('hud')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    showcaseMode === 'hud'
                      ? 'bg-[var(--accent-hex)] text-black font-semibold shadow-sm'
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t.hero.portraitMode}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowcaseMode('cli')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    showcaseMode === 'cli'
                      ? 'bg-[var(--accent-hex)] text-black font-semibold shadow-sm'
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.hero.terminalMode}</span>
                </button>
              </div>

              <span className="font-mono text-[10px] text-textTertiary uppercase tracking-wider hidden sm:inline">
                {showcaseMode === 'hud' ? '3D.OPTIC // ACTIVE' : 'BASH // INTERACTIVE'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {showcaseMode === 'hud' ? (
                /* MODE 1: 3D IDENTITY HUD PORTRAIT MONOLITH */
                <motion.div
                  key="hud-card"
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl monolith-card border border-white/10 overflow-hidden group"
                >
                  {/* Top HUD Telemetry Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-black/50 font-mono text-[10px] text-textSecondary">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--accent-hex)]" />
                      <span>ID // MICHEL_SILVEIRA.EXE</span>
                    </div>
                    <span className="text-[var(--accent-hex)]">VERIFIED // C1</span>
                  </div>

                  {/* Studio Portrait Container */}
                  <div className="relative aspect-[4/4.3] w-full bg-[#050507] overflow-hidden flex items-end justify-center">
                    {/* Subtle back aura behind portrait */}
                    <div
                      className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ background: 'var(--accent-hex)' }}
                    />

                    {/* Corner HUD Reticle Brackets */}
                    <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-hex)]/60 z-20" />
                    <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-hex)]/60 z-20" />
                    <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-hex)]/60 z-20" />
                    <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-hex)]/60 z-20" />

                    {/* Portrait Image */}
                    <img
                      src={profileImgUrl}
                      alt="Michel Silveira — Full Stack Developer & Technical Writer"
                      className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Bottom gradient blend into monolith */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#08080C] via-[#08080C]/80 to-transparent z-20" />

                    {/* Floating HUD Chips */}
                    <div className="absolute top-4 left-4 z-20 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-[var(--accent-hex)]" />
                      <span>MERN // PYTHON</span>
                    </div>

                    <div className="absolute top-4 right-4 z-20 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-[var(--accent-hex)]" />
                      <span>DIÁTAXIS // OPENAPI</span>
                    </div>

                    {/* Bottom Overlay Telemetry & Quick CLI Switch */}
                    <div className="absolute inset-x-4 bottom-3.5 z-30 flex items-end justify-between gap-2">
                      <div>
                        <div className="font-mono text-[10px] text-[var(--accent-hex)] uppercase tracking-widest">
                          SYS.ROLE // HYBRID ENGINEER
                        </div>
                        <div className="font-display font-bold text-sm text-white">
                          {lang === 'pt'
                            ? 'Autor de Código & Arquiteto de Specs'
                            : 'Code Author & Spec Architect'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowcaseMode('cli')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[var(--accent-hex)] hover:text-black text-white font-mono text-[11px] border border-white/15 transition-all shrink-0"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{t.hero.openTerminal} &gt;_</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* MODE 2: LIVE INTERACTIVE CLI EMULATOR */
                <motion.div
                  key="cli-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl monolith-card border border-white/15 overflow-hidden flex flex-col h-[430px]"
                >
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-black/60">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 font-mono text-[11px] text-textSecondary">
                        michel@dx-studio:~
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowcaseMode('hud')}
                      className="font-mono text-[10px] text-[var(--accent-hex)] hover:underline"
                    >
                      [{t.hero.portraitMode}]
                    </button>
                  </div>

                  {/* Clickable Quick Command Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 bg-white/[0.02] border-b border-white/[0.06]">
                    {cliChips.map((chip) => (
                      <button
                        key={chip.cmd}
                        type="button"
                        onClick={() => executeCommand(chip.cmd)}
                        className="shrink-0 px-2 py-1 rounded-md bg-white/[0.05] hover:bg-[var(--accent-hex)]/20 border border-white/10 hover:border-[var(--accent-hex)]/40 font-mono text-[10px] text-textSecondary hover:text-white transition-colors"
                      >
                        $ {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Output Scroll Area */}
                  <div
                    ref={terminalBodyRef}
                    className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2.5 bg-[#07070A]/90"
                  >
                    {cliHistory.map((entry, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {entry.type === 'system' && (
                          <div className="text-[11px] text-textTertiary">
                            {entry.text}
                          </div>
                        )}
                        {entry.type === 'cmd' && (
                          <div className="flex items-center gap-2 text-white font-semibold">
                            <span className="text-[var(--accent-hex)]">➜</span>
                            <span className="text-sky-400">~</span>
                            <span>{entry.text}</span>
                          </div>
                        )}
                        {entry.type === 'output' && (
                          <pre className="whitespace-pre-wrap text-[11px] text-textSecondary pl-4 border-l border-white/10 font-mono">
                            {entry.text}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Terminal Input Prompt */}
                  <form
                    onSubmit={handleCliSubmit}
                    className="flex items-center gap-2 px-3.5 py-2.5 border-t border-white/[0.08] bg-black/70"
                  >
                    <ChevronRight className="w-4 h-4 text-[var(--accent-hex)] shrink-0" />
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder={
                        lang === 'pt'
                          ? 'Digite help, whoami, stack, diataxis, clear...'
                          : 'Type help, whoami, stack, diataxis, clear...'
                      }
                      className="w-full bg-transparent font-mono text-xs text-white placeholder:text-textTertiary focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/10 font-mono text-[10px] text-textSecondary"
                    >
                      RUN
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* BOTTOM HERO TELEMETRY BAR (4-column Metrics Strip) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.48 }}
          className="mt-12 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {t.hero.metrics.map((metric, idx) => {
            const icons = [Cpu, Code2, BookOpen, ShieldCheck];
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={metric.label}
                className="group relative rounded-2xl glass-panel p-4 sm:p-5 border border-white/[0.08] hover:border-[var(--accent-hex)]/40 transition-all overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity"
                  style={{ background: 'var(--accent-hex)' }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-syne font-extrabold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-[var(--accent-hex)] transition-colors">
                    {metric.value}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-[var(--accent-hex)]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-display font-semibold text-xs sm:text-sm text-white">
                  {metric.label}
                </div>
                <div className="font-mono text-[11px] text-textTertiary mt-0.5">
                  {metric.sub}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

