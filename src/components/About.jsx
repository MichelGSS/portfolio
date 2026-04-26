import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const About = () => {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-32 bg-secondary px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl text-textPrimary uppercase">{t.heading}</h2>
          <div className="h-[1px] bg-borderDark flex-1 ml-4" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 space-y-6 text-textSecondary text-lg leading-relaxed"
          >
            <p>
              {t.p1Pre}<strong className="text-textPrimary font-medium">{t.p1Bold}</strong>{t.p1Post}
            </p>
            <p>{t.p2}</p>
            <p>
              {t.p3Pre}<strong>{t.p3Bold1}</strong>{t.p3Mid}<strong>{t.p3Bold2}</strong>{t.p3Post}
            </p>
            <p>{t.p4}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5 flex flex-col gap-6 justify-center"
          >
            <div className="p-6 bg-tertiary border border-borderDark glow-border hover:border-borderHover transition-colors">
              <h3 className="font-mono text-accent text-3xl font-bold mb-1">5+</h3>
              <p className="text-textTertiary text-sm uppercase tracking-wider">{t.yearsLabel}</p>
            </div>
            <div className="p-6 bg-tertiary border border-borderDark glow-border hover:border-borderHover transition-colors">
              <h3 className="font-mono text-accent text-3xl font-bold mb-1">C1</h3>
              <p className="text-textTertiary text-sm uppercase tracking-wider">{t.englishLabel}</p>
            </div>
            <div className="p-6 bg-tertiary border border-borderDark glow-border hover:border-borderHover transition-colors">
              <h3 className="font-mono text-accent text-3xl font-bold mb-1">MERN</h3>
              <p className="text-textTertiary text-sm uppercase tracking-wider">{t.fullStackLabel}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
