import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  ArrowUpRight,
  Phone,
  MapPin,
  Clock,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const EMAIL_ADDRESS = 'michelfixingit@gmail.com';

const Contact = () => {
  const { lang } = useLanguage();
  const t = translations[lang].contact;
  const heroT = translations[lang].hero;

  const [copied, setCopied] = useState(false);
  const [rioTime, setRioTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setRioTime(`${formatted} BRT (UTC-3)`);
      } catch {
        setRioTime('UTC-3 // Rio de Janeiro');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  const resumeFile =
    lang === 'pt'
      ? `${import.meta.env.BASE_URL}resume-pt.pdf`
      : `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <section
      id="contact"
      className="py-28 md:py-36 px-6 md:px-10 relative overflow-hidden bg-secondary/60 border-t border-white/[0.06]"
    >
      {/* Background Architectural Dots & Glow */}
      <div className="absolute inset-0 architectural-dots opacity-35 pointer-events-none" />
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[130px] opacity-15 pointer-events-none"
        style={{ background: 'var(--accent-hex)' }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Top Section Index & Live Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-12 border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {t.sectionIndex}
            </span>
          </div>

          {/* Live Availability Beacon + Rio Clock */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono text-xs text-textSecondary">
                {t.availability}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/80 border border-white/10 font-mono text-xs text-textPrimary">
              <Clock size={13} className="text-accent" />
              <span>{rioTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Monumental Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-14 md:mb-16 max-w-4xl"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-textPrimary tracking-tight leading-[1.05] mb-6">
            {t.heading}
            <span className="text-accent">.</span>
          </h2>
          <p className="text-textSecondary text-lg md:text-2xl leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Interactive Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Primary Direct Email Transmission Card (Spans 7 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 monolith-card glow-border rounded-2xl p-7 md:p-9 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs text-accent uppercase tracking-wider">
                  <Mail size={13} />
                  <span>{lang === 'pt' ? 'Transmissão Direta' : 'Direct Transmission'}</span>
                </span>
                <span className="font-mono text-xs text-textTertiary">
                  PGP / SMTP READY
                </span>
              </div>

              <p className="font-mono text-xs uppercase tracking-widest text-textTertiary mb-2">
                {lang === 'pt' ? 'Caixa de Entrada Principal' : 'Primary Inbox'}
              </p>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="block text-xl sm:text-2xl md:text-3xl font-mono font-bold text-textPrimary hover:text-accent transition-colors break-all mb-8"
              >
                {EMAIL_ADDRESS}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-6 border-t border-white/10">
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-accent text-primary font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
              >
                <Mail size={16} />
                <span>{t.sendEmail}</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 font-mono text-xs uppercase tracking-wider text-textPrimary transition-all"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-accent" />
                    <span className="text-accent">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-textSecondary" />
                    <span>{t.copyEmail}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column Stack: LinkedIn & GitHub (Spans 5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* LinkedIn Card */}
            <motion.a
              href="https://linkedin.com/in/michelthedev"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="monolith-card glow-border rounded-2xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-textPrimary group-hover:border-accent/50 group-hover:text-accent transition-colors">
                  <Linkedin size={20} />
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-textTertiary group-hover:text-accent transition-colors">
                  <span>/in/michelthedev</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-textPrimary group-hover:text-accent transition-colors">
                  LinkedIn
                </h3>
                <p className="text-xs font-mono text-textSecondary mt-1">
                  {lang === 'pt'
                    ? 'Rede Profissional & Histórico de Carreira'
                    : 'Professional Network & Career History'}
                </p>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a
              href="https://github.com/michelgss"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="monolith-card glow-border rounded-2xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-textPrimary group-hover:border-accent/50 group-hover:text-accent transition-colors">
                  <Github size={20} />
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-textTertiary group-hover:text-accent transition-colors">
                  <span>@michelgss</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-textPrimary group-hover:text-accent transition-colors">
                  GitHub
                </h3>
                <p className="text-xs font-mono text-textSecondary mt-1">
                  {lang === 'pt'
                    ? 'Repositórios de Código, Docs-as-Code & OpenAPI'
                    : 'Source Repositories, Docs-as-Code & OpenAPI'}
                </p>
              </div>
            </motion.a>
          </div>

          {/* Bottom Full-Width Strip: Direct Phone, Location & Bilingual Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="lg:col-span-12 monolith-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              {/* Direct Phone */}
              <a
                href="tel:+5521997093040"
                className="flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                  <Phone size={17} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-textTertiary">
                    {lang === 'pt' ? 'Linha Direta / WhatsApp' : 'Direct Line / WhatsApp'}
                  </span>
                  <span className="font-mono text-sm text-textPrimary group-hover:text-accent transition-colors">
                    {t.phone}
                  </span>
                </div>
              </a>

              <div className="hidden sm:block h-8 w-[1px] bg-white/10" />

              {/* Location */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-accent">
                  <MapPin size={17} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-textTertiary">
                    {lang === 'pt' ? 'Base de Operações' : 'Base of Operations'}
                  </span>
                  <span className="font-mono text-sm text-textPrimary">
                    {t.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Resume PDF Button */}
            <div className="w-full md:w-auto flex items-center gap-3">
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 font-mono text-xs text-textPrimary hover:text-accent transition-all"
              >
                <FileText size={15} className="text-accent" />
                <span>
                  {heroT.resume} ({lang.toUpperCase()} PDF)
                </span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Clipboard Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-secondary border border-accent/50 shadow-2xl font-mono text-xs text-textPrimary"
          >
            <Sparkles size={14} className="text-accent" />
            <span>{t.copied}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
