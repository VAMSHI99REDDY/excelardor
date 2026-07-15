"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const CareersCTA = () => {
  return (
    <section className="w-full bg-[#4A6B35] py-20">
      <div className="max-w-[1920px] mx-auto px-5 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Can't find the right role?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep it on file for future opportunities.
          </p>
          <button
            onClick={() => window.location.href = "mailto:careers@excelardor.com"}
            className="px-8 py-4 bg-white text-[#4A6B35] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 hover:scale-105 transition-all shadow-xl inline-flex items-center gap-2"
          >
            <Mail size={18} />
            Send Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersCTA;
