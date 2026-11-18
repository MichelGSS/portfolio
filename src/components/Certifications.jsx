import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Award,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ShieldCheck,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const certsBase = [
  {
    id: 'cs50x',
    category: 'cs',
    title: 'CS50x: Introduction to Computer Science',
    institution: 'Harvard University',
    link: 'https://courses.edx.org/certificates/58c2807f5f3a4c19acf91e4f57e10b98',
    image: `${import.meta.env.BASE_URL}CS50 Introduction to Computer Science.png`,
    isDegree: false,
  },
  {
    id: 'w3c-a11y',
    category: 'cs',
    title: 'Introduction to Web Accessibility',
    institution: 'W3C (via edX)',
    link: 'https://courses.edx.org/certificates/a8d308adbe134d7e96194bcbc25f6752',
    image: `${import.meta.env.BASE_URL}Introduction to Web Accessibility.png`,
    isDegree: false,
  },
  {
    id: 'efset-c1',
    category: 'writing',
    title: 'EF SET English Certificate - C1 Advanced',
    institution: 'EF SET',
    detail: 'Score: 68/100',
    link: 'https://cert.efset.org/pt/uku3aZ',
    image: `${import.meta.env.BASE_URL}English certificate EFSET.png`,
    isDegree: false,
  },
  {
    id: 'umich-python',
    category: 'cs',
    title: 'Programming for Everybody (Python)',
    institution: 'University of Michigan',
    link: 'https://coursera.org/verify/1SPRGA9HR9XL',
    image: `${import.meta.env.BASE_URL}Programming for everybody.png`,
    isDegree: false,
  },
  {
    id: 'umich-html5',
    category: 'cs',
    title: 'Introduction to HTML5',
    institution: 'University of Michigan',
    link: 'https://coursera.org/verify/XRPQO88MCR75',
    image: `${import.meta.env.BASE_URL}Introduction to HTML5.png`,
    isDegree: false,
  },
  {
    id: 'google-it',
    category: 'infra',
    title: 'Google IT Support Professional Certificate',
    institution: 'Google',
    detail: '6-course program',
    link: 'https://coursera.org/verify/professional-cert/66TS8BMCSPKM',
    image: `${import.meta.env.BASE_URL}Google IT Support.png`,
    isDegree: false,
  },
  {
    id: 'coursera-js',
    category: 'cs',
    title: 'Introduction to Javascript: The Basics',
    institution: 'Coursera',
    link: 'https://coursera.org/verify/FPAGJD7GWNSS',
    image: `${import.meta.env.BASE_URL}Introduction to javascript.png`,
    isDegree: false,
  },
  {
    id: 'ita-agile',
    category: 'infra',
    title: 'Principles of Agile Development',
    institution: 'Instituto Tecnológico de Aeronáutica - ITA',
    link: 'https://coursera.org/verify/MZJVWQVI9ESE',
    image: `${import.meta.env.BASE_URL}Principles of Agile Development.png`,
    isDegree: false,
  },
  {
    id: 'umich-writing',
    category: 'writing',
    title: 'Good with Words: Writing and Editing',
    institution: 'University of Michigan',
    link: 'https://www.coursera.org/account/accomplishments/specialization/L0BTXW0E195N',
    image: `${import.meta.env.BASE_URL}Good with words - writing and editing.jpg`,
    isDegree: false,
  },
  {
    id: 'bi-tech-writing',
    category: 'writing',
    title: 'Introduction to Technical Writing',
    institution: 'Board Infinity',
    link: 'https://coursera.org/verify/S74C9HXC9MPV',
    image: `${import.meta.env.BASE_URL}Introduction to Technical Writing.png`,
    isDegree: false,
  },
  {
    id: 'bi-tech-docs',
    category: 'writing',
    title: 'Writing Effective Technical Documentation',
    institution: 'Board Infinity',
    link: 'https://coursera.org/verify/ILVS7KNB1FN5',
    image: `${import.meta.env.BASE_URL}Writing Effective Technical Documentation.png`,
    isDegree: false,
  },
];

