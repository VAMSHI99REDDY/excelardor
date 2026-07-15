"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building, Clock, Loader2 } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<"success" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusType(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const companyName = formData.get('companyName') as string || 'N/A';
    const hearAboutUs = formData.get('hearAboutUs') as string || '';
    const industry = formData.get('industry') as string || '';
    const application = formData.get('application') as string || '';
    const mastHeight = formData.get('mastHeight') as string || '';
    const devicesCount = formData.get('devicesCount') as string || '';
    const devicesWeight = formData.get('devicesWeight') as string || '';
    const name = formData.get('name') as string || '';
    const email = formData.get('email') as string || '';
    const phone = formData.get('phone') as string || '';
    const message = formData.get('message') as string || '';

    const subject = `New Application Inquiry - ${companyName !== 'N/A' ? companyName : name}`;
    
    const body = `New Application Inquiry

Company Name:
${companyName}

How Did You Hear About Us:
${hearAboutUs}

Industry:
${industry}

Application:
${application}

Required Mast Height:
${mastHeight}

Number of Devices:
${devicesCount}

Total Weight:
${devicesWeight}

Contact Person:
${name}

Email:
${email}

Phone:
${phone}

Project Requirements:

${message}

Submitted On:
${new Date().toLocaleString()}`;

    const mailtoLink = `mailto:bhaskarvamshi99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    setStatusType("success");
    setIsSubmitting(false);
  };

  return (
    <section className="relative w-full pt-20 pb-20 bg-white flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12">
        {/* Contact Information & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* Left: Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.25)] border border-black/[0.03] w-full"
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
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=D-165/A,+Phase-3,+IDA+Jeedimetla,+Apurupa+Colony,+Suraram,+Hyderabad,+Telangana+500055"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open company location in Google Maps"
                    className="text-black font-medium text-sm sm:text-base md:text-lg leading-relaxed break-words block cursor-pointer"
                  >
                    D-165/A, Phase - 3, IDA Jeedimetla, Apurupa Colony, Suraram, Hyderabad, Telangana 500055
                  </a>
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
                    +91 9989166874 <br /> +91 4023800049
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
                    excelardor@gmail.com
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
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.25)] border border-black/[0.03] w-full"
          >
            <h3 className="text-2xl font-bold text-black mb-8 border-b border-black/10 pb-4 uppercase tracking-wider">
              Application Requirements Form
            </h3>

            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              {statusType === 'success' && (
                <div className="p-6 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                    ✉️ Email Application Opened
                  </h4>
                  <p className="mb-2">Your email application has been opened with your inquiry pre-filled.</p>
                  <p>Please review the information and click <strong>Send</strong> in your email client to submit your inquiry.</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm"
                  />
                </div>

                {/* How Did You Hear About Us */}
                <div>
                  <label htmlFor="hearAboutUs" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    How Did You Hear About Us? *
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    required
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Option</option>
                    <option value="Search Engine" className="bg-white">Search Engine</option>
                    <option value="Direct Contact" className="bg-white">Direct Contact</option>
                    <option value="Exhibition / Event" className="bg-white">Exhibition / Event</option>
                    <option value="Industry Referral" className="bg-white">Industry Referral</option>
                    <option value="Social Media" className="bg-white">Social Media</option>
                    <option value="Other" className="bg-white">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    What Industry Are You In? *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Industry</option>
                    <option value="Defense & Aerospace" className="bg-white">Defense & Aerospace</option>
                    <option value="Telecommunications" className="bg-white">Telecommunications</option>
                    <option value="Meteorological" className="bg-white">Meteorological</option>
                    <option value="Broadcasting" className="bg-white">Broadcasting</option>
                    <option value="Security & Surveillance" className="bg-white">Security & Surveillance</option>
                    <option value="Oil & Gas" className="bg-white">Oil & Gas</option>
                    <option value="Other" className="bg-white">Other</option>
                  </select>
                </div>

                {/* Application */}
                <div>
                  <label htmlFor="application" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    What Is Your Application? *
                  </label>
                  <select
                    id="application"
                    name="application"
                    required
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Application</option>
                    <option value="Radio / Antenna Mounting" className="bg-white">Radio / Antenna Mounting</option>
                    <option value="Camera / Surveillance" className="bg-white">Camera / Surveillance</option>
                    <option value="Lighting / Searchlight" className="bg-white">Lighting / Searchlight</option>
                    <option value="Radar Systems" className="bg-white">Radar Systems</option>
                    <option value="Weather Station Sensors" className="bg-white">Weather Station Sensors</option>
                    <option value="Other" className="bg-white">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mast Height */}
                <div>
                  <label htmlFor="mastHeight" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Required Mast Height? *
                  </label>
                  <select
                    id="mastHeight"
                    name="mastHeight"
                    required
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Height</option>
                    {Array.from({ length: 15 }, (_, i) => i + 1).map((height) => (
                      <option key={height} value={`${height} Meter${height > 1 ? 's' : ''}`} className="bg-white">
                        {height} Meter{height > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Devices */}
                <div>
                  <label htmlFor="devicesCount" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Number of Devices on a Single Mast? *
                  </label>
                  <select
                    id="devicesCount"
                    name="devicesCount"
                    required
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Number</option>
                    {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num.toString()} className="bg-white">
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Weight of All Devices */}
                <div>
                  <label htmlFor="devicesWeight" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Total Weight of All Devices? *
                  </label>
                  <select
                    id="devicesWeight"
                    name="devicesWeight"
                    required
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm cursor-pointer"
                  >
                    <option value="" className="bg-white">Select Weight</option>
                    <option value="Under 10 Kg" className="bg-white">Under 10 Kg</option>
                    <option value="10 - 25 Kg" className="bg-white">10 - 25 Kg</option>
                    <option value="25 - 50 Kg" className="bg-white">25 - 50 Kg</option>
                    <option value="50 - 100 Kg" className="bg-white">50 - 100 Kg</option>
                    <option value="100 - 200 Kg" className="bg-white">100 - 200 Kg</option>
                    <option value="Over 200 Kg" className="bg-white">Over 200 Kg</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Enter phone number"
                    className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] font-bold text-black/75 mb-2 uppercase tracking-wider">
                  Project Requirements / Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  className="w-full bg-[#BEBEB8]/30 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all font-medium text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full bg-blue-600 hover:bg-black text-white px-10 py-4.5 rounded-xl font-bold tracking-widest uppercase hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
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
        <div className="relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 group-hover:border-black/10 transition-all duration-500">
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
