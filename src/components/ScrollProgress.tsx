"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
