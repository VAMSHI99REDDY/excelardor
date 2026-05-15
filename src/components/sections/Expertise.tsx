"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Massive Performance Optimization: Lazy Load Heavy 3D Model
const TelescopicMast = dynamic(() => import("@/components/3d/TelescopicMast"), {
  ssr: false, // Turn off Server-Side Rendering
});

export default function Expertise() {
  return (
    <section className="w-full bg-[#F2EDE7] py-8 md:py-12 relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col w-full">

        {/* TOP CENTERED HEADING WRAPPER */}
        <div className="flex flex-col items-center text-center w-full mx-auto mb-6 md:mb-10">
          
          <div className="pointer-events-auto flex flex-col items-center">
            {/* Our Expertise */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#4e73df] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-3 inline-block"
            >
              Our Expertise
            </motion.span>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]"
            >
              Precision Solutions for <br />
              <span className="text-blue-600 italic font-light tracking-tighter">Critical Industries</span>
            </motion.h2>
          </div>

        </div>

        {/* BOTTOM SECTION (Left: 3D Bolt, Right: List) */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
          
          {/* LEFT: 3D Telescopic Mast Model */}
          <div className="w-full md:w-1/2 flex justify-center relative h-[600px] md:h-[450px] order-2 md:order-1">
            <TelescopicMast />
          </div>

          {/* RIGHT: Bullet List block */}
          <div className="w-full md:w-1/2 flex justify-end mt-0 text-right pointer-events-auto order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-md w-full flex flex-col items-start md:ml-auto"
            >
              <div className="flex flex-col gap-2 mb-5 text-black/80 text-[15px] md:text-[17px] font-bold">
                <span className="flex items-center gap-2">• Defence (Army, Navy, Air Force)</span>
                <span className="flex items-center gap-2">• Aerospace</span>
                <span className="flex items-center gap-2">• Marine & Subsea</span>
                <span className="flex items-center gap-2">• Heavy Engineering</span>
                <span className="flex items-center gap-2">• Industrial Automation</span>
                <span className="flex items-center gap-2">• Private Sector Manufacturing</span>
              </div>

              <p className="text-black/60 text-[14px] md:text-[15px] leading-relaxed max-w-[400px] font-medium text-left text-balance">
                We provide a comprehensive range of precision mechanical and hydraulic products, engineered for mission-critical reliability.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
      
    </section>
  );
}