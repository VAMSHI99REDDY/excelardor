"use client";

import React from "react";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen font-sans text-black overflow-hidden bg-[#EDEBE8]">
        
        {/* Render the dedicated About section */}
        <About />

        {/* Use footer wrapped properly to match styling */}
        <div className="bg-black text-white relative z-10 w-full rounded-t-[2.5rem]">
          <Footer />
        </div>
      </main>
  );
}
