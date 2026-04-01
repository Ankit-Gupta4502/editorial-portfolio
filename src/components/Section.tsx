import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title: string;
  id: string;
  className?: string;
}

export default function Section({ 
  children, 
  title, 
  id, 
  className
}: SectionProps) {
  return (
    <section id={id} className={`pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col relative overflow-hidden snap-start ${className}`}>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-baseline gap-4 border-b border-neutral-200 pb-8"
        >
          <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
            {id.padStart(2, '0')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 uppercase italic font-serif">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
