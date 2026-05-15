"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Team Data (extracted from previous Testimonials + User input exactly as requested)
const TEAM = [
  {
    name: "N Vijay Kumar",
    role: "Founder, Managing Director",
    quote: "N. Vijay Kumar is the Founder and Director. Experience over 20 years in the areas of Hydraulics, SPMs and Telescopic Masts. Granted a Patent by Govt. of India for : INTERNAL HYDRAULIC TELESCOPIC MAST.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200",
  },
  {
    name: "C.Praveen Chandra",
    role: "Director (Technology Director)",
    quote: "Post graduate in Metallurgy from IISc, Bengaluru. Worked for Tata Steel, flagship of Tata Group. Experience of nearly 20 years of strategy and business development. Widely travelled abroad.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
  },
  {
    name: "M R Krishnamraju",
    role: "Director",
    quote: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    name: "Ch Sudheer",
    role: "Design Engineer (Mechanical)",
    quote: "Mechanical Engineering Graduate. Having 5 Years of Experience in Designing of Masts & SPMs and Production Management.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    name: "P Prasad",
    role: "Technical Consultant (Mechanical)",
    quote: "Holds Masters in Mechanical engineering. Having experience of 30years in the field of designing, Manufacturing, Planning, Quality and Troubleshooting.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    name: "N Rajasekhar",
    role: "Engineer (Mechanical)",
    quote: "Diploma Graduate. Having 12 Year of Experience in the field of Fitter and Supervising the workshop.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    name: "Sunny",
    role: "Designer",
    quote: "Mechanical Engineering Graduate. Having 3 Years of Experience in Designing of Engineering Precision Components.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },

];

const About = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#EDEBE8] py-24 md:py-32 font-sans overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-10"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-black/80 font-medium text-[16px] md:text-[20px] leading-[1.8] max-w-4xl"
          >
            Excel Ardor Pvt. Ltd., established in 2014 and headquartered in Hyderabad, is an engineering and manufacturing company specializing in precision mechanical systems and advanced hydraulic solutions. Focused on defence, aerospace, and industrial domains, the company develops customized solutions that ensure high performance, reliability, and precision in complex environments.
          </motion.p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Avatar Image */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#EDEBE8] group-hover:border-blue-50 transition-colors mb-6">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-[20px] font-bold text-black mb-1">{member.name}</h3>
              <span className="text-[14px] font-medium text-black/50 uppercase tracking-wide mb-6 block">
                {member.role}
              </span>


              {/* Description */}
              <p className="text-[14px] text-black/70 leading-relaxed font-medium italic">
                &ldquo;{member.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;