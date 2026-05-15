"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

import { createPortal } from "react-dom";

const ImageLightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      // Robust scroll lock for both desktop and mobile
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.touchAction = "none";
      
      return () => {
        document.body.style.overflow = originalStyle;
        document.documentElement.style.overflow = "auto";
        document.body.style.touchAction = "auto";
        document.documentElement.style.touchAction = "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted || currentIndex === -1 || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) onNavigate((currentIndex + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const content = (
    <div 
      className="fixed inset-0 w-screen h-screen bg-black flex flex-col items-center justify-center overflow-hidden touch-none"
      style={{
        zIndex: 2147483647,
        cursor: 'zoom-out',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onClick={onClose}
    >
      {/* Top Close Button Area */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-end items-center z-[2147483648] pointer-events-none">
        <button 
          className="pointer-events-auto p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all active:scale-90 border border-white/10"
          onClick={onClose}
        >
          <X size={28} />
        </button>
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button 
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[2147483648] p-5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 active:scale-90"
            onClick={handlePrev}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-[2147483648] p-5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 active:scale-90"
            onClick={handleNext}
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Primary Image Display Area */}
      <div className="relative w-full h-full flex items-center justify-center p-6 md:p-24 md:pb-32 overflow-hidden">
        <img 
          src={currentImage.src} 
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain shadow-[0_0_120px_rgba(0,0,0,1)] rounded-sm transition-all duration-300"
          style={{
            pointerEvents: 'auto',
            display: 'block'
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col items-center justify-center z-[2147483648] pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="text-center space-y-2 translate-y-[10px]">
          <h3 className="text-white text-xs md:text-base font-bold uppercase tracking-[0.2em] max-w-[80vw] leading-relaxed">
            {currentImage.alt}
          </h3>
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-3 opacity-60">
              <div className="h-[1px] w-6 bg-white/30" />
              <p className="text-white text-[9px] md:text-[11px] font-black tracking-widest uppercase">
                {currentIndex + 1} / {images.length}
              </p>
              <div className="h-[1px] w-6 bg-white/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};


export default ImageLightbox;
