import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { trafficSegments } from "@/lib/data"

export function Hero() {
  const tickerItems = [
    ...trafficSegments.slice(0, 10).map((s) => ({
      label: `${s.road} · ${s.segment.split(" — ")[0]}`,
      value: `${s.speed} kph`,
      tone:
        s.northbound === "heavy" || s.southbound === "heavy"
          ? "heavy"
          : s.northbound === "moderate" || s.southbound === "moderate"
            ? "moderate"
            : "light",
    })),
  ]
  // Duplicate for seamless scroll
  const ticker = [...tickerItems, ...tickerItems]

  return (
    <section className="border-b border-foreground/10 bg-background">
      {/* Bulletin meta strip */}
      <div className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:px-6 lg:px-10">
          <p className="flex items-center gap-3">
            <span className="text-foreground">Bulletin № 0428.07</span>
            <span className="hidden text-muted-foreground/50 sm:inline">·</span>
            <span className="hidden sm:inline">Apr 28, 2026 · 07:42 PHT</span>
          </p>
          <p className="hidden items-center gap-3 md:flex">
            <span>Manila · 14°35′N 121°00′E</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-foreground">28°C / Mostly cloudy</span>
          </p>
          <p className="flex items-center gap-2 text-foreground">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-light" />
            </span>
            Live
          </p>
        </div>
      </div>

      {/* Editorial hero */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <div className="lg:col-span-8 lg:border-r lg:border-foreground/10 lg:pr-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">00</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Front Page · The official record
              </span>
            </div>
            <h1 className="mt-7 font-serif text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.98] tracking-tight text-foreground text-pretty">
              Moving seventeen cities,
              <br />
              <span className="italic">as one</span> Metro Manila<span className="text-accent">.</span>
            </h1>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                The Metropolitan Manila Development Authority is the planning, monitoring, and coordinating body for
                the National Capital Region — delivering metro-wide services to 13.5 million residents.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Real-time conditions on every major thoroughfare. Flood reports as they happen. Public services
                without the runaround. <span className="font-serif italic text-foreground">A government, in motion.</span>
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/traffic"
                className="group inline-flex items-baseline gap-3 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">01 ▸</span>
                View live traffic
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-baseline gap-3 border-b border-transparent pb-1 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">03 ▸</span>
                Browse public services
              </Link>
              <a
                href="tel:136"
                className="ml-auto hidden items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                Hotline
                <span className="font-serif text-2xl normal-case tracking-normal text-accent">136</span>
              </a>
            </div>
          </div>

          {/* Right column: live snapshot */}
          <aside className="lg:col-span-4">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
                Metro Snapshot
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                07:42 PHT
              </p>
            </div>

            <ul className="divide-y divide-foreground/10">
              <SnapshotRow
                label="EDSA · average"
                value="22"
                unit="kph"
                tone="moderate"
                trend="−3 vs avg"
              />
              <SnapshotRow
                label="C5 · average"
                value="18"
                unit="kph"
                tone="heavy"
                trend="−5 vs avg"
              />
              <SnapshotRow
                label="Commonwealth"
                value="29"
                unit="kph"
                tone="light"
                trend="+2 vs avg"
              />
              <SnapshotRow
                label="Flooded areas"
                value="3"
                unit="of 10"
                tone="moderate"
                trend="rising"
              />
              <SnapshotRow
                label="Active advisories"
                value="4"
                unit=""
                tone="info"
                trend="2 new"
              />
            </ul>

            <Link
              href="/traffic"
              className="group mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
            >
              Open full dashboard
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </aside>
        </div>
      </div>

      {/* Live ticker */}
      <div className="overflow-hidden border-t border-foreground/10 bg-foreground text-background">
        <div className="flex items-center gap-6 py-2.5">
          <span className="ml-4 inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-background sm:ml-6 lg:ml-10">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-moderate opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-moderate" />
            </span>
            Tape
          </span>
          <div className="flex animate-ticker gap-10 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-background/80">
            {ticker.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span className="text-background/60">{t.label}</span>
                <span className="text-background">{t.value}</span>
                <span
                  className={
                    t.tone === "heavy"
                      ? "text-status-heavy"
                      : t.tone === "moderate"
                        ? "text-status-moderate"
                        : "text-status-light"
                  }
                >
                  ●
                </span>
                <span className="text-background/30">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SnapshotRow({
  label,
  value,
  unit,
  tone,
  trend,
}: {
  label: string
  value: string
  unit: string
  tone: "light" | "moderate" | "heavy" | "info"
  trend: string
}) {
  const dotColor =
    tone === "light"
      ? "bg-status-light"
      : tone === "moderate"
        ? "bg-status-moderate"
        : tone === "heavy"
          ? "bg-status-heavy"
          : "bg-foreground"
  return (
    <li className="flex items-baseline justify-between gap-3 py-3.5">
      <span className="flex items-center gap-2.5">
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} aria-hidden />
        <span className="text-sm text-foreground">{label}</span>
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-medium leading-none tracking-tight text-foreground tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{unit}</span>
        )}
        <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
          {trend}
        </span>
      </span>
    </li>
  )
}
