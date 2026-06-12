"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

type CategoryCard = {
  title: string;
  img: string;
};

const CATEGORY_CARDS: CategoryCard[] = [
  {
    title: "SURVEILLANCE SYSTEMS",
    img: "/AllProjects/Telescopic Mast/5m_telescopic_mast_app_1.png",
  },
  {
    title: "MILITARY APPLICATIONS",
    img: "/AllProjects/Telescopic Mast/5m_telescopic_mast_app_2.png",
  },
  {
    title: "RADAR & EO/IR SYSTEMS",
    img: "/AllProjects/Telescopic Mast/5m_telescopic_mast_app_3.png",
  },
  {
    title: "COMMUNICATION SYSTEMS",
    img: "/AllProjects/Telescopic Mast/5m_telescopic_mast_app_4.png",
  },
  {
    title: "Electromechanical Mast (Screw Drive Mast)",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Screw Drive Mast) 1.png",
  },
  {
    title: "Electromechanical Mast (Rope Drive Mast)",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Rope Drive Mast) 3.png",
  },
];

const ProjectCardItem = ({ card, idx, isMobile }: { card: CategoryCard; idx: number; isMobile: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger animation when the card reaches the middle 30% of the screen vertically
  const isInView = useInView(ref, { margin: "-35% 0px -35% 0px", once: false });

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full">
      <motion.div
        initial={{ opacity: 0, y: 40, height: "100%" }}
        whileInView={isMobile ? undefined : { opacity: 1, y: 0, height: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: isMobile ? 0 : idx * 0.1, ease: "easeOut" }}
        animate={
          isMobile
            ? {
                opacity: 1,
                y: 0,
                height: isInView ? "145%" : "100%",
                zIndex: isInView ? 30 : 10,
                boxShadow: isInView
                  ? "0 25px 50px -12px rgba(0,0,0,0.25)"
                  : "0 4px 6px -1px rgba(0,0,0,0.1)",
              }
            : { height: "100%", zIndex: 10 }
        }
        whileHover={
          !isMobile
            ? {
                height: "145%",
                zIndex: 30,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }
            : undefined
        }
        className="group absolute bottom-0 left-0 right-0 overflow-hidden rounded-2xl bg-white border border-black/5 shadow-md flex flex-col origin-bottom cursor-default"
      >
        {/* Image Container */}
        <div className="w-full h-full overflow-hidden relative flex flex-col">
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full object-cover object-top transition-transform duration-500"
          />

          {/* Subtle dark gradient overlay over the whole image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Clean, perfectly aligned centered blue overlay badge that fits text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center flex items-center justify-center z-10 pointer-events-none w-[90%] max-w-[320px]">
            <span className="text-white text-[10px] md:text-xs font-bold tracking-wider uppercase drop-shadow-sm leading-snug text-center">
              {card.title}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="projects"
      className="py-8 md:py-12 relative overflow-hidden bg-[#F9F9F9] text-black"
    >
      {/* Decorative subtle background gradients for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 mb-10 relative z-10">
        <div className="max-w-4xl">
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

      {/* Grid container */}
      <div className="w-full relative z-10 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto mb-16 md:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8 md:gap-10">
          {CATEGORY_CARDS.map((card, idx) => (
            <ProjectCardItem key={idx} card={card} idx={idx} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;