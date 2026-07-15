"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Competitive Salary",
  "Learning & Development",
  "Friendly Team",
  "Career Growth",
  "Modern Infrastructure",
  "Long-Term Opportunities",
];

const CareersBenefits = () => {
  return (
    <section className="w-full bg-gray-50 py-20 border-y border-gray-100">
      <div className="max-w-[1920px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-black tracking-tight mb-4"
            >
              Why Work With Us?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              We offer a range of perks to ensure our team is happy, healthy, and motivated.
            </motion.p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-gray-100 p-4 md:p-6 rounded-2xl flex flex-col items-start gap-3 hover:shadow-md transition-shadow"
              >
                <CheckCircle2 size={24} className="text-[#4A6B35]" />
                <span className="font-bold text-gray-800 text-sm md:text-base">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersBenefits;
