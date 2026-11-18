import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BookOpen,
  Layers,
  Wrench,
  Globe,
  Database,
  Terminal,
  FileCode,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Braces,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const CATEGORY_ICONS = [Code2, BookOpen, Layers, Wrench, Globe];

const PIPELINE_META = [
  {
    icon: Database,
    cmd: '$ git grep -n "router.get" src/controllers/ && psql -c "SELECT * FROM api_keys LIMIT 1;"',
    artifact: 'controllers/weather.js + schema.sql',
    status: 'SOURCE VERIFIED',
  },
  {
    icon: Terminal,
    cmd: '$ newman run collections/openweather-v2.5.json --env-var "baseUrl=https://api.openweathermap.org"',
    artifact: 'openapi-3.1-spec.yaml (200 OK)',
    status: 'PAYLOAD VALIDATED',
  },
  {
    icon: FileCode,
    cmd: '$ npx docusaurus write-translations && markdownlint "docs/**/*.mdx"',
    artifact: 'docs/api/weather-endpoint.mdx',
    status: 'DIÁTAXIS STRUCTURED',
  },
  {
    icon: GitBranch,
    cmd: '$ git commit -m "docs(api): sync OpenAPI 3.1 schema" && git push origin main',
    artifact: 'gh-pages // CI/CD build #142 passed',
    status: 'DEPLOYED TO PROD',
  },
];

const handleSpotlightMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

