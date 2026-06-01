"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Team Data (excluding the Founder and Director who are featured in the main full-width profile cards)
const TEAM = [
  {
    name: "M R Krishnamraju",
    role: "Director",
    quote: "Guiding corporate governance, strategic expansion, and long-term business partnerships to drive sustainable growth.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    name: "Ch Sudheer",
    role: "Design Engineer (Mechanical)",
    quote: "Mechanical Engineering Graduate. Having 5 Years of Experience in Designing of Masts & SPMs and Production Management.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200",
  },
  {
    name: "P Prasad",
    role: "Technical Consultant (Mechanical)",
    quote: "Holds Masters in Mechanical engineering. Having experience of 30 years in the field of designing, Manufacturing, Planning, Quality and Troubleshooting.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    name: "N Rajasekhar",
    role: "Engineer (Mechanical)",
    quote: "Diploma Graduate. Having 12 Years of Experience in the field of Fitter and Supervising the workshop.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
  },
  {
    name: "Sunny",
    role: "Designer",
    quote: "Mechanical Engineering Graduate. Having 3 Years of Experience in Designing of Engineering Precision Components.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
  },
];

const About = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#EDEBE8] py-20 md:py-28 font-sans overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[1050px]">

        {/* ─── ABOUT US SECTION HEADER ─── */}
        <div className="flex flex-col items-center text-center max-w-[960px] mx-auto mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 inline-block"
          >
            Corporate Overview
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-10 tracking-tight"
          >
            About Us
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-black/80 font-medium text-[16px] md:text-[18px] leading-[1.85] text-center space-y-6"
          >
            <p>
              <strong className="text-black font-semibold">Excel Ardor Pvt. Ltd.</strong>, established in 2014 and headquartered in Hyderabad, is a leading engineering and manufacturing company specializing in advanced hydraulic systems, precision mechanical components, and mission-critical engineering solutions. Serving the defence, aerospace, and industrial sectors, the company is committed to delivering innovative, high-performance products engineered to meet the most demanding operational requirements.
            </p>
            <p>
              With a strong focus on quality, reliability, and technological excellence, Excel Ardor combines advanced manufacturing capabilities with deep engineering expertise to develop customized solutions for complex applications. Driven by innovation and precision, the company continues to support India's growing aerospace, defence, and industrial ecosystem through world-class engineering and indigenous manufacturing excellence.
            </p>
          </motion.div>
        </div>

        {/* ─── LEADERSHIP CONTAINER (FOUNDER & DIRECTOR CARDS) ─── */}
        <div className="space-y-12 md:space-y-16 mb-24">
          
          {/* 1. FOUNDER PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden border border-black/[0.02]"
          >
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Left Side: Portrait Image (37% width) */}
              <div className="w-full md:w-[37%] min-h-[340px] md:min-h-[460px] relative bg-[#F4F3F0] flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-black/[0.03]">
                <img
                  src="/peopleimg/Mr. N. Vijay Kumar.png"
                  alt="Mr. N. Vijay Kumar Portrait"
                  className="w-full h-full max-h-[380px] object-contain hover:scale-[1.02] transition-transform duration-700 ease-in-out z-10"
                />
              </div>
              
              {/* Right Side: Founder Information (63% width) */}
              <div className="w-full md:w-[63%] p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-[#B89765] tracking-[0.3em] uppercase mb-2 block">
                  Executive Leadership
                </span>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#000000] tracking-tight mb-1">
                  N. VIJAY KUMAR
                </h2>
                
                <div className="text-[10px] font-bold text-[#808080] tracking-[0.25em] uppercase mb-4">
                  FOUNDER & MANAGING DIRECTOR
                </div>
                
                {/* Subtle Gold Divider Accent */}
                <div className="w-16 h-[2px] bg-[#B89765] mb-6" />
                
                <div className="text-[13px] md:text-[14px] text-[#4D4D4D] font-medium leading-[1.7] space-y-4 max-w-2xl">
                  <p>
                    <strong className="text-black font-semibold">Mr. N. Vijay Kumar</strong> is the Founder & Managing Director of <strong className="text-black font-semibold">Excel Ardor Pvt. Ltd.</strong>. With extensive experience in heavy engineering, fabrication, hydraulic systems, and precision manufacturing, he has played a key role in building the organization into a trusted engineering and manufacturing partner.
                  </p>
                  <p>
                    He founded <strong className="text-black font-semibold">Excel Hydraulics & Equipments</strong> in 2010 and successfully developed and patented an <strong className="text-black font-semibold">Internal Hydraulic Telescopic Mast System</strong>, demonstrating his commitment to innovation and indigenous technology development. In 2014, he established <strong className="text-black font-semibold">Excel Ardor Pvt. Ltd.</strong> to focus on advanced <strong className="text-black font-semibold">Telescopic Mast Systems, Defence Components, Aerospace Precision Components, and Precision Engineering Solutions</strong>.
                  </p>
                  <p>
                    Under his leadership, the company continues to drive excellence in defence, aerospace, hydraulics, and advanced manufacturing, supporting India's growing industrial and strategic sectors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. DIRECTOR PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden border border-black/[0.02]"
          >
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Left Side: Portrait Image (37% width) */}
              <div className="w-full md:w-[37%] min-h-[340px] md:min-h-[460px] relative bg-[#F4F3F0] flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-black/[0.03]">
                <img
                  src="/peopleimg/Commodore Praveen Chandra.png"
                  alt="Commodore Praveen Chandra Portrait"
                  className="w-full h-full max-h-[380px] object-contain hover:scale-[1.02] transition-transform duration-700 ease-in-out z-10"
                />
              </div>
              
              {/* Right Side: Director Information (63% width) */}
              <div className="w-full md:w-[63%] p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-[#B89765] tracking-[0.3em] uppercase mb-2 block">
                  Strategic Advisor
                </span>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#000000] tracking-tight mb-1">
                  COMMODORE PRAVEEN CHANDRA
                </h2>
                
                <div className="text-[10px] font-bold text-[#808080] tracking-[0.25em] uppercase mb-4">
                  DIRECTOR
                </div>
                
                {/* Subtle Gold Divider Accent */}
                <div className="w-16 h-[2px] bg-[#B89765] mb-6" />
                
                <div className="text-[13px] md:text-[14px] text-[#4D4D4D] font-medium leading-[1.7] space-y-4 max-w-2xl">
                  <p>
                    <strong className="text-black font-semibold">Commodore Praveen Chandra</strong> is a distinguished defence technology expert, strategic advisor, and Director at <strong className="text-black font-semibold">Excel Ardor Pvt. Ltd.</strong> An IIT Kharagpur Gold Medalist with a specialization in Electronics & Communication Engineering, he brings decades of experience in defence systems, advanced communication technologies, and indigenous innovation.
                  </p>
                  <p>
                    He has worked closely with organizations such as <strong className="text-black font-semibold">DRDO, BEL, BDL, and the Indian Navy</strong>, contributing to advanced antenna systems, communication platforms, and technology development initiatives.
                  </p>
                  <p>
                    His expertise in engineering, strategic partnerships, and business development plays a vital role in strengthening the company’s growth in aerospace, defence, and advanced manufacturing sectors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── TEAM MEMBERS SECTION ─── */}
        <div className="max-w-[1050px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 inline-block">
              Board & Management
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Core Leadership & Engineering
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                className="bg-white rounded-[24px] p-8 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group border border-black/[0.02] h-full"
              >
                {/* Avatar Image */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#EDEBE8] group-hover:border-blue-50 transition-colors mb-6 shadow-sm flex-shrink-0">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-[19px] font-bold text-black mb-1 tracking-tight">{member.name}</h3>
                <span className="text-[12px] font-bold text-black/40 uppercase tracking-wider mb-6 block">
                  {member.role}
                </span>

                {/* Description */}
                <p className="text-[13px] text-black/60 leading-relaxed font-medium italic flex-grow">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;