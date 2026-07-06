"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/portfolio";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-border bg-paper/95 backdrop-blur-sm" : "border-transparent bg-paper"
      }`}
    >
      <nav
        className="container-site flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="font-display text-base font-semibold tracking-tight text-ink hover-subtle hover:text-signal focus-visible:rounded-[4px]"
        >
          {site.name.split(" ")[0]}
          <span className="text-brass">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-slate hover-subtle hover:text-signal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-[4px] border border-border bg-mist px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:border-signal hover:text-signal md:inline-block"
        >
          Get in touch
        </a>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-[4px] border border-border px-3 py-2 font-mono text-xs uppercase tracking-widest text-slate hover-subtle hover:text-signal [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <ul className="absolute right-0 top-full mt-2 min-w-[160px] border border-border bg-paper p-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-[4px] px-3 py-2 font-mono text-xs uppercase tracking-widest text-slate hover-subtle hover:bg-mist hover:text-signal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
