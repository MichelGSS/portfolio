import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  ArrowUpRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Globe,
  Palette,
  Check,
  Copy,
  BookOpen,
  Layers,
  Code2,
  Cpu,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const CommandPalette = () => {
  const {
    lang,
    toggle,
    accent,
    setAccent,
    commandOpen,
    setCommandOpen,
    themes,
  } = useLanguage();
  const t = translations[lang];

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (commandOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
    }
  }, [commandOpen]);

  const resumeUrl = `${import.meta.env.BASE_URL}${lang === 'pt' ? 'resume-pt.pdf' : 'resume.pdf'}`;

  const sectionIcons = [User, Cpu, Code2, Layers, ShieldCheck, Mail];

  const allItems = useMemo(() => {
    const navItems = t.nav.links.map((link, idx) => {
      const IconComponent = sectionIcons[idx] || Layers;
      return {
        id: `nav-${link.href}`,
        group: t.commandPalette.sections,
        label: `${link.index} // ${link.name}`,
        sub: `Jump to ${link.name}`,
        icon: IconComponent,
        action: () => {
          setCommandOpen(false);
          const el = document.querySelector(link.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        },
      };
    });

    const quickActions = [
      {
        id: 'act-lang',
        group: t.commandPalette.actions,
        label: t.commandPalette.switchLang,
        sub: lang === 'en' ? 'Currently English → Mudar para Português' : 'Atualmente Português → Switch to English',
        icon: Globe,
        action: () => {
          toggle();
          setCommandOpen(false);
        },
      },
      {
        id: 'act-resume',
        group: t.commandPalette.actions,
        label: t.commandPalette.downloadResume,
        sub: lang === 'pt' ? 'resume-pt.pdf' : 'resume.pdf',
        icon: FileText,
        external: true,
        action: () => {
          window.open(resumeUrl, '_blank', 'noopener,noreferrer');
          setCommandOpen(false);
        },
      },
      {
        id: 'act-copy-email',
        group: t.commandPalette.actions,
        label: copiedEmail ? t.contact.copied : t.commandPalette.copyEmail,
        sub: 'michelfixingit@gmail.com',
        icon: copiedEmail ? Check : Copy,
        action: () => {
          navigator.clipboard?.writeText('michelfixingit@gmail.com');
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            setCommandOpen(false);
          }, 700);
        },
      },
      {
        id: 'act-openweather',
        group: t.commandPalette.actions,
        label:
          lang === 'pt'
            ? 'Abrir Portal Docs-as-Code OpenWeather'
            : 'Open Live OpenWeather Docs Portal',
        sub: 'michelgss.github.io/openweather-docs',
        icon: BookOpen,
        external: true,
        action: () => {
          window.open('https://michelgss.github.io/openweather-docs/', '_blank', 'noopener,noreferrer');
          setCommandOpen(false);
        },
      },
      {
        id: 'act-github',
        group: t.commandPalette.actions,
        label: t.commandPalette.openGitHub,
        sub: 'github.com/michelgss',
        icon: Github,
        external: true,
        action: () => {
          window.open('https://github.com/michelgss', '_blank', 'noopener,noreferrer');
          setCommandOpen(false);
        },
      },
      {
        id: 'act-linkedin',
        group: t.commandPalette.actions,
        label: t.commandPalette.openLinkedIn,
        sub: 'linkedin.com/in/michelthedev',
        icon: Linkedin,
        external: true,
        action: () => {
          window.open('https://linkedin.com/in/michelthedev', '_blank', 'noopener,noreferrer');
          setCommandOpen(false);
        },
      },
    ];

    const themeItems = themes.map((th) => ({
      id: `theme-${th.id}`,
      group: t.commandPalette.themes,
      label: th.label,
      sub: accent === th.id ? (lang === 'pt' ? 'Tema Ativo' : 'Active Theme') : th.color,
      color: th.color,
      isTheme: true,
      activeTheme: accent === th.id,
      icon: Palette,
      action: () => {
        setAccent(th.id);
        setCommandOpen(false);
      },
    }));

    return [...navItems, ...quickActions, ...themeItems];
  }, [t, lang, accent, copiedEmail, resumeUrl, setAccent, setCommandOpen, themes, toggle]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!commandOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setCommandOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length ? (prev + 1) % filteredItems.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : 0
        );
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandOpen, filteredItems, selectedIndex, setCommandOpen]);

  // Group filtered items for clean rendering while preserving global index
  const groupedSections = useMemo(() => {
    const groups = [];
    let runningIndex = 0;
    filteredItems.forEach((item) => {
      let groupObj = groups.find((g) => g.title === item.group);
      if (!groupObj) {
        groupObj = { title: item.group, items: [] };
        groups.push(groupObj);
      }
      groupObj.items.push({ ...item, globalIndex: runningIndex });
      runningIndex += 1;
    });
    return groups;
  }, [filteredItems]);

  return (
    <AnimatePresence>
      {commandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[11vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCommandOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Command Center Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative z-10 w-full max-w-xl rounded-2xl monolith-card border border-white/15 overflow-hidden shadow-2xl"
          >
            {/* Top accent line */}
            <div
              className="h-0.5 w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent-hex), transparent)',
              }}
            />

            {/* Search Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-4 h-4 text-[var(--accent-hex)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.commandPalette.placeholder}
                className="w-full bg-transparent text-sm text-white placeholder:text-textTertiary focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setCommandOpen(false)}
                className="flex items-center gap-1 rounded-lg bg-white/[0.05] hover:bg-white/10 px-2 py-1 font-mono text-[10px] text-textSecondary border border-white/10 transition-colors"
              >
                <span>ESC</span>
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2.5 space-y-4">
              {groupedSections.length === 0 ? (
                <div className="py-12 text-center font-mono text-xs text-textTertiary">
                  {lang === 'pt'
                    ? 'Nenhum comando encontrado.'
                    : 'No matching commands or sections found.'}
                </div>
              ) : (
                groupedSections.map((group) => (
                  <div key={group.title} className="space-y-1">
                    <div className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-textTertiary">
                      {group.title}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isSelected = item.globalIndex === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setSelectedIndex(item.globalIndex)}
                          onClick={item.action}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            isSelected
                              ? 'bg-white/[0.09] text-white border border-[var(--accent-hex)]/40 shadow-[0_0_25px_-8px_rgba(var(--accent-rgb),0.4)]'
                              : 'text-textSecondary border border-transparent hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                isSelected
                                  ? 'bg-[var(--accent-hex)]/15 border-[var(--accent-hex)]/50 text-[var(--accent-hex)]'
                                  : 'bg-white/[0.03] border-white/[0.08] text-textSecondary'
                              }`}
                            >
                              {item.isTheme ? (
                                <span
                                  className="h-3.5 w-3.5 rounded-full"
                                  style={{
                                    backgroundColor: item.color,
                                    boxShadow: `0 0 8px ${item.color}`,
                                  }}
                                />
                              ) : (
                                <Icon className="w-4 h-4" />
                              )}
                            </div>
                            <div className="truncate">
                              <div className="text-xs font-medium text-white truncate">
                                {item.label}
                              </div>
                              <div className="text-[11px] font-mono text-textTertiary truncate">
                                {item.sub}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.activeTheme && (
                              <span className="rounded-full bg-[var(--accent-hex)]/20 px-2 py-0.5 font-mono text-[10px] text-[var(--accent-hex)]">
                                Active
                              </span>
                            )}
                            {item.external ? (
                              <ArrowUpRight
                                className={`w-3.5 h-3.5 ${
                                  isSelected ? 'text-[var(--accent-hex)]' : 'text-textTertiary'
                                }`}
                              />
                            ) : (
                              <span
                                className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                                  isSelected
                                    ? 'border-[var(--accent-hex)]/40 text-[var(--accent-hex)] bg-[var(--accent-hex)]/10'
                                    : 'border-white/10 text-textTertiary'
                                }`}
                              >
                                ↵
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer telemetry */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-black/40 font-mono text-[10px] text-textTertiary">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Execute</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--accent-hex)]">
                <Command className="w-3 h-3" />
                <span>DX STUDIO OS</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

