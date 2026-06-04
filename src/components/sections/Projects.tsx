"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ZoomIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/data/projectsData";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { Project } from "@/data/projectsData";

const Projects = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isInView = useInView(containerRef, { amount: 0.05 });

  // Combine all relevant project data into one unified dataset
  const projects = PROJECTS.filter(p =>
    ["Telescopic Mast", "Industrial Hydraulics & SPM", "Aerospace and Defence Components", "3D Modeling of Products"].includes(p.category)
  );
  const repeated = [...projects, ...projects, ...projects, ...projects];
  const doubled = [...repeated, ...repeated];

  // Calculate track width for drag constraints & loop boundaries to avoid layout thrashing
  useEffect(() => {
    if (projects.length === 0) return;
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2);
      }
    };
    updateWidth();
    // Dynamic delay to let layout render fully
    const timer = setTimeout(updateWidth, 1000);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateWidth);
    };
  }, [projects.length]);

  // Sub-pixel smooth auto-scroll loop (pauses when off-screen)
  useEffect(() => {
    if (projects.length === 0 || !isInView) return;

    let frameId: number;
    const speed = window.innerWidth < 768 ? 0.7 : 1.0;

    const step = () => {
      if (trackRef.current && !isPaused) {
        const currentWidth = trackWidth || (trackRef.current.scrollWidth / 2);
        let currentX = x.get() - speed;
        if (Math.abs(currentX) >= currentWidth) {
          currentX = 0;
        }
        x.set(currentX);
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, x, isInView, trackWidth, projects.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    const amount = window.innerWidth > 768 ? 400 : 280;
    const currentWidth = trackWidth || (trackRef.current ? trackRef.current.scrollWidth / 2 : 10000);

    let targetX = x.get() + (direction === 'left' ? amount : -amount);

    if (targetX > 0) targetX = -currentWidth + amount;
    if (targetX < -currentWidth) targetX = 0;

    animate(x, targetX, { type: 'spring', stiffness: 150, damping: 25 });

    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 5000);
  };

  const handleDragStart = () => setIsPaused(true);
  const handleDragEnd = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-6 md:py-10 relative overflow-hidden bg-[#F2EDE7] touch-pan-y"
    >
      <div className="container mx-auto px-6 md:px-12 mb-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-4xl text-black">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[2.2rem] md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-balance"
            >
              Mission-Critical <br />
              <span className="text-black/20 italic font-extralight tracking-tighter">Engineering</span>
            </motion.h2>
          </div>
        </div>
      </div>

      {/* UNIFIED CAROUSEL */}
      <div
        className="w-full overflow-hidden py-4 md:py-8 relative group"
        onMouseEnter={() => {
          if (window.innerWidth >= 768) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) setIsPaused(false);
        }}
      >
        {/* Floating Arrows */}
        <button
          onClick={() => handleManualScroll('left')}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white rounded-full p-3 md:p-4 shadow-xl transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center"
          aria-label="Scroll backward"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => handleManualScroll('right')}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white rounded-full p-3 md:p-4 shadow-xl transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center"
          aria-label="Scroll forward"
        >
          <ArrowRight size={20} />
        </button>

        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -trackWidth, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex gap-4 md:gap-8 px-6 md:px-12 w-max cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {doubled.map((project, idx) => (
            <div key={`${project.id}-${idx}`} className="w-[75vw] sm:w-[280px] md:w-[320px] shrink-0 pt-2 pb-6">
              <motion.div
                onTap={() => {
                  router.push(`/projects#project-${project.id}`);
                }}
                className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-[380px] md:h-[420px] border border-black/5 group/card cursor-pointer"
              >
                <motion.div
                  className="h-[55%] md:h-[60%] w-full overflow-hidden relative bg-white"
                  onTap={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                    setIsLightboxOpen(true);
                  }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-contain object-center transition-transform duration-700 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black shadow-lg">
                      <ZoomIn size={20} />
                    </div>
                  </div>
                </motion.div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-base md:text-lg font-bold text-black tracking-tight leading-tight line-clamp-1 max-w-[55%] flex-shrink-0">
                      {project.title.split("-")[0].trim()}
                    </h3>
                    <span className="text-[9px] md:text-[10px] font-bold text-blue-600 uppercase pt-1 shrink text-right line-clamp-1">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-[11px] md:text-[13px] text-black/50 line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {isLightboxOpen && (
        <ImageLightbox
          images={projects.map(p => ({ src: p.img, alt: p.title }))}
          currentIndex={projects.findIndex(p => p.id === selectedProject?.id)}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={(index) => setSelectedProject(projects[index])}
        />
      )}

      <div className="container mx-auto px-6 md:px-12 flex justify-end mt-4">
        <motion.button
          onTap={() => router.push("/projects")}
          className="flex items-center gap-3 text-black font-bold hover:text-blue-600 transition-all group/viewall p-2 active:scale-95 rounded-xl cursor-pointer"
        >
          <span className="text-xs uppercase tracking-[0.2em] relative">
            View All
            <span className="absolute -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover/viewall:w-full" />
          </span>
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover/viewall:bg-blue-600 group-hover/viewall:border-blue-600 transition-all duration-300 group-active/viewall:scale-90">
            <ArrowUpRight size={16} className="transition-transform group-hover/viewall:translate-x-0.5 group-hover/viewall:-translate-y-0.5 group-hover/viewall:text-white" />
          </div>
        </motion.button>
      </div>

    </section>
  );
};

export default Projects;