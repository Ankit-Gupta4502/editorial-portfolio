import { motion } from "motion/react";
import { 
  Code2, 
  Wind, 
  FileJson, 
  Binary, 
  FileCode, 
  Atom, 
  Globe, 
  Layers, 
  Server, 
  Database, 
  Cloud, 
  Package, 
  GitBranch,
  LucideIcon
} from "lucide-react";
import portfolioData from "../data/portfolio.json";
import Section from "./Section";

const iconMap: Record<string, LucideIcon> = {
  "HTML/CSS": Code2,
  "Tailwind CSS": Wind,
  "JavaScript": FileJson,
  "DSA": Binary,
  "TypeScript": FileCode,
  "React.js": Atom,
  "Next.js": Globe,
  "Redux": Layers,
  "Node.js": Server,
  "MySQL": Database,
  "Drizzle (ORM)": Cloud,
  "Webpack/Vite Bundler": Package,
  "CI/CD": GitBranch
};

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <Section id="skills" title="Technical Skills">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {skills.map((skill, index) => {
          const Icon = iconMap[skill] || Code2;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative h-32 md:h-40 flex flex-col items-center justify-center gap-4 border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-900 hover:text-white transition-all duration-500"
            >
              <Icon className="w-8 h-8 text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
              <span className="text-base md:text-lg font-medium tracking-tight transition-transform duration-500">
                {skill}
              </span>
              <span className="absolute top-3 left-3 text-[10px] font-mono text-neutral-300 group-hover:text-neutral-500 transition-colors">
                {index.toString().padStart(2, '0')}
              </span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
