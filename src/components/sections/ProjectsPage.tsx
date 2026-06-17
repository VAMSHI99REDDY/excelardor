// Updated ProjectsPage with responsive horizontal carousel and smooth resume
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { Grid3X3, LayoutGrid, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/data/projectsData";
import ProjectCard from "@/components/ui/ProjectCard";
import CategoryFilter from "@/components/ui/CategoryFilter";
import Footer from "@/components/layout/Footer";

import type { Project } from "@/data/projectsData";

const CategoryRow = ({ title, projects }: { title: string, projects: Project[] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { amount: 0.05 });
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);

  // Calculate track width for drag constraints
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

  // Sub-pixel smooth auto-scroll loop
  useEffect(() => {
    if (projects.length === 0 || !isInView) return;

    let frameId: number;
    // Mid speed: 1.0 on desktop (60px/s), 0.7 on mobile (42px/s)
    const speed = window.innerWidth < 768 ? 0.7 : 1.0;

    const step = () => {
      if (trackRef.current && !isPaused) {
        // We use scrollWidth / 2 because the items are perfectly duplicated
        const currentWidth = trackRef.current.scrollWidth / 2;
        if (currentWidth > 0) {
          let currentX = x.get() - speed;

          // Seamless infinite loop reset
          if (Math.abs(currentX) >= currentWidth) {
            currentX = 0;
          }
          x.set(currentX);
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, x, isInView, projects.length]);

  // Early return placed after all hooks to prevent rules-of-hooks violation
  if (projects.length === 0) return null;

  // Guarantee enough items to span ultra-wide screens twice.
  const copiesNeeded = Math.max(4, Math.ceil(15 / projects.length));
  const repeated = Array(copiesNeeded).fill(projects).flat();
  const doubled = [...repeated, ...repeated];

  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    const amount = window.innerWidth > 768 ? 400 : 280;
    const currentWidth = trackWidth || (trackRef.current ? trackRef.current.scrollWidth / 2 : 10000);

    let targetX = x.get() + (direction === 'left' ? amount : -amount);

    // Simple clamping to prevent scrolling past the duplicated ends
    if (targetX > 0) targetX = -currentWidth + amount;
    if (targetX < -currentWidth) targetX = 0;

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
    <div ref={rowRef} className="w-full flex flex-col mb-8 md:mb-16 relative overflow-hidden group/row">
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
        onMouseEnter={() => {
          if (window.innerWidth >= 768) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) setIsPaused(false);
        }}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -trackWidth, right: 0 }}
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
  const scrollRestoredRef = useRef(false);

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

  // Read category from URL search params on mount and on popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category") || "Show All";
      setActiveCategory(category);
    };

    handlePopState(); // Initialize on mount

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Restore scroll position after activeCategory updates
  useEffect(() => {
    if (scrollRestoredRef.current) return;

    const savedScroll = sessionStorage.getItem("projects_scroll_position");
    if (savedScroll) {
      const targetScroll = parseInt(savedScroll, 10);
      if (!isNaN(targetScroll)) {
        const timer = setTimeout(() => {
          window.scrollTo({ top: targetScroll, behavior: "instant" as ScrollBehavior });
          sessionStorage.removeItem("projects_scroll_position");
          scrollRestoredRef.current = true;
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [activeCategory]);

  // Sync category change to URL search params
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(window.location.search);
    if (category === "Show All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    const currentParams = new URLSearchParams(window.location.search);
    const currentCategory = currentParams.get("category") || "Show All";
    if (currentCategory !== category) {
      window.history.pushState({ category }, "", newUrl);
    }
  };

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          try {
            const headerOffset = 150;
            const elementPosition = element.getBoundingClientRect().top;
            const scrollY = window.scrollY !== undefined ? window.scrollY : (window.pageYOffset !== undefined ? window.pageYOffset : 0);
            const offsetPosition = elementPosition + scrollY - headerOffset;
            if (!isNaN(offsetPosition)) {
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          } catch (err) {
            console.error("Scroll to hash failed:", err);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen text-black font-sans relative bg-[#E9E5DF]">
      <div className="relative z-20 bg-white min-h-screen flex flex-col pt-20 md:pt-24">
        {/* Compact Filter Section */}
        <section className="py-4 md:py-6 bg-white border-b border-black/5">
          <div className="container mx-auto px-4 md:px-12 flex flex-col items-center gap-4">
            <div className="w-full flex justify-center">
              <CategoryFilter active={activeCategory} onChange={handleCategoryChange} counts={counts} />
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
              <CategoryRow title="Aerospace and Defence Components" projects={PROJECTS.filter(p => p.category === "Aerospace and Defence Components")} />
              <CategoryRow title="Telescopic Mast" projects={PROJECTS.filter(p => p.category === "Telescopic Mast")} />
              <CategoryRow title="Industrial Hydraulics & SPM" projects={PROJECTS.filter(p => p.category === "Industrial Hydraulics & SPM")} />
              <CategoryRow title="3D Modeling of Products" projects={PROJECTS.filter(p => p.category === "3D Modeling of Products")} />
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
