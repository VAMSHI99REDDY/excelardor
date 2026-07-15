"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Factory, Users, BookOpen } from "lucide-react";

const features = [
  {
    title: "Professional Growth",
    description: "Clear career progression paths with regular performance reviews and mentorship.",
    icon: TrendingUp,
  },
  {
    title: "Modern Manufacturing",
    description: "Work with state-of-the-art CNC machines, EDM, and advanced fabrication tools.",
    icon: Factory,
  },
  {
    title: "Collaborative Environment",
    description: "Join a friendly, inclusive team that values open communication and teamwork.",
    icon: Users,
  },
  {
    title: "Continuous Learning",
    description: "Access to ongoing training, skill development, and industry certifications.",
    icon: BookOpen,
  },
];

const CareersWhyJoinUs = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1920px] mx-auto px-5 md:px-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-black tracking-tight mb-6"
          >
            Why Join <span className="text-[#4A6B35]">Us?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            We provide an environment where talent is recognized, hard work is rewarded, and innovation is encouraged.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#4A6B35]/10 flex items-center justify-center text-[#4A6B35] mb-6 group-hover:scale-110 group-hover:bg-[#4A6B35] group-hover:text-white transition-all duration-300">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareersWhyJoinUs;
