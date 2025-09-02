// Motion-Primitives InView - trigger animations when element enters viewport
"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface InViewProps {
  children: (inView: boolean) => React.ReactNode;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export function InView({
  children,
  threshold = 0.1,
  triggerOnce = true,
  className,
}: InViewProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, immediately trigger inView
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, triggerOnce, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children(inView)}
    </div>
  );
}
