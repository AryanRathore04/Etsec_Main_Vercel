"use client";
import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined") {
      // Track Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
        });
      });

      // Monitor layout shifts and input delays
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observer.observe({ type: "first-input", buffered: true });
      observer.observe({ type: "layout-shift", buffered: true });

      // Log paint metrics
      window.addEventListener("load", () => {
        const paintEntries = performance.getEntriesByType("paint");
        paintEntries.forEach((entry) => {
          console.log(`Paint: ${entry.name} - ${entry.startTime}ms`);
        });
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
