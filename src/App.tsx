/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useTransform } from "motion/react";
import { useMemo } from "react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useFlipBookScroll } from "./hooks/useFlipBookScroll";

interface SectionConfig {
  id: string;
  progress: number;
  label: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "hero", progress: 0, label: "Hero" },
  { id: "experience", progress: 0.2, label: "Experience" },
  { id: "skills", progress: 0.4, label: "Skills" },
  { id: "projects", progress: 0.6, label: "Projects" },
  { id: "contact", progress: 0.8, label: "Contact" }
];

export default function App() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const snapPoints = useMemo(() => SECTIONS.map(s => s.progress), []);

  const { smoothProgress, sectionRefs, scrollToSection } = useFlipBookScroll({
    snapPoints,
    isMobile,
    springOptions: { stiffness: 90, damping: 35, restDelta: 0.001 }
  });

  // Experience: Slides in between 0 and 0.2
  const experienceX = useTransform(smoothProgress, [0, 0.02, 0.18, 0.2], ["100%", "100%", "0%", "0%"]);
  const experienceRotate = useTransform(smoothProgress, [0, 0.02, 0.18, 0.2], [15, 15, 0, 0]);
  
  // Skills: Slides in between 0.2 and 0.4
  const skillsX = useTransform(smoothProgress, [0.2, 0.22, 0.38, 0.4], ["100%", "100%", "0%", "0%"]);
  const skillsRotate = useTransform(smoothProgress, [0.2, 0.22, 0.38, 0.4], [15, 15, 0, 0]);
  
  // Projects: Slides in between 0.4 and 0.6
  const projectsX = useTransform(smoothProgress, [0.4, 0.42, 0.58, 0.6], ["100%", "100%", "0%", "0%"]);
  const projectsRotate = useTransform(smoothProgress, [0.4, 0.42, 0.58, 0.6], [15, 15, 0, 0]);
  
  // Contact: Slides in between 0.6 and 0.8
  const contactX = useTransform(smoothProgress, [0.6, 0.62, 0.78, 0.8], ["100%", "100%", "0%", "0%"]);
  const contactRotate = useTransform(smoothProgress, [0.6, 0.62, 0.78, 0.8], [15, 15, 0, 0]);

  // Depth effects with plateau to prevent premature fading
  const heroScale = useTransform(smoothProgress, [0, 0.02, 0.18, 0.2], [1, 1, 0.9, 0.9]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.02, 0.18, 0.2], [1, 1, 0.3, 0.3]);
  
  const experienceScale = useTransform(smoothProgress, [0.2, 0.22, 0.38, 0.4], [1, 1, 0.9, 0.9]);
  const experienceOpacity = useTransform(smoothProgress, [0.2, 0.22, 0.38, 0.4], [1, 1, 0.3, 0.3]);

  const skillsScale = useTransform(smoothProgress, [0.4, 0.42, 0.58, 0.6], [1, 1, 0.9, 0.9]);
  const skillsOpacity = useTransform(smoothProgress, [0.4, 0.42, 0.58, 0.6], [1, 1, 0.3, 0.3]);

  const projectsScale = useTransform(smoothProgress, [0.6, 0.62, 0.78, 0.8], [1, 1, 0.9, 0.9]);
  const projectsOpacity = useTransform(smoothProgress, [0.6, 0.62, 0.78, 0.8], [1, 1, 0.3, 0.3]);

  return (
    <div className="bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-hidden h-screen w-full">
      {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-12 lg:px-24 z-[100] bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <button 
          onClick={() => scrollToSection(0)}
          className="text-xl font-bold tracking-tighter uppercase cursor-pointer"
        >
          AG.
        </button>
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
          {SECTIONS.slice(1).map((section) => (
            <button 
              key={section.id}
              onClick={() => scrollToSection(section.progress)}
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {isMobile ? (
        <main className="overflow-y-auto h-full snap-y snap-mandatory scroll-smooth">
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </main>
      ) : (
        <div className="relative h-screen w-full overflow-hidden bg-white perspective-[2000px]">
          {/* Hero Layer */}
          <motion.div 
            ref={sectionRefs[0]}
            style={{ scale: heroScale, opacity: heroOpacity, willChange: "transform, opacity" }}
            className="absolute inset-0 z-10 origin-center overflow-y-auto custom-scrollbar [overflow-anchor:none]"
          >
            <Hero />
          </motion.div>

          {/* Experience Layer */}
          <motion.div 
            ref={sectionRefs[1]}
            style={{ x: experienceX, rotateY: experienceRotate, scale: experienceScale, opacity: experienceOpacity, willChange: "transform, opacity" }}
            className="absolute inset-0 z-20 shadow-[-100px_0_150px_rgba(0,0,0,0.15)] bg-white origin-right overflow-y-auto custom-scrollbar [overflow-anchor:none]"
          >
            <Experience />
          </motion.div>

          {/* Skills Layer */}
          <motion.div 
            ref={sectionRefs[2]}
            style={{ x: skillsX, rotateY: skillsRotate, scale: skillsScale, opacity: skillsOpacity, willChange: "transform, opacity" }}
            className="absolute inset-0 z-30 shadow-[-100px_0_150px_rgba(0,0,0,0.15)] bg-white origin-right overflow-y-auto custom-scrollbar [overflow-anchor:none]"
          >
            <Skills />
          </motion.div>

          {/* Projects Layer */}
          <motion.div 
            ref={sectionRefs[3]}
            style={{ x: projectsX, rotateY: projectsRotate, scale: projectsScale, opacity: projectsOpacity, willChange: "transform, opacity" }}
            className="absolute inset-0 z-40 shadow-[-100px_0_150px_rgba(0,0,0,0.15)] bg-white origin-right overflow-y-auto custom-scrollbar [overflow-anchor:none]"
          >
            <Projects />
          </motion.div>

          {/* Contact & Footer Layer */}
          <motion.div 
            ref={sectionRefs[4]}
            style={{ x: contactX, rotateY: contactRotate, willChange: "transform, opacity" }}
            className="absolute inset-0 z-50 shadow-[-100px_0_150px_rgba(0,0,0,0.15)] bg-white origin-right overflow-y-auto custom-scrollbar [overflow-anchor:none]"
          >
            <Contact />
            <Footer />
          </motion.div>
        </div>
      )}
    </div>
  );
}
