"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    if (isHomePage) {
      const timer = setTimeout(() => {
        setIsScrolled(window.scrollY > 80); // Set initial state
      }, 0);
      window.addEventListener("scroll", handleScroll);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      const timer = setTimeout(() => {
        setIsScrolled(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  // Prevent page scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // UPDATED NAV LINKS ORDER: 
  // Home -> Projects -> Services -> About Us
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    // { name: "Privacy Policy", href: "/privacy policy" },
  ];


  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full transition-all duration-500 ease-in-out ${isMobileMenuOpen
        ? "h-screen bg-black/98 py-6 md:py-8"
        : isScrolled
          ? "py-3 md:py-4 bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          : "py-6 md:py-8 bg-transparent"
        }`}
      style={{
        zIndex: 2147483647,
      }}
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center max-w-[1920px] mx-auto relative z-50">
        <Link href="/" className="flex items-center gap-3 relative z-10 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group-hover:rotate-6 transition-all duration-500">
            <Image
              src="/Logo/Untitled design logo.png"
              alt="Excel Ardor Logo"
              width={100}
              height={100}
              priority
              quality={100}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>

          {/* <span className="text-[#2E4B1D] font-black tracking-tighter text-sm sm:text-base md:text-xl uppercase whitespace-nowrap">
            EXCEL <span className="text-[#4A6B35] font-light">ARDOR</span>
          </span> */}
          <span className="text-[#4A6B35] text-2xl font-bold tracking-tighter">
            EXCEL ARDOR
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-12 relative z-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[12px] font-bold transition-all duration-300 uppercase tracking-[0.25em] relative group ${isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
              >
                {link.name}
                <div className={`absolute -bottom-2 left-0 h-[2px] bg-white rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)] ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}`} />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block relative z-10">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full text-[13px] font-black uppercase tracking-widest bg-white text-black transition-all flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] hover:bg-blue-600 hover:text-white hover:-translate-y-1 active:scale-95"
          >
            Contact us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 text-white relative z-50 bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-all hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden absolute inset-0 bg-black/95 backdrop-blur-2xl z-40 overflow-y-auto flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 p-10 pt-32 pb-16 w-full max-w-lg items-center text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    className="block text-4xl md:text-5xl font-black text-white/40 hover:text-white transition-all uppercase tracking-tighter py-3 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10 mt-6 border-t border-white/10 w-full flex justify-center"
              >
                <Link
                  href="/contact"
                  className="px-12 py-5 rounded-2xl text-[16px] font-black uppercase tracking-[0.2em] bg-white text-black text-center shadow-2xl active:scale-95 hover:bg-blue-600 hover:text-white transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;