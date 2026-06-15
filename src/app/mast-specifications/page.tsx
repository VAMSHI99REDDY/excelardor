"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Cpu, Gauge, Compass, Zap, Anchor } from "lucide-react";

interface MastSpec {
  name: string;
  erectedHeight?: string;
  retractedHeight?: string;
  headLoad?: string;
  details?: string;
}

interface MastCategory {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  masts: MastSpec[];
}

const categories: MastCategory[] = [
  {
    id: 1,
    title: "Pneumatic Telescopic Masts",
    description: "High-performance air-pressurized masts engineered for fast deployment and high reliability.",
    icon: <Gauge className="text-blue-500" size={24} />,
    masts: [
      { name: "Type 1", erectedHeight: "6 m", headLoad: "50 Kg", retractedHeight: "1.8 m" },
      { name: "Type 2", erectedHeight: "15.8 m", headLoad: "25 Kg", retractedHeight: "3.6 m" },
      { name: "Type 3", erectedHeight: "4.2 m", headLoad: "10 Kg", retractedHeight: "1.9 m" },
      { name: "Type 4", erectedHeight: "11 m", headLoad: "10 Kg", retractedHeight: "1.8 m" },
    ]
  },
  {
    id: 2,
    title: "Hydraulic Telescopic Masts",
    description: "Extremely heavy-duty masts driven by hydraulic fluid, optimized for maximum payloads.",
    icon: <Anchor className="text-blue-500" size={24} />,
    masts: [
      { name: "Internal Hydraulic Telescopic Mast", erectedHeight: "5 m", headLoad: "500 Kg", retractedHeight: "1.9 m" },
    ]
  },
  {
    id: 3,
    title: "Electromechanical Rope Drive Masts",
    description: "High-precision wire-rope driven systems offering high durability under demanding conditions.",
    icon: <Cpu className="text-blue-500" size={24} />,
    masts: [
      { name: "Type 1", erectedHeight: "2.5 m", headLoad: "250 Kg", retractedHeight: "1.5 m" },
      { name: "Type 2", erectedHeight: "15 m", headLoad: "150 Kg", retractedHeight: "3.5 m" },
      { name: "Type 3", erectedHeight: "15 m", headLoad: "30 Kg", retractedHeight: "3.2 m" },
      { name: "Type 4", erectedHeight: "4.5 m", headLoad: "30 Kg", retractedHeight: "2.5 m" },
    ]
  },
  {
    id: 4,
    title: "Electromechanical Screw Drive Masts",
    description: "Lead/ball screw driven actuators designed for absolute precision and stability.",
    icon: <Zap className="text-blue-500" size={24} />,
    masts: [
      { name: "Type 1", erectedHeight: "10.3 m", headLoad: "200 Kg", retractedHeight: "3.1 m" },
      { name: "Type 2", erectedHeight: "3 m", headLoad: "10 Kg", retractedHeight: "1.8 m" },
      { name: "Type 3", erectedHeight: "7 m", headLoad: "30 Kg", retractedHeight: "2 m" },
      { name: "Type 4", erectedHeight: "1.8 m", headLoad: "500 Kg", retractedHeight: "0.7 m" },
    ]
  },
  {
    id: 5,
    title: "Specialty & Custom Masts",
    description: "Tailor-made solution designs to satisfy specific operating environments and payload orientations.",
    icon: <Compass className="text-blue-500" size={24} />,
    masts: [
      { name: "5 m Telescopic Mast with Pan & Tilt", details: "Automated pan (-180° to +180°) and tilt (0° to +20°) system for antennas and sensors." },
      { name: "Pull Up Mast (6 m)", details: "Designed for quick manual deployment." },
      { name: "Tripod Telescopic Mast", details: "Portable mast stabilized on a tripod base." },
      { name: "Fiber Reinforced Mast (FRP)", details: "Lightweight, non-conductive composite mast." },
      { name: "Vehicle Mounted Telescopic Mast with Azimuth Rotator", details: "Integrated mobile mast system for vehicle applications." },
      { name: "Inverted Telescopic Mast (6 m)", details: "Designed for specialized downward deployments." },
    ]
  }
];

export default function SpecificationsPage() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#E9E5DF] text-black font-sans py-16 px-6 md:px-12 relative overflow-hidden select-none">
      {/* Background subtle radial glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto relative z-10 pt-10 pb-24">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
            Technical Data
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4 text-zinc-900">
            Telescopic Mast Specifications
          </h1>
          <p className="text-zinc-700 text-sm md:text-base max-w-2xl leading-relaxed">
            Detailed engineering parameters, dimensions, and operational characteristics for our specialized defence and industrial tactical mast portfolio.
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="space-y-4">
          {categories.map((category, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border border-black/5 bg-white/70 backdrop-blur-md rounded-xl overflow-hidden hover:border-blue-600/20 shadow-sm transition-colors duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left outline-none focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-black/[0.03] rounded-lg border border-black/5">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                        <span className="text-blue-600 font-mono text-sm">0{category.id}.</span> {category.title}
                      </h2>
                      <p className="text-zinc-600 text-xs mt-1 max-w-lg hidden sm:block">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    {isExpanded ? (
                      <ChevronUp className="text-zinc-600" size={20} />
                    ) : (
                      <ChevronDown className="text-zinc-600" size={20} />
                    )}
                  </div>
                </button>

                {/* Body Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-black/5 bg-white/20">
                        {/* Mobile Description Helper */}
                        <p className="text-zinc-600 text-xs mb-4 sm:hidden">
                          {category.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {category.masts.map((mast, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-5 rounded-lg bg-white/90 border border-black/5 hover:border-blue-600/20 transition-all duration-300 group flex flex-col justify-between shadow-sm"
                            >
                              <div>
                                <span className="text-blue-600 font-mono text-[10px] uppercase tracking-wider block mb-1">
                                  Model Specification
                                </span>
                                <h3 className="text-sm md:text-base font-bold text-zinc-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                                  {mast.name}
                                </h3>
                              </div>

                              {mast.details ? (
                                <p className="text-zinc-700 text-xs md:text-sm leading-relaxed mt-1">
                                  {mast.details}
                                </p>
                              ) : (
                                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/5 text-[10px] md:text-xs">
                                  <div>
                                    <span className="text-zinc-500 block">Erected</span>
                                    <span className="text-zinc-800 font-semibold">{mast.erectedHeight}</span>
                                  </div>
                                  <div>
                                    <span className="text-zinc-500 block">Retracted</span>
                                    <span className="text-zinc-800 font-semibold">{mast.retractedHeight}</span>
                                  </div>
                                  <div>
                                    <span className="text-zinc-500 block">Head Load</span>
                                    <span className="text-blue-600 font-semibold">{mast.headLoad}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Back Button (Bottom-Left) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.back()}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-black hover:bg-zinc-900 text-white font-semibold text-xs tracking-wider uppercase px-4 py-3 rounded-full shadow-2xl transition-all"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </motion.button>
    </main>
  );
}
