"use client";

import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "DEFENSE CORP", style: "font-black italic tracking-tighter" },
  { name: "AERO-SYSTEMS", style: "font-bold tracking-[0.25em]" },
  { name: "PRECISION-X", style: "font-serif font-black" },
  { name: "HYDRA-TECH", style: "font-sans font-black tracking-tight" },
  { name: "NAVAL DYNAMICS", style: "font-bold italic tracking-wide" },
];

const TrustStrip = () => {
  return (
    <section className="py-16 border-y border-white/5 relative">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-wrap justify-center items-center gap-10 lg:gap-20"
        >
          {partners.map((partner, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
              className={`text-lg md:text-xl ${partner.style} text-white/15 hover:text-white/40 transition-colors duration-500 select-none cursor-default`}
            >
              {partner.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
