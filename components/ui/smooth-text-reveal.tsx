"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SmoothTextRevealProps {
  children: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  speed?: "slow" | "normal" | "fast" | "ultra-fast";
}

export function SmoothTextReveal({
  children,
  delay = 1000,
  className,
  onComplete,
  speed = "normal",
}: SmoothTextRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);
  const words = children.split(" ");

  // Speed settings
  const speedSettings = {
    slow: { interval: 150, duration: 0.6 },
    normal: { interval: 120, duration: 0.5 },
    fast: { interval: 60, duration: 0.3 },
    "ultra-fast": { interval: 30, duration: 0.2 },
  };

  const { interval, duration } = speedSettings[speed];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isLoaded) {
      const intervalId = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev < words.length) {
            return prev + 1;
          } else {
            clearInterval(intervalId);
            if (onComplete) {
              setTimeout(onComplete, 100); // Reduced delay after last word
            }
            return prev;
          }
        });
      }, interval); // Use dynamic interval based on speed

      return () => clearInterval(intervalId);
    }
  }, [isLoaded, words.length, onComplete]);

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index < visibleWords ? 1 : 0,
            y: index < visibleWords ? 0 : 20,
          }}
          transition={{
            duration: duration, // Use dynamic duration based on speed
            ease: "easeOut",
            type: "spring",
            stiffness: 120, // Slightly increased for faster animation
            damping: 12, // Reduced for snappier movement
          }}
          className="inline-block mr-2 last:mr-0"
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
