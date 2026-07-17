"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, summary, label, .cursor-hover",
      );
      setHovering(Boolean(interactive));
    };

    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={dotRef}
        className={`custom-cursor__dot ${visible ? "is-visible" : ""} ${hovering ? "is-hover" : ""}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor__ring ${visible ? "is-visible" : ""} ${hovering ? "is-hover" : ""}`}
      />
    </div>
  );
}
