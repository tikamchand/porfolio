import { stackBands } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Stack() {
  return (
    <section
      id="stack"
      className="section-pad border-b border-border"
      aria-labelledby="stack-heading"
    >
      <div className="container-site">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">02 — Stack</p>
          <h2
            id="stack-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink"
          >
            Technology bands
          </h2>
          <p className="mt-4 max-w-xl text-base text-slate">
            Organized by layer — from client interfaces through APIs, data stores, and
            deployment infrastructure.
          </p>
        </RevealOnScroll>

        <div className="mt-10">
          {stackBands.map((band, i) => (
            <RevealOnScroll key={band.label} delay={i * 80} as="div" variant="left">
              <div className="stack-band hover-lift bg-paper">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
                  <span className="w-full shrink-0 font-mono text-xs uppercase tracking-widest text-accent sm:w-24">
                    {band.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {band.items.map((item) => (
                      <span
                        key={item}
                        className="tech-tag rounded-lg border border-border bg-mist px-3 py-1 font-mono text-xs text-ink hover:border-accent hover:text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
