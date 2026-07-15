"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [heroVisible, setHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // On non-home pages always show solid navbar
    if (!isHomePage) {
      setHeroVisible(false);
      return;
    }

    // On home page: watch hero section visibility
    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      // Fallback: scroll-based threshold of 80px
      const handleScroll = () => setHeroVisible(window.scrollY < 80);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      {
        root: null,
        // Fire when hero is at least 5% still visible (near-bottom of hero)
        threshold: 0.05,
      }
    );
    observerRef.current.observe(heroEl);

    return () => observerRef.current?.disconnect();
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About Us", href: "/about" },
  ];

  // When hero is visible (at top of home page) → transparent
  // When scrolled past hero, or on other pages → solid black
  const isTransparent = isHomePage && heroVisible && !isMobileMenuOpen;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 w-full ${
        isMobileMenuOpen ? "h-screen" : "py-2.5"
      }`}
      animate={{
        backgroundColor: isTransparent
          ? "rgba(0,0,0,0)"
          : "rgba(0,0,0,1)",
        borderBottomColor: isTransparent
          ? "rgba(255,255,255,0)"
          : "rgba(255,255,255,0.06)",
        boxShadow: isTransparent
          ? "0 0 0 rgba(0,0,0,0)"
          : "0 4px 24px rgba(0,0,0,0.65)",
      }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        zIndex: 2147483647,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
    >
      <div className="w-full px-5 md:px-10 flex justify-between items-center max-w-[1920px] mx-auto relative z-50">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 relative z-10 group shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:rotate-6 transition-all duration-500">
            <Image
              src="/Logo/Untitled design logo.png"
              alt="Excel Ardor Logo"
              width={80}
              height={80}
              priority
              quality={100}
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            />
          </div>
          <span className="text-[#4A6B35] text-lg font-bold tracking-tighter">
            EXCEL ARDOR
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 relative z-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold transition-all duration-300 uppercase tracking-[0.22em] relative group ${
                  isActive ? "text-white" : "text-white/45 hover:text-white"
                }`}
              >
                {link.name}
                <div
                  className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-white rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block relative z-10">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest bg-white text-black transition-all duration-200 flex items-center justify-center shadow-[0_6px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.18)] hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 active:scale-95"
          >
            Contact us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white relative z-50 bg-white/5 rounded-lg border border-white/10 active:scale-90 transition-all hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute inset-0 bg-black z-40 overflow-y-auto flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-6 p-8 pt-28 pb-14 w-full max-w-lg items-center text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{
                    delay: idx * 0.07,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    className="block text-3xl md:text-4xl font-black text-white/35 hover:text-white transition-all uppercase tracking-tighter py-2.5 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{
                  delay: 0.35,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-8 mt-4 border-t border-white/10 w-full flex justify-center"
              >
                <Link
                  href="/contact"
                  className="px-10 py-4 rounded-2xl text-[14px] font-black uppercase tracking-[0.2em] bg-white text-black text-center shadow-2xl active:scale-95 hover:bg-blue-600 hover:text-white transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;