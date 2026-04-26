import { motion } from 'framer-motion';
import { BookOpen, FileJson, GitCommit, MonitorPlay, Globe } from 'lucide-react';

const skillCategories = [
  {
    title: "Doc Platforms",
    icon: <MonitorPlay size={18} />,
    skills: ["Docusaurus", "Redocly", "OpenAPI/Swagger", "Postman"]
  },
  {
    title: "Documentation",
    icon: <BookOpen size={18} />,
    skills: ["Technical Writing", "Diátaxis Framework", "Microsoft Style Guide", "API Docs (REST)", "Docs-as-Code", "Information Architecture", "UX Writing", "Knowledge Base", "Developer Experience (DX)"]
  },
  {
    title: "Tools & Workflow",
    icon: <GitCommit size={18} />,
    skills: ["Markdown", "Git/GitHub", "JIRA", "Agile (Scrum/Kanban)", "SDLC"]
  },
  {
    title: "Technical Stack",
    icon: <FileJson size={18} />,
    skills: ["JavaScript", "Node.js", "React", "Tailwind CSS", "Vite", "Framer Motion", "MongoDB", "Express", "HTML5", "Python", "JSON", "WCAG/WAI-ARIA"]
  },
  {
    title: "Languages",
    icon: <Globe size={18} />,
    skills: ["Portuguese - Native", "English - C1 Advanced (EF SET)"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-[1px] bg-borderDark flex-1 mr-4 hidden md:block" />
          <h2 className="text-3xl md:text-4xl text-textPrimary uppercase">Skills & Tools</h2>
          <div className="h-[1px] bg-borderDark flex-1 ml-4" />
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-mono text-textTertiary uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                {category.icon} {category.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="px-4 py-2 bg-tertiary border border-borderDark text-textSecondary font-mono text-sm glow-border hover:border-textPrimary hover:text-textPrimary transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    style={{ perspective: 1000 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;