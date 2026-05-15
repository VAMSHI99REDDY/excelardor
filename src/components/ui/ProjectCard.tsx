"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ZoomIn } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projectsData";
import ImageLightbox from "./ImageLightbox";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="w-full flex-shrink-0">
      <Link href={`/projects/${project.id}`}>
        <motion.div
          id={`project-${project.id}`}
          layout
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white flex flex-col h-full border border-black/5"
        >
          {/* Image Container */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] overflow-hidden bg-white border-b border-black/5 cursor-zoom-in"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
          >

            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Zoom Button Overlay */}
            <div 
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-90 border border-black/5 shadow-sm"
              aria-label="Zoom Image"
            >
              <ZoomIn size={18} />
            </div>
            
            {/* Hover Hint */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                View Image
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="p-5 md:p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="text-base md:text-lg font-bold leading-tight tracking-tight text-black max-w-[55%] line-clamp-1 flex-shrink-0">
                {project.title.split("-")[0].trim()}
              </h3>
              <span className="text-[9px] md:text-[10px] font-bold text-blue-600 uppercase tracking-wider pt-1 shrink text-right line-clamp-1">
                {project.category}
              </span>
            </div>
            
            <p className="text-[13px] leading-relaxed mb-4 text-black/50 line-clamp-2">
              {project.description}
            </p>

            <div className="mt-auto flex justify-end items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-all group-hover:scale-110">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>

      <ImageLightbox 
        images={[{ src: project.img, alt: project.title }]}
        currentIndex={0}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};


export default ProjectCard;
