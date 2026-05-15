"use client";

import Footer from "@/components/layout/Footer";

import { motion } from "framer-motion";
import { FileBadge, Download, Maximize2 } from "lucide-react";
import Image from "next/image";

const CERTIFICATES = [
  {
    title: "Patent Certificate",
    description: "Internal Hydraulic Telescopic Mast - Patent No. 373182",
    image: "/Certifications/patent.png",
    category: "Intellectual Property"
  },
  {
    title: "ISO 9001:2015 (HYM)",
    description: "Quality Management System - Design, Engineering & Manufacturing",
    image: "/Certifications/iso_hym.png",
    category: "Quality Management"
  },
  {
    title: "ISO 9001:2015 (Assurance)",
    description: "Quality Management System - Manufacture of Precision Components",
    image: "/Certifications/iso_assurance.png",
    category: "International Standard"
  },
  {
    title: "Certificate of Incorporation",
    description: "Excel Ardor Private Limited - Ministry of Corporate Affairs",
    image: "/Certifications/incorporation.png",
    category: "Legal Registration"
  },
  {
    title: "GST Registration Certificate",
    description: "Government of India & Telangana - Form GST REG-25",
    image: "/Certifications/gst.png",
    category: "Tax Compliance"
  }
];

export default function CertificationsPage() {
  return (
    <main className="relative min-h-screen font-sans text-black overflow-hidden bg-[#EDEBE8]">

        <div className="pt-32 pb-20">
          <div className="container mx-auto px-8 max-w-7xl">
            {/* Header section mirroring legal styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                <FileBadge size={14} />
                Compliance & Excellence
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-6">
                Certifications
              </h1>
              <p className="text-black/40 text-lg md:text-xl font-medium tracking-tight max-w-2xl mx-auto">
                Official documentation, quality patents, and legal registrations ensuring the highest standards of engineering precision.
              </p>
            </motion.div>

            {/* Grid display with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CERTIFICATES.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Certificate Image Preview */}
                  <div className="relative aspect-[3/4] bg-stone-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 z-10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-4">
                      </div>
                    </div>
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain object-center p-4 transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?q=80&w=800";
                      }}
                    />
                  </div>

                  {/* Caption/Details */}
                  <div className="p-8">
                    <div className="text-[10px] uppercase font-black tracking-widest text-blue-600 mb-2 truncate">
                      {cert.category}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">{cert.title}</h3>
                    <p className="text-sm text-black/50 font-medium leading-relaxed leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Verification Note (Bottom) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-20 p-8 rounded-[2rem] bg-white/50 border border-black/5 text-center max-w-2xl mx-auto"
            >
              <p className="text-sm text-black/40 font-medium">
                All certificates displayed are authentic and registered under Excel Ardor Private Limited. For verification or physical copies, please contact our legal department.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Use footer wrapped properly to match styling */}
        <div className="bg-black text-white relative z-10 w-full rounded-t-[2.5rem]">
          <Footer />
        </div>
      </main>
  );
}
