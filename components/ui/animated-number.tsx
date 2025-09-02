// Motion-Primitives AnimatedNumber - counts up to target when in view
"use client";

import { useEffect, useState, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  formatter?: (value: number) => string;
}

export function AnimatedNumber({
  value,
  duration = 1000,
  className = "",
  suffix = "",
  prefix = "",
  formatter,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (value - startValue) * easeOut;

            setDisplayValue(Math.floor(current));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated, prefersReducedMotion]);

  const formattedValue = formatter
    ? formatter(displayValue)
    : displayValue.toString();

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
