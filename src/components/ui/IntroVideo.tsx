"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fallback in case video fails to load or play automatically
  useEffect(() => {
    if (videoRef.current) {
      // Attempt to play with sound first
      videoRef.current.volume = 0.5; // Set reasonable volume
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay with sound was blocked by browser policy
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {
              // If it still fails (e.g., low power mode), skip intro
              setIsPlaying(false);
            });
          }
        });
      }
    }

    const timer = setTimeout(() => {
      // Extended timeout slightly to allow for user interaction or loading
      setIsPlaying(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden origin-center pointer-events-none"
        >
          <video
            ref={videoRef}
            src="/photos/intro.mp4"
            playsInline
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover pointer-events-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo;
