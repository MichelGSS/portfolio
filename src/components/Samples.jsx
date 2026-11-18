import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code2,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Layers,
  GitBranch,
  ChevronRight,
  Play,
  FileJson,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const CITY_PAYLOADS = {
  'Rio de Janeiro': {
    coord: { lon: -43.2075, lat: -22.9028 },
    weather: [{ id: 800, main: 'Clear', description: 'clear tropical sky' }],
    main: { temp: 27.4, feels_like: 29.1, humidity: 68, pressure: 1014 },
    wind: { speed: 4.1, deg: 120 },
    sys: { country: 'BR', timezone: -10800 },
    name: 'Rio de Janeiro',
    cod: 200,
    latency: '38ms',
  },
  London: {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [{ id: 803, main: 'Clouds', description: 'broken clouds' }],
    main: { temp: 13.8, feels_like: 12.9, humidity: 77, pressure: 1019 },
    wind: { speed: 5.4, deg: 240 },
    sys: { country: 'GB', timezone: 0 },
    name: 'London',
    cod: 200,
    latency: '44ms',
  },
  Tokyo: {
    coord: { lon: 139.6917, lat: 35.6895 },
    weather: [{ id: 801, main: 'Clear', description: 'few clouds' }],
    main: { temp: 19.2, feels_like: 18.7, humidity: 54, pressure: 1016 },
    wind: { speed: 3.6, deg: 85 },
    sys: { country: 'JP', timezone: 32400 },
    name: 'Tokyo',
    cod: 200,
    latency: '61ms',
  },
  'New York': {
    coord: { lon: -74.006, lat: 40.7143 },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky' }],
    main: { temp: 21.5, feels_like: 21.0, humidity: 49, pressure: 1021 },
    wind: { speed: 4.9, deg: 195 },
    sys: { country: 'US', timezone: -18000 },
    name: 'New York',
    cod: 200,
    latency: '42ms',
  },
};

const OPENWEATHER_NODES = {
  en: [
    {
      id: 'openapi',
      step: '01',
      label: 'OpenAPI 3.0 Spec',
      sub: 'Schema & Parameters',
      detail: 'Validated query parameters (lat, lon, units, appid) and HTTP 200/401/429 response schemas in Postman.',
    },
    {
      id: 'diataxis',
      step: '02',
      label: 'Diátaxis 4 Quadrants',
      sub: 'Information Architecture',
      detail: 'Structured into Quickstart Tutorials, How-To Guides, REST API Reference, and Architecture Explanations.',
    },
    {
      id: 'docusaurus',
      step: '03',
      label: 'Docusaurus MDX',
      sub: 'Docs-as-Code Authoring',
      detail: 'Interactive multi-language code tabs (cURL, JavaScript Fetch, Python Requests) with Microsoft Style Guide clarity.',
    },
    {
      id: 'cicd',
      step: '04',
      label: 'GitHub Pages CI/CD',
      sub: 'Automated Deployment',
      detail: 'Version-controlled Git workflow with automated static production builds and broken-link checking.',
    },
  ],
  pt: [
    {
      id: 'openapi',
      step: '01',
      label: 'Spec OpenAPI 3.0',
      sub: 'Schema & Parâmetros',
      detail: 'Parâmetros de query validados (lat, lon, units, appid) e schemas de resposta HTTP 200/401/429 via Postman.',
    },
    {
      id: 'diataxis',
      step: '02',
      label: '4 Quadrantes Diátaxis',
      sub: 'Arquitetura da Informação',
      detail: 'Estruturado em Tutoriais Rápidos, Guias Práticos, Referência de API REST e Explicações Arquiteturais.',
    },
    {
      id: 'docusaurus',
      step: '03',
      label: 'Docusaurus MDX',
      sub: 'Autoria Docs-as-Code',
      detail: 'Abas de código multi-linguagem (cURL, JavaScript Fetch, Python Requests) seguindo o Microsoft Style Guide.',
    },
    {
      id: 'cicd',
      step: '04',
      label: 'GitHub Pages CI/CD',
      sub: 'Deploy Automatizado',
      detail: 'Fluxo Git versionado com builds estáticos automatizados em produção e verificação de links.',
    },
  ],
};

