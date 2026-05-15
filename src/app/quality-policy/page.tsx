"use client";

import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";

export default function QualityPolicyPage() {
  return (
    <main className="relative min-h-screen font-sans text-black overflow-hidden bg-[#EDEBE8]">
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                <Award size={14} />
                Excellence in Engineering
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black mb-6">
                Quality Policy
              </h1>
              <p className="text-black/40 text-lg font-medium tracking-tight">
                Our commitment to precision, reliability, and continuous improvement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-[40px] shadow-sm border border-black/5 p-10 md:p-16 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
              
              <div className="relative z-10 space-y-8">
                <div className="text-2xl md:text-3xl font-bold leading-relaxed text-black/80 italic">
                  "We are committed to enhance customer satisfaction and achieve sustainable growth through:"
                </div>

                <div className="grid gap-6">
                  {[
                    "Development, Manufacture and supply of Products to the satisfaction of customers;",
                    "Providing Maintenance Services and support to the satisfaction of customers;",
                    "Complying with requirements and continual improvement of the quality management system;",
                    "Integration of quality management system requirements into the business processes of Excel Ardor."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <p className="text-lg text-black/60 font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-black/5 mt-10">
                  <p className="text-black/50 leading-relaxed font-medium">
                    This Quality Policy is communicated to all persons within Excel Ardor and is made available to relevant interested parties, as appropriate.
                  </p>
                  <div className="mt-8">
                    <p className="font-black text-black uppercase tracking-widest text-sm">Director</p>
                    <p className="text-black/30 font-bold uppercase tracking-widest text-[10px] mt-1">Excel Ardor Private Limited</p>
                  </div>
                </div>
              </div>
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
