"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How do I apply?", a: "You can apply by clicking the 'Apply Now' button on any open job listing and filling out the online application form." },
  { q: "Can freshers apply?", a: "Yes! We have roles specifically for freshers, such as Helpers and junior positions. Look for '0 Years' in the experience requirement." },
  { q: "What is the hiring process?", a: "Our typical process involves an online application, resume screening, a technical interview, an HR discussion, and finally the offer." },
  { q: "When will I receive a response?", a: "Our HR team usually reviews applications within 3-5 business days. We will contact you if your profile matches our requirements." },
];

const CareersFAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-gray-50 py-24 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-black tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-black text-lg">{faq.q}</span>
                <ChevronDown size={20} className={`text-[#4A6B35] transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersFAQ;
