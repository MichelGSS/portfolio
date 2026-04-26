import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Experience = () => {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

  return (
    <section id="experience" className="py-32 bg-secondary px-8">
      <div className="max-w-[1000px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <h2 className="text-3xl md:text-4xl text-textPrimary uppercase">{t.heading}</h2>
          <div className="h-[1px] bg-borderDark flex-1 ml-4" />
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-borderDark" />

          <div className="space-y-24">
            {t.items.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
                {/* Timeline Dot */}
                <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-borderHover z-10 group-hover:border-accent group-hover:bg-accent transition-colors duration-300 shadow-[0_0_0_4px_rgba(17,17,17,1)]" />

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last'}`}
                >
                  <p className="font-mono text-accent text-sm mb-2">{exp.period}</p>
                  <h3 className="text-xl font-bold text-textPrimary mb-1">{exp.role}</h3>
                  <p className="text-textSecondary font-medium mb-1">{exp.company}</p>
                  <p className="text-textTertiary text-sm mb-6">{exp.location}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-[45%] bg-primary p-6 border border-borderDark glow-border group-hover:border-borderHover transition-colors ${index % 2 === 0 ? 'md:order-last' : 'md:text-left'}`}
                >
                  <ul className="space-y-3 text-textSecondary text-sm leading-relaxed">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mt-[0.35rem] text-[0.6rem]">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
