import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const linkGroups = [
  {
    title: "01 — Agency",
    links: [
      { href: "/about", label: "About MMDA" },
      { href: "/about#leadership", label: "Leadership" },
      { href: "/about#mandate", label: "Mandate & Mission" },
      { href: "/about#offices", label: "Operating Offices" },
    ],
  },
  {
    title: "02 — Public Services",
    links: [
      { href: "/services", label: "All services" },
      { href: "/services#impounded", label: "Impounded vehicles" },
      { href: "/services#violations", label: "Traffic violations" },
      { href: "/services#towing", label: "Towing concerns" },
    ],
  },
  {
    title: "03 — Monitoring",
    links: [
      { href: "/traffic", label: "Traffic updates" },
      { href: "/flood-monitoring", label: "Flood monitoring" },
      { href: "/news", label: "Advisories" },
      { href: "/news?category=road-closures", label: "Road closures" },
    ],
  },
  {
    title: "04 — Resources",
    links: [
      { href: "/news", label: "Press releases" },
      { href: "#", label: "Transparency Seal" },
      { href: "#", label: "Procurement" },
      { href: "#", label: "Citizen's Charter" },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-foreground/10 bg-background">
      {/* Massive wordmark band */}
      <div className="border-b border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Issued in Manila · Since 1995
              </p>
              <p
                className="mt-3 font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-tight text-foreground"
                aria-hidden
              >
                M<span className="italic">m</span>da<span className="text-accent">.</span>
              </p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
              Performing planning, monitoring and coordinative functions for the seventeen cities of Metro Manila —
              with operational supervision of metro-wide services.
            </p>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Headquarters
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-tight text-foreground">
              EDSA cor. Orense St.,<br />Guadalupe Nuevo, Makati City.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted-foreground">
              <li className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-2">
                <span className="uppercase tracking-[0.18em]">Hotline</span>
                <a href="tel:136" className="text-foreground hover:underline">
                  136
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-2">
                <span className="uppercase tracking-[0.18em]">Trunk</span>
                <a href="tel:+6288824150" className="text-foreground hover:underline">
                  (02) 8882-4150
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-2">
                <span className="uppercase tracking-[0.18em]">Email</span>
                <a href="mailto:info@mmda.gov.ph" className="text-foreground hover:underline">
                  info@mmda.gov.ph
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="uppercase tracking-[0.18em]">Hours</span>
                <span className="text-foreground">Mon–Sun · 24/7</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-baseline gap-1 text-sm text-foreground transition-colors hover:text-accent"
                      >
                        <span className="border-b border-transparent transition-colors group-hover:border-accent">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className="h-3 w-3 text-muted-foreground/60 opacity-0 transition-all group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>
            © {year} Metropolitan Manila Development Authority · Republic of the Philippines
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Accessibility
              </Link>
            </li>
            <li className="text-foreground">v.2026.04.28</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
