import { motion } from "motion/react";
import portfolioData from "../data/portfolio.json";

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="relative min-h-screen h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 bg-[#fdfdfd] text-neutral-900 snap-start">
      {/* Editorial Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Mesh Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Soft Paper-like Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-100/50 via-transparent to-neutral-50/30" />

        {/* Flip-book Edge Shadow (Right side) */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-neutral-300" 
            />
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-neutral-500">
              {personal.role} <span className="text-neutral-200 mx-2">/</span> {personal.location}
            </span>
          </div>
          
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tighter leading-[1.1] mb-12 uppercase relative">
            {personal.name.split(" ").map((word, i) => (
              <span key={i} className="block overflow-visible py-4">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.2 + i * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="block text-neutral-900 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            
            {/* Decorative Layered Shadow (The "Flip-book" feel) */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.05, x: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute -top-6 -left-2 text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tighter leading-[1.1] uppercase select-none pointer-events-none text-neutral-400 blur-[2px]"
            >
              {personal.name}
            </motion.div>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12"
        >
          <div className="md:col-span-7 lg:col-span-6">
            <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 leading-tight font-light tracking-tight max-w-2xl italic font-serif">
              {personal.summary}
            </p>
          </div>
          <div className="md:col-span-5 lg:col-span-6 flex flex-col justify-end items-start md:items-end gap-10">
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
              {Object.entries(personal.links).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-all duration-500 relative group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-100 group-hover:bg-neutral-900 transition-colors" />
                  {key}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-neutral-900 group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
