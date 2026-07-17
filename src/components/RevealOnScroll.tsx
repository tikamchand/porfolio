"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

type RevealOnScrollProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  variant?: RevealVariant;
};

export function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "up",
}: RevealOnScrollProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const style = reduced ? {} : { transitionDelay: `${delay}ms` };

  const props = {
    className: `reveal reveal--${variant} ${visible ? "reveal--visible" : ""} ${className}`.trim(),
    style,
    children,
  };

  switch (Tag) {
    case "section":
      return <section ref={ref as RefObject<HTMLElement>} {...props} />;
    case "article":
      return <article ref={ref as RefObject<HTMLElement>} {...props} />;
    case "li":
      return <li ref={ref as RefObject<HTMLLIElement>} {...props} />;
    default:
      return <div ref={ref as RefObject<HTMLDivElement>} {...props} />;
  }
}
