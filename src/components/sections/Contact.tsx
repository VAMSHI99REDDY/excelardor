"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative w-full pt-20 pb-20 bg-[#BEBEB8] flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12">
        {/* Contact Information & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* Left: Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.05)] w-full"
          >
            <h3 className="text-2xl font-bold text-black mb-8 border-b border-black/10 pb-4">
              Contact Details
            </h3>

            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Location */}
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#BEBEB8] text-black flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-[11px] sm:text-xs text-black/50 tracking-wider uppercase mb-1">
                    Location
                  </span>
                  <p className="text-black font-medium text-sm sm:text-base md:text-lg leading-relaxed break-words">
                    D-165/A, Phase - 3, IDA Jeedimetla, Apurupa Colony, Suraram, Hyderabad, Telangana 500055
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#BEBEB8] text-black flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-[11px] sm:text-xs text-black/50 tracking-wider uppercase mb-1">
                    Phone
                  </span>
                  <p className="text-black font-medium text-sm sm:text-base md:text-lg leading-relaxed break-words">
                    +91 9989166874 <br /> +91 40 2380 0049
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#BEBEB8] text-black flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-[11px] sm:text-xs text-black/50 tracking-wider uppercase mb-1">
                    Email
                  </span>
                  <p className="text-black font-medium text-sm sm:text-base md:text-lg leading-relaxed break-all sm:break-words">
                    design.excelardor@gmail.com
                  </p>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#BEBEB8] text-black flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-[11px] sm:text-xs text-black/50 tracking-wider uppercase mb-1">
                    Company
                  </span>
                  <p className="text-black font-medium text-sm sm:text-base md:text-lg leading-relaxed break-words">
                    Excel Ardor Pvt. Ltd.
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#BEBEB8] text-black flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-[11px] sm:text-xs text-black/50 tracking-wider uppercase mb-1">
                    Working Hours
                  </span>
                  <p className="text-black font-medium text-sm sm:text-base md:text-lg leading-relaxed break-words">
                    Mon–Sat, 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.05)] w-full"
          >
            <h3 className="text-2xl font-bold text-black mb-8 border-b border-black/10 pb-4">
              Send us a Message
            </h3>

            <form 
              className="flex flex-col gap-6" 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

                const bodyText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`;
                
                const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=design.excelardor@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
                window.open(mailUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black/70 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#BEBEB8]/50 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black/70 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#BEBEB8]/50 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-black/70 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91-0000000000"
                    className="w-full bg-[#BEBEB8]/50 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-black/70 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Engineering Inquiry"
                    className="w-full bg-[#BEBEB8]/50 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-black/70 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help you..."
                  className="w-full bg-[#BEBEB8]/50 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full md:w-auto self-start bg-transparent text-black px-10 py-4 rounded-xl font-bold tracking-widest uppercase border border-black/20 hover:border-black/50 hover:scale-[1.02] hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Embedded Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-6 md:px-12 mt-16 w-full group"
      >
        <div className="relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 group-hover:border-white transition-all duration-500">
          {/* Real Interactive Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.83615560934!2d78.4385714!3d17.5316619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f00736fca55%3A0xb4fbaa45456cb7a5!2sExcel%20Ardor%20Private%20Limited!5e0!3m2!1sen!2sin!4v1714995000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Excel Ardor Location Map"
            className="w-full h-full"
          ></iframe>

          {/* Clickable Overlay to Open Google Maps Navigation */}
          <a
            href="https://maps.app.goo.gl/FrAvosoBzk3RJy1G9"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 hover:bg-black/5 transition-all duration-300 group"
          >
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-black/5">
              <MapPin size={20} className="text-blue-600" />
              <span className="text-black font-bold text-sm uppercase tracking-widest">Open in Google Maps</span>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
