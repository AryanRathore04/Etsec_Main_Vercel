"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Animation variants matching accordion.net.au
const overlayVariants = {
  enter: {
    x: "-100%",
  },
  center: {
    x: "0%",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const, // easeInOut equivalent
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const overlayVariantsMobile = {
  enter: { opacity: 0 },
  center: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

const pageVariants = {
  enter: {
    opacity: 0,
    scale: 0.95,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const contentVariants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainerVariants = {
  center: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const staggerChildVariants = {
  enter: {
    opacity: 0,
    y: 15,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.03,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
    
    // Update content during mask overlay
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 400); // Content switches mid-transition

    return () => clearTimeout(timer);
  }, [pathname, children]);

  // Simple fade for reduced motion
  if (shouldReduceMotion) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Transition Mask Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`overlay-${pathname}`}
            className="fixed inset-0 z-[9999] bg-black md:bg-gradient-to-r md:from-black md:via-gray-900 md:to-black"
            variants={isMobile ? overlayVariantsMobile : overlayVariants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Page Content with Staggered Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="min-h-screen"
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onAnimationComplete={() => {
            // Restore focus to main heading for accessibility
            const mainHeading = document.querySelector('h1');
            if (mainHeading && mainHeading instanceof HTMLElement) {
              mainHeading.focus();
            }
          }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Export animation variants for use in page components
export {
  contentVariants,
  staggerContainerVariants,
  staggerChildVariants,
  imageVariants,
};
