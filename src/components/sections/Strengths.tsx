"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Lightbulb, ShieldCheck, Building2, HeartHandshake, Cog } from "lucide-react";

const strengths = [
  {
    title: "Qualified Team",
    description: "Hands-on experience delivering excellence.",
    icon: <Users className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Competent Team",
    description: "Offering highly customised solutions for your needs.",
    icon: <Lightbulb className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Integrity",
    description: "Unwavering commitment to confidentiality and honesty.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Robust Infrastructure",
    description: "State-of-the-art facilities and equipment.",
    icon: <Building2 className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Proven Satisfaction",
    description: "Satisfied customers driving continued business.",
    icon: <HeartHandshake className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Precision Engineering",
    description: "Delivering high-accuracy, reliable solutions for mission-critical applications.",
    icon: <Cog className="w-8 h-8 text-blue-600" />
  }
];

export default function Strengths() {
  return (
    <section className="w-full bg-white py-16 md:py-24 relative overflow-hidden" id="strengths">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col w-full">
        
        {/* HEADING WEAPPER */}
        <div className="flex flex-col items-center text-center w-full mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#4e73df] font-bold text-[12px] md:text-[14px] tracking-[0.25em] uppercase mb-4 inline-block"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.1]"
          >
            Our Core <span className="text-blue-600 italic font-light tracking-tighter">Strengths</span>
          </motion.h2>
        </div>

        {/* STRENGTHS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F8F9FA] rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="bg-blue-50 p-4 rounded-full mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                {strength.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{strength.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
