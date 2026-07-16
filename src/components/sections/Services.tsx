"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Cog, 
  Layers, 
  Hammer, 
  Target, 
  ShieldCheck, 
  CheckCircle,
  Wrench
} from "lucide-react";

const SHOWCASE_DATA = [
  {
    quote: "Engineering excellence begins with precision, innovation, and uncompromising quality.",
    person: {
      name: "P. Prasad",
      role: "Senior Mechanical Consultant",
      image: "", // Placeholder for premium corporate portrait
    },
    service: {
      title: "Precision Mechanical Components",
      description: "High-precision machined components manufactured to exacting standards for aerospace, defence, industrial and mobility applications.",
      icon: Settings,
    },
  },
  {
    quote: "Every machine we build is designed to solve complex manufacturing challenges with reliability and efficiency.",
    person: {
      name: "P. Sai Charan",
      role: "Additional Director",
      image: "/logos/peopleimg/P. Sai Charan – Additional Director.png",
    },
    service: {
      title: "Special Purpose Machines",
      description: "Custom-engineered automated systems and specialized machinery designed to optimize production and ensure operational excellence.",
      icon: Wrench,
    },
  },
  {
    quote: "Reliable hydraulic systems are built through precision manufacturing, rigorous testing, and continuous improvement.",
    person: {
      name: "Ch. Sudheer",
      role: "Plant Head & Operations Manager",
      image: "/logos/peopleimg/Mr. Ch. Sudheer – Plant Head & Operations Manager.png",
    },
    service: {
      title: "Industrial Hydraulic Equipment",
      description: "Advanced high-pressure hydraulic cylinders, actuators, and power packs engineered for maximum stability and endurance.",
      icon: Cog,
    },
  },
  {
    quote: "Innovation reaches greater heights when engineering precision meets structural excellence.",
    person: {
      name: "N. Rajasekhar",
      role: "Plant Supervisor",
      image: "/logos/peopleimg/Mr. N. Rajasekhar – Plant Supervisor & Maintenance Incharge.png",
    },
    service: {
      title: "Telescopic Masts",
      description: "Highly reliable Electro Mechanical, Pneumatic, and Hydraulic mast systems for radar, communication, and strategic surveillance.",
      icon: Layers,
    },
  },
  {
    quote: "Every successful product begins with intelligent design, uncompromising quality, and customer-focused engineering.",
    person: {
      name: "R. Sunny Babu",
      role: "Design & Quality Engineer",
      image: "", // Placeholder
    },
    service: {
      title: "Custom Engineering Solutions",
      description: "End-to-end design engineering, rigorous quality assurance, and custom fabrication tailored to unique industrial requirements.",
      icon: Hammer,
    },
  },
  {
    quote: "We don't just build components — we engineer mission-critical solutions with precision, reliability, and purpose.",
    person: {
      name: "N. Vijay Kumar",
      role: "Founder & Managing Director",
      image: "/logos/peopleimg/Mr. N. Vijay Kumar.png",
    },
    service: {
      title: "Precision Fabrication",
      description: "Specialized engineering and fabrication works for complex military systems, emphasizing indigenous technology development.",
      icon: Hammer,
    },
  },
  {
    quote: "Our focus is on indigenous innovation, advanced communication technologies, and strengthening India's strategic defense sectors.",
    person: {
      name: "Cdr. Praveen Chandra",
      role: "Director",
      image: "/logos/peopleimg/Commodore Praveen Chandra.png",
    },
    service: {
      title: "Defence & Aerospace Systems",
      description: "Advanced communication platforms, antenna systems, and strategic technology development for the defense ecosystem.",
      icon: ShieldCheck,
    },
  },
];

const BackgroundGraphics = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-overlay opacity-30">
    {/* Subtle concentric curves similar to the reference image */}
    <div className="absolute top-1/2 left-[60%] w-[120%] h-[150%] -translate-y-1/2 -translate-x-1/2 rounded-[100%] border border-black/5" />
    <div className="absolute top-1/2 left-[60%] w-[110%] h-[140%] -translate-y-1/2 -translate-x-1/2 rounded-[100%] border border-black/5" />
    <div className="absolute top-1/2 left-[60%] w-[100%] h-[130%] -translate-y-1/2 -translate-x-1/2 rounded-[100%] border border-black/5" />
    
    {/* Blueprint Grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #000 1px, transparent 1px),
          linear-gradient(to bottom, #000 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const data = SHOWCASE_DATA[activeIndex];
  const Icon = data.service.icon;

  // Cinematic Apple-style Framer Motion transitions
  const fadeSlideVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.97 },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, y: -30, filter: "blur(12px)", scale: 1.03 },
  };

  const transition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
  };

  return (
    <section
      id="services"
      className="relative min-h-[100vh] pt-32 pb-20 overflow-hidden font-sans flex items-center"
      // One seamless gradient background across the entire section
      style={{ 
        background: "linear-gradient(105deg, #ffffff 40%, #e6f0fa 60%, #0d2864 100%)" 
      }}
    >
      <BackgroundGraphics />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1500px]">
        {/* Unified 2-Column Layout */}
        <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] w-full gap-8 lg:gap-12">
          
          {/* LEFT: Quote (50%) */}
          <div className="lg:w-[50%] flex flex-col justify-center relative py-12">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${activeIndex}`}
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="relative z-10 flex flex-col"
              >
                {/* Quotation Mark */}
                <div className="text-[120px] font-serif leading-[0.5] text-black/[0.04] select-none absolute -top-4 -left-4">
                  &ldquo;
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-[36px] font-medium text-[#1e293b] leading-[1.3] tracking-tight mb-12 relative z-10 mt-8">
                  &ldquo;{data.quote}&rdquo;
                </h3>

                <div>
                  <div className="w-8 h-[2px] bg-blue-500 mb-6" />
                  <div className="text-lg font-bold text-black mb-1">{data.person.name}</div>
                  <div className="text-[15px] font-medium text-black/50">{data.person.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="absolute -bottom-4 left-0 flex gap-3">
              {SHOWCASE_DATA.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "bg-blue-600 scale-125" : "bg-black/15"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Team Member Portrait (50%) */}
          <div className="lg:w-[50%] relative flex justify-end items-end h-[500px] lg:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`portrait-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-end justify-end"
              >
                {/* Slow Zoom Effect on a slightly smaller container */}
                {data.person.image && (
                  <motion.div
                    className="w-full h-full relative flex justify-center items-end"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 5, ease: "linear" }}
                  >
                    <img
                      src={data.person.image}
                      alt={data.person.name}
                      className="h-[400px] w-[320px] lg:h-[520px] lg:w-[420px] object-cover object-top rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl"
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Glassmorphism Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeIndex}`}
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="absolute bottom-8 right-4 w-[260px] p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-20"
              >
                <h4 className="text-white text-lg font-bold tracking-tight mb-1">{data.person.name}</h4>
                <p className="text-white/80 text-xs font-medium">{data.person.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
