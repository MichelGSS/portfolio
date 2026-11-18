import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  Palette,
  Menu,
  X,
  FileText,
  Check,
  ArrowUpRight,
  Sparkles,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Navbar = () => {
  const {
    lang,
    toggle,
    accent,
    setAccent,
    setCommandOpen,
    themes,
  } = useLanguage();
  const t = translations[lang];

  const [activeSection, setActiveSection] = useState('#about');
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const themeMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sectionIds = ['about', 'skills', 'samples', 'experience', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 240;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sectionIds[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resumeUrl = `${import.meta.env.BASE_URL}${lang === 'pt' ? 'resume-pt.pdf' : 'resume.pdf'}`;

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 mx-auto max-w-6xl px-4">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-monolith py-2.5 px-4'
            : 'bg-[#0D0D12]/80 backdrop-blur-xl border border-white/[0.07] py-3 px-4'
        }`}
      >
        {/* Subtle top specular highlight */}
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-60"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.55), rgba(255,255,255,0.2), transparent)',
          }}
        />

        <div className="flex items-center justify-between gap-3">
          {/* Left: Brand Identity */}
          <a
            href="#"
            onClick={(e) => scrollToSection(e, '#')}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[var(--accent-hex)]/50 transition-colors">
              <span className="font-syne font-extrabold text-sm tracking-tighter text-white">
                MS
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-hex)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-hex)]" />
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[var(--accent-hex)] transition-colors">
                  {t.nav.logo}
                </span>
                <span className="hidden sm:inline-block rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-textSecondary border border-white/[0.06]">
                  v2.6
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-widest text-textTertiary uppercase">
                DX // FULL STACK
              </span>
            </div>
          </a>

          {/* Center: Desktop Architectural Nav Pill Links */}
          <div className="hidden lg:flex items-center gap-1 rounded-xl bg-black/40 p-1 border border-white/[0.06]">
            {t.nav.links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-white/[0.08] border border-[var(--accent-hex)]/35 shadow-[0_0_20px_-6px_rgba(var(--accent-rgb),0.45)]"
                    />
                  )}
                  <span
                    className={`relative z-10 font-mono text-[10px] transition-colors ${
                      isActive ? 'text-[var(--accent-hex)]' : 'text-textTertiary'
                    }`}
                  >
                    {link.index}
                  </span>
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Controls: Studio Accent Picker, Command Palette, Lang Toggle, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Studio Accent Theme Picker */}
            <div className="relative" ref={themeMenuRef}>
              <button
                type="button"
                onClick={() => setThemeOpen((prev) => !prev)}
                aria-label="Select Studio Accent Theme"
                title={t.commandPalette.themes}
                className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-xs text-textSecondary hover:text-white transition-all"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shadow-sm"
                  style={{
                    backgroundColor: 'var(--accent-hex)',
                    boxShadow: '0 0 8px var(--accent-hex)',
                  }}
                />
                <Palette className="w-3.5 h-3.5 text-textSecondary" />
              </button>

              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl glass-panel p-2 shadow-monolith border border-white/10 z-50"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-textTertiary flex items-center justify-between">
                      <span>{t.commandPalette.themes}</span>
                      <Sparkles className="w-3 h-3 text-[var(--accent-hex)]" />
                    </div>
                    <div className="mt-1 space-y-1">
                      {themes.map((item) => {
                        const selected = accent === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setAccent(item.id);
                              setThemeOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors ${
                              selected
                                ? 'bg-white/10 text-white font-medium'
                                : 'text-textSecondary hover:bg-white/[0.05] hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className="h-3 w-3 rounded-full border border-white/20"
                                style={{
                                  backgroundColor: item.color,
                                  boxShadow: selected ? `0 0 10px ${item.color}` : 'none',
                                }}
                              />
                              <span>{item.label}</span>
                            </span>
                            {selected && (
                              <Check className="w-3.5 h-3.5 text-[var(--accent-hex)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Command Palette Trigger (⌘K) */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[var(--accent-hex)]/40 text-xs text-textSecondary hover:text-white transition-all group"
              title="Open Command Center (Ctrl+K / ⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-[var(--accent-hex)] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-mono text-[11px]">
                {t.nav.cmdHint}
              </span>
              <kbd className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-textTertiary border border-white/10 group-hover:text-white">
                ⌘K
              </kbd>
            </button>

            {/* Language Toggle Pill (EN / PT) */}
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle Language"
              className="relative flex items-center h-9 px-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 font-mono text-xs transition-all"
            >
              <Globe className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-hex)]" />
              <span className={lang === 'en' ? 'text-white font-bold' : 'text-textTertiary'}>
                EN
              </span>
              <span className="mx-1 text-white/20">/</span>
              <span className={lang === 'pt' ? 'text-white font-bold' : 'text-textTertiary'}>
                PT
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-colors"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 mt-3 border-t border-white/[0.08] space-y-2">
                <div className="grid grid-cols-2 gap-1.5">
                  {t.nav.links.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                          isActive
                            ? 'bg-white/[0.08] text-white border-[var(--accent-hex)]/40'
                            : 'bg-white/[0.02] text-textSecondary border-white/[0.05] hover:text-white'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-[var(--accent-hex)]">
                          {link.index}
                        </span>
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Quick Theme Bar + Resume in Mobile Menu */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-textTertiary uppercase mr-1">
                      Theme:
                    </span>
                    {themes.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAccent(item.id)}
                        aria-label={item.label}
                        className={`h-5 w-5 rounded-full border transition-transform ${
                          accent === item.id
                            ? 'scale-110 border-white'
                            : 'border-white/20 opacity-60'
                        }`}
                        style={{ backgroundColor: item.color }}
                      />
                    ))}
                  </div>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent-hex)]/15 border border-[var(--accent-hex)]/40 text-xs font-mono text-white"
                  >
                    <FileText className="w-3.5 h-3.5 text-[var(--accent-hex)]" />
                    <span>{t.hero.resume}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;

