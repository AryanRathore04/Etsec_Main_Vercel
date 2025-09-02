"use client";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy animation components
const BackgroundBeamsLazy = lazy(() =>
  import("@/components/ui/background-beams").then((module) => ({
    default: module.BackgroundBeams,
  }))
);
const BoxesCoreLazy = lazy(() =>
  import("@/components/ui/background-boxes").then((module) => ({
    default: module.BoxesCore,
  }))
);

interface LazyAnimationProps {
  type: "beams" | "boxes";
  className?: string;
  fallback?: React.ReactNode;
}

export function LazyAnimation({
  type,
  className,
  fallback,
}: LazyAnimationProps) {
  const defaultFallback = (
    <div className={className}>
      <Skeleton className="w-full h-full opacity-20" />
    </div>
  );

  if (type === "beams") {
    return (
      <Suspense fallback={fallback || defaultFallback}>
        <BackgroundBeamsLazy className={className} />
      </Suspense>
    );
  }

  if (type === "boxes") {
    return (
      <Suspense fallback={fallback || defaultFallback}>
        <BoxesCoreLazy className={className} />
      </Suspense>
    );
  }

  return null;
}
