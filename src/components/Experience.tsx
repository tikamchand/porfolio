import { experience } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-pad border-b border-border bg-mist"
      aria-labelledby="experience-heading"
    >
      <div className="container-site">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-slate">03 — Experience</p>
          <h2
            id="experience-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink"
          >
            Work history
          </h2>
        </RevealOnScroll>

        <ol className="relative mt-10 space-y-0">
          <div className="timeline-line" aria-hidden="true" />
          {experience.map((job, i) => (
            <RevealOnScroll key={job.company} delay={i * 60} as="li">
              <article className="relative flex gap-6 pb-12 last:pb-0">
                <div
                  className={`timeline-dot mt-1 ${i === 0 ? "timeline-dot--active" : ""}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {job.role}
                    </h3>
                    <time className="font-mono text-xs uppercase tracking-widest text-slate">
                      {job.period}
                    </time>
                  </div>
                  <p className="mt-1 font-mono text-sm text-brass">{job.company}</p>
                  <p className="mt-4 text-base leading-relaxed text-slate">
                    {job.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-slate before:font-mono before:text-signal before:content-['→']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
