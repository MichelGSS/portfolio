import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const certsBase = [
  {
    title: "CS50x: Introduction to Computer Science",
    institution: "Harvard University",
    link: "https://courses.edx.org/certificates/58c2807f5f3a4c19acf91e4f57e10b98",
    icon: <GraduationCap className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}CS50 Introduction to Computer Science.png`,
  },
  {
    title: "Introduction to Web Accessibility",
    institution: "W3C (via edX)",
    link: "https://courses.edx.org/certificates/a8d308adbe134d7e96194bcbc25f6752",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Introduction to Web Accessibility.png`,
  },
  {
    title: "EF SET English Certificate - C1 Advanced",
    institution: "EF SET",
    detail: "Score: 68/100",
    link: "https://cert.efset.org/pt/uku3aZ",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}English certificate EFSET.png`,
  },
  {
    title: "Programming for Everybody (Python)",
    institution: "University of Michigan",
    link: "https://coursera.org/verify/1SPRGA9HR9XL",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Programming for everybody.png`,
  },
  {
    title: "Introduction to HTML5",
    institution: "University of Michigan",
    link: "https://coursera.org/verify/XRPQO88MCR75",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Introduction to HTML5.png`,
  },
  {
    title: "Technical Support Fundamentals",
    institution: "Google",
    link: "https://coursera.org/verify/69OA5U25C48H",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Technical support fundamentals.png`,
  },
  {
    title: "Google IT Support Professional Certificate",
    institution: "Google",
    detail: "6-course program",
    link: "https://coursera.org/verify/professional-cert/66TS8BMCSPKM",
    icon: <GraduationCap className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Google IT Support.png`,
  },
  {
    title: "Introduction to Javascript: The Basics",
    institution: "Coursera",
    link: "https://coursera.org/verify/FPAGJD7GWNSS",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Introduction to javascript.png`,
  },
  {
    title: "Principles of Agile Development",
    institution: "Instituto Tecnológico de Aeronáutica - ITA",
    link: "https://coursera.org/verify/MZJVWQVI9ESE",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Principles of Agile Development.png`,
  },
  {
    title: "Good with Words: Writing and Editing",
    institution: "University of Michigan",
    link: "https://www.coursera.org/account/accomplishments/specialization/L0BTXW0E195N",
    icon: <Award className="text-textTertiary mb-4" size={28} />,
    image: `${import.meta.env.BASE_URL}Good with words - writing and editing.jpg`,
  },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const { lang } = useLanguage();
  const t = translations[lang].certifications;
  const certs = certsBase.map((cert, i) => ({ ...cert, description: t.descriptions[i] }));

  return (
    <section id="certifications" className="py-32 px-8">
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

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-secondary p-6 border border-borderDark hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)] transition-all duration-300 flex flex-col h-full group cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                {cert.icon}
                <div className="p-2 bg-tertiary rounded-full opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                  <ExternalLink size={16} />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-textPrimary mb-4 leading-tight flex-1 group-hover:text-accent transition-colors">
                {cert.title}
              </h3>

              <div className="mt-auto pt-4 border-t border-borderDark/50">
                <p className="text-textSecondary text-xs uppercase tracking-wider truncate">{cert.institution}</p>
                {cert.detail && (
                  <p className="text-[10px] font-mono text-textTertiary mt-1">{cert.detail}</p>
                )}
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mt-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  {t.viewDetails} →
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Progress Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-tertiary border border-borderDark p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto text-center sm:text-left glow-border"
        >
          <div>
            <h3 className="text-lg font-bold text-textPrimary">{t.degreeTitle}</h3>
            <p className="text-textSecondary text-sm">{t.degreeInstitution}</p>
          </div>
          <div className="font-mono text-accent bg-primary px-3 py-1 border border-borderDark text-sm">
            {t.degreeStatus}
          </div>
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-default"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary border border-borderDark w-[95vw] md:w-[90vw] lg:w-[75vw] p-8 md:p-12 relative flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-textTertiary hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>

              {/* Left Side: Certificate Image & Link */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="w-full aspect-[4/3] bg-tertiary border border-borderDark flex items-center justify-center overflow-hidden relative group">
                  {selectedCert.image ? (
                    <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="font-mono text-textTertiary uppercase tracking-widest">{t.certFallback}</span>
                  )}
                </div>

                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-mono text-sm hover:underline"
                >
                  <ExternalLink size={16} /> {t.viewCert}
                </a>
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-textPrimary mb-2 uppercase tracking-tight">
                  {selectedCert.title}
                </h3>
                <p className="text-textSecondary font-mono text-sm mb-6">
                  {selectedCert.institution}
                </p>

                <div className="w-8 h-[1px] bg-accent mb-6" />

                <p className="text-textSecondary leading-relaxed text-base">
                  {selectedCert.description}
                </p>

                {selectedCert.detail && (
                  <p className="mt-6 font-mono text-sm text-textTertiary">
                    {selectedCert.detail}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
