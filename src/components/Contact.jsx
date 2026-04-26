import { motion } from 'framer-motion';
import { Linkedin, Github, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-8 relative overflow-hidden bg-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-textPrimary uppercase mb-6 tracking-tight">Let&apos;s Connect</h2>
          <p className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto mb-16">
            Open to mid and mid-senior Technical Writer opportunities, remote-first.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
          <motion.a
            href="https://linkedin.com/in/michelthedev"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 px-8 py-4 bg-tertiary border border-borderDark hover:border-textPrimary hover:bg-borderDark transition-all w-full md:w-auto group"
          >
            <Linkedin className="text-textSecondary group-hover:text-accent transition-colors" size={20} />
            <span className="font-mono text-textPrimary">LinkedIn</span>
          </motion.a>

          <motion.a
            href="https://github.com/michelgss"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3 px-8 py-4 bg-tertiary border border-borderDark hover:border-textPrimary hover:bg-borderDark transition-all w-full md:w-auto group"
          >
            <Github className="text-textSecondary group-hover:text-accent transition-colors" size={20} />
            <span className="font-mono text-textPrimary">GitHub</span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="mailto:michelfixingit@gmail.com"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-textPrimary text-primary font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 group"
          >
            Send me an email
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;