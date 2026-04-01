import { motion } from "motion/react";
import portfolioData from "../data/portfolio.json";
import Section from "./Section";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <Section id="experience" title="Professional Experience">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-32">
            <p className="text-neutral-500 text-lg leading-relaxed">
              A timeline of my professional journey, focusing on building high-performance frontend systems and AI-driven platforms.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8 flex flex-col gap-24">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group/item"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 gap-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
                  {exp.role}
                </h3>
                <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-2">
                <span className="text-lg font-medium text-neutral-500 italic font-serif">
                  {exp.company}
                </span>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  {exp.location}
                </span>
              </div>
              <ul className="space-y-4">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-4 leading-relaxed">
                    <span className="text-neutral-300 font-mono text-xs mt-1.5">/0{i + 1}</span>
                    <p className="text-neutral-600">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
