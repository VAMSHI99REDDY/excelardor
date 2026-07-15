"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

const CareersHero = () => {
  return (
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#4A6B35]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gray-100 blur-3xl" />
      </div>

      <div className="max-w-[1920px] mx-auto px-5 md:px-10 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A6B35]/10 text-[#4A6B35] font-semibold text-sm mb-6"
        >
          <Briefcase size={16} />
          <span>Careers at Excel Ardor</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-tight mb-6 max-w-4xl leading-tight"
        >
          Build Your Career at <span className="text-[#4A6B35]">Excel Ardor</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed"
        >
          Join our growing team of engineering professionals and work on innovative manufacturing, precision engineering, and industrial automation projects. We value talent, innovation, and continuous learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#job-openings"
            className="px-8 py-4 bg-[#4A6B35] text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(74,107,53,0.3)] hover:shadow-[0_15px_40px_rgba(74,107,53,0.4)] hover:-translate-y-1 transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
          >
            View Open Positions
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => document.getElementById("job-openings")?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-100 text-black rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-all w-full sm:w-auto justify-center"
          >
            Apply Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersHero;
