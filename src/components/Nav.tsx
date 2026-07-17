"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-paper/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-paper/80 backdrop-blur-sm"
      }`}
    >
      <nav
        className="container-site flex h-16 items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="font-display text-base font-semibold tracking-tight text-ink hover-subtle hover:text-accent focus-visible:rounded-lg"
        >
          {site.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-slate hover-subtle hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden cursor-pointer rounded-lg border border-border bg-mist px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:border-accent hover:text-accent md:inline-block"
          >
            Get in touch
          </a>

          <button
            type="button"
            className="cursor-pointer rounded-lg border border-border px-3 py-2 font-mono text-xs uppercase tracking-widest text-slate hover-subtle hover:text-accent md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            Menu
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="animate-fade-in border-t border-border bg-paper px-6 py-3 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-slate hover-subtle hover:bg-mist hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 block rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-accent"
            >
              Get in touch
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
