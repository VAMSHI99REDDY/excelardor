"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Search, Code, Users, Briefcase } from "lucide-react";

const steps = [
  { title: "Apply Online", icon: FileText, desc: "Submit your application." },
  { title: "Resume Screening", icon: Search, desc: "HR reviews your profile." },
  { title: "Technical Interview", icon: Code, desc: "Discuss your skills." },
  { title: "HR Discussion", icon: Users, desc: "Culture fit & terms." },
  { title: "Offer & Joining", icon: Briefcase, desc: "Welcome to the team!" },
];

const CareersTimeline = () => {
  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-black tracking-tight"
          >
            Our Hiring Process
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-4 border-gray-50 shadow-lg flex items-center justify-center text-[#4A6B35] mb-4 group-hover:bg-[#4A6B35] group-hover:text-white group-hover:border-[#4A6B35]/20 transition-all duration-300">
                    <Icon size={28} />
                  </div>
                  <h4 className="font-bold text-black mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersTimeline;
