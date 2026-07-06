import { site } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function About() {
  return (
    <section
      id="about"
      className="section-pad border-b border-border bg-mist"
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-slate">01 — About</p>
          <h2
            id="about-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink"
          >
            Engineering reliable systems
          </h2>
        </RevealOnScroll>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
          <RevealOnScroll delay={60}>
            <p className="text-base leading-relaxed text-slate">{site.summary}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <dl className="grid gap-4 border border-border rounded-[6px] bg-paper p-6">
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-slate">Focus</dt>
                <dd className="text-sm text-ink">
                  Logistics, telehealth, e-commerce
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-slate">Stack</dt>
                <dd className="text-sm text-ink">
                  React, Next.js, Node.js, TypeScript, GraphQL, PostgreSQL, MongoDB, Docker, AWS
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-slate">Education</dt>
                <dd className="text-sm text-ink">
                  BCA, Shayog College of IT and Management — GPA 8.24/10
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-slate">Location</dt>
                <dd className="text-sm text-ink">{site.location}</dd>
              </div>
            </dl>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
