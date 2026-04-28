import type { Metadata } from "next"
import { Activity, Camera, Gauge, Phone, Radio } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { trafficSegments } from "@/lib/data"

export const metadata: Metadata = {
  title: "Traffic Updates",
  description: "Real-time traffic conditions across EDSA, C5, Commonwealth, and other major Metro Manila roads.",
}

const corridors = ["EDSA", "C5", "Commonwealth", "Roxas Blvd.", "España", "Quezon Ave."]

export default function TrafficPage() {
  const segmentsByRoad = corridors.map((road) => ({
    road,
    segments: trafficSegments.filter((s) => s.road === road),
  }))

  return (
    <>
      <PageHeader
        eyebrow="Live monitoring"
        title="Metro Manila traffic conditions"
        description="Aggregated from MMDA Metrobase CCTV network, traffic enforcers, and field reports. Updated continuously throughout the day."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Traffic" }]}
      />

      <section className="border-b border-border bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Average speed (NCR)" value="24 kph" trend="-3 kph vs. avg" icon={Gauge} />
            <SummaryCard label="Heavy segments" value="6" trend="of 15 monitored" icon={Activity} />
            <SummaryCard label="CCTV cameras online" value="408" trend="of 415" icon={Camera} />
            <SummaryCard label="Field personnel" value="2,512" trend="deployed today" icon={Radio} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Major thoroughfares</h2>
            <p className="font-mono text-xs text-muted-foreground">As of 07:42 AM PHT</p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {segmentsByRoad.map(({ road, segments }) => (
              <article key={road} className="rounded-lg border border-border bg-card">
                <header className="flex items-center justify-between border-b border-border px-5 py-3">
                  <h3 className="text-base font-semibold">{road}</h3>
                  <p className="text-xs text-muted-foreground">{segments.length} monitored segments</p>
                </header>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <th className="px-5 py-2 font-medium">Segment</th>
                        <th className="px-2 py-2 font-medium">NB</th>
                        <th className="px-2 py-2 font-medium">SB</th>
                        <th className="px-5 py-2 text-right font-medium">Speed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {segments.map((s) => (
                        <tr key={s.segment}>
                          <td className="px-5 py-3 font-medium text-foreground">{s.segment}</td>
                          <td className="px-2 py-3">
                            <StatusBadge status={s.northbound} />
                          </td>
                          <td className="px-2 py-3">
                            <StatusBadge status={s.southbound} />
                          </td>
                          <td className="px-5 py-3 text-right font-mono">{s.speed} kph</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Report a traffic concern</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Report stalled vehicles, road obstructions, or traffic-related incidents directly to the MMDA
                Metrobase command center.
              </p>
              <ul className="mt-5 space-y-3">
                <ContactRow icon={Phone} label="Metro Manila Hotline" value="136" />
                <ContactRow icon={Phone} label="MMDA Trunkline" value="(02) 8882-4150" />
                <ContactRow icon={Phone} label="Metrobase 24/7" value="(02) 8882-4151" />
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Understanding traffic levels</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Traffic conditions are reported as the average state of vehicle flow over a defined road segment.
              </p>
              <dl className="mt-5 space-y-3">
                <LegendRow status="light" desc="Free flowing — speeds at or above 40 kph" />
                <LegendRow status="moderate" desc="Stop-and-go — speeds between 20–40 kph" />
                <LegendRow status="heavy" desc="Crawling — speeds below 20 kph" />
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function SummaryCard({
  label,
  value,
  trend,
  icon: Icon,
}: {
  label: string
  value: string
  trend: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-md border border-border bg-background px-4 py-3">
      <span className="flex items-center gap-2 text-sm text-foreground">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
        {label}
      </span>
      <a href={`tel:${value.replace(/[^\d+]/g, "")}`} className="font-mono text-sm font-semibold text-primary hover:underline">
        {value}
      </a>
    </li>
  )
}

function LegendRow({ status, desc }: { status: "light" | "moderate" | "heavy"; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <StatusBadge status={status} />
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
