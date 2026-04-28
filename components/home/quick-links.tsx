import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const links = [
  { num: "01", label: "Number Coding Schedule", href: "/services#uvvrp" },
  { num: "02", label: "Towing & Impound Locations", href: "/services#impounded" },
  { num: "03", label: "MMDA Hotline 136", href: "tel:136" },
  { num: "04", label: "Marikina River Levels", href: "/flood-monitoring#marikina" },
  { num: "05", label: "Road Closures Map", href: "/news?category=road-closures" },
  { num: "06", label: "Job Opportunities", href: "#" },
  { num: "07", label: "Bids & Procurement", href: "#" },
  { num: "08", label: "Citizen's Charter", href: "#" },
]

export function QuickLinks() {
  return (
    <section className="bg-foreground py-16 text-background sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-background/15 pb-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 lg:border-r lg:border-background/15 lg:pr-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">05</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/60">
                Quick access · Frequently requested
              </span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tight text-background text-balance">
              The shortcuts <span className="italic">most people need</span>.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4">
            <p className="text-sm leading-relaxed text-background/70">
              Can&apos;t find what you need?{" "}
              <Link href="/services" className="border-b border-background/40 text-background hover:border-accent">
                Browse the full service directory
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => {
            const colStart = i % 4
            const rowStart = Math.floor(i / 4)
            return (
              <li
                key={l.label}
                className={[
                  "border-b border-background/15",
                  colStart !== 0 ? "sm:border-l-0 lg:border-l" : "",
                  colStart === 1 ? "sm:border-l" : "",
                  rowStart !== 0 ? "" : "",
                ].join(" ")}
              >
                <Link
                  href={l.href}
                  className="group flex items-baseline justify-between gap-3 py-6 transition-colors hover:bg-background/5"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/40">
                      {l.num}
                    </span>
                    <span className="font-serif text-xl leading-tight tracking-tight text-background transition-colors group-hover:text-accent text-balance">
                      {l.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-background/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
