"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CountUpProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  displayAs?: "number" | "duration";
  duration?: number;
};

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function formatValue(
  display: number,
  decimals: number,
  suffix: string,
  displayAs: "number" | "duration",
): string {
  if (displayAs === "duration") {
    return formatDuration(Math.round(display));
  }
  return `${display.toFixed(decimals)}${suffix}`;
}

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  displayAs = "number",
  duration = 1400,
}: CountUpProps) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  const formatted = formatValue(
    reduced ? value : display,
    decimals,
    suffix,
    displayAs,
  );

  return <span ref={ref}>{formatted}</span>;
}
