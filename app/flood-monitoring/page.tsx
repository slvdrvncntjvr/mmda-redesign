import type { Metadata } from "next"
import { Droplets, AlertTriangle, CloudRain, Waves, MapPin } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { floodAreas } from "@/lib/data"

export const metadata: Metadata = {
  title: "Flood Monitoring",
  description: "Live flood reports and river level monitoring across Metro Manila.",
}

const riverGauges = [
  { name: "Marikina River — Sto. Niño", level: 14.2, alarm1: 15, alarm2: 17, alarm3: 18, status: "Normal" },
  { name: "San Juan River — V. Mapa", level: 8.4, alarm1: 10, alarm2: 11, alarm3: 12, status: "Normal" },
  { name: "Pasig River — Napindan", level: 11.1, alarm1: 12, alarm2: 13, alarm3: 14, status: "Normal" },
  { name: "Tullahan River — Malabon", level: 9.6, alarm1: 11, alarm2: 12, alarm3: 13, status: "Normal" },
]

export default function FloodMonitoringPage() {
  const notPassable = floodAreas.filter((f) => f.level !== "passable").length

  return (
    <>
      <PageHeader
        eyebrow="Live monitoring"
        title="Flood reports across Metro Manila"
        description="Real-time updates from MMDA Flood Control and field personnel. River level data sourced from MMDA-EFCOS gauges."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Flood Monitoring" }]}
      />

      <section className="border-b border-border bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Areas with flooding" value={String(notPassable)} caption="of 10 monitored" icon={Droplets} />
            <SummaryCard label="Active warnings" value="1" caption="Yellow rainfall — PAGASA" icon={AlertTriangle} />
            <SummaryCard label="Pump stations online" value="71" caption="of 71 stations" icon={Waves} />
            <SummaryCard label="Rainfall (24h)" value="38 mm" caption="Light to moderate" icon={CloudRain} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">Flooded area reports</h2>
                <p className="font-mono text-xs text-muted-foreground">Updated 07:50 AM</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Area</th>
                      <th className="px-5 py-3 font-medium">City</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Depth</th>
                      <th className="px-5 py-3 text-right font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {floodAreas.map((f) => (
                      <tr key={f.area}>
                        <td className="px-5 py-3">
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                            <span className="font-medium text-foreground">{f.area}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{f.city}</td>
                        <td className="px-5 py-3">
                          {f.level === "passable" ? (
                            <StatusBadge status="light" label="Passable" />
                          ) : f.level === "not-passable-light" ? (
                            <StatusBadge status="moderate" label="Light vehicles only" />
                          ) : (
                            <StatusBadge status="heavy" label="Not passable" />
                          )}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{f.depth}</td>
                        <td className="px-5 py-3 text-right font-mono text-muted-foreground">{f.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside id="marikina">
              <h2 className="text-xl font-semibold tracking-tight">River levels</h2>
              <ul className="mt-5 space-y-4">
                {riverGauges.map((r) => {
                  const pct = Math.min(100, Math.round((r.level / r.alarm3) * 100))
                  return (
                    <li key={r.name} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground text-balance">{r.name}</p>
                        <StatusBadge status="light" label={r.status} />
                      </div>
                      <div className="mt-3 flex items-end justify-between text-xs text-muted-foreground">
                        <span>
                          Current{" "}
                          <span className="font-mono text-base font-semibold text-foreground">{r.level} m</span>
                        </span>
                        <span className="font-mono">3rd alarm {r.alarm3} m</span>
                      </div>
                      <div
                        className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${r.name} water level`}
                      >
                        <div
                          className="h-full rounded-full bg-status-light"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
                        <span>1st {r.alarm1}m</span>
                        <span>2nd {r.alarm2}m</span>
                        <span>3rd {r.alarm3}m</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight">Flood preparedness reminders</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Avoid flooded streets",
                body: "Even shallow flowing water can stall vehicles or sweep pedestrians off their feet. Take alternate routes posted in our advisories.",
              },
              {
                title: "Monitor rainfall warnings",
                body: "Yellow, orange, and red rainfall warnings from PAGASA indicate increasing severity. Heed evacuation calls from your local LGU.",
              },
              {
                title: "Report blocked drainage",
                body: "Notify MMDA Flood Control via Hotline 136 if you spot clogged catch basins or esteros that may worsen flooding.",
              },
            ].map((item) => (
              <li key={item.title} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function SummaryCard({
  label,
  value,
  caption,
  icon: Icon,
}: {
  label: string
  value: string
  caption: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
    </div>
  )
}
