"use client";

import React from 'react';
import { motion } from 'framer-motion';

export type GalleryImage = {
  src: string;
  title: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="w-full">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 12) * 0.05 }}
            className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 break-inside-avoid bg-white border border-black/5 cursor-default"
          >
            <img
              src={img.src}
              alt={img.title}
              loading="lazy"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Elegant Title Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
              <span className="text-white font-bold text-[15px] md:text-lg leading-tight tracking-wide drop-shadow-lg">
                {img.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
