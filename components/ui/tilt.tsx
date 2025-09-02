// Motion-Primitives Tilt - 3D tilt effect on mouse move (disabled on touch/low performance)
"use client";

import { useRef, useEffect, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface TiltProps {
  children: ReactNode;
  tiltMaxAngle?: number;
  scale?: number;
  speed?: number;
  className?: string;
}

export function Tilt({
  children,
  tiltMaxAngle = 10,
  scale = 1.05,
  speed = 400,
  className = "",
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    // Detect if device supports hover (exclude touch devices)
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (!supportsHover) return;

    // Check for reduced performance indicators
    const isLowPerformance =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    if (isLowPerformance) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const rotateX = deltaY * tiltMaxAngle;
      const rotateY = deltaX * tiltMaxAngle;

      element.style.transform = `
        perspective(1000px) 
        rotateX(${-rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(${scale})
      `;
      element.style.transition = "none";
    };

    const handleMouseLeave = () => {
      element.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      element.style.transition = `transform ${speed}ms ease-out`;
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [tiltMaxAngle, scale, speed, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
