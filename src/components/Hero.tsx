import { site } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SystemsStatusCard } from "@/components/SystemsStatusCard";

export function Hero() {
  return (
    <section className="section-pad border-b border-border" aria-labelledby="hero-heading">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <RevealOnScroll delay={0}>
            <p className="font-mono text-xs uppercase tracking-widest text-slate">
              {site.title} · {site.location}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={60}>
            <h1
              id="hero-heading"
              className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl lg:text-[3.25rem]"
            >
              {site.name}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate">
              {site.tagline}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={180}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-[4px] bg-signal px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper hover-subtle hover:bg-ink"
              >
                View projects
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[4px] border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:border-signal hover:text-signal"
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[4px] border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:border-signal hover:text-signal"
              >
                LinkedIn
              </a>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={120}>
          <SystemsStatusCard />
        </RevealOnScroll>
      </div>
    </section>
  );
}
