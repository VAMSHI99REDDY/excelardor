"use client";
import React from "react";
import { motion } from "framer-motion";
const allLogos = [
  { name: "BHEL", src: "/logos/BHEL.png" },
  { name: "DRDO", src: "/logos/DRDO.png" },
  { name: "DRDO ASL", src: "/logos/DRDO-ASL.webp" },
  { name: "ECIL", src: "/logos/ECIL.png" },
  { name: "VIZAG STEEL", src: "/logos/VS.jpg" },
  { name: "BHARAT ELECTRONICS", src: "/logos/BE.png" },
  { name: "ARC", src: "/logos/ARC.png" },
  { name: "NAVSTAR", src: "/logos/NAVSTAR.png" },
  { name: "EASTERN NAVAL COMMAND", src: "/logos/ENC.png" },
  { name: "FLIC", src: "/logos/FLIC.png" },
  { name: "EnerTech", src: "/logos/EnerTech.png" },
  { name: "ACD", src: "/logos/ACD.jpg" },
  { name: "NAV", src: "/logos/NAV.webp" },
  { name: "NFC", src: "/logos/NFC.jpg" },
  { name: "NSTL", src: "/logos/NSTL.png" },
  { name: "NAVAL DOCKYARD", src: "/logos/Naval Dockyard emblem, Visakhapatnam.png" },
  { name: "RCI", src: "/logos/RCI.jpg" },
  { name: "KAASHYAP", src: "/logos/kaashyap.png" },
  { name: "ZETATEK", src: "/logos/zetatek.png" },
  { name: "ADANI DEFENCE", src: "/logos/adani.png" },
  { name: "BDL", src: "/logos/BDL.png" },
];

const LogoTickerRow = ({ logos, speed, reverse = false }: { logos: { name: string; src: string }[], speed: number, reverse?: boolean }) => {
  return (
    <div className="flex w-max"
      style={{ 
        animation: `scroll ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        willChange: 'transform'
      }}>
      {[...Array(2)].map((_, arrayIndex) => (
        <div key={arrayIndex} className="flex">
          {logos.map((logo, idx) => (
            <div
              key={`${arrayIndex}-${idx}`}
              className="w-40 h-40 md:w-52 md:h-52 flex-shrink-0 flex items-center justify-center p-6 bg-transparent relative"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-w-[70%] max-h-[70%] object-contain pointer-events-none transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default function MajorCustomers() {
  const half = Math.ceil(allLogos.length / 2);
  const row1 = allLogos.slice(0, half);
  const row2 = allLogos.slice(half);
  return (
    <section className="bg-white pt-16 md:pt-20 pb-8 md:pb-10 overflow-hidden text-black block w-full relative">
      <div className="container mx-auto px-6 md:px-12 mb-10 w-full text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-blue-600 font-bold text-[12px] md:text-[14px] tracking-[0.25em] uppercase mb-6 inline-block"
        >
          Trusted Partners
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.1] mb-6"
        >
          Powering the Arsenal <br />
          <span className="text-black/30 italic font-light tracking-tighter">of the Nation</span>
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col bg-transparent">
        <LogoTickerRow logos={row1} speed={25} />
        <LogoTickerRow logos={row2} speed={30} reverse={true} />
      </div>

      <div className="flex justify-center mt-8 relative z-20">
        <div className="w-24 h-1 rounded-full overflow-hidden flex opacity-50">
          <div className="flex-1" style={{ backgroundColor: 'rgb(255, 103, 31)' }}></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1" style={{ backgroundColor: 'rgb(4, 106, 56)' }}></div>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}