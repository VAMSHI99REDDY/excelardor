"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

type CategoryCard = {
  title: string;
  img: string;
};

const CATEGORY_CARDS: CategoryCard[] = [
  {
    title: "INDUSTRIAL HYDRAULICS & SPM",
    img: "/AllProjects/Industrial Hydraulics & SPM.png",
  },
  {
    title: "FRP & CARBON FIBRE",
    img: "/AllProjects/FRP and Carbon Fibre.png",
  },
  {
    title: "RADAR & EO/IR SYSTEMS",
    img: "/AllProjects/Telescopic Mast/5m_telescopic_mast_app_3.png",
  },
  {
    title: "AEROSPACE & DEFENCE COMPONENTS",
    img: "/AllProjects/Aerospace and Defence Components.png",
  },
  {
    title: "Telescopic Mast",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Screw Drive Mast) 1.png",
  },
];

const ProjectCardItem = ({ 
  card, 
  idx, 
  isActive, 
  hasActive, 
  isMobile,
  onHover,
  onLeave
}: { 
  card: CategoryCard; 
  idx: number; 
  isActive: boolean; 
  hasActive: boolean; 
  isMobile: boolean;
  onHover: (idx: number) => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // For mobile intersection observer
  useEffect(() => {
    if (!isMobile) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onHover(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // Trigger in the middle 20% of the screen
        threshold: 0
      }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [isMobile, idx, onHover]);

  // Framer motion easing
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const duration = 0.65;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => !isMobile && onHover(idx)}
      onMouseLeave={() => !isMobile && onLeave()}
      animate={
        isMobile
          ? {
              height: isActive ? "340px" : (hasActive ? "160px" : "200px"),
              width: "100%"
            }
          : {
              width: isActive ? "34%" : (hasActive ? "16.5%" : "20%"),
              height: "100%"
            }
      }
      transition={{ duration, ease }}
      className={`relative overflow-hidden flex flex-col justify-end cursor-default ${isActive ? 'z-20' : 'z-10'}`}
      style={{
        borderRight: idx !== CATEGORY_CARDS.length - 1 && !isMobile ? '1px solid rgba(0,0,0,0.2)' : 'none',
        borderBottom: idx !== CATEGORY_CARDS.length - 1 && isMobile ? '1px solid rgba(0,0,0,0.2)' : 'none',
      }}
    >
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isActive ? 1.08 : 1,
          filter: isActive 
            ? "brightness(1.1) grayscale(0%) saturate(1.1)" 
            : "brightness(0.9) grayscale(8%) saturate(1)",
        }}
        transition={{ duration, ease }}
      >
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Floating shadow behind expanded card (desktop only) */}
      {!isMobile && isActive && (
        <div className="absolute inset-0 shadow-[0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
      )}

      {/* Subtle dark gradient overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isActive 
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" 
            : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)"
        }}
        transition={{ duration, ease }}
      />

      {/* Thin blue accent line on the left edge */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
      />

      {/* Label / Button */}
      <motion.div
        animate={{
          y: isActive ? -24 : -10, // Slides upward when active
        }}
        transition={{ duration, ease }}
        className="relative z-30 w-full px-4 flex justify-center pointer-events-none"
      >
        <div className="relative group">
          {/* Soft blue glow behind the label */}
          <motion.div
            className="absolute -inset-2 bg-blue-600/40 rounded-full blur-xl pointer-events-none"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration, ease }}
          />
          <div className="relative bg-blue-900/90 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 text-center flex items-center justify-center shadow-lg">
            <span className="text-white text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase drop-shadow-sm leading-none whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-none">
              {card.title}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 relative overflow-hidden bg-[#F9F9F9] text-black"
    >
      {/* Background gradients and lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-100/40 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[50%] rounded-full bg-blue-50/50 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 mb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[2.2rem] md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-balance text-black"
          >
            Mission-Critical <br />
            <span className="text-blue-600 italic font-extralight tracking-tighter">Engineering</span>
          </motion.h2>
        </div>
      </div>

      {/* Premium Accordion Container */}
      <div className="w-full relative z-10 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
        <div className={`flex ${isMobile ? 'flex-col h-[1000px]' : 'flex-row h-[560px] lg:h-[650px]'} w-full rounded-3xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl`}>
          {CATEGORY_CARDS.map((card, idx) => (
            <ProjectCardItem
              key={idx}
              card={card}
              idx={idx}
              isActive={hoveredIndex === idx}
              hasActive={hoveredIndex !== null}
              isMobile={isMobile}
              onHover={(i) => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;