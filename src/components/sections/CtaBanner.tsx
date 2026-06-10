"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const CtaBanner = () => {
  return (
    <section id="contact" className="py-8 px-6 bg-[#E9E5DF] relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-7xl rounded-[40px] bg-white border border-black/10 p-8 lg:p-12 text-center relative overflow-hidden group"
      >

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8"
          >
            <Mail className="text-primary" size={28} strokeWidth={1.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-8 tracking-tight leading-[1.05]"
          >
            Forge the <br />
            <span className="text-black/50 italic font-light">Future of Precision</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-black/60 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Connect with our engineering experts to discuss customized hydraulic solutions for your mission-critical applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Link
              href="#contact"
              className="relative px-12 py-5 rounded-full text-lg font-bold bg-transparent text-black transition-all duration-500 flex items-center gap-3 group overflow-hidden border border-black/10 hover:border-black/30 hover:-translate-y-1 active:scale-95 transition-all"
            >
              {/* Content Layer */}
              <span className="relative z-20 flex items-center gap-2.5">
                Start Conversation
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-1.5 transition-transform duration-500"
                />
              </span>
            </Link>
            <div className="flex items-center gap-4 group/phone cursor-pointer">
               <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover/phone:border-black/30 transition-colors">
                  <Phone size={18} className="text-black/60" />
               </div>
               <span className="text-black/80 font-medium tracking-wide">+91 9989166874</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaBanner;
