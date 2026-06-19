"use client";

import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen font-sans text-black overflow-hidden bg-white">

      {/* Full-screen Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/AllProjects/contact us bg.png')"
            }}
          />
          {/* <motion.div
            initial={{ scale: 2 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 4,
              ease: "easeOut"
            }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/AllProjects/contact us bg.png')"
            }}
          /> */}
          {/* Semi-transparent Black Overlay */}
          <div className="absolute inset-0 z-10 bg-black/50" />

          {/* Centered Heading */}
          <div className="relative z-20 text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter"
            >
              Contact
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100px" }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-1 bg-white mx-auto mt-6"
            />
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white/60 animate-bounce" />
            <span className="text-white/60 text-sm md:text-base font-medium tracking-wide">
              Keep scrolling
            </span>
          </motion.div>
        </section>

        {/* Content Section */}
        <div className="relative z-10 bg-white">
          <Contact />
        </div>

        {/* Unified footer implementation */}
        <div className="bg-black text-white relative z-10 w-full rounded-t-[2.5rem]">
          <Footer />
        </div>
      </main>
  );
}
