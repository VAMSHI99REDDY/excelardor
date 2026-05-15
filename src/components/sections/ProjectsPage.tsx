// Updated ProjectsPage with responsive horizontal carousel and smooth resume
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation, useMotionValue, animate } from "framer-motion";
import { Grid3X3, LayoutGrid, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/data/projectsData";
import ProjectCard from "@/components/ui/ProjectCard";
import CategoryFilter from "@/components/ui/CategoryFilter";
import Footer from "@/components/layout/Footer";

import type { Project } from "@/data/projectsData";

const CategoryRow = ({ title, projects }: { title: string, projects: Project[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (projects.length === 0) return null;

  // Guarantee enough items to span ultra-wide screens twice.
  const copiesNeeded = Math.max(4, Math.ceil(15 / projects.length));
  const repeated = Array(copiesNeeded).fill(projects).flat();
  const doubled = [...repeated, ...repeated];

  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Sub-pixel smooth auto-scroll loop
  useEffect(() => {
    let frameId: number;
    // Mid speed: 1.0 on desktop (60px/s), 0.7 on mobile (42px/s)
    const speed = window.innerWidth < 768 ? 0.7 : 1.0;

    const step = () => {
      if (trackRef.current && !isPaused) {
        // We use scrollWidth / 2 because the items are perfectly duplicated
        const trackWidth = trackRef.current.scrollWidth / 2;
        let currentX = x.get() - speed;

        // Seamless infinite loop reset
        if (Math.abs(currentX) >= trackWidth) {
          currentX = 0;
        }
        x.set(currentX);
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, x]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    const amount = window.innerWidth > 768 ? 400 : 280;
    const trackWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 10000;

    let targetX = x.get() + (direction === 'left' ? amount : -amount);

    // Simple clamping to prevent scrolling past the duplicated ends
    if (targetX > 0) targetX = -trackWidth + amount;
    if (targetX < -trackWidth) targetX = 0;

    animate(x, targetX, { type: 'spring', stiffness: 150, damping: 25 });

    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 5000);
  };

  const handleDragStart = () => {
    setIsPaused(true);
  };

  const handleDragEnd = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div className="w-full flex flex-col mb-8 md:mb-16 relative overflow-hidden group/row">
      <div className="flex items-end justify-between px-4 md:px-12 mb-6 md:mb-8 relative z-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black">{title}</h2>
          <p className="text-black/40 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-2">{projects.length} PROJECTS</p>
        </div>
      </div>

      {/* Floating Arrows */}
      <button
        onClick={() => handleManualScroll('left')}
        className="absolute left-2 md:left-6 top-[55%] -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white rounded-full p-3 md:p-4 shadow-xl transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover/row:opacity-100 flex items-center justify-center"
        aria-label="Scroll backward"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        onClick={() => handleManualScroll('right')}
        className="absolute right-2 md:right-6 top-[55%] -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white rounded-full p-3 md:p-4 shadow-xl transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover/row:opacity-100 flex items-center justify-center"
        aria-label="Scroll forward"
      >
        <ArrowRight size={20} />
      </button>

      {/* Auto-scroll Framer Motion Container */}
      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="flex gap-4 md:gap-8 px-4 md:px-12 pb-8 w-max cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {doubled.map((project, i) => (
            <div key={`${project.id}-${i}`} className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 pt-2 pb-6">
              <ProjectCard project={project} index={0} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Show All");
  const [compact, setCompact] = useState(false);

  // Category counts
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    PROJECTS.forEach(p => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, []);

  // Filtered list
  const filtered = useMemo(() => {
    if (activeCategory === "Show All") return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 150;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  return (
    <main className="min-h-screen text-black font-sans relative bg-[#E9E5DF]">
      <div className="relative z-20 bg-white min-h-screen flex flex-col pt-20 md:pt-24">
        {/* Compact Filter Section */}
        <section className="py-4 md:py-6 bg-white border-b border-black/5">
          <div className="container mx-auto px-4 md:px-12 flex flex-col items-center gap-4">
            <div className="w-full flex justify-center">
              <CategoryFilter active={activeCategory} onChange={setActiveCategory} counts={counts} />
            </div>
            <div className="flex w-full items-center justify-between pt-2">
              <button onClick={() => setCompact(!compact)} className="flex items-center gap-2 text-black/40 hover:text-black p-2 -ml-2 rounded-lg cursor-pointer active:scale-95 transition-all">
                {compact ? <Grid3X3 size={12} /> : <LayoutGrid size={12} />}
                <span className="text-[8px] font-bold uppercase tracking-widest">{compact ? "Compact" : "Grid"}</span>
              </button>
              <div className="flex items-center gap-4">
                <button className="text-black/40 hover:text-black">
                  <Search size={16} />
                </button>
                <span className="text-[10px] text-black/30 shrink-0 font-bold uppercase tracking-tight">
                  {filtered.length} Items
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Rows */}
        <section className="py-6 md:py-10">
          {activeCategory === "Show All" ? (
            <div className="flex flex-col pt-4">
              <CategoryRow title="3D Modeling of Products" projects={PROJECTS.filter(p => p.category === "3D Modeling of Products")} />
              <CategoryRow title="Industrial Hydraulics & SPM" projects={PROJECTS.filter(p => p.category === "Industrial Hydraulics & SPM")} />
              <CategoryRow title="Telescopic Mast" projects={PROJECTS.filter(p => p.category === "Telescopic Mast")} />
              <CategoryRow title="Aerospace and Defence Components" projects={PROJECTS.filter(p => p.category === "Aerospace and Defence Components")} />
            </div>
          ) : (
            <div className="pt-4">
              <CategoryRow title={activeCategory} projects={filtered} />
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default ProjectsPage;
