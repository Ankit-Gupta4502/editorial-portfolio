import { motion } from "motion/react";
import portfolioData from "../data/portfolio.json";
import Section from "./Section";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative aspect-video bg-neutral-100 mb-8 overflow-hidden block"
            >
              <div className="absolute inset-0 flex items-center justify-center text-neutral-300 font-serif italic text-4xl group-hover:scale-110 transition-transform duration-500">
                {project.title}
              </div>
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-500" />
            </a>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-4">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/title flex items-center gap-3"
                >
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase group-hover/title:text-neutral-500 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-neutral-300 group-hover/title:text-neutral-900 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                    </svg>
                  </span>
                </a>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[9px] md:text-[10px] font-mono text-neutral-400 uppercase tracking-widest border border-neutral-200 px-2 py-0.5 whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed text-lg italic font-serif">
                {project.description}
              </p>
              <ul className="space-y-2 mt-4">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-4 text-sm text-neutral-500 leading-relaxed">
                    <span className="text-neutral-300 font-mono text-[10px] mt-1">/0{i + 1}</span>
                    <p>{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
