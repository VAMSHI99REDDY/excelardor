"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number; // duration in ms
}

const CountUp: React.FC<CountUpProps> = ({ value, suffix = "", duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Animate only once when it comes into view
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad formulation
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * (end - start) + start);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isIntersecting, value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export default function Statistics() {
  const [yearsOfExcellence, setYearsOfExcellence] = useState(12); // Default fallback

  useEffect(() => {
    const establishmentYear = 2014;
    const currentYear = new Date().getFullYear();
    setYearsOfExcellence(currentYear - establishmentYear);
  }, []);

  const stats = [
    {
      value: yearsOfExcellence,
      suffix: "+",
      label: "Years of Excellence",
    },
    {
      value: 16,
      suffix: "+",
      label: "Years of Industry Experience",
    },
    {
      value: 1,
      suffix: "",
      label: "Patented Technology",
    },
    {
      value: 4,
      suffix: "",
      label: "Core Engineering Domains",
    },
    {
      value: 15,
      suffix: "+",
      label: "Years of Manufacturing Expertise",
    },
  ];

  return (
    <div className="w-full mt-16 md:mt-20 mb-12 md:mb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left h-full"
            >
              <div className="text-[52px] md:text-[60px] lg:text-[68px] font-black text-black leading-none tracking-tight mb-4 select-none">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-neutral-500 font-bold text-[11px] md:text-[12px] tracking-[0.08em] uppercase leading-relaxed max-w-[200px] select-none">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
