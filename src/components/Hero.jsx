import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const fullText = t.hero.typingText;

  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setText('');
    setIsTyping(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-8 text-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl z-10 flex flex-col items-center"
      >
        <motion.p variants={itemVariants} className="font-mono text-textSecondary mb-4">
          {t.hero.greeting}
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl mb-6 text-shadow-glow">
          MICHEL SILVEIRA
        </motion.h1>

        <motion.div variants={itemVariants} className="h-8 md:h-10 mb-8 flex items-center justify-center">
          <p className="font-mono text-xl md:text-2xl text-accent">
            {text}
            <span className={`inline-block w-3 h-6 bg-accent ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
          </p>
        </motion.div>

        {!isTyping && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>
        )}

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mt-4">
          <a href="#about" className="group relative px-8 py-4 bg-textPrimary text-primary font-medium hover:bg-white transition-colors flex items-center gap-2">
            {t.hero.viewWork} <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a href="#contact" className="px-8 py-4 border border-borderDark text-textPrimary hover:border-textPrimary transition-colors">
            {t.hero.getInTouch}
          </a>
          <a href="resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-borderDark text-textPrimary hover:border-textPrimary transition-colors flex items-center gap-2 group">
            {t.hero.resume} <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 animate-bounce text-textTertiary"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
