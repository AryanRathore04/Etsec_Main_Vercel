// Magic UI AnimatedBeam - animated beam/line effect
"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface AnimatedBeamProps {
  className?: string;
  duration?: number;
  delay?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
}

export function AnimatedBeam({
  className,
  duration = 5,
  delay = 0,
  gradientStartColor = "#06b6d4",
  gradientStopColor = "#3b82f6",
  pathOpacity = 0.2,
  pathWidth = 2,
}: AnimatedBeamProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("absolute inset-0 opacity-20", className)}>
        <div
          className="h-full w-1 bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, ${gradientStartColor}, ${gradientStopColor})`,
            width: `${pathWidth}px`,
          }}
        />
      </div>
    );
  }

  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x="48"
        y="0"
        width={pathWidth}
        height="100"
        fill="url(#beam-gradient)"
        opacity={pathOpacity}
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,-100;0,100;0,100"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
