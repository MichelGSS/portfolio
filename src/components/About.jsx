import { motion } from 'framer-motion';

const About = () => {
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
          <h2 className="text-3xl md:text-4xl text-textPrimary uppercase">About</h2>
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
              Technical Writer who codes. <strong className="text-textPrimary font-medium">I design documentation that developers actually want to read</strong>, built to be clear, accurate, and validated against the real system.
            </p>
            <p>
              With 5+ years of experience in the IT industry, I bridge Engineering, Product, and end-users, producing API references, developer guides, integration tutorials, user manuals, and UX copy. My Full Stack background (MERN) means I can read the source, run the endpoints, and ship docs that match what the software truly does, not just what the spec claims.
            </p>
            <p>
              I structure my documentation following the <strong>Diátaxis framework</strong>, ensuring every piece of content—from tutorials to reference material—serves a specific user need. I also maintain strict clarity, consistency, and a user-centric tone by adhering to the <strong>Microsoft Writing Style Guide</strong>.
            </p>
            <p>
              Before specializing in Technical Writing, I spent several years in IT infrastructure and support, which gave me a hands-on grasp of the full SDLC and a habit of writing procedures people can follow under pressure.
            </p>
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
              <p className="text-textTertiary text-sm uppercase tracking-wider">Years in IT</p>
            </div>
            <div className="p-6 bg-tertiary border border-borderDark glow-border hover:border-borderHover transition-colors">
              <h3 className="font-mono text-accent text-3xl font-bold mb-1">C1</h3>
              <p className="text-textTertiary text-sm uppercase tracking-wider">English (EF SET)</p>
            </div>
            <div className="p-6 bg-tertiary border border-borderDark glow-border hover:border-borderHover transition-colors">
              <h3 className="font-mono text-accent text-3xl font-bold mb-1">MERN</h3>
              <p className="text-textTertiary text-sm uppercase tracking-wider">Full Stack Background</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;