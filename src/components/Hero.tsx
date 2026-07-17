import { site } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SystemsStatusCard } from "@/components/SystemsStatusCard";
import { HeroNetwork } from "@/components/HeroNetwork";

export function Hero() {
  return (
    <section
      className="hero-gradient section-pad relative overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div
        className="hero-orb pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb--delayed pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-signal/10 blur-3xl"
        aria-hidden="true"
      />

      <HeroNetwork />

      <div className="container-site relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <RevealOnScroll delay={0} variant="blur">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {site.title} · {site.location}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={80} variant="up">
            <h1
              id="hero-heading"
              className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl lg:text-[3.25rem]"
            >
              {site.name}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={160} variant="up">
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate">
              {site.tagline}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={240} variant="up">
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="cursor-pointer rounded-lg bg-accent px-5 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
              >
                View projects
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-lg border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:border-accent hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-lg border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink hover-subtle hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={120} variant="scale">
          <SystemsStatusCard />
        </RevealOnScroll>
      </div>
    </section>
  );
}