const Skills = () => {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  // Store 'all' or category index (0..4) so switching language preserves filter state
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const categories = t.categories || [];
  const pipelineSteps = t.pipelineSteps || [];

  const filteredCategories = categories
    .map((cat, index) => ({ ...cat, originalIndex: index }))
    .filter((cat) => selectedFilter === 'all' || cat.originalIndex === selectedFilter);

  const totalSkillsCount = categories.reduce(
    (sum, cat) => sum + (cat.skills ? cat.skills.length : 0),
    0
  );

  const activePipelineStep = pipelineSteps[activeStepIdx] || pipelineSteps[0];
  const activePipelineMeta = PIPELINE_META[activeStepIdx] || PIPELINE_META[0];

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background architectural grid & glow */}
      <div className="absolute inset-0 architectural-dots opacity-30 pointer-events-none" />
      <div
        className="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full pointer-events-none blur-[150px] opacity-10"
        style={{ background: 'var(--accent-hex)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-14"
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

        {/* PART A: Interactive Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar"
          role="tablist"
          aria-label="Skill category filter"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedFilter === 'all'}
            onClick={() => setSelectedFilter('all')}
            className={`relative px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 flex items-center gap-2 focus:outline-none ${
              selectedFilter === 'all'
                ? 'text-black font-semibold'
                : 'text-textSecondary hover:text-white bg-white/[0.03] border border-white/[0.07]'
            }`}
          >
            {selectedFilter === 'all' && (
              <motion.span
                layoutId="skillFilterTab"
                className="absolute inset-0 rounded-xl accent-bg"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t.filterAll}</span>
            <span
              className={`relative z-10 text-[11px] px-1.5 py-0.5 rounded-md ${
                selectedFilter === 'all'
                  ? 'bg-black/20 text-black'
                  : 'bg-white/[0.06] text-textTertiary'
              }`}
            >
              {totalSkillsCount}
            </span>
          </button>

          {categories.map((cat, idx) => {
            const isActive = selectedFilter === idx;
            const TabIcon = CATEGORY_ICONS[idx] || Cpu;
            return (
              <button
                key={cat.badge}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(idx)}
                className={`relative px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 flex items-center gap-2 focus:outline-none ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-textSecondary hover:text-white bg-white/[0.03] border border-white/[0.07]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skillFilterTab"
                    className="absolute inset-0 rounded-xl accent-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <TabIcon className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">{cat.title}</span>
                <span
                  className={`relative z-10 text-[11px] px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-black/20 text-black'
                      : 'bg-white/[0.06] text-textTertiary'
                  }`}
                >
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* PART A: Spotlight Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const IconComponent = CATEGORY_ICONS[cat.originalIndex] || Braces;
              // When showing all 5 categories: top 2 span 6 cols each, bottom 3 span 4 cols each on lg
              const spanClass =
                selectedFilter !== 'all'
                  ? 'lg:col-span-12'
                  : cat.originalIndex < 2
                  ? 'lg:col-span-6'
                  : 'lg:col-span-4';

              return (
                <motion.div
                  layout
                  key={cat.badge}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onMouseMove={handleSpotlightMove}
                  className={`${spanClass} group relative rounded-2xl monolith-card glow-border p-6 sm:p-8 overflow-hidden flex flex-col justify-between`}
                >
                  {/* Mouse-tracking radial spotlight */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-spotlight" />

                  <div className="relative z-10">
                    {/* Card Top Metadata Bar */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="inline-flex items-center gap-2.5">
                        <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center accent-text group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] accent-text">
                          {cat.badge}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-textTertiary px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.07]">
                        {cat.skills.length}{' '}
                        {lang === 'pt'
                          ? cat.skills.length === 1
                            ? 'item'
                            : 'itens'
                          : cat.skills.length === 1
                          ? 'skill'
                          : 'skills'}
                      </span>
                    </div>

                    {/* Category Title & Description */}
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-textSecondary leading-relaxed mb-6">
                      {cat.description}
                    </p>
                  </div>

                  {/* Interactive Skill Pills */}
                  <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/[0.07]">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                        className="px-3 py-1.5 rounded-lg font-mono text-xs sm:text-[13px] bg-white/[0.035] border border-white/[0.08] text-textPrimary hover:border-[var(--accent-hex)] hover:shadow-accent-glow cursor-default select-none transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* PART B: Animated 4-Stage "Docs-as-Code & Engineering Pipeline" Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          onMouseMove={handleSpotlightMove}
          className="group relative rounded-2xl monolith-card glow-border p-6 sm:p-8 md:p-10 overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-spotlight" />

          {/* Pipeline Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest accent-text mb-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>END-TO-END VERIFICATION PIPELINE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {t.pipelineTitle}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-textSecondary">
              <CheckCircle2 className="w-4 h-4 accent-text" />
              <span>
                {lang === 'pt'
                  ? 'Selecione uma etapa para inspecionar'
                  : 'Select a stage to inspect telemetry'}
              </span>
            </div>
          </div>

          {/* 4-Stage Interactive Horizontal / Vertical Pipeline */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {pipelineSteps.map((stepObj, idx) => {
              const isSelected = idx === activeStepIdx;
              const meta = PIPELINE_META[idx] || PIPELINE_META[0];
              const StepIcon = meta.icon;

              return (
                <div key={stepObj.step} className="relative flex flex-col">
                  {/* Connector line between steps on desktop */}
                  {idx < pipelineSteps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center absolute top-1/2 -right-3 z-20 -translate-y-1/2 pointer-events-none">
                      <ArrowRight
                        className={`w-4 h-4 transition-colors duration-300 ${
                          idx <= activeStepIdx ? 'accent-text' : 'text-white/20'
                        }`}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveStepIdx(idx)}
                    onMouseEnter={() => setActiveStepIdx(idx)}
                    className={`relative h-full text-left rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between focus:outline-none ${
                      isSelected
                        ? 'bg-white/[0.06] accent-border accent-glow-box'
                        : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border font-mono text-xs font-bold transition-colors ${
                            isSelected
                              ? 'accent-bg text-black border-transparent'
                              : 'bg-white/[0.04] border-white/[0.08] accent-text'
                          }`}
                        >
                          <StepIcon className="w-4 h-4" />
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'accent-bg animate-ping' : 'bg-white/20'
                            }`}
                          />
                          <span className="font-mono text-xs font-bold accent-text">
                            STEP {stepObj.step}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-base sm:text-lg text-white mb-1.5">
                        {stepObj.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
                        {stepObj.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-textTertiary">
                      <span>{meta.status}</span>
                      <span className={isSelected ? 'accent-text' : ''}>●</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Live Stage Command & Artifact Readout Bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 rounded-xl bg-[#050508] border border-white/[0.09] p-4 sm:px-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 font-mono text-xs"
            >
              <div className="flex items-center gap-3 overflow-x-auto">
                <span className="px-2 py-0.5 rounded accent-bg text-black font-bold shrink-0">
                  STAGE {activePipelineStep?.step}
                </span>
                <code className="text-zinc-200 whitespace-nowrap">
                  {activePipelineMeta.cmd}
                </code>
              </div>

              <div className="flex items-center gap-2 text-textTertiary shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0 border-white/[0.06]">
                <span>OUTPUT:</span>
                <span className="accent-text font-medium">
                  {activePipelineMeta.artifact}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
