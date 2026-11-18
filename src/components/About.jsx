import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BookOpen,
  Terminal,
  Compass,
  Wrench,
  FileCode,
  Layers,
  Copy,
  Check,
  Sparkles,
  Shield,
  Globe,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const DIATAXIS_META = {
  tutorials: {
    icon: Compass,
    axisX: 'ACTION',
    axisY: 'ACQUISITION',
    file: 'docs/getting-started/quickstart.mdx',
    langTag: 'javascript',
  },
  howto: {
    icon: Wrench,
    axisX: 'ACTION',
    axisY: 'APPLICATION',
    file: 'docs/guides/webhook-hmac-auth.mdx',
    langTag: 'python',
  },
  reference: {
    icon: FileCode,
    axisX: 'COGNITION',
    axisY: 'APPLICATION',
    file: 'openapi/v2.5/weather-spec.json',
    langTag: 'http / json',
  },
  explanation: {
    icon: Layers,
    axisX: 'COGNITION',
    axisY: 'ACQUISITION',
    file: 'docs/architecture/caching-topology.mdx',
    langTag: 'architecture',
  },
};

const handleSpotlightMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

const About = () => {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const [activeModeId, setActiveModeId] = useState('tutorials');
  const [copied, setCopied] = useState(false);

  const modes = t.diataxisModes || [];
  const activeMode = modes.find((m) => m.id === activeModeId) || modes[0];
  const activeMeta = DIATAXIS_META[activeMode?.id] || DIATAXIS_META.tutorials;

  const handleCopySnippet = async () => {
    if (!activeMode?.snippet) return;
    try {
      await navigator.clipboard.writeText(activeMode.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const telemetryMetrics = [
    {
      value: '2018',
      label: t.yearsLabel,
      sub: lang === 'pt' ? 'Infra, Suporte & Dev' : 'Infra, Support & Dev',
      icon: Terminal,
    },
    {
      value: 'C1',
      label: t.englishLabel,
      sub: 'EF SET 68/100',
      icon: Globe,
    },
    {
      value: 'MERN + PY',
      label: t.fullStackLabel,
      sub: 'React, Node, SQL, Python',
      icon: Cpu,
    },
    {
      value: '24/7',
      label: t.opsLabel,
      sub: lang === 'pt' ? 'N2 & Automação' : 'Tier 2 & Automation',
      icon: Shield,
    },
  ];

  const dualPills = [
    'MERN Stack',
    'Python',
    'Next.js',
    'OpenAPI 3.1',
    'Docusaurus',
    'Redocly',
    'Postman',
    'SQL',
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle architectural background */}
      <div className="absolute inset-0 architectural-grid opacity-35 pointer-events-none" />
      <div
        className="absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full pointer-events-none blur-[150px] opacity-15"
        style={{ background: 'var(--accent-hex)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-5">
            <span className="w-2 h-2 rounded-full accent-bg animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] accent-text">
              {t.sectionIndex}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-textPrimary">
              {t.heading}
              <span className="accent-text">.</span>
            </h2>
            <p className="text-base sm:text-lg text-textSecondary max-w-2xl font-normal leading-relaxed lg:text-right">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* BENTO CARD 1: Main Narrative & Dual-Brain Manifesto (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            onMouseMove={handleSpotlightMove}
            className="lg:col-span-7 group relative rounded-2xl monolith-card glow-border p-6 sm:p-8 md:p-10 overflow-hidden flex flex-col justify-between"
          >
            {/* Interactive mouse-tracking radial spotlight */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-spotlight" />

            <div className="relative z-10">
              {/* Visual Dual-Core Engineer Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-7 border-b border-white/[0.08]">
                <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs tracking-wider">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.1] text-textPrimary font-semibold">
                    <Code2 className="w-3.5 h-3.5 accent-text" />
                    [ FULL STACK CODE ]
                  </span>
                  <span className="accent-text font-bold text-sm select-none">⇄</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.1] text-textPrimary font-semibold">
                    <BookOpen className="w-3.5 h-3.5 accent-text" />
                    [ TECHNICAL WRITING ]
                  </span>
                </div>

                <span className="font-mono text-[11px] uppercase tracking-widest text-textTertiary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 accent-text" />
                  DUAL-CORE DX
                </span>
              </div>

              {/* 4 Editorial Bio Paragraphs */}
              <div className="space-y-5 text-textSecondary text-base sm:text-[17px] leading-[1.78]">
                <p className="text-textPrimary/90 text-lg sm:text-xl leading-relaxed font-normal">
                  {t.p1Pre}
                  <strong className="font-semibold text-white underline decoration-[var(--accent-hex)]/60 decoration-2 underline-offset-4">
                    {t.p1Bold}
                  </strong>
                  {t.p1Post}
                </p>

                <p>{t.p2}</p>

                <p>
                  {t.p3Pre}
                  <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md bg-white/[0.05] border border-white/[0.12] font-mono text-xs sm:text-sm text-white font-medium">
                    {t.p3Bold1}
                  </span>
                  {t.p3Mid}
                  <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md bg-white/[0.05] border border-white/[0.12] font-mono text-xs sm:text-sm text-white font-medium">
                    {t.p3Bold2}
                  </span>
                  {t.p3Post}
                </p>

                <p className="pl-4 border-l-2 accent-border text-textSecondary/95 italic">
                  {t.p4}
                </p>
              </div>
            </div>

            {/* Highlighted Technical Pills Footer */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.07] flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-textTertiary mr-2">
                {lang === 'pt' ? 'NÚCLEO OPERACIONAL:' : 'CORE STACK:'}
              </span>
              {dualPills.map((pill) => (
                <span
                  key={pill}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-textSecondary hover:text-white hover:border-[var(--accent-hex)]/50 transition-colors"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* BENTO CARD 2: Portrait & Executive Telemetry (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.12 }}
            onMouseMove={handleSpotlightMove}
            className="lg:col-span-5 group relative rounded-2xl monolith-card glow-border p-6 sm:p-8 overflow-hidden flex flex-col justify-between gap-6"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-spotlight" />

            {/* Top Editorial Portrait Frame */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 font-mono text-[11px] text-textTertiary uppercase tracking-widest">
                <span>ID // MICHEL.SILVEIRA</span>
                <span className="accent-text flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full accent-bg" />
                  VERIFIED PROFILE
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#040406] h-64 sm:h-72 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="Michel Silveira — Full Stack Developer & Technical Writer"
                  loading="lazy"
                  className="w-full h-full object-contain object-top grayscale-[12%] contrast-[1.06] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 pb-6"
                />
                {/* Editorial gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent" />

                {/* Corner HUD brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 pointer-events-none" />

                {/* Lower Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="font-display font-bold text-white text-base sm:text-lg leading-tight">
                      Michel Silveira
                    </p>
                    <p className="font-mono text-[11px] text-textSecondary">
                      Rio de Janeiro, BR // UTC-3
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[10px] uppercase tracking-wider accent-text">
                    CODE + DOCS
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Key Metric Monolith Tiles */}
            <div className="relative z-10 grid grid-cols-2 gap-3.5">
              {telemetryMetrics.map((m) => {
                const IconComponent = m.icon;
                return (
                  <div
                    key={m.value}
                    className="rounded-xl bg-white/[0.025] border border-white/[0.07] hover:border-[var(--accent-hex)]/40 p-4 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                        {m.value}
                      </span>
                      <IconComponent className="w-4 h-4 accent-text opacity-80" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-textPrimary leading-snug">
                        {m.label}
                      </p>
                      <p className="font-mono text-[10px] text-textTertiary mt-0.5 truncate">
                        {m.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* BENTO CARD 3: Full-Width Interactive Diátaxis Framework & Docs-as-Code Playground (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.18 }}
            onMouseMove={handleSpotlightMove}
            className="lg:col-span-12 group relative rounded-2xl monolith-card glow-border p-6 sm:p-8 md:p-10 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-spotlight" />

            {/* Sandbox Top Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest accent-text mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>DIÁTAXIS FRAMEWORK // INTERACTIVE SANDBOX</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {t.diataxisTitle}
                </h3>
              </div>
              <p className="text-sm text-textSecondary font-mono bg-white/[0.03] border border-white/[0.08] px-3.5 py-2 rounded-lg">
                {t.diataxisSubtitle}
              </p>
            </div>

            {/* Split Interactive Playground: Left 2x2 Quadrant Matrix | Right Live Inspector */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Side: 2x2 Interactive Quadrant Matrix (5 cols on lg) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {modes.map((mode) => {
                  const isSelected = mode.id === activeMode?.id;
                  const meta = DIATAXIS_META[mode.id] || DIATAXIS_META.tutorials;
                  const ModeIcon = meta.icon;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveModeId(mode.id)}
                      className={`relative text-left rounded-xl p-5 transition-colors duration-300 border flex flex-col justify-between min-h-[148px] focus:outline-none ${
                        isSelected
                          ? 'bg-white/[0.06] border-transparent text-white'
                          : 'bg-white/[0.02] border-white/[0.07] text-textSecondary hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="diataxisActive"
                          className="absolute inset-0 rounded-xl border-2 accent-border accent-glow-box pointer-events-none"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between w-full mb-3">
                        <span
                          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'accent-bg text-black border-transparent'
                              : 'bg-white/[0.04] border-white/[0.08] accent-text'
                          }`}
                        >
                          <ModeIcon className="w-4 h-4" />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-textTertiary">
                          {meta.axisX}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <h4 className="font-display font-bold text-base text-white mb-1">
                          {mode.name}
                        </h4>
                        <p className="font-mono text-xs accent-text truncate">
                          {mode.orientation}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Side: Live Code & Documentation Inspector Window (7 cols on lg) */}
              <div className="lg:col-span-7 rounded-xl bg-[#07070B] border border-white/[0.1] overflow-hidden flex flex-col justify-between shadow-2xl">
                {/* Inspector Window Chrome */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 font-mono text-xs text-textSecondary truncate">
                      {activeMeta.file}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-textTertiary border border-white/[0.07]">
                      {activeMeta.langTag}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs bg-white/[0.05] hover:bg-white/[0.1] text-textPrimary border border-white/[0.1] transition-colors"
                      aria-label="Copy snippet"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 accent-text" />
                          <span className="accent-text">
                            {lang === 'pt' ? 'Copiado' : 'Copied'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-textSecondary" />
                          <span>{lang === 'pt' ? 'Copiar' : 'Copy snippet'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Animated Inspector Body */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${lang}-${activeMode?.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-medium accent-bg text-black">
                          {activeMode?.orientation}
                        </span>
                        <span className="font-mono text-xs text-textTertiary">
                          // {activeMode?.name}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-textSecondary leading-relaxed">
                        {activeMode?.goal}
                      </p>
                    </div>

                    {/* Syntax-Styled Snippet Block */}
                    <div className="relative rounded-lg bg-[#040407] border border-white/[0.08] p-4 overflow-x-auto">
                      <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-textPrimary">
                        <code>
                          {activeMode?.snippet.split('\n').map((line, idx) => {
                            const isComment =
                              line.trim().startsWith('//') || line.trim().startsWith('#');
                            return (
                              <div key={idx} className="table-row">
                                <span className="table-cell pr-4 select-none text-right text-textTertiary/50 text-[11px]">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span
                                  className={`table-cell ${
                                    isComment ? 'accent-text italic' : 'text-zinc-200'
                                  }`}
                                >
                                  {line || ' '}
                                </span>
                              </div>
                            );
                          })}
                        </code>
                      </pre>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
