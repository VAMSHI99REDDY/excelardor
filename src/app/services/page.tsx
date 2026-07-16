"use client";

import React from "react";
import Footer from "@/components/layout/Footer";
import { Hammer, Settings, Layers, Zap, Cog, ShieldCheck, Factory, Box } from "lucide-react";
import { motion } from "framer-motion";
import Strengths from "@/components/sections/Strengths";

const services = [
  {
    title: "Precision Mechanical Components",
    description: "Sub assemblies and components tailored for Defense and Aerospace applications.",
    icon: <Settings size={28} strokeWidth={1.5} />,
  },
  {
    title: "Precision Fabrication",
    description: "Specialized engineering and fabrication works for complex military systems.",
    icon: <Hammer size={28} strokeWidth={1.5} />,
  },
  {
    title: "Decontamination Equipment",
    description: "Essential systems for maintaining safety and operational readiness.",
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
  },
  {
    title: "Composite & FRP Components",
    subtitle: "Aerospace, Defence & Customized Applications",
    description: "Providing lightweight, durable, and precision-engineered Composite and FRP solutions for Aerospace, Defence, and customized industrial requirements.",
    icon: <Layers size={28} strokeWidth={1.5} />,
  },
  {
    title: "Telescopic Masts",
    description: "Electro Mechanical, Pneumatic, Hydraulic, Push Fit, and Hand Crank winch options.",
    icon: <Layers size={28} strokeWidth={1.5} />,
  },
  {
    title: "Annual Maintenance Support for Telescopic Mast",
    description: "Providing reliable annual maintenance services to ensure optimal performance and extended life of telescopic mast systems.",
    icon: <Cog size={28} strokeWidth={1.5} />,
  },
  {
    title: "Industrial Hydraulic Equipment",
    description: "Highly precise hydraulic systems designed for stability and durability.",
    icon: <Cog size={28} strokeWidth={1.5} />,
  },
  {
    title: "Special Purpose Machines",
    description: "Custom machines developed specifically for specialized defense applications.",
    icon: <Zap size={28} strokeWidth={1.5} />,
  },
  {
    title: "Automatic Storage Systems",
    description: "Intelligent storage solutions optimize space and accessibility.",
    icon: <Box size={28} strokeWidth={1.5} />,
  },
  {
    title: "Scrubbers for Process Plants",
    description: "Efficient scrubbing systems for environmental and process control.",
    icon: <Factory size={28} strokeWidth={1.5} />,
  },
  {
    title: "Custom Designing Products",
    description: "Delivering innovative, precision-engineered custom products tailored to unique industrial, defense, and aerospace requirements.",
    icon: <Settings size={28} strokeWidth={1.5} />,
  },
  {
    title: "Service Support for End Product",
    description: "Offering dedicated end-product service support for seamless operation, maintenance, and long-term customer satisfaction.",
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
  },
];
import Services from "@/components/sections/Services";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen font-sans text-black bg-[#F9F9F9]">

        {/* ─── NEW CINEMATIC SERVICES PRESENTATION ─── */}
        <Services />

        {/* ─── CAPABILITIES OVERVIEW SECTION ─── */}
        <section className="relative z-20 w-full pt-16 md:pt-24 px-6 md:px-12 flex justify-center bg-[#F9F9F9]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-[1100px] border-[6px] md:border-[10px] border-white/30 rounded-[30px] md:rounded-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Replace this src with the actual filename of your uploaded image */}
            <img
              src="/EAPL-Capabilities.png"
              alt="EAPL Capabilities Tree"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
            />
          </motion.div>
        </section>

        {/* ─── SERVICES GRID SECTION ─── */}
        <div className="pt-20 pb-24 md:pt-28 md:pb-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-20">

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                className="group flex flex-col h-full bg-transparent p-6 md:p-8 transition-colors duration-500 hover:bg-black/5 cursor-pointer"
              >
                <div className="flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-8 text-black/50 group-hover:text-blue-600 transition-colors duration-500">
                    {service.icon}
                  </div>

                  <div className="flex flex-col h-full">
                    {/* Title */}
                    <h3 className={`text-xl md:text-2xl font-bold text-black ${(service as any).subtitle ? "mb-1" : "mb-4"} leading-tight`}>
                      {service.title}
                    </h3>

                    {/* Subtitle */}
                    {(service as any).subtitle && (
                      <p className="text-black font-semibold text-[11px] uppercase tracking-wider mb-4">
                        {(service as any).subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-black/60 font-medium text-[14px] md:text-[15px] leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* OUR CORE STRENGTHS / WHY CHOOSE US */}
        <Strengths />

        <div className="bg-black text-white">
          <Footer />
        </div>
      </main>
  );
}