const PORTFOLIO_NODES = {
  en: [
    {
      id: 'react',
      step: '01',
      label: 'React 18 + Vite',
      sub: 'Modular Component Tree',
      detail: 'Zero-bloat SPA architecture with instant HMR, semantic HTML5 landmarks, and WAI-ARIA compliant controls.',
    },
    {
      id: 'motion',
      step: '02',
      label: 'Framer Motion Physics',
      sub: '60fps Spring Choreography',
      detail: 'Scroll-linked laser progress spines, layoutId shared transitions, and tactile magnetic micro-interactions.',
    },
    {
      id: 'i18n',
      step: '03',
      label: 'Bilingual i18n Context',
      sub: 'EN / PT-BR Dictionary',
      detail: 'Single-source translation store switching all UI copy, code comments, and terminal responses without page reload.',
    },
    {
      id: 'theme',
      step: '04',
      label: 'Dynamic Theme Engine',
      sub: 'CSS Variable Tokens',
      detail: 'Real-time studio accent switching (--accent-hex & --accent-rgb) synchronized with the ⌘K Command Palette.',
    },
  ],
  pt: [
    {
      id: 'react',
      step: '01',
      label: 'React 18 + Vite',
      sub: 'Árvore Modular',
      detail: 'Arquitetura SPA enxuta com HMR instantâneo, HTML5 semântico e controles acessíveis padrão WAI-ARIA.',
    },
    {
      id: 'motion',
      step: '02',
      label: 'Framer Motion Physics',
      sub: 'Coreografia Spring 60fps',
      detail: 'Feixes de progresso sincronizados ao scroll, transições layoutId compartilhadas e micro-interações táteis.',
    },
    {
      id: 'i18n',
      step: '03',
      label: 'Contexto i18n Bilíngue',
      sub: 'Dicionário EN / PT-BR',
      detail: 'Repositório único de traduções alternando textos, comentários de código e terminal em tempo real sem reload.',
    },
    {
      id: 'theme',
      step: '04',
      label: 'Motor de Tema Dinâmico',
      sub: 'Tokens CSS Variables',
      detail: 'Troca instantânea de cor de destaque (--accent-hex & --accent-rgb) integrada à paleta de comandos ⌘K.',
    },
  ],
};

