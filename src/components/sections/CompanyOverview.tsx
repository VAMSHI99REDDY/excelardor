import React from 'react';
import { motion } from 'framer-motion';

export default function CompanyOverview() {
  return (
    <section className="w-full bg-[#F2EDE7] pt-8 pb-4 md:pt-12 md:pb-8 flex justify-center">
      <div className="container mx-auto px-6 md:px-12 w-full max-w-[1200px]">

        <div className="flex flex-col mb-8 bg-white p-6 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5">
          {/* Top Row: Images Side by Side */}
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <img
                src="/companyimg/1.jpg"
                alt="Excel Ardor Display Room"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-3xl shadow-md border border-black/5"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <img
                src="/companyimg/2.jpg"
                alt="Excel Ardor Factory Floor"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-3xl shadow-md border border-black/5"
              />
            </motion.div>
          </div>

          {/* Centered Text Below Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full text-center mt-8 md:mt-10"
          >
            <p className="text-black/80 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight uppercase italic px-2">
              International military grade equipment used to develop precise and robust machinery
            </p>
          </motion.div>
        </div>



      </div>
    </section>
  );
}
