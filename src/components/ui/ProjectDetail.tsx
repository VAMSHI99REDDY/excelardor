"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, ZoomIn } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projectsData";
import ImageLightbox from "./ImageLightbox";
import { useState } from "react";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mapping special CAD projects to their respective HTML viewers
  const CAD_VIEWERS: Record<number, string> = {
    1: "/AllProjects/Counterpoise Earthing System 3d cad.html",
    2: "/AllProjects/cad 3d.html",
    3: "/AllProjects/Solvent Extraction Plant Layout.html",
    4: "/AllProjects/Portable Lifter.html",
    5: "/AllProjects/lasttt.html",
    6: "/AllProjects/Pneumatic Press Attachment 3d.html",
  };

  const isSpecialCAD = !!CAD_VIEWERS[project.id];
  const cadSrc = CAD_VIEWERS[project.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${isSpecialCAD ? 'bg-black' : 'bg-white'} min-h-screen transition-colors duration-700`}
    >
      {isSpecialCAD ? (
        /* ─── SPECIAL DUAL-VIEW LAYOUT (CAD Projects) ─── */
        <>
          <section className="relative w-full h-auto min-h-[100vh] md:h-[85vh] flex flex-col md:flex-row items-center border-b border-white/5 pt-20">
            {/* Left Side: Static Image */}
            <div
              className="w-full md:w-[42%] h-[40vh] md:h-full relative overflow-hidden bg-zinc-950 flex items-center justify-center md:border-r border-b md:border-b-0 border-white/5 cursor-zoom-in group"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
            >

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-contain object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Interactive CAD Viewer (HTML Iframe) */}
            <div className="w-full md:w-[58%] h-[60vh] md:h-full relative bg-zinc-900 overflow-hidden">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <iframe
                  src={cadSrc}
                  className="w-full h-full border-none"
                  title="3D CAD Viewer"
                />

              </motion.div>
            </div>
          </section>

          {/* CAD Content Section */}
          <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 text-white">
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
              <div className="w-full lg:w-1/3 xl:w-1/4">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="md:sticky md:top-32">
                  <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all mb-12 group p-2 -ml-2 rounded-lg active:scale-95 hover:bg-white/5">
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Projects</span>
                  </Link>
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-blue-400">Category</h4>
                      <p className="text-sm font-bold tracking-tight uppercase">{project.category}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-white/20">Industry Precision</h4>
                      <p className="text-sm font-medium leading-relaxed italic text-white/60">Engineered to provide maximum performance for mission-critical industrial applications.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="w-full lg:flex-1">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <span className="font-mono text-xs tracking-[0.4em] uppercase mb-4 inline-block text-blue-400">Project Detail</span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1] mb-12 uppercase">{project.title}</h1>
                  <div className="w-20 h-px mb-12 bg-white/10" />
                  <div className="prose prose-lg max-w-none prose-invert">
                    <p className="text-lg md:text-xl leading-relaxed font-medium mb-12 text-white/70">{project.description}</p>
                    {/* Stats & Quality blocks for CAD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                      <div className="p-8 rounded-2xl bg-zinc-900 border border-white/5 border-l-4 border-l-blue-500">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white">Operational Excellence</h3>
                        <p className="text-xs leading-relaxed text-white/40">Every component is designed for peak efficiency and long-term sustainability.</p>
                      </div>
                      <div className="p-8 rounded-2xl bg-zinc-900 border border-white/5 border-l-4 border-l-blue-500">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white">Build Quality</h3>
                        <p className="text-xs leading-relaxed text-white/40">Manufactured using premium industrial materials and high-precision techniques.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ─── STANDARD VERTICAL LAYOUT (Standard Projects Reverted) ─── */
        <div className="bg-white min-h-screen">
          {/* Top Navigation Bar */}
          <div className="container mx-auto px-6 md:px-12 py-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-black/40 border-b border-black/5">
            <Link href="/projects" className="flex items-center gap-2 text-black/60 hover:text-black transition-all group p-2 -ml-2 rounded-lg active:scale-95 hover:bg-black/5">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-bold">Back to Projects</span>
            </Link>
            <div className="flex gap-4">
              <span className="text-blue-600">Project</span>
              <span>Detail</span>
            </div>
          </div>

          <div className="container mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24">
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">

              {/* LEFT COLUMN: STICKY IMAGE & NAME */}
              <div className="w-full lg:w-1/2">
                <div className="lg:sticky lg:top-32 space-y-12">
                  {/* Image Showcase with Grid */}
                  <div
                    className="relative w-full min-h-[300px] md:min-h-[400px] bg-white rounded-3xl overflow-hidden border border-black/5 group flex items-center justify-center cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <motion.img
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      src={project.img}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black shadow-lg">
                        <ZoomIn size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 block">Product</span>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-black uppercase"
                    >
                      {project.title.split('(')[0]}
                      {project.title.includes('(') && (
                        <span className="block text-2xl md:text-4xl mt-2 text-black/50">
                          ({project.title.split('(')[1]}
                        </span>
                      )}
                    </motion.h1>
                  </div>

                  {/* Category & Breadcrumb */}
                  <div className="pt-8 border-t border-black/5 flex flex-col gap-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-black/20">Category</h4>
                      <p className="text-sm font-bold tracking-tight uppercase text-black/60">{project.category}</p>
                    </div>

                    <Link href="/projects" className="inline-flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-blue-600 hover:text-black transition-all group active:scale-95 p-2 -ml-2 rounded-xl">
                      <div className="w-8 h-8 rounded-full border border-blue-600/20 flex items-center justify-center transition-all group-hover:bg-black group-hover:border-black group-hover:text-white">
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                      </div>
                      Go Back to Gallery
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SCROLLABLE DETAILS */}
              <div className="flex-1 space-y-20">

                {/* Industry Precision Block */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Industry Precision</h4>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-black/80 max-w-xl">
                    Engineered to provide maximum performance for mission-critical industrial applications.
                  </p>
                </div>

                {/* Main Description */}
                <div className="prose prose-xl max-w-none">
                  <p className="text-xl md:text-2xl leading-relaxed text-black/70 font-medium">
                    {project.description}
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-black/40">
                    Excel Ardor delivers state-of-the-art engineering solutions with a focus on precision, durability, and operational excellence. This project was developed to meet the rigorous demands of industrial efficiency and technical superiority.
                  </p>
                </div>

                {/* Technical Specs Grid */}
                {project.specs && (
                  <div className="space-y-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Technical Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-black/5 pt-10">
                      {Object.entries(project.specs).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <p className="text-xl font-bold text-black">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}



                {/* Call to Action */}
                <div className="pt-20 border-t border-black/5">
                  <Link href="/contact" className="inline-flex items-center justify-center w-full md:w-auto px-10 md:px-12 py-4 md:py-5 bg-blue-600 text-white rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:shadow-lg transition-all group active:scale-95">
                    Request Full Solution Specs
                    <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </div>

            {/* Quality Indicator Cards (Full Width Layout) */}
            <div className="w-full mt-24 border-t border-black/5 pt-16">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-8 text-center">Engineering Standards</h4>
              <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 w-full">
                <div className="w-full md:w-[48%] p-10 rounded-2xl bg-[#F9F9F9] border border-black/5 border-l-4 border-l-blue-600 space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Operational Excellence</h3>
                  <p className="text-sm leading-relaxed text-black/50 font-medium">Every component is designed for peak efficiency and long-term sustainability within its operational lifecycle.</p>
                </div>

                <div className="w-full md:w-[48%] p-10 rounded-2xl bg-[#F9F9F9] border border-black/5 border-l-4 border-l-blue-600 space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Build Quality</h3>
                  <p className="text-sm leading-relaxed text-black/50 font-medium">Manufactured using premium industrial materials and high-precision assembly techniques to ensure mission-critical stability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ImageLightbox
        images={project.gallery ? project.gallery.map(img => ({ src: img, alt: project.title })) : [{ src: project.img, alt: project.title }]}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </motion.div>
  );
};


export default ProjectDetail;
