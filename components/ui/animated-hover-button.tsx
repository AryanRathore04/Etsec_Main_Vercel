"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface AnimatedHoverButtonProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  duration?: number;
  clockwise?: boolean;
  style?: React.CSSProperties;
}

export function AnimatedHoverButton({
  children,
  delay = 0,
  className = "",
  containerClassName = "",
  onClick,
  duration = 1,
  clockwise = true,
  style,
}: AnimatedHoverButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
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
        duration: 0.3,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
    >
      <HoverBorderGradient
        containerClassName={`px-6 py-3 text-base font-medium ${containerClassName}`}
        className={`font-medium text-white flex items-center justify-center gap-2 whitespace-nowrap ${className}`}
        onClick={onClick}
        duration={duration}
        clockwise={clockwise}
        style={{
          backgroundColor: "rgba(0, 255, 255, 0.15)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
        }}
      >
        {children}
      </HoverBorderGradient>
    </motion.div>
  );
}
