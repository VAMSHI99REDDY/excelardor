"use client";

import React from "react";
import { Hammer, Settings, Layers, Zap, Cog, ShieldCheck, Factory, Box } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Precision Mechanical Components",
    description: "Sub assemblies and components tailored for Defense and Aerospace applications.",
    icon: <Settings size={24} />,
    color: "from-blue-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
  },
  {
    title: "Precision Fabrication",
    description: "Specialized engineering and fabrication works for complex military systems.",
    icon: <Hammer size={24} />,
    color: "from-cyan-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800",
  },
  {
    title: "Decontamination Equipment",
    description: "Essential systems for maintaining safety and operational readiness.",
    icon: <ShieldCheck size={24} />,
    color: "from-emerald-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800",
  },
  {
    title: "Composite & FRP Components",
    subtitle: "Aerospace, Defence & Customized Applications",
    description: "Providing lightweight, durable, and precision-engineered Composite and FRP solutions for Aerospace, Defence, and customized industrial requirements.",
    icon: <Layers size={24} />,
    color: "from-orange-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800",
  },
  {
    title: "Telescopic Masts",
    description: "Electro Mechanical, Pneumatic, Hydraulic, Push Fit, and Hand Crank winch options.",
    icon: <Layers size={24} />,
    color: "from-indigo-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1508247271404-5161d9a04f2f?q=80&w=800",
  },
  {
    title: "Annual Maintenance Support for Telescopic Mast",
    description: "Providing reliable annual maintenance services to ensure optimal performance and extended life of telescopic mast systems.",
    icon: <Cog size={24} />,
    color: "from-teal-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1518314916301-73c13b10c662?q=80&w=800",
  },
  {
    title: "Industrial Hydraulic Equipment",
    description: "Highly precise hydraulic systems designed for stability and durability.",
    icon: <Cog size={24} />,
    color: "from-blue-600/20 to-transparent",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800",
  },
  {
    title: "Special Purpose Machines",
    description: "Custom machines developed specifically for specialized defense applications.",
    icon: <Zap size={24} />,
    color: "from-purple-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800",
  },
  {
    title: "Automatic Storage Systems",
    description: "Intelligent storage solutions optimize space and accessibility.",
    icon: <Box size={24} />,
    color: "from-slate-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1553413002-9c65ce1e582d?q=80&w=800",
  },
  {
    title: "Scrubbers for Process Plants",
    description: "Efficient scrubbing systems for environmental and process control.",
    icon: <Factory size={24} />,
    color: "from-teal-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1518314916301-73c13b10c662?q=80&w=800",
  },
  {
    title: "Custom Designing Products",
    description: "Delivering innovative, precision-engineered custom products tailored to unique industrial, defense, and aerospace requirements.",
    icon: <Settings size={24} />,
    color: "from-teal-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1518314916301-73c13b10c662?q=80&w=800",
  },
  {
    title: "Service Support for End Product",
    description: "Offering dedicated end-product service support for seamless operation, maintenance, and long-term customer satisfaction.",
    icon: <ShieldCheck size={24} />,
    color: "from-teal-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1518314916301-73c13b10c662?q=80&w=800",
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background radial glow removed for clean look */}

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-blue-600 font-semibold text-xs tracking-[0.3em] uppercase mb-6 inline-block"
            >
              Our Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight"
            >
              Precision Solutions for <br />
              <span className="text-black italic font-light tracking-tighter">Critical Industries</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-black/60 font-medium text-lg leading-relaxed max-w-xl"
            >

            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-black text-sm md:text-base max-w-sm leading-relaxed mb-2 font-medium"
          >


          </motion.div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px bg-black/5 border border-black/10 rounded-[24px] overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="group bg-transparent p-8 flex flex-col h-full relative overflow-hidden transition-colors duration-500 hover:bg-black/5"
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 text-black/40 group-hover:text-blue-600 transition-colors duration-500">
                  {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 20 })}
                </div>
                
                <div className="flex flex-col h-full">
                  <h3 className={`text-lg font-bold text-black ${service.subtitle ? "mb-1" : "mb-3"} leading-tight`}>
                    {service.title}
                  </h3>
                  {/* {service.subtitle && (
                    <p className="text-black font-semibold text-[11px] uppercase tracking-wider mb-3">
                      {service.subtitle}
                    </p>
                  )}
                  <p className="text-black/60 font-medium text-[13px] leading-relaxed mb-4 xl:mb-0 flex-grow">
                    {service.description}
                  </p> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex justify-center mt-24 md:mt-32 mb-4 md:mb-8 px-4"
        >
          <p className="text-center text-gray-700 font-medium text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed text-balance mx-auto">
            We provide a comprehensive range of precision mechanical and hydraulic products, engineered for mission-critical reliability.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
