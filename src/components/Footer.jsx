import { motion } from 'framer-motion';
import { ArrowUp, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Footer = () => {
  const { lang, setCommandOpen } = useLanguage();
  const t = translations[lang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-primary border-t border-white/[0.08] pt-14 pb-10 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Top Row: System Status, Command Palette Trigger & Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/[0.06]">
          {/* System Status */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs tracking-wider text-textSecondary uppercase">
              {lang === 'pt'
                ? 'TODOS OS SISTEMAS OPERACIONAIS // DOCS-AS-CODE'
                : 'ALL SYSTEMS OPERATIONAL // DOCS-AS-CODE'}
            </span>
          </div>

          {/* Right Controls: Quick Command Palette & Back to Top */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-textSecondary hover:text-textPrimary transition-colors"
            >
              <Search size={13} className="text-accent" />
              <span>{lang === 'pt' ? 'Pressione' : 'Press'}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/15 text-[10px] text-accent">
                ⌘K
              </kbd>
            </button>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-accent hover:text-primary border border-white/10 font-mono text-xs text-textPrimary transition-colors group"
            >
              <span>{t.backToTop}</span>
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </motion.button>
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-textTertiary font-mono text-xs">{t.built}</p>
          <p className="text-textTertiary font-mono text-xs">
            © 2026 Michel Silveira
          </p>
        </div>

        {/* Subtle Architectural Watermark */}
        <div
          aria-hidden="true"
          className="mt-8 select-none pointer-events-none overflow-hidden text-center"
        >
          <span className="block font-display font-bold uppercase tracking-tighter text-[11vw] leading-none text-white/[0.025]">
            MICHEL SILVEIRA
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
