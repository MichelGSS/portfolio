import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Samples = () => {
  const { lang } = useLanguage();
  const t = translations[lang].samples;

  return (
    <section id="samples" className="py-32 px-8 bg-secondary">
      <div className="max-w-[1200px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-[1px] bg-borderDark flex-1 mr-4 hidden md:block" />
          <h2 className="text-3xl md:text-4xl text-textPrimary uppercase">{t.heading}</h2>
          <div className="h-[1px] bg-borderDark flex-1 ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {t.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-primary border border-borderDark hover:border-accent/50 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.08)] transition-all duration-300 p-8 md:p-10 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 bg-tertiary border border-borderDark shrink-0">
                  <BookOpen className="text-accent" size={28} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-textPrimary group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 bg-textPrimary text-primary font-medium text-sm hover:bg-white transition-colors group/link shrink-0"
                    >
                      {t.viewProject} <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  <div className="w-8 h-[1px] bg-accent mb-4" />

                  <p className="text-textSecondary leading-relaxed text-base max-w-3xl">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Samples;
