import { useRef, useEffect, RefObject } from "react";
import { useMotionValue, useSpring, MotionValue, SpringOptions } from "motion/react";

export interface FlipBookScrollOptions {
  snapPoints: number[];
  isMobile: boolean;
  springOptions?: SpringOptions;
  scrollSensitivity?: number;
  resistanceThreshold?: number;
  resistanceFactor?: number;
  snapDelay?: number;
}

export interface FlipBookScrollResult {
  scrollProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  sectionRefs: RefObject<HTMLDivElement | null>[];
  scrollToSection: (progress: number) => void;
}

export function useFlipBookScroll({
  snapPoints,
  isMobile,
  springOptions = { stiffness: 90, damping: 35, restDelta: 0.001 },
  scrollSensitivity = 0.0004,
  resistanceThreshold = 0.05,
  resistanceFactor = 0.4,
  snapDelay = 150
}: FlipBookScrollOptions): FlipBookScrollResult {
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, springOptions);

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];

  useEffect(() => {
    if (isMobile) return;

    let snapTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      clearTimeout(snapTimeout);
      
      const current = scrollProgress.get();
      
      // Find the nearest snap point
      const nearestSnap = snapPoints.reduce((prev, curr) => 
        Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
      );

      // "Sticky" threshold: if we are very close to a snap point, we stay locked to it
      // unless we are at the top/bottom of the internal scroll.
      const isCloseToSnap = Math.abs(current - nearestSnap) < 0.01;

      if (isCloseToSnap) {
        const activeIndex = snapPoints.indexOf(nearestSnap);
        
        // Reset all other sections to top when we are locked to one
        sectionRefs.forEach((ref, idx) => {
          if (idx !== activeIndex && ref.current && ref.current.scrollTop !== 0) {
            ref.current.scrollTop = 0;
          }
        });

        const activeSection = sectionRefs[activeIndex].current;

        if (activeSection) {
          const isAtTop = activeSection.scrollTop <= 5;
          const isAtBottom = activeSection.scrollTop + activeSection.clientHeight >= activeSection.scrollHeight - 10;
          const isScrollable = activeSection.scrollHeight > activeSection.clientHeight + 10;

          if (isScrollable) {
            // If scrolling down and not at bottom, scroll internally and FORCE snap
            if (e.deltaY > 0 && !isAtBottom) {
              activeSection.scrollTop += e.deltaY;
              scrollProgress.set(nearestSnap); 
              return;
            }
            // If scrolling up and not at top, scroll internally and FORCE snap
            if (e.deltaY < 0 && !isAtTop) {
              activeSection.scrollTop += e.deltaY;
              scrollProgress.set(nearestSnap);
              return;
            }
          }
        }
      }
      
      // Progress the global flip-book animation with resistance at snap points
      let resistance = 1;
      if (Math.abs(current - nearestSnap) < resistanceThreshold) {
        resistance = resistanceFactor;
      }
      
      const next = current + (e.deltaY * scrollSensitivity * resistance);
      const clampedNext = Math.min(Math.max(next, 0), Math.max(...snapPoints));
      scrollProgress.set(clampedNext);

      // Aggressive snapping: after a short delay, snap to the nearest point
      snapTimeout = setTimeout(() => {
        const finalCurrent = scrollProgress.get();
        const finalNearest = snapPoints.reduce((prev, curr) => 
          Math.abs(curr - finalCurrent) < Math.abs(prev - finalCurrent) ? curr : prev
        );
        scrollProgress.set(finalNearest);
      }, snapDelay);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(snapTimeout);
    };
  }, [isMobile, scrollProgress, snapPoints, scrollSensitivity, resistanceThreshold, resistanceFactor, snapDelay]);

  const scrollToSection = (progress: number) => {
    if (isMobile) return;
    sectionRefs.forEach(ref => {
      if (ref.current) ref.current.scrollTop = 0;
    });
    scrollProgress.set(progress);
  };

  return {
    scrollProgress,
    smoothProgress,
    sectionRefs,
    scrollToSection
  };
}
