"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[15%] w-72 h-72 bg-primary/8 rounded-full blur-[120px] animate-float pointer-events-none z-10" />
      <div
        className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-10"
        style={{ animationDelay: "3s" }}
      />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-8 text-center pt-24 md:pt-0">
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(2.2rem,6vw,4.8rem)] font-bold text-white tracking-tight leading-[1.1] pb-2"
          >
            Engineering
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(2.2rem,6vw,4.8rem)] font-bold tracking-tight leading-[1.1] text-balance mx-auto max-w-5xl pb-2"
          >
            <span className="text-blue-500 italic font-light tracking-tighter">
              Precision
            </span>{" "}
            <span className="text-white">Powering Defence & Industry.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1rem,1.4vw,1.15rem)] text-white/70 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium text-balance"
        >
          Specializing in precision mechanical systems and advanced hydraulic
          solutions for defense, aerospace, and industrial domains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-16 md:mb-0"
        >
          <Link
            href="/projects"
            className="relative px-8 md:px-10 py-4 rounded-full text-[14px] md:text-[15px] font-bold bg-white text-black transition-all duration-500 flex items-center gap-2.5 group overflow-hidden shadow-[0_15px_35px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_45px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 border border-white/10 cursor-pointer"
          >
            {/* Content Layer */}
            <span className="relative z-20 flex items-center gap-2">
              Explore Our Projects
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="group-hover:translate-x-1.5 transition-transform duration-500"
              />
            </span>
          </Link>
        </motion.div>
      </div>



      {/* Bottom center scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white/60 animate-bounce" />
        <span className="text-white/60 text-sm md:text-base font-medium tracking-wide">
          Keep scrolling
        </span>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
};

export default Hero;