"use client";

import React from "react";
import { motion } from "motion/react";
import {
  contentVariants,
  staggerContainerVariants,
  staggerChildVariants,
  imageVariants,
} from "./page-transition";

interface AnimatedPageContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface AnimatedGridProps {
  children: React.ReactNode;
  className?: string;
}

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Main page content wrapper - automatically animates on page load
export const AnimatedPageContent: React.FC<AnimatedPageContentProps> = ({
  children,
  className = "",
}) => (
  <motion.div
    className={className}
    variants={contentVariants}
    initial="enter"
    animate="center"
  >
    {children}
  </motion.div>
);

// Hero heading component with accordion.net.au style animation
export const AnimatedHero: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    className={className}
    variants={contentVariants}
    initial="enter"
    animate="center"
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

// Container for staggered children (cards, list items, etc.)
export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  children,
  className = "",
}) => (
  <motion.div
    className={className}
    variants={staggerContainerVariants}
    initial="enter"
    animate="center"
  >
    {children}
  </motion.div>
);

// Individual grid item with stagger animation
export const AnimatedGridItem: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => (
  <motion.div className={className} variants={staggerChildVariants}>
    {children}
  </motion.div>
);

// Image with scale-from-larger animation
export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className = "",
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    variants={imageVariants}
    initial="enter"
    animate="center"
  />
);

// Subtext with slight delay
export const AnimatedSubtext: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => (
  <motion.div
    className={className}
    variants={contentVariants}
    initial="enter"
    animate="center"
    transition={{ delay: 0.1 }}
  >
    {children}
  </motion.div>
);

// Manual animation control for complex layouts
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    }}
  >
    {children}
  </motion.div>
);
