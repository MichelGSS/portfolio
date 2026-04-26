import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggle } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 flex justify-between items-center">
        <a href="#" className="font-mono text-xl font-bold tracking-tighter text-textPrimary hover:text-accent transition-colors">
          MICHEL SILVEIRA
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-textSecondary hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
          <button
            onClick={toggle}
            className="font-mono text-xs text-textSecondary hover:text-accent transition-colors border border-borderDark hover:border-textPrimary px-2 py-1"
            aria-label="Toggle language"
          >
            <span className={lang === 'en' ? 'text-accent' : ''}>EN</span>
            <span className="mx-1 text-textTertiary">|</span>
            <span className={lang === 'pt' ? 'text-accent' : ''}>PT</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-textPrimary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-secondary border-b border-borderDark flex flex-col items-center py-6 gap-6"
          >
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-textPrimary hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { toggle(); setMobileMenuOpen(false); }}
              className="font-mono text-sm text-textSecondary hover:text-accent transition-colors border border-borderDark px-3 py-1"
            >
              <span className={lang === 'en' ? 'text-accent' : ''}>EN</span>
              <span className="mx-1 text-textTertiary">|</span>
              <span className={lang === 'pt' ? 'text-accent' : ''}>PT</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
