import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const ACCENT_THEMES = [
  { id: 'emerald', label: 'Emerald DX', color: '#10B981' },
  { id: 'cyan', label: 'Vercel Cyan', color: '#06B6D4' },
  { id: 'violet', label: 'Linear Violet', color: '#8B5CF6' },
  { id: 'amber', label: 'Terminal Amber', color: '#F59E0B' },
  { id: 'mono', label: 'Pure Monochrome', color: '#FFFFFF' },
];

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [accent, setAccent] = useState('emerald');
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', accent);
  }, [accent]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggle = () => setLang((l) => (l === 'en' ? 'pt' : 'en'));

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggle,
        accent,
        setAccent,
        commandOpen,
        setCommandOpen,
        themes: ACCENT_THEMES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
