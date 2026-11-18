import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Calendar,
  Terminal,
  BookOpen,
  Code2,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const IMPACT_BRIDGES = {
  en: [
    {
      engLabel: 'Docusaurus 3 & Style Linter Engineering',
      engValue: 'TypeScript, MDX 3, Mermaid diagrams, custom CLI style/link verifier & Lighthouse 100 optimization',
      dxLabel: 'Diátaxis & Enterprise Style Guide',
      dxValue: '9 ERP retail modules structured in Diátaxis + localized Microsoft Writing Style Guide (PT-BR)',
      synergy: 'Engineered both the Docusaurus 3.10 portal and the automated verification pipeline to ship 100%-validated ERP documentation with zero broken links.',
    },
    {
      engLabel: 'Full Stack Engineering',
      engValue: 'JavaScript, MongoDB, Tailwind CSS & REST API integrations on AWS',
      dxLabel: 'Docs-as-Code & DX',
      dxValue: 'Source-verified OpenAPI/Swagger specs, SQL record checks & Git Markdown portals',
      synergy: 'Every API reference and integration guide is validated directly against source controllers and live Postman/SQL queries before release.',
    },
    {
      engLabel: 'Production Automation & Ops',
      engValue: 'Python automation scripts, SQL queries, Active Directory & 24/7 Tier 2 triage',
      dxLabel: 'Operational Documentation',
      dxValue: 'Standardized incident playbooks, LAN/WAN network runbooks & ITSM knowledge base',
      synergy: 'Combined Python scripting with structured runbooks to reduce mean-time-to-resolution (MTTR) during critical 24/7 media operations.',
    },
    {
      engLabel: 'Client Web Applications',
      engValue: 'Full-cycle React, Node.js, MongoDB & Tailwind CSS web solutions and infra',
      dxLabel: 'Client & Security Enablement',
      dxValue: 'End-user manuals, Linux/Windows troubleshooting guides & cybersecurity playbooks',
      synergy: 'Delivered turnkey software alongside plain-language documentation so non-technical teams could operate systems independently.',
    },
  ],
  pt: [
    {
      engLabel: 'Engenharia Docusaurus 3 & Linter',
      engValue: 'TypeScript, MDX 3, diagramas Mermaid, verificador automático de estilo/links e nota 100 no Lighthouse',
      dxLabel: 'Diátaxis & Guia de Estilo Corporativo',
      dxValue: '9 módulos do ERP estruturados em Diátaxis + adaptação do Microsoft Writing Style Guide para PT-BR',
      synergy: 'Construção do portal Docusaurus 3.10 do zero aliada a scripts de auditoria automática para publicar documentação validada no sistema sem links quebrados.',
    },
    {
      engLabel: 'Engenharia Full Stack',
      engValue: 'JavaScript, MongoDB, Tailwind CSS & integrações de APIs REST na AWS',
      dxLabel: 'Docs-as-Code & DX',
      dxValue: 'Specs OpenAPI/Swagger validadas na fonte, queries SQL & portais Git Markdown',
      synergy: 'Cada referência de API e guia de integração é validado diretamente no código-fonte e via queries SQL/Postman antes da publicação.',
    },
    {
      engLabel: 'Automação & Operação 24/7',
      engValue: 'Scripts de automação em Python, bancos SQL, Active Directory & suporte N2',
      dxLabel: 'Documentação Operacional',
      dxValue: 'Playbooks de incidentes padronizados, runbooks LAN/WAN & base de conhecimento ITSM',
      synergy: 'União de automações em Python com runbooks estruturados para acelerar a resposta a incidentes em operação crítica 24/7.',
    },
    {
      engLabel: 'Aplicações Web & Infra',
      engValue: 'Desenvolvimento completo com React, Node.js, MongoDB & Tailwind CSS',
      dxLabel: 'Capacitação & Segurança',
      dxValue: 'Manuais de usuário, guias de troubleshooting Linux/Windows & docs de cibersegurança',
      synergy: 'Entrega de aplicações web acompanhadas de documentação clara para que clientes e equipes operassem com autonomia e segurança.',
    },
  ],
};

