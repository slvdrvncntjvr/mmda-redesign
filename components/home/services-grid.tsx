import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { services } from "@/lib/data"

export function ServicesGrid() {
  return (
    <section className="border-b border-foreground/10 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-foreground/10 pb-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 lg:border-r lg:border-foreground/10 lg:pr-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">03</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Public services · Eight processes
              </span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tight text-foreground text-balance">
              Get things done <span className="italic">without the runaround</span>.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every common transaction handled by MMDA — from settling traffic citations to retrieving impounded
              vehicles — with the office, hours, and contact you need.
            </p>
            <Link
              href="/services"
              className="group mt-6 inline-flex items-baseline gap-2 border-b border-foreground pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              All services directory
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <ol className="mt-2 divide-y divide-foreground/10">
          {services.map((s, i) => (
            <li key={s.id} className="group">
              <Link
                href={s.href}
                className="grid items-baseline gap-2 py-6 transition-colors hover:bg-secondary/40 sm:grid-cols-12 sm:gap-6 sm:px-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:col-span-2">
                  {s.category}
                </span>
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent sm:col-span-6 sm:text-3xl text-balance">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">{s.description}</p>
                <span className="hidden items-center justify-end sm:col-span-1 sm:flex">
                  <ArrowUpRight
                    className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
