import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { advisories } from "@/lib/data"
import { cn } from "@/lib/utils"

const severityStyles = {
  info: "border-foreground/15 bg-background text-foreground",
  warning: "border-status-moderate/40 bg-status-moderate-bg text-status-moderate",
  alert: "border-status-heavy/40 bg-status-heavy-bg text-status-heavy",
} as const

export function AdvisoriesSection() {
  return (
    <section className="border-b border-foreground/10 bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-foreground/10 pb-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 lg:border-r lg:border-foreground/10 lg:pr-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">02</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Public advisories · {advisories.length} active
              </span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tight text-foreground text-balance">
              Notices, closures, <span className="italic">and warnings</span>.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4">
            <Link
              href="/news"
              className="group inline-flex items-baseline gap-2 border-b border-foreground pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              All advisories
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="mt-8 divide-y divide-foreground/10 border-y border-foreground/10">
          {advisories.map((a, i) => (
            <li key={a.id} className="group">
              <Link
                href="/news"
                className="grid gap-4 py-7 transition-colors hover:bg-background/60 sm:grid-cols-12 sm:gap-6 sm:px-2"
              >
                <div className="flex items-start gap-3 sm:col-span-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
                      severityStyles[a.severity],
                    )}
                  >
                    {a.type}
                  </span>
                </div>
                <div className="sm:col-span-6">
                  <h3 className="font-serif text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent text-balance sm:text-[1.75rem]">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
                <dl className="space-y-2 sm:col-span-3">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Effective
                    </dt>
                    <dd className="mt-1 font-mono text-xs text-foreground">{a.effective}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Area
                    </dt>
                    <dd className="mt-1 text-xs text-foreground">{a.area}</dd>
                  </div>
                </dl>
                <div className="flex items-start justify-end sm:col-span-1">
                  <ArrowUpRight
                    className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
