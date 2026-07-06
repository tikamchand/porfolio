import { site } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Contact() {
  return (
    <footer
      id="contact"
      className="section-pad bg-ink text-paper"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-white/50">05 — Contact</p>
          <h2
            id="contact-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight"
          >
            Let&apos;s build something
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
            Open to full-stack roles and contract work on distributed systems, APIs, and
            product engineering. Based in {site.location}.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={60}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-[4px] bg-brass px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:bg-paper"
            >
              {site.email}
            </a>
            <a
              href={`tel:+91${site.phone}`}
              className="rounded-[4px] border border-white/20 px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper hover-subtle hover:border-brass hover:text-brass"
            >
              +91 {site.phone}
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <nav className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8" aria-label="Social links">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-white/60 hover-subtle hover:text-brass"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-white/60 hover-subtle hover:text-brass"
            >
              GitHub
            </a>
          </nav>
        </RevealOnScroll>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-white/30">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
