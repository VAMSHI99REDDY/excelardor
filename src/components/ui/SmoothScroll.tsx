"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Master SmoothScroll Component
 * Overhauled for peak performance and unified across the entire site.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current) {
      // Instantly scroll to top on page transitions
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    // 1. Initialize Lenis with optimized "buttery" settings
    const lenis = new Lenis({
      duration: 1.4, // Slightly longer duration for a more luxurious feel
      lerp: 0.08,   // Lower lerp for smoother deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0, // Restored for responsive mobile momentum
      syncTouch: true,      // Keeps touch and wheel in perfect sync
      // smoothTouch: true,    // Essential for "clean" mobile scrolling
    });

    lenisRef.current = lenis;

    // 2. Optimized rAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // 3. Handle anchor links and external triggers
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.hash.length > 1 && anchor.origin === window.location.origin) {
        try {
          const targetElement = document.querySelector(anchor.hash);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, { 
              offset: 0, 
              duration: 1.6,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        } catch (err) {
          console.error("Invalid selector or scroll failed:", err);
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);

    // 4. Cleanup
    return () => {
      window.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
