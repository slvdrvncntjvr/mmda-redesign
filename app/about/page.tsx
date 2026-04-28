import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Building2, Users, Target, Compass, ScrollText } from "lucide-react"

export const metadata: Metadata = {
  title: "About MMDA",
  description: "Mandate, mission, leadership, and offices of the Metropolitan Manila Development Authority.",
}

const offices = [
  { name: "Traffic Engineering Center (TEC)", desc: "Plans and engineers traffic schemes across NCR thoroughfares." },
  { name: "Traffic Discipline Office (TDO)", desc: "Deploys enforcers and manages traffic violation operations." },
  { name: "Flood Control & Sewerage Management Office", desc: "Maintains pumping stations, esteros, and flood control assets." },
  { name: "Metro Parkway Clearing Group", desc: "Clears road obstructions and removes illegal structures from public roads." },
  { name: "Public Safety Office", desc: "Coordinates emergency response with allied agencies through Metrobase." },
  { name: "Solid Waste Management Office", desc: "Oversees Metro Manila waste collection, transfer, and disposal." },
]

const leaders = [
  { name: "Office of the Chairman", role: "Chairperson, MMDA", initials: "CH" },
  { name: "Office of the General Manager", role: "General Manager", initials: "GM" },
  { name: "Assistant General Manager — Operations", role: "AGM, Operations", initials: "AO" },
  { name: "Assistant General Manager — Planning", role: "AGM, Planning", initials: "AP" },
  { name: "Assistant General Manager — Finance & Admin", role: "AGM, Finance & Admin", initials: "AF" },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Agency"
        title="About the Metropolitan Manila Development Authority"
        description="The MMDA performs planning, monitoring, and coordinative functions for the seventeen cities and one municipality that comprise the National Capital Region."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section id="mandate" className="border-b border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mandate</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
                Coordinating Metro Manila as a single, integrated unit
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base leading-relaxed text-muted-foreground">
                Created under Republic Act No. 7924, the MMDA is mandated to perform planning, monitoring, and
                coordinative functions in the delivery of metro-wide services without diminution of the autonomy of
                local government units concerning purely local matters.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                <PrincipleCard
                  icon={Target}
                  title="Mission"
                  body="Deliver metro-wide services that improve the quality of life of every resident, commuter, and visitor in Metro Manila."
                />
                <PrincipleCard
                  icon={Compass}
                  title="Vision"
                  body="A safe, livable, and globally competitive Metro Manila — moving as one for its people."
                />
                <PrincipleCard
                  icon={ScrollText}
                  title="Legal basis"
                  body="Republic Act No. 7924, Implementing Rules and Regulations, and applicable Metro Manila Council resolutions."
                />
                <PrincipleCard
                  icon={Building2}
                  title="Coverage"
                  body="The seventeen cities of the National Capital Region — from Caloocan in the north to Las Piñas in the south."
                />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="leadership" className="border-b border-border bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="text-xl font-semibold tracking-tight">Leadership</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The MMDA is headed by a Chairperson appointed by the President, supported by the General Manager and
            Assistant General Managers overseeing operational, planning, and administrative concerns.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <li key={l.name} className="flex items-center gap-4 rounded-lg border border-border bg-card p-5">
                <span
                  aria-hidden
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground"
                >
                  {l.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground text-balance">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="offices" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="text-xl font-semibold tracking-tight">Major operating offices</h2>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <li key={o.name} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground text-balance">{o.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <Stat label="Cities served" value="17" caption="National Capital Region" />
            <Stat label="Personnel" value="9,800+" caption="Across all offices" />
            <Stat label="Established" value="1995" caption="Republic Act 7924" />
          </div>
        </div>
      </section>
    </>
  )
}

function PrincipleCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}) {
  return (
    <li className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" aria-hidden />
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </li>
  )
}

function Stat({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">{label}</p>
      <p className="mt-2 font-mono text-4xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-primary-foreground/70">{caption}</p>
    </div>
  )
}
