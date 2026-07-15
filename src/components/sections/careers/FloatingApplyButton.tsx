"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const FloatingApplyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero, hide when near bottom
      const scrollY = window.scrollY;
      const isPastHero = scrollY > 500;
      const isNearBottom = window.innerHeight + scrollY >= document.body.offsetHeight - 500;
      
      setIsVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          onClick={() => document.getElementById("job-openings")?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-[9000] flex items-center gap-2 bg-[#4A6B35] text-white px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm shadow-[0_10px_30px_rgba(74,107,53,0.4)] hover:shadow-[0_15px_40px_rgba(74,107,53,0.5)] hover:-translate-y-1 transition-all group"
        >
          Apply Now
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingApplyButton;
