"use client";

import React, { useState } from "react";
import { Settings, FlaskConical, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TEAM = [
  {
    name: "N. Vijay Kumar",
    role: "Founder & Managing Director",
    quote: "Founder & Managing Director with over 20 years of experience in hydraulics, telescopic masts, and precision engineering, driving innovation and strategic growth.",
    avatar: "/peopleimg/Mr. N. Vijay Kumar.png",
  },
  {
    name: "Commodore Praveen Chandra",
    role: "Director & Strategic Advisor",
    quote: "Strategic Advisor with extensive defence technology expertise, guiding corporate strategy and advanced engineering solutions.",
    avatar: "/peopleimg/Commodore Praveen Chandra.png",
  },
  {
    name: "M. R. Krishnamraju",
    role: "Director",
    quote: "Director focusing on corporate governance, strategic expansion, and long-term business partnerships.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    name: "Ch. Sudheer",
    role: "Design Engineer – Mechanical",
    quote: "Mechanical Design Engineer with 5 years of experience in mast and SPM design and production management.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200",
  },
  {
    name: "P. Prasad",
    role: "Technical Consultant – Mechanical",
    quote: "Technical Consultant with 30 years of expertise in design, manufacturing, planning, quality, and troubleshooting.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    name: "N. Rajasekhar",
    role: "Engineer – Mechanical",
    quote: "Mechanical Engineer with 12 years of workshop experience, specializing in fitting and supervision.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
  },
  {
    name: "Sunny",
    role: "Designer",
    quote: "Designer with 3 years of experience in precision component design and engineering.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
  },
];

const machineryList = [
  { id: 1, name: "CNC Lathe", qty: 4 },
  { id: 2, name: "CNC Milling", qty: 3 },
  { id: 3, name: "6 Mtr Honing Machine", qty: 1 },
  { id: 5, name: "2 Mtr Honing Machine", qty: 2 },
  { id: 6, name: "Mig Welding Machine", qty: 1 },
  { id: 7, name: "Tig Welding Machine", qty: 2 },
  { id: 8, name: "Arc Welding Machine", qty: 2 },
  { id: 9, name: "14 Feet Lathe Machine", qty: 1 },
  { id: 10, name: "10 Feet Lathe Machine", qty: 1 },
  { id: 11, name: "Radial Drilling Machine", qty: 1 },
  { id: 12, name: "Bandsaw Cutting Machine", qty: 2 },
  { id: 13, name: "Bench Grinding Machine", qty: 2 },
  { id: 14, name: "Cutoff Grinding machine", qty: 3 },
  { id: 15, name: "8\" Hand Grinding Machine", qty: 3 },
  { id: 16, name: "2\" Hand Grinding Machine", qty: 3 },
  { id: 17, name: "Compressor with accessories", qty: 3 },
  { id: 18, name: "Hydraulic Test Rig 450 BAR", qty: 1 },
  { id: 19, name: "Hydraulic Bending Machine", qty: 1 },
  { id: 22, name: "Gas Cutting Unit", qty: 1 },
];

const testEquipmentList = [
  { id: 1, name: "Vernier Caliper", qty: 3 },
  { id: 2, name: "Height Guage", qty: 1 },
  { id: 3, name: "Bore Guage", qty: 4 },
  { id: 4, name: "Micro Meter", qty: 2 },
  { id: 5, name: "Digital Vernier", qty: 3 },
  { id: 6, name: "Surface Table", qty: 2 },
  { id: 7, name: "Hardness Test Machine", qty: 1 },
  { id: 8, name: "Fixtures & Jigs", qty: 2 },
  { id: 9, name: "Hydraulic Test Rig 450 BAR", qty: 1 },
  { id: 10, name: "Electronic Weighing Machine 500 Kgs", qty: 1 },
  { id: 11, name: "Ultrasonic Thickness Guage", qty: 1 },
  { id: 12, name: "Plug and Ring Guages", qty: 20 },
  { id: 13, name: "Radius and Filler Guage", qty: 2 },
  { id: 14, name: "Slip Guges(82set)", qty: 1 },
  { id: 15, name: "Digital Micrometer(0-50mm)", qty: 1 },
  { id: 16, name: " Ball Micrometer(0-25mm)", qty: 1 },
  { id: 17, name: "Blade Micrometer(0-25mm)", qty: 1 },
  { id: 18, name: "CNC EDM Machine", qty: 1 },
  { id: 19, name: "CNC Wire Cutting Machine", qty: 1 },
];

export default function Testimonials() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderTable = (items: { id: number; name: string; qty: number }[], title?: string) => (
    <div className="w-full mt-8 flex flex-col">
      {/* Main Table Heading */}
      {title && (
        <div className="w-full bg-blue-600 py-5 px-6 rounded-t-[2rem] text-center shadow-md">
          <h3 className="text-white font-black text-sm md:text-base lg:text-lg uppercase tracking-[0.3em]">
            {title}
          </h3>
        </div>
      )}

      {/* Table Container */}
      <div className={`w-full overflow-x-auto border border-black/5 ${title ? 'rounded-b-[2rem]' : 'rounded-[2rem]'} bg-[#F9F8F6]`}>
        <table className="w-full text-left border-separate border-spacing-0 min-w-full md:min-w-[500px]">
          <thead className="bg-[#F9F8F6] border-b border-black/5">
            <tr>
              <th className="p-4 text-[11px] font-black tracking-[0.2em] uppercase text-blue-600/50 border-b border-black/5 w-16 md:w-24 pl-4 md:pl-6">S.No.</th>
              <th className="p-4 text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 border-b border-black/5">Description / Name of Asset</th>
              <th className="p-4 text-[11px] font-black tracking-[0.2em] uppercase text-blue-600/50 border-b border-black/5 text-right w-24 md:w-32 pr-4 md:pr-6">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-white">
            {items.map((item, idx) => (
              <tr key={idx} className="group hover:bg-black/[0.02] transition-colors">
                <td className="p-4 border-b border-black/5 font-mono text-sm text-black/40 pl-4 md:pl-6">{item.id}</td>
                <td className="p-4 border-b border-black/5 font-bold text-black">{item.name}</td>
                <td className="p-4 border-b border-black/5 text-right pr-4 md:pr-6">
                  <span className="inline-block px-3 md:px-4 py-1 md:py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase shadow-sm">
                    {item.qty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section id="infrastructure" className="w-full bg-[#F2EDE7] py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-6 w-full max-w-[1400px]">

        {/* Header with Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 w-full">
          <div>
            <span className="text-blue-600 font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 inline-block">
              Our Leadership – The Minds Behind The Machinery
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.1]">
              Leadership Excellence<br />
              <span className="text-black/40 italic font-light tracking-tighter">Driving Innovation in Aerospace & Defence</span>
            </h2>
            <p className="text-black/60 font-medium mt-6 text-[15px] md:text-[17px] max-w-2xl leading-relaxed">
              Decades of specialized mastery in hydraulics, metallurgy, and strategic operations powering Indian defense.
            </p>
          </div>

          <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-black/5 shrink-0 mb-2">
            <button
              onClick={() => toggleCategory('machinery')}
              className={`px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${expandedCategory === 'machinery' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black'}`}
            >
              <Settings size={14} /> Machinery
            </button>
            <button
              onClick={() => toggleCategory('tools')}
              className={`px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${expandedCategory === 'tools' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black'}`}
            >
              <FlaskConical size={14} /> Test Tools
            </button>
          </div>
        </div>

        {/* Dynamic Content Area: Tables OR Cards */}
        <AnimatePresence mode="wait">
          {expandedCategory ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl mx-auto"
            >
              {expandedCategory === 'machinery' && renderTable(machineryList)}
              {expandedCategory === 'tools' && renderTable(testEquipmentList, "Composite Raw Material Testing")}
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full overflow-hidden pb-10 pt-4 relative group"
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-scroll-left {
                  animation: scroll-left 40s linear infinite;
                }
                .group:hover .animate-scroll-left {
                  animation-play-state: paused;
                }
              `}} />

              <div className="flex w-max animate-scroll-left">
                {[...TEAM, ...TEAM].map((member, idx) => (
                  <div
                    key={idx}
                    className="mr-6 min-w-[320px] w-[320px] md:min-w-[360px] md:w-[360px] bg-[#F9F8F6] rounded-2xl p-8 border border-black/5 flex flex-col justify-between shrink-0 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                  >
                    <div className="relative mb-10">
                      <Quote size={32} className="text-black/5 absolute -top-4 -left-2 rotate-180" />
                      <p className="text-black/70 text-[15px] font-medium italic leading-relaxed relative z-10">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-black/5 pt-6 mt-auto">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm bg-white"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-[15px] font-bold text-black leading-tight">{member.name}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40 mt-1 line-clamp-1">{member.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}