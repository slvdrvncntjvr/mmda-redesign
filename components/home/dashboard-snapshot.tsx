import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { trafficSegments, floodAreas } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"

export function DashboardSnapshot() {
  const topRoads = trafficSegments.slice(0, 7)
  const floodPreview = floodAreas.slice(0, 6)

  return (
    <section className="border-b border-foreground/10 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section header */}
        <div className="grid gap-6 border-b border-foreground/10 pb-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 lg:border-r lg:border-foreground/10 lg:pr-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">01</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Live monitoring · Updated continuously
              </span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tight text-foreground text-balance">
              Metro Manila, <span className="italic">at a glance</span>.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Source · MMDA Metrobase
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Aggregated readings from 408 CCTV cameras, 71 pump stations, and 2,512 field personnel across the
              National Capital Region.
            </p>
          </div>
        </div>

        {/* Bento metrics */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          <BigStat
            label="EDSA · NB Avg"
            value="22"
            unit="kph"
            change="−13%"
            tone="moderate"
            description="vs. 30-day baseline"
          />
          <BigStat
            label="Flooded areas"
            value="3"
            unit="reports"
            change="+1"
            tone="moderate"
            description="2 light, 1 not passable"
          />
          <BigStat
            label="CCTV online"
            value="408"
            unit="of 415"
            change="98.3%"
            tone="light"
            description="7 in maintenance"
          />
          <BigStat
            label="Active personnel"
            value="2,512"
            unit="deployed"
            change="+220"
            tone="light"
            description="Holy Week reinforcement"
          />
        </div>

        {/* Two columns: traffic table + flood list */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-foreground/10 bg-foreground/10 lg:grid-cols-3">
          {/* Traffic */}
          <div className="bg-background p-6 lg:col-span-2 lg:p-8">
            <header className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">01a</span>
                <h3 className="font-serif text-2xl leading-none tracking-tight">Major thoroughfares</h3>
              </div>
              <Link
                href="/traffic"
                className="group inline-flex items-baseline gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
              >
                Full report
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </header>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <th className="py-3 pr-4 font-normal">Segment</th>
                    <th className="py-3 pr-4 font-normal">NB</th>
                    <th className="py-3 pr-4 font-normal">SB</th>
                    <th className="py-3 pr-4 font-normal">Speed</th>
                    <th className="py-3 text-right font-normal">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topRoads.map((s) => (
                    <tr key={`${s.road}-${s.segment}`} className="border-b border-foreground/5 last:border-b-0">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-foreground">{s.road}</p>
                        <p className="text-xs text-muted-foreground">{s.segment}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={s.northbound} />
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={s.southbound} />
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums text-foreground">{s.speed}</td>
                      <td className="py-3">
                        <SpeedBar speed={s.speed} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Flood */}
          <div className="bg-background p-6 lg:p-8">
            <header className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">02</span>
                <h3 className="font-serif text-2xl leading-none tracking-tight">Flood reports</h3>
              </div>
              <Link
                href="/flood-monitoring"
                className="group inline-flex items-baseline gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
              >
                View all
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </header>
            <ul className="mt-2 divide-y divide-foreground/10">
              {floodPreview.map((f) => (
                <li key={f.area} className="flex items-baseline justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{f.area}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {f.city} · {f.updated} · {f.depth}
                    </p>
                  </div>
                  {f.level === "passable" ? (
                    <StatusBadge status="light" label="Passable" />
                  ) : f.level === "not-passable-light" ? (
                    <StatusBadge status="moderate" label="Light" />
                  ) : (
                    <StatusBadge status="heavy" label="Closed" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function BigStat({
  label,
  value,
  unit,
  change,
  tone,
  description,
}: {
  label: string
  value: string
  unit: string
  change: string
  tone: "light" | "moderate" | "heavy"
  description: string
}) {
  const dot =
    tone === "light" ? "bg-status-light" : tone === "moderate" ? "bg-status-moderate" : "bg-status-heavy"
  return (
    <div className="bg-background p-6 lg:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">{change}</span>
      </div>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] tracking-tight text-foreground">
          {value}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{unit}</span>
      </p>
      <p className="mt-3 border-t border-foreground/5 pt-3 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function SpeedBar({ speed }: { speed: number }) {
  // Map speed (0–60 kph) to width
  const pct = Math.min(100, Math.round((speed / 60) * 100))
  const tone =
    speed >= 40 ? "bg-status-light" : speed >= 20 ? "bg-status-moderate" : "bg-status-heavy"
  return (
    <div className="ml-auto flex h-1 w-24 overflow-hidden rounded-full bg-foreground/10" aria-hidden>
      <span className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
