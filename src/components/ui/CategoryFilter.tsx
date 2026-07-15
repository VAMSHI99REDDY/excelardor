"use client";

import React from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/projectsData";

interface CategoryFilterProps {
  active: string;
  onChange: (cat: string) => void;
  counts: Record<string, number>;
}

const CategoryFilter = ({ active, onChange, counts }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center w-full bg-[#EDEBE8] p-2 rounded-3xl md:rounded-full">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        const count = cat === "Show All"
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[cat] ?? 0);

        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileTap={{ scale: 0.96 }}
            className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em]
                        border transition-all duration-300 select-none whitespace-nowrap
                        ${isActive
                          ? "bg-white text-black border-white shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
                          : "bg-transparent text-black/40 border-transparent hover:bg-black/5 hover:text-black/80"
                        }`}
          >
            {cat}
            {/* Count badge */}
            <span
              className={`ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-black
                          ${isActive ? "bg-black/10 text-black" : "bg-black/5 text-black/40"}`}
            >
              {count}
            </span>

            {/* Active underline */}
            {isActive && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-white -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
