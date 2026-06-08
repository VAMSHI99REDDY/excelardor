"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Projects", href: "/projects" },
        { name: "Our Infrastructure", href: "/#infrastructure" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Quality Policy", href: "/quality-policy" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Certifications", href: "/certifications" },
        // { name: "Terms & Conditions", href: "#" },

        // { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#E9E5DF] text-black/60 pt-20 pb-16 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-500">
                <Image
                  src="/Logo/Untitled design logo.png"
                  alt="Excel Ardor Logo"
                  width={120}
                  height={120}
                  quality={100}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* <span className="text-black text-2xl font-bold tracking-tighter">
                EXCEL ARDOR
              </span> */}
              <span className="text-[#4A6B35] text-2xl font-bold tracking-tighter">
                EXCEL ARDOR
              </span>
            </Link>
            <p className="text-lg leading-relaxed max-w-sm font-light">
              Engineering the vanguard of industrial precision hydraulic systems. Delivering mission-critical reliability for global defense and aerospace sectors.
            </p>
            <div className="flex gap-4 md:gap-6">
              {[Linkedin, Twitter, Instagram].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 hover:bg-white transition-all duration-500 active:scale-95 cursor-pointer shadow-sm"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4 md:space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30 whitespace-nowrap">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-black transition-colors duration-300 flex items-center group"
                      >
                        {link.name}
                        <ArrowRight size={12} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">
              Headquarters
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-1 shrink-0 opacity-40" />
                <span className="text-sm leading-relaxed">
                  D-165/A,Phase - 3, IDA Jeedimetla, Apurupa Colony, Suraram, Hyderabad, Telangana 500055
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-primary shrink-0 opacity-40" />
                <span className="text-sm">+91 9989166874 <br /> +91 4023800049</span>
              </div>
              <div className="flex items-center gap-4">

                <Mail size={18} className="text-primary shrink-0 opacity-40" />
                <span className="text-sm">excelardor@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 md:pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-medium text-center md:text-left">
          <p className="w-full md:w-auto text-balance">© {currentYear} Excel Ardor Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 w-full md:w-auto">
            <Link href="#" className="hover:text-black transition-colors py-2 md:py-0">Career</Link>
            <Link href="#" className="hover:text-black transition-colors py-2 md:py-0">Portal</Link>
            <div className="flex items-center gap-2 py-2 md:py-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-black/50 whitespace-nowrap">Global Status: Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