const ExperienceCard = ({ item, index, impact, lang }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeBridgeTab, setActiveBridgeTab] = useState('synergy'); // 'synergy' | 'eng' | 'dx'

  const isCurrent = index === 0 || index === 1;
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pl-8 sm:pl-12 lg:pl-0"
    >
      {/* Timeline Node on the Laser Spine */}
      <div className="
        absolute left-0 lg:left-[31.5%] top-2
        -translate-x-1/2 z-20 flex items-center justify-center
      ">
        <span className="relative flex h-5 w-5 items-center justify-center">
          {isCurrent && (
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: 'var(--accent-hex)' }}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 transition-colors ${
              isCurrent
                ? 'accent-bg border-primary shadow-accent-glow'
                : 'bg-[#12121A] border-white/40 group-hover:border-white'
            }`}
          />
        </span>
      </div>

      {/* Left Column: Chronology, Company & Location Metadata */}
      <div className="lg:col-span-4 lg:pr-10 lg:text-right">
        <div className="lg:sticky lg:top-28 space-y-3">
          {/* Index & Period Pill */}
          <div className="flex flex-wrap items-center lg:justify-end gap-2">
            <span className="text-xs font-mono font-bold accent-text opacity-80">
              //{stepNumber}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] text-textPrimary border border-white/10">
              <Calendar className="w-3.5 h-3.5 accent-text" />
              {item.period}
            </span>
          </div>

          {/* Company Name */}
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-textPrimary tracking-tight">
            {item.company}
          </h3>

          {/* Domain Badge */}
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider border ${
                isCurrent
                  ? 'bg-white/[0.07] accent-text accent-border'
                  : 'bg-white/[0.03] text-textSecondary border-white/10'
              }`}
            >
              <Sparkles className="w-3 h-3 accent-text" />
              {item.badge}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center lg:justify-end gap-1.5 text-xs font-mono text-textTertiary pt-0.5">
            <MapPin className="w-3.5 h-3.5 accent-text shrink-0" />
            <span>{item.location}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Monolith Experience Card */}
      <div className="lg:col-span-8 lg:pl-8">
        <div className="monolith-card glow-border rounded-2xl p-6 sm:p-8 transition-all duration-300">
          {/* Card Header: Role Title + Interactive Tag Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 accent-text" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-textPrimary">
                  {item.role}
                </h4>
                <p className="text-xs font-mono text-textTertiary">
                  {item.company} • {item.period}
                </p>
              </div>
            </div>

            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="self-start sm:self-auto text-[11px] font-mono accent-text hover:underline"
              >
                {lang === 'pt' ? `Filtro: ${selectedTag} (Limpar)` : `Filter: ${selectedTag} (Clear)`}
              </button>
            )}
          </div>

          {/* Interactive Tech & Domain Tags */}
          <div className="py-4 border-b border-white/[0.06]">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => {
                const isTagActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(isTagActive ? null : tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      isTagActive
                        ? 'accent-bg text-primary font-semibold shadow-sm'
                        : 'bg-[#0B0B11] text-textSecondary border border-white/[0.08] hover:border-white/20 hover:text-textPrimary'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action-Driven Engineering & Documentation Bullets */}
          <ul className="py-5 space-y-3.5">
            {item.bullets.map((bullet, bIdx) => {
              const matchesSelectedTag =
                !selectedTag ||
                bullet.toLowerCase().includes(selectedTag.toLowerCase().split(' ')[0]);

              return (
                <li
                  key={bIdx}
                  className={`group/bullet flex items-start gap-3 text-sm sm:text-base leading-relaxed transition-opacity ${
                    matchesSelectedTag ? 'text-textSecondary opacity-100' : 'text-textTertiary opacity-45'
                  }`}
                >
                  <span className="font-mono text-sm accent-text mt-1 shrink-0 transition-transform duration-200 group-hover/bullet:translate-x-0.5">
                    ▹
                  </span>
                  <span className="group-hover/bullet:text-textPrimary transition-colors">
                    {bullet}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Interactive "Impact Summary" Footer Strip: Engineering <-> Documentation Bridge */}
          {impact && (
            <div className="mt-2 pt-4 border-t border-white/[0.08]">
              <div className="rounded-xl bg-[#08080D] border border-white/[0.07] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-textSecondary">
                    <GitBranch className="w-3.5 h-3.5 accent-text" />
                    <span>
                      {lang === 'pt'
                        ? 'Ponte de Impacto: Engenharia × Documentação'
                        : 'Impact Summary: Engineering × Documentation Bridge'}
                    </span>
                  </div>

                  {/* Mini Mode Switcher */}
                  <div className="flex items-center gap-1 bg-[#0E0E16] p-1 rounded-lg border border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => setActiveBridgeTab('synergy')}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        activeBridgeTab === 'synergy'
                          ? 'bg-white/10 text-textPrimary font-semibold'
                          : 'text-textTertiary hover:text-textSecondary'
                      }`}
                    >
                      {lang === 'pt' ? 'Sinergia' : 'Synergy'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveBridgeTab('eng')}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
                        activeBridgeTab === 'eng'
                          ? 'bg-white/10 text-textPrimary font-semibold'
                          : 'text-textTertiary hover:text-textSecondary'
                      }`}
                    >
                      <Code2 className="w-3 h-3 accent-text" />
                      Dev
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveBridgeTab('dx')}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
                        activeBridgeTab === 'dx'
                          ? 'bg-white/10 text-textPrimary font-semibold'
                          : 'text-textTertiary hover:text-textSecondary'
                      }`}
                    >
                      <BookOpen className="w-3 h-3 accent-text" />
                      Docs
                    </button>
                  </div>
                </div>

                {activeBridgeTab === 'synergy' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[#0D0D15] border border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono accent-text mb-1">
                        <Code2 className="w-3.5 h-3.5" />
                        {impact.engLabel}
                      </div>
                      <p className="text-xs text-textSecondary leading-relaxed">{impact.engValue}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D0D15] border border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono accent-text mb-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {impact.dxLabel}
                      </div>
                      <p className="text-xs text-textSecondary leading-relaxed">{impact.dxValue}</p>
                    </div>
                  </div>
                )}

                {activeBridgeTab === 'eng' && (
                  <div className="p-3 rounded-lg bg-[#0D0D15] border border-white/[0.06] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold accent-text">
                      <Terminal className="w-3.5 h-3.5" />
                      {impact.engLabel}
                    </div>
                    <p className="text-xs text-textPrimary leading-relaxed">{impact.engValue}</p>
                    <p className="text-[11px] font-mono text-textTertiary pt-1">{impact.synergy}</p>
                  </div>
                )}

                {activeBridgeTab === 'dx' && (
                  <div className="p-3 rounded-lg bg-[#0D0D15] border border-white/[0.06] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold accent-text">
                      <Layers className="w-3.5 h-3.5" />
                      {impact.dxLabel}
                    </div>
                    <p className="text-xs text-textPrimary leading-relaxed">{impact.dxValue}</p>
                    <p className="text-[11px] font-mono text-textTertiary pt-1">{impact.synergy}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const exp = t.experience;
  const bridges = IMPACT_BRIDGES[lang] || IMPACT_BRIDGES.en;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 25%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Architectural Dots */}
      <div className="absolute inset-0 architectural-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full accent-bg animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest accent-text">
              {exp.sectionIndex}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-textPrimary mb-4">
            {exp.heading}
            <span className="accent-text">.</span>
          </h2>

          <p className="text-lg sm:text-xl text-textSecondary leading-relaxed">
            {exp.subtitle}
          </p>
        </motion.div>

        {/* Timeline Container with Scroll-Linked Laser Spine */}
        <div ref={containerRef} className="relative">
          {/* Static Background Track Line */}
          <div
            className="absolute left-0 lg:left-[31.5%] top-2 bottom-2 w-[2px] -translate-x-1/2 bg-white/[0.08]"
            aria-hidden="true"
          />

          {/* Scroll-Linked Glowing Laser Progress Beam */}
          <motion.div
            style={{
              scaleY,
              backgroundColor: 'var(--accent-hex)',
              boxShadow: '0 0 18px rgba(var(--accent-rgb), 0.75)',
            }}
            className="absolute left-0 lg:left-[31.5%] top-2 bottom-2 w-[2px] -translate-x-1/2 origin-top z-10"
            aria-hidden="true"
          />

          {/* Experience Roles List */}
          <div className="space-y-12 lg:space-y-16">
            {exp.items.map((item, index) => (
              <ExperienceCard
                key={`${item.company}-${index}`}
                item={item}
                index={index}
                impact={bridges[index]}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