const VALIDATION_CODE = '712.712.4d0d6546fa03';

const Certifications = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const { lang } = useLanguage();
  const t = translations[lang].certifications;

  const degreeCert = {
    id: 'ibmr-degree',
    category: 'degree',
    badge: t.degreeBadge,
    title: t.degreeTitle,
    institution: t.degreeInstitution,
    detail: t.degreeDetail,
    description: t.degreeDescription,
    link: 'https://diplomadigital.ibmr.br/',
    linkLabel: t.verifyDiploma,
    image: `${import.meta.env.BASE_URL}Diploma IBMR.png`,
    isDegree: true,
  };

  const enrichedCerts = certsBase.map((cert, i) => ({
    ...cert,
    description: t.descriptions[i],
    linkLabel: t.viewCert,
  }));

  const allInspectionItems = [degreeCert, ...enrichedCerts];

  const filteredCerts =
    activeFilter === 'all'
      ? enrichedCerts
      : enrichedCerts.filter((cert) => cert.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: t.filterAll, count: enrichedCerts.length + 1 },
    {
      id: 'cs',
      label: t.filterCS,
      count: enrichedCerts.filter((c) => c.category === 'cs').length,
    },
    {
      id: 'writing',
      label: t.filterWriting,
      count: enrichedCerts.filter((c) => c.category === 'writing').length,
    },
    {
      id: 'infra',
      label: t.filterInfra,
      count: enrichedCerts.filter((c) => c.category === 'infra').length,
    },
  ];

  const handleCopyValidationCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(VALIDATION_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const openModalById = (id) => {
    const idx = allInspectionItems.findIndex((item) => item.id === id);
    if (idx !== -1) setSelectedIndex(idx);
  };

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + allInspectionItems.length) % allInspectionItems.length
    );
  }, [allInspectionItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % allInspectionItems.length
    );
  }, [allInspectionItems.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const selectedCert =
    selectedIndex !== null ? allInspectionItems[selectedIndex] : null;

  return (
    <section
      id="certifications"
      className="py-28 md:py-36 px-6 md:px-10 relative overflow-hidden"
    >
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {t.sectionIndex}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-borderDark via-borderDark/50 to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary tracking-tight">
                {t.heading}
              </h2>
            </div>
            <p className="text-textSecondary text-base md:text-lg max-w-xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Featured Spotlight Hero Card — Academic Degree (IBMR) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          onClick={() => openModalById('ibmr-degree')}
          className="monolith-card glow-border rounded-2xl p-6 md:p-10 mb-14 cursor-pointer group relative overflow-hidden transition-all duration-500 hover:border-white/20"
        >
          {/* Ambient radial glow */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-500 blur-3xl"
            style={{ background: 'var(--accent-hex)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Diploma Live Image Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-primary border border-white/10 shadow-2xl group-hover:border-accent/40 transition-colors duration-300">
                <img
                  src={degreeCert.image}
                  alt={degreeCert.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                {/* Hover Zoom Trigger Pill */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-textPrimary group-hover:border-accent/60 group-hover:text-accent transition-all">
                  <Eye size={14} />
                  <span>{t.viewDetails}</span>
                </div>

                {/* Top-left Verified Seal */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-accent">
                  <ShieldCheck size={13} />
                  <span>MEC 554/2019</span>
                </div>
              </div>
            </div>

            {/* Diploma Editorial Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.05] border border-accent/40 text-accent">
                    <GraduationCap size={14} />
                    {degreeCert.badge}
                  </span>
                  <span className="text-xs font-mono text-textTertiary uppercase tracking-wider">
                    {degreeCert.institution}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-textPrimary mb-4 group-hover:text-accent transition-colors">
                  {degreeCert.title}
                </h3>

                <p className="text-textSecondary text-sm md:text-base leading-relaxed mb-6">
                  {degreeCert.description}
                </p>
              </div>

              {/* Action & Digital Validation Bar */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Copyable Validation Code */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-textTertiary">
                    {degreeCert.detail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyValidationCode}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-textPrimary transition-colors"
                    title="Copy digital validation code"
                  >
                    {copiedCode ? (
                      <>
                        <Check size={12} className="text-accent" />
                        <span className="text-accent">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} className="text-textTertiary" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct External Verify Link */}
                <div className="flex items-center gap-4">
                  <a
                    href={degreeCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-primary font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    <span>{degreeCert.linkLabel}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-secondary/90 border border-white/10">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-textSecondary hover:text-textPrimary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="certFilter"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-accent"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{tab.label}</span>
                    {tab.id !== 'all' && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-black/20 text-primary'
                            : 'bg-white/[0.06] text-textTertiary'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-textTertiary">
            <Sparkles size={14} className="text-accent" />
            <span>Click any credential to inspect full resolution</span>
          </div>
        </div>

        {/* Interactive Credential Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.article
                layout
                key={cert.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => openModalById(cert.id)}
                className="monolith-card glow-border rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
              >
                <div>
                  {/* Certificate Image Preview Header */}
                  <div className="relative h-44 w-full bg-primary overflow-hidden border-b border-white/10">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/30 to-transparent group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Institution Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-textSecondary">
                      {cert.institution}
                    </div>

                    {/* Inspect Icon Badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-textSecondary group-hover:text-accent group-hover:border-accent/50 transition-colors">
                      <Eye size={14} />
                    </div>

                    {cert.detail && (
                      <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-accent/15 border border-accent/40 text-[10px] font-mono text-accent">
                        {cert.detail}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-display font-bold text-textPrimary mb-2.5 leading-snug group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-textSecondary text-xs leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-textTertiary group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <Award size={13} className="text-accent" />
                    {t.viewDetails} →
                  </span>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-md text-textTertiary hover:text-accent hover:bg-white/[0.05] transition-colors"
                    title={cert.linkLabel}
                    aria-label={cert.linkLabel}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Lightbox Modal Inspector */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="monolith-card rounded-2xl border border-white/15 w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl"
            >
              {/* Top Bar Controls */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-white/[0.06] font-mono text-xs text-accent">
                    {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                    {String(allInspectionItems.length).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-textTertiary truncate max-w-[220px] sm:max-w-none">
                    {selectedCert.institution}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-textSecondary hover:text-textPrimary transition-colors"
                    aria-label="Previous credential"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-textSecondary hover:text-textPrimary transition-colors"
                    aria-label="Next credential"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-textSecondary hover:text-accent transition-colors ml-2"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: High-Res Certificate Preview */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="w-full aspect-[4/3] rounded-xl bg-primary border border-white/10 flex items-center justify-center overflow-hidden p-3">
                    {selectedCert.image ? (
                      <img
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <span className="font-mono text-textTertiary uppercase tracking-widest">
                        {t.certFallback}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column: Credential Metadata & Verification */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs mb-4">
                      {selectedCert.isDegree ? (
                        <GraduationCap size={14} />
                      ) : (
                        <ShieldCheck size={14} />
                      )}
                      <span>
                        {selectedCert.isDegree
                          ? t.degreeBadge
                          : 'VERIFIED CREDENTIAL'}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-textPrimary mb-2 leading-tight">
                      {selectedCert.title}
                    </h3>

                    <p className="font-mono text-sm text-accent mb-6">
                      {selectedCert.institution}
                    </p>

                    <div className="w-12 h-[2px] bg-accent/60 mb-6" />

                    <p className="text-textSecondary leading-relaxed text-sm md:text-base mb-6">
                      {selectedCert.description}
                    </p>

                    {selectedCert.detail && (
                      <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs text-textSecondary mb-6">
                        {selectedCert.detail}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-accent text-primary font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      <span>{selectedCert.linkLabel || t.viewCert}</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
