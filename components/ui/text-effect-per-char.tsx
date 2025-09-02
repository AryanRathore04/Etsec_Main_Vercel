"use client";
import { useState, useEffect } from "react";
import { TextEffect } from "@/components/motion-primitives/text-effect";

interface TextEffectPerCharProps {
  children: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TextEffectPerChar({
  children,
  delay = 1000,
  className,
  onComplete,
}: TextEffectPerCharProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for page load + additional delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className} style={{ minHeight: "fit-content" }}>
      {/* Invisible text to reserve space and prevent layout shift */}
      <div
        className="invisible absolute"
        aria-hidden="true"
        style={{
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          letterSpacing: "inherit",
        }}
      >
        {children}
      </div>

      {/* Animated text */}
      <TextEffect
        per="word"
        preset="fade"
        trigger={isLoaded}
        className="relative"
        delay={0.05}
        speedReveal={2.5}
        speedSegment={0.8}
        onAnimationComplete={onComplete}
      >
        {children}
      </TextEffect>
    </div>
  );
}
