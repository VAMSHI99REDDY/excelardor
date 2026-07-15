"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SERVICES_DROPDOWN = [
  { name: "Industrial Automation", href: "/services#automation" },
  { name: "Mechanical Engineering", href: "/services#mechanical" },
  { name: "Electrical Engineering", href: "/services#electrical" },
  { name: "Fabrication", href: "/services#fabrication" },
  { name: "CNC Machining", href: "/services#cnc" },
  { name: "Project Consulting", href: "/services#consulting" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[9999] bg-white flex flex-col shadow-sm">
      {/* Top Branding Row */}
      <div className="w-full py-4 px-5 md:px-10 flex justify-center items-center border-b border-gray-100 relative">
        <Link
          href="/"
          className="flex items-center gap-3 relative z-10 group shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:rotate-6 transition-all duration-500">
            <Image
              src="/Logo/Untitled design logo.png"
              alt="Excel Ardor Logo"
              width={100}
              height={100}
              priority
              quality={100}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <span className="text-[#4A6B35] text-xl md:text-2xl font-black tracking-tighter uppercase">
            Excel Ardor
          </span>
        </Link>
        
        {/* Mobile Toggle inside Branding Row */}
        <button
          className="lg:hidden absolute right-5 p-2 text-black active:scale-90 transition-all hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Bottom Navigation Row (Desktop) */}
      <nav className="hidden lg:flex w-full justify-center items-center py-3 bg-white border-b border-gray-200 shadow-sm relative">
        <div className="flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/services" && pathname.startsWith("/services"));
            
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`text-[13px] font-bold transition-colors duration-300 uppercase tracking-widest flex items-center gap-1 ${
                      isActive ? "text-[#4A6B35]" : "text-gray-700 hover:text-[#4A6B35]"
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                  </Link>
                  <div
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#4A6B35] rounded-full transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col py-2">
                          {SERVICES_DROPDOWN.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="px-5 py-3 text-sm font-semibold text-gray-600 hover:text-[#4A6B35] hover:bg-gray-50 transition-colors block"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`text-[13px] font-bold transition-colors duration-300 uppercase tracking-widest ${
                    isActive ? "text-[#4A6B35]" : "text-gray-700 hover:text-[#4A6B35]"
                  }`}
                >
                  {link.name}
                </Link>
                <div
                  className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#4A6B35] rounded-full transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-[73px] left-0 right-0 bg-white z-40 overflow-y-auto flex flex-col items-center border-t border-gray-100 pb-20 shadow-lg"
          >
            <div className="flex flex-col w-full px-6 py-8 gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/services" && pathname.startsWith("/services"));
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="w-full flex flex-col border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`w-full flex items-center justify-between py-4 text-xl font-bold uppercase tracking-wide transition-colors ${
                          isActive ? "text-[#4A6B35]" : "text-black hover:text-[#4A6B35]"
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={20} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col pl-4 gap-1 overflow-hidden"
                          >
                            {SERVICES_DROPDOWN.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="py-3 text-base font-semibold text-gray-600 hover:text-[#4A6B35]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block w-full py-4 text-xl font-bold uppercase tracking-wide border-b border-gray-100 transition-colors ${
                      isActive ? "text-[#4A6B35]" : "text-black hover:text-[#4A6B35]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;