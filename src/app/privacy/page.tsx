"use client";

import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                <ShieldCheck size={14} />
                Data Integrity & Trust
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black mb-6">
                Privacy Policy
              </h1>
              <p className="text-black/40 text-lg font-medium tracking-tight">
                How Excel Ardor Private Limited protects and manages your information.
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
                  &ldquo;Your privacy is a priority. We take every measure to ensure your personal data remains secure and confidential.&rdquo;
                </div>

                <div className="grid gap-6">
                  {[
                    "Excel Ardor Private Limited collects basic personal information such as name, email address, phone number, and company details when users contact us through the website.",
                    "The information collected is used only for business purposes, including responding to inquiries, providing services, improving user experience, and maintaining communication.",
                    "We may also collect technical data such as IP address, browser type, and website usage information to enhance website performance.",
                    "All collected data is kept secure, and we take appropriate measures to protect it from unauthorized access, misuse, or disclosure.",
                    "We do not sell, rent, or share personal information with third parties, except when required by law or for essential business operations with trusted partners.",
                    "Our website may use cookies to improve functionality and user experience. Users can disable cookies through their browser settings.",
                    "The website may contain links to third-party websites, and we are not responsible for their privacy practices.",
                    "We retain user information only for as long as necessary for business or legal purposes.",
                    "Users have the right to request access, correction, or deletion of their personal data by contacting us.",
                    "Excel Ardor Private Limited may update this Privacy Policy from time to time, and changes will be reflected on this page."
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
                  <div className="bg-[#F9F8F6] p-8 rounded-[2rem] border border-black/5">
                    <p className="font-black text-black uppercase tracking-widest text-sm mb-4">Contact Information</p>
                    <div className="space-y-2 text-black/60 font-medium">
                      <p>For any privacy-related concerns, please contact us at:</p>
                      <p className="text-blue-600">excelardor@gmail.com</p>
                      <p>+91 40 2380 0049</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="font-black text-black uppercase tracking-widest text-sm">Legal Department</p>
                    <p className="text-black/30 font-bold uppercase tracking-widest text-[10px] mt-1">Excel Ardor Private Limited</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-black text-white relative z-10 w-full rounded-t-[2.5rem]">
          <Footer />
        </div>
      </main>
  );
}
