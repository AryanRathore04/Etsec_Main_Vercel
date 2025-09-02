// Motion-Primitives Magnetic - magnetic attraction effect on hover
"use client";

import { useRef, useEffect, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  range?: number;
  className?: string;
}

export function Magnetic({
  children,
  intensity = 0.3,
  range = 200,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < range) {
        const force = (range - distance) / range;
        const moveX = deltaX * force * intensity;
        const moveY = deltaY * force * intensity;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0px, 0px)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, range, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "transform 0.3s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
