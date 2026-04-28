import type { Metadata } from "next"
import { Car, FileText, ShieldAlert, IdCard, GraduationCap, FileCheck, Radio, Calendar, Clock, MapPin, Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { services } from "@/lib/data"

export const metadata: Metadata = {
  title: "Public Services",
  description: "Public services, processes, and offices of the Metropolitan Manila Development Authority.",
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  impounded: Car,
  violations: FileText,
  towing: ShieldAlert,
  id: IdCard,
  "drivers-academy": GraduationCap,
  "permit-to-tow": FileCheck,
  metrobase: Radio,
  uvvrp: Calendar,
}

const serviceDetails: Record<string, { steps: string[]; office: string; hours: string; contact: string }> = {
  impounded: {
    steps: [
      "Bring a valid ID and the original Certificate of Registration (CR) and Official Receipt (OR).",
      "Settle the corresponding traffic violation at the MMDA Redemption Office.",
      "Pay the towing and storage fees at the cashier.",
      "Present the official receipt to claim the vehicle from the impound facility.",
    ],
    office: "MMDA Redemption Office, Tumana, Marikina City",
    hours: "Mon–Sun, 8:00 AM – 5:00 PM",
    contact: "(02) 8882-0925",
  },
  violations: {
    steps: [
      "File a written contest within 5 working days from the date of citation.",
      "Submit your Temporary Operator's Permit (TOP) and supporting documents.",
      "Attend the scheduled hearing at the Traffic Adjudication Division (TAD).",
      "Receive the resolution and settle accordingly.",
    ],
    office: "Traffic Adjudication Division, MMDA Main Office",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8882-4177",
  },
  towing: {
    steps: [
      "Document the towing operation (photos, plate, location, time).",
      "File a complaint with the MMDA Anti-Illegal Towing Task Force.",
      "Submit a sworn affidavit detailing the incident.",
      "Cooperate with the investigation and hearing process.",
    ],
    office: "MMDA Anti-Illegal Towing Task Force",
    hours: "24/7 Hotline",
    contact: "136",
  },
  id: {
    steps: [
      "Submit accomplished application form to HRMD.",
      "Provide a recent 2x2 photo and required clearances.",
      "Have biometrics captured at the ID issuance office.",
      "Claim ID after 5 working days.",
    ],
    office: "HRMD, MMDA Main Office",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8882-4151 loc. 264",
  },
  "drivers-academy": {
    steps: [
      "Register online or at the MMDA Road Safety Office.",
      "Pay the seminar fee (waived for cited motorists).",
      "Attend the scheduled half-day seminar.",
      "Receive the Certificate of Completion.",
    ],
    office: "MMDA Road Safety Unit",
    hours: "Mon–Sat, 8:00 AM – 4:00 PM",
    contact: "(02) 8882-4185",
  },
  "permit-to-tow": {
    steps: [
      "Submit business and vehicle documents for accreditation.",
      "Undergo inspection of towing units and storage facility.",
      "Pay the corresponding accreditation fees.",
      "Receive the Permit to Operate, valid for one year.",
    ],
    office: "MMDA Accreditation Office",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    contact: "(02) 8882-4150 loc. 311",
  },
  metrobase: {
    steps: [
      "Available 24/7 for emergency reports and traffic incidents.",
      "Coordinates with PNP, BFP, and city emergency response units.",
      "Receives reports from CCTV monitors and field enforcers.",
    ],
    office: "Metrobase Command Center, EDSA, Makati City",
    hours: "24/7",
    contact: "136",
  },
  uvvrp: {
    steps: [
      "Number coding is in effect Mondays to Fridays, 7:00 AM – 8:00 PM.",
      "Plate ending 1, 2 — Monday; 3, 4 — Tuesday; 5, 6 — Wednesday; 7, 8 — Thursday; 9, 0 — Friday.",
      "Window hours and exemptions vary per LGU; check your destination city.",
    ],
    office: "Traffic Engineering Center",
    hours: "Mon–Fri, 7:00 AM – 8:00 PM",
    contact: "(02) 8882-4150",
  },
}

export default function ServicesPage() {
  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    acc[s.category] = acc[s.category] ? [...acc[s.category], s] : [s]
    return acc
  }, {})

  return (
    <>
      <PageHeader
        eyebrow="For the public"
        title="Public services and processes"
        description="A directory of common transactions handled by MMDA offices — from settling traffic citations to retrieving impounded vehicles."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="border-b border-border bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-secondary/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Browse by category</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {Object.keys(grouped).map((cat) => (
                <li key={cat}>
                  <a
                    href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="mb-12 last:mb-0">
              <h2 className="text-xl font-semibold tracking-tight">{category}</h2>
              <ul className="mt-5 space-y-4">
                {items.map((s) => {
                  const Icon = iconMap[s.id] ?? FileText
                  const details = serviceDetails[s.id]
                  return (
                    <li key={s.id} id={s.id} className="rounded-lg border border-border bg-card scroll-mt-24">
                      <div className="flex flex-col gap-6 p-6 lg:flex-row">
                        <div className="lg:w-1/3">
                          <div className="flex items-start gap-3">
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                              <Icon className="h-5 w-5" aria-hidden />
                            </span>
                            <div>
                              <h3 className="text-base font-semibold leading-snug text-foreground">{s.title}</h3>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                            </div>
                          </div>
                          {details && (
                            <dl className="mt-5 space-y-2 border-l-2 border-border pl-4 text-xs">
                              <DetailRow icon={MapPin} label="Office" value={details.office} />
                              <DetailRow icon={Clock} label="Hours" value={details.hours} />
                              <DetailRow icon={Phone} label="Contact" value={details.contact} mono />
                            </dl>
                          )}
                        </div>
                        <div className="lg:w-2/3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {s.id === "uvvrp" ? "Schedule" : "Process"}
                          </p>
                          <ol className="mt-3 space-y-3">
                            {details?.steps.map((step, i) => (
                              <li key={i} className="flex gap-3 text-sm">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
                                  {i + 1}
                                </span>
                                <span className="leading-relaxed text-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <div>
        <dt className="font-medium text-muted-foreground">{label}</dt>
        <dd className={mono ? "font-mono text-foreground" : "text-foreground"}>{value}</dd>
      </div>
    </div>
  )
}
