"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Skilled Professionals" },
  { value: "4", label: "Active Openings" },
];

const CareersStats = () => {
  return (
    <section className="w-full bg-gray-50 py-16 border-y border-gray-100">
      <div className="max-w-[1920px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <h3 className="text-4xl md:text-5xl font-black text-[#4A6B35] mb-2 tracking-tighter group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersStats;
