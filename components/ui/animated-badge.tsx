"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface AnimatedBadgeProps {
  delay?: number;
  onComplete?: () => void;
  children: string;
}

export function AnimatedBadge({
  delay = 0,
  onComplete,
  children,
}: AnimatedBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
      }}
      onAnimationComplete={onComplete}
      className="inline-flex items-center space-x-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm"
    >
      <motion.div
        className="w-2 h-2 bg-green-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.span
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
