import { projects } from "@/data/portfolio";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Projects() {
  return (
    <section
      id="projects"
      className="section-pad border-b border-border"
      aria-labelledby="projects-heading"
    >
      <div className="container-site">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            04 — Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink"
          >
            Case studies
          </h2>
          <p className="mt-4 max-w-xl text-base text-slate">
            Selected production work across e-commerce, logistics, and telehealth — from
            architecture to deployment.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8">
          {projects.map((project, i) => (
            <RevealOnScroll
              key={project.title}
              delay={i * 80}
              as="article"
              variant="scale"
              className="hover-lift rounded-xl border border-border bg-paper p-6 md:p-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {project.domain}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                    {project.title}
                  </h3>
                </div>
                <time className="font-mono text-xs uppercase tracking-widest text-slate">
                  {project.period}
                </time>
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate">{project.summary}</p>

              <ul className="mt-6 space-y-2">
                {project.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-2 text-sm text-ink before:font-mono before:text-accent before:content-['→']"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag rounded-lg border border-border bg-mist px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