const ProjectInspector = ({ project, lang, accent, setAccent, themes, toggleLang }) => {
  const [activeTab, setActiveTab] = useState('spec'); // 'spec' | 'arch'
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Rio de Janeiro');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  const isDocs = project.id === 'openweather';
  const archNodes = isDocs
    ? OPENWEATHER_NODES[lang] || OPENWEATHER_NODES.en
    : PORTFOLIO_NODES[lang] || PORTFOLIO_NODES.en;

  const codeLines = project.codePreview.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(project.codePreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      if (isDocs) {
        setSimResult({
          status: '200 OK',
          latency: '38ms',
          schema: 'OpenAPI 3.0 Verified',
          message:
            lang === 'pt'
              ? 'Payload JSON validado contra o schema de produção /data/2.5/weather.'
              : 'JSON payload validated against production /data/2.5/weather schema.',
        });
      } else {
        setSimResult({
          status: '60 FPS',
          latency: '1.4ms Hydration',
          schema: `i18n: ${lang.toUpperCase()} // Theme: ${accent.toUpperCase()}`,
          message:
            lang === 'pt'
              ? 'Árvore React 18 + animações Framer Motion montadas com zero erros de hidratação.'
              : 'React 18 tree + Framer Motion spring physics mounted with zero layout shift.',
        });
      }
    }, 320);
  };

  const activeCityData = CITY_PAYLOADS[selectedCity];

  return (
    <div className="rounded-2xl bg-[#09090E] border border-white/10 shadow-monolith overflow-hidden flex flex-col h-full">
      {/* macOS / Studio Terminal Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#111118] border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-400/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-400/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
          </div>
          <span className="text-[11px] font-mono text-textSecondary tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 accent-text" />
            {isDocs ? 'openweather-api-spec.http' : 'PortfolioStudio.jsx'}
          </span>
        </div>

        {/* Window Tabs */}
        <div className="flex items-center bg-[#07070B] p-1 rounded-lg border border-white/[0.07]">
          <button
            type="button"
            onClick={() => setActiveTab('spec')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'spec'
                ? 'bg-white/10 text-textPrimary shadow-sm'
                : 'text-textTertiary hover:text-textSecondary'
            }`}
          >
            <FileJson className="w-3.5 h-3.5 accent-text" />
            {lang === 'pt' ? '1. Spec / Código' : '1. Live Spec / Code'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('arch')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'arch'
                ? 'bg-white/10 text-textPrimary shadow-sm'
                : 'text-textTertiary hover:text-textSecondary'
            }`}
          >
            <Layers className="w-3.5 h-3.5 accent-text" />
            {lang === 'pt' ? '2. Arquitetura' : '2. Architecture'}
          </button>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0B0B11] to-[#07070B]">
        <AnimatePresence mode="wait">
          {activeTab === 'spec' ? (
            <motion.div
              key="spec"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.05] text-textSecondary border border-white/[0.08]">
                    <span className="w-1.5 h-1.5 rounded-full accent-bg animate-pulse" />
                    {isDocs ? 'REST API // OpenAPI 3.0' : 'JSX // Framer Motion'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSimulate}
                    disabled={simulating}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.07] hover:bg-white/[0.12] text-textPrimary border accent-border transition-all"
                  >
                    <Play className={`w-3 h-3 accent-text ${simulating ? 'animate-spin' : ''}`} />
                    {simulating
                      ? lang === 'pt'
                        ? 'Executando...'
                        : 'Running...'
                      : isDocs
                      ? lang === 'pt'
                        ? 'Rodar Request'
                        : 'Run Request'
                      : lang === 'pt'
                      ? 'Simular Render'
                      : 'Simulate Render'}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-textSecondary hover:text-textPrimary bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-colors"
                    aria-label="Copy code snippet"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 accent-text" />
                        <span className="accent-text">{lang === 'pt' ? 'Copiado' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'pt' ? 'Copiar' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Viewer with Line Numbers */}
              <div className="relative rounded-xl bg-[#050508] border border-white/[0.07] p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed">
                <table className="w-full border-collapse">
                  <tbody>
                    {codeLines.map((line, idx) => {
                      const isComment = line.trim().startsWith('//');
                      const isMethod = line.trim().startsWith('GET ');
                      return (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="select-none pr-4 text-right text-textTertiary/50 w-7 align-top">
                            {idx + 1}
                          </td>
                          <td
                            className={`whitespace-pre ${
                              isComment
                                ? 'text-textTertiary italic'
                                : isMethod
                                ? 'accent-text font-semibold'
                                : 'text-zinc-200'
                            }`}
                          >
                            {line || ' '}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Interactive Simulation Result Strip */}
              <div className="rounded-xl bg-[#0D0D15] border border-white/[0.08] p-3.5">
                {simResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 font-semibold accent-text">
                        <CheckCircle2 className="w-4 h-4" />
                        STATUS: {simResult.status}
                      </span>
                      <span className="text-textSecondary">
                        {simResult.latency} • {simResult.schema}
                      </span>
                    </div>
                    <p className="text-xs text-textSecondary font-mono">{simResult.message}</p>
                  </motion.div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-textTertiary">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 accent-text" />
                      {isDocs
                        ? lang === 'pt'
                          ? 'Clique em "Rodar Request" ou abra a aba "2. Arquitetura" para testar cidades ao vivo.'
                          : 'Click "Run Request" or switch to "2. Architecture" to test live city endpoints.'
                        : lang === 'pt'
                        ? 'Clique em "Simular Render" ou inspecione a telemetria na aba "2. Arquitetura".'
                        : 'Click "Simulate Render" or inspect live telemetry in "2. Architecture".'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('arch')}
                      className="accent-text hover:underline inline-flex items-center gap-1"
                    >
                      {lang === 'pt' ? 'Abrir Playground' : 'Open Playground'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              {/* 4-Stage Pipeline Diagram */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-textTertiary flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 accent-text" />
                    {lang === 'pt'
                      ? 'Pipeline de Arquitetura (Clique para inspecionar)'
                      : 'Architecture Pipeline (Click node to inspect)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {archNodes.map((node, index) => {
                    const isSelected = selectedNodeIndex === index;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeIndex(index)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-white/[0.07] accent-border shadow-sm'
                            : 'bg-[#07070C] border-white/[0.06] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="accent-text font-semibold">STEP {node.step}</span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isSelected ? 'accent-text translate-x-0.5' : 'text-textTertiary'
                            }`}
                          />
                        </div>
                        <div className="text-xs font-display font-bold text-textPrimary">
                          {node.label}
                        </div>
                        <div className="text-[11px] font-mono text-textTertiary">{node.sub}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Pipeline Stage Explanation */}
                <div className="mt-2.5 p-3 rounded-xl bg-[#050508] border border-white/[0.07] text-xs text-textSecondary font-mono leading-relaxed">
                  <span className="accent-text font-semibold mr-1.5">
                    [{archNodes[selectedNodeIndex]?.label}]:
                  </span>
                  {archNodes[selectedNodeIndex]?.detail}
                </div>
              </div>

              {/* Project-Specific Interactive Sandbox */}
              {isDocs ? (
                <div className="rounded-xl bg-[#050508] border border-white/[0.08] p-3.5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-textSecondary flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 accent-text" />
                      {lang === 'pt'
                        ? 'Simulador de Endpoint Documentado'
                        : 'Documented Endpoint Tester'}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      200 OK • {activeCityData.latency}
                    </span>
                  </div>

                  {/* City Selector Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(CITY_PAYLOADS).map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setSelectedCity(city)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                          selectedCity === city
                            ? 'accent-bg text-primary font-semibold'
                            : 'bg-white/[0.05] text-textSecondary hover:text-textPrimary border border-white/[0.07]'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  {/* Live JSON Response Output */}
                  <pre className="text-[11px] font-mono text-zinc-300 bg-[#0A0A10] p-3 rounded-lg border border-white/[0.06] overflow-x-auto leading-relaxed">
                    {JSON.stringify(
                      {
                        endpoint: `/data/2.5/weather?q=${encodeURIComponent(selectedCity)}&units=metric`,
                        name: activeCityData.name,
                        country: activeCityData.sys.country,
                        coord: activeCityData.coord,
                        weather: activeCityData.weather[0],
                        main: activeCityData.main,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              ) : (
                <div className="rounded-xl bg-[#050508] border border-white/[0.08] p-3.5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-textSecondary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 accent-text" />
                      {lang === 'pt'
                        ? 'Telemetria & Estado em Tempo Real'
                        : 'Live Studio Telemetry & State'}
                    </span>
                    <span className="text-[11px] font-mono accent-text">
                      React 18 • 60fps Spring
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-[#0B0B12] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-textTertiary">LOCALE</div>
                      <div className="text-xs font-mono font-bold text-textPrimary mt-0.5">
                        {lang === 'pt' ? 'pt-BR' : 'en-US'}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0B0B12] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-textTertiary">THEME TOKEN</div>
                      <div className="text-xs font-mono font-bold accent-text mt-0.5 uppercase">
                        {accent}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0B0B12] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-textTertiary">COMMAND</div>
                      <div className="text-xs font-mono font-bold text-textPrimary mt-0.5">
                        Ctrl/⌘ + K
                      </div>
                    </div>
                  </div>

                  {/* Interactive Theme & Locale Switcher Inside the Inspector */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      {themes?.map((themeItem) => (
                        <button
                          key={themeItem.id}
                          type="button"
                          onClick={() => setAccent(themeItem.id)}
                          title={themeItem.label}
                          className={`w-5 h-5 rounded-full border transition-transform ${
                            accent === themeItem.id
                              ? 'scale-110 border-white ring-2 ring-white/30'
                              : 'border-white/20 opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: themeItem.color }}
                          aria-label={`Select ${themeItem.label} theme`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={toggleLang}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.06] hover:bg-white/[0.12] text-textPrimary border border-white/10 transition-colors"
                    >
                      {lang === 'pt' ? 'Alternar EN / PT' : 'Toggle EN / PT'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Samples = () => {
  const { lang, accent, setAccent, themes, toggle } = useLanguage();
  const t = translations[lang] || translations.en;
  const samples = t.samples;

  return (
    <section
      id="samples"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle Ambient Background Grid & Glow */}
      <div className="absolute inset-0 architectural-grid opacity-35 pointer-events-none" />
      <div
        className="absolute top-1/4 -right-48 w-96 h-96 rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ backgroundColor: 'var(--accent-hex)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full accent-bg animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest accent-text">
              {samples.sectionIndex}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-textPrimary mb-4">
            {samples.heading}
            <span className="accent-text">.</span>
          </h2>

          <p className="text-lg sm:text-xl text-textSecondary leading-relaxed">
            {samples.subtitle}
          </p>
        </motion.div>

        {/* Case Studies Showcase List */}
        <div className="space-y-12 lg:space-y-16">
          {samples.projects.map((project, index) => {
            const isDocs = project.type === 'docs';
            const projectNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
                className="monolith-card glow-border rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                  {/* Left Narrative Column */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      {/* Index + Monospace Category Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2.5">
                          <span className="text-2xl sm:text-3xl font-mono font-bold accent-text opacity-90">
                            {projectNumber}
                          </span>
                          <span className="h-4 w-[1px] bg-white/15" />
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.05] text-textSecondary border border-white/10">
                            {isDocs ? (
                              <BookOpen className="w-3.5 h-3.5 accent-text" />
                            ) : (
                              <Code2 className="w-3.5 h-3.5 accent-text" />
                            )}
                            {project.badge}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-textPrimary tracking-tight leading-tight">
                        {project.title}
                      </h3>

                      {/* Detailed Narrative Description */}
                      <p className="text-base sm:text-lg text-textSecondary leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Metrics / Highlights Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
                          >
                            <CheckCircle2 className="w-4 h-4 accent-text shrink-0" />
                            <span className="text-xs font-mono font-medium text-textPrimary leading-snug">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Monospace Stack Pills */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-textTertiary mb-2.5">
                          {lang === 'pt' ? 'Stack & Ferramentas' : 'Architecture & Tooling Stack'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg text-xs font-mono bg-[#0B0B11] text-textSecondary border border-white/[0.08] hover:border-white/20 hover:text-textPrimary transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Primary CTA Bar */}
                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-sm accent-bg text-primary shadow-accent-glow transition-all"
                      >
                        <span>{samples.viewProject}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.a>

                      <div className="inline-flex items-center gap-2 text-xs font-mono text-textTertiary">
                        <Sparkles className="w-3.5 h-3.5 accent-text" />
                        <span>{samples.interactivePreviewLabel} →</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Interactive Inspector Window */}
                  <div className="lg:col-span-6">
                    <ProjectInspector
                      project={project}
                      lang={lang}
                      accent={accent}
                      setAccent={setAccent}
                      themes={themes}
                      toggleLang={toggle}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Samples;
