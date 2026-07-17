"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const pipelineStages = ["push", "build", "test", "deploy"];
const containers = ["api", "worker", "redis", "pg"];
const topics = ["order.created", "payment.done", "inventory.sync"];

export function DevOpsAmbient() {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const pipeline = setInterval(() => {
      setStage((s) => (s + 1) % (pipelineStages.length + 1));
    }, 1400);

    const kafka = setInterval(() => {
      setTopicIndex((i) => (i + 1) % topics.length);
    }, 2200);

    return () => {
      clearInterval(pipeline);
      clearInterval(kafka);
    };
  }, [reduced]);

  return (
    <div className="devops-ambient border-b border-border bg-mist/40" aria-hidden="true">
      <div className="container-site py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Auto CI/CD */}
          <div className="rounded-xl border border-border bg-paper/80 p-4 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              ci / cd
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              {pipelineStages.map((label, i) => {
                const done = stage > i;
                const active = stage === i;
                return (
                  <div key={label} className="flex flex-1 items-center gap-1.5">
                    <div
                      className={`flex h-8 flex-1 items-center justify-center rounded-md border font-mono text-[9px] uppercase tracking-wider transition-all duration-500 ${
                        done
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : active
                            ? "border-accent bg-accent/5 text-ink animate-pulse-ring"
                            : "border-border text-slate"
                      }`}
                    >
                      {label}
                    </div>
                    {i < pipelineStages.length - 1 && (
                      <span
                        className={`hidden h-px w-2 shrink-0 sm:block ${
                          done ? "bg-accent" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[10px] text-slate">
              {stage >= pipelineStages.length
                ? "deployed · green"
                : `running · ${pipelineStages[stage]}`}
            </p>
          </div>

          {/* Auto Docker */}
          <div className="rounded-xl border border-border bg-paper/80 p-4 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              docker compose
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {containers.map((name, i) => (
                <div
                  key={name}
                  className="docker-float flex items-center gap-2 rounded-lg border border-border bg-mist/50 px-3 py-2"
                  style={{ animationDelay: `${i * 0.45}s` }}
                >
                  <span className="status-pulse h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-slate">4 / 4 healthy</p>
          </div>

          {/* Auto Kafka */}
          <div className="rounded-xl border border-border bg-paper/80 p-4 backdrop-blur-sm overflow-hidden">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              kafka stream
            </p>
            <p className="mt-3 font-mono text-xs text-ink">{topics[topicIndex]}</p>
            <div className="kafka-rail mt-3 flex h-5 items-center gap-1 overflow-hidden rounded bg-ink/90 px-2">
              {Array.from({ length: 10 }).map((_, j) => (
                <span
                  key={j}
                  className="kafka-packet h-1.5 w-1.5 shrink-0 rounded-sm bg-accent"
                  style={{ animationDelay: `${j * 0.12}s` }}
                />
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-slate">
              producer → broker → consumer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
