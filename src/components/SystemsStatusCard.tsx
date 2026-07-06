import { heroStats } from "@/data/portfolio";
import { CountUp } from "@/components/CountUp";

export function SystemsStatusCard() {
  return (
    <aside
      className="border border-border rounded-[6px] bg-ink text-paper overflow-hidden"
      aria-label="Systems status dashboard"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="status-pulse inline-block h-2 w-2 rounded-full bg-[#4ade80]"
            aria-hidden="true"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            systems.status
          </span>
        </div>
        <span className="font-mono text-xs text-white/50">live</span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {heroStats.map((stat) => (
          <div key={stat.label} className="px-4 py-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
              {stat.label}
            </p>
            <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-brass">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                displayAs={stat.displayAs}
              />
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <p className="font-mono text-[10px] text-white/40" suppressHydrationWarning>
          last_check: {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
        </p>
      </div>
    </aside>
  );
}
