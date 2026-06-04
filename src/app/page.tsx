"use client";

import React from "react";

import dynamic from "next/dynamic";

// Layout Components
import Footer from "@/components/layout/Footer";

// Section Components - Static for critical above-the-fold
import Hero from "@/components/sections/Hero";

// Section Components - Dynamic for performance
const MajorCustomers = dynamic(() => import("@/components/sections/MajorCustomers"), { ssr: true });
const Expertise = dynamic(() => import("@/components/sections/Expertise"), { ssr: true });
const Strengths = dynamic(() => import("@/components/sections/Strengths"), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner"), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: true });

export default function Home() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentHero = document.getElementById("home");
    if (currentHero) observer.observe(currentHero);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative text-white font-sans overflow-x-hidden bg-[#E9E5DF]">
      {/* ─── PREMIUM VIDEO BACKGROUND (Contained to Hero) ─── */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 bg-black" style={{ transform: "translateZ(0)" }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/backgroundvideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="flex flex-col relative text-black">
        {/* 1. HERO SECTION (Above Video) */}
        <div id="home" className="relative z-10 h-screen pointer-events-none">
          <div className="pointer-events-auto h-full w-full">
            <Hero />
          </div>
        </div>

        {/* ─── WHITE REVEAL SECTION ─── */}
        <div className="relative z-20 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex flex-col min-h-screen">
          {/* PROJECTS SECTION */}
          <div id="projects">
            <Projects />
          </div>

          {/* MAJOR CUSTOMERS */}
          <MajorCustomers />

          {/* EXPERTISE SECTION */}
          <Expertise />
          
          {/* SERVICES SECTION */}
          <Services />

          {/* STRENGTHS SECTION */}
          <Strengths />

          {/* TESTIMONIALS SECTION */}
          <div id="testimonials">
            <Testimonials />
          </div>

          {/* CONTACT SECTION */}
          <div id="contact" className="bg-[#EDEBE8]">
            <CtaBanner />
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}