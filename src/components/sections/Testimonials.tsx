"use client";

import React, { useState } from "react";
import { Settings, FlaskConical, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TEAM = [
  {
    name: "N. Vijay Kumar",
    role: "Founder & Managing Director",
    quote: "Mr. N. Vijay Kumar is the Founder & Managing Director. In 2010, he developed and patented an Internal Hydraulic Telescopic Mast System. In 2014, he established Excel Ardor Pvt. Ltd. to focus on advanced Telescopic Masts, Defence & Aerospace Components, and Precision Engineering Solutions, driving strategic growth and indigenous innovation.",
    avatar: "/peopleimg/Mr. N. Vijay Kumar.png",
  },
  {
    name: "Cdr. Praveen Chandra",
    role: "Director & Strategic Advisor",
    quote: "Cdr. Praveen Chandra is a Director & Strategic Advisor. An IIT Kharagpur Gold Medalist, he brings decades of experience in defence systems and advanced communications, working closely with DRDO, BEL, BDL, and the Indian Navy to strengthen the company's next-generation strategic growth.",
    avatar: "/peopleimg/Commodore Praveen Chandra.png",
  },
  {
    name: "Ch. Sudheer",
    role: "Plant Head & Operations Manager",
    quote: "Mr. Ch. Sudheer has been associated with Excel Ardor Pvt. Ltd. for over 8 years and plays a key role in managing manufacturing operations, production planning, quality control, and project execution. With strong technical expertise and operational leadership, he ensures efficient plant operations and supports the company's growth in aerospace, defence, and advanced manufacturing sectors.",
    avatar: "/peopleimg/Mr. Ch. Sudheer – Plant Head & Operations Manager.png",
  },
  {
    name: "P. Sai Charan",
    role: "Additional Director",
    quote: "P. Sai Charan is a technology-driven leader specializing in semiconductor engineering, artificial intelligence, embedded systems, and advanced computing. With global industry experience, he contributes to the company's modernization initiatives and next-generation defence and aerospace technologies.",
    avatar: "/peopleimg/P. Sai Charan – Additional Director.png",
  },
  {
    name: "P. Prasad",
    role: "Senior Mechanical Consultant",
    quote: "Mr. P. Prasad is a seasoned mechanical engineering professional with vast experience in tooling systems, machine design, and manufacturing technologies. He provides valuable technical guidance in the development of dies, fixtures, and special-purpose machines.",
  },
  {
    name: "N. Rajasekhar",
    role: "Plant Supervisor & Maintenance In-Charge",
    quote: "Mr. N. Rajasekhar has been with Excel Ardor Pvt. Ltd. for nearly 15 years and oversees plant operations, machine maintenance, tooling management, and workforce coordination. His extensive shop-floor experience and commitment to quality contribute significantly to maintaining efficient manufacturing processes and operational excellence.",
    avatar: "/peopleimg/Mr. N. Rajasekhar – Plant Supervisor & Maintenance Incharge.png",
  },
  {
    name: "R. Sunny Babu",
    role: "Design & Quality Engineer",
    quote: "Mr. R. Sunny Babu specializes in mechanical design, quality inspection, and engineering documentation. He supports the organization by ensuring compliance with technical specifications and maintaining high standards of quality across projects.",
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
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover shadow-sm bg-white"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full border border-black/5 shadow-sm bg-white flex items-center justify-center text-black/50 font-bold text-sm">
                          {member.name.split('.').pop()?.trim().charAt(0) || member.name.charAt(0)}
                        </div>
                      )}
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