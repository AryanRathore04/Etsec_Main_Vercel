"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps {
  children: React.ReactNode;
  delay?: number;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "xl";
  className?: string;
  onClick?: () => void;
}

export function AnimatedButton({
  children,
  delay = 0,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}: AnimatedButtonProps) {
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
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  );
}
