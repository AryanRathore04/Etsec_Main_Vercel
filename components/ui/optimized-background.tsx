"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Lightweight background component that loads animations only when needed
export const OptimizedBackground = React.memo(
  ({ className }: { className?: string }) => {
    const [showAnimations, setShowAnimations] = useState(false);

    // Use Intersection Observer to only animate when visible
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAnimations(true);
      }, 500); // Delay animation start for better initial page load

      return () => clearTimeout(timer);
    }, []);

    // Memoized simplified animation paths
    const simplePaths = useMemo(
      () => [
        "M0 200 Q200 100 400 200 T800 200",
        "M0 250 Q200 150 400 250 T800 250",
        "M0 300 Q200 200 400 300 T800 300",
      ],
      []
    );

    if (!showAnimations) {
      return (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-background via-background to-background/80",
            className
          )}
        />
      );
    }

    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />

        {/* Minimal animated elements */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 800 600"
        >
          {simplePaths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-primary/20"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 3 + index,
                delay: index * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Floating particles - much fewer */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    );
  }
);

OptimizedBackground.displayName = "OptimizedBackground";
