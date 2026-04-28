import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { news } from "@/lib/data"

export function NewsSection() {
  const [lead, ...rest] = news
  return (
    <section className="border-b border-foreground/10 bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-foreground/10 pb-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 lg:border-r lg:border-foreground/10 lg:pr-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">04</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Bulletin · Latest from the agency
              </span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tight text-foreground text-balance">
              The newsroom, <span className="italic">unedited</span>.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4">
            <Link
              href="/news"
              className="group inline-flex items-baseline gap-2 border-b border-foreground pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              All press releases
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Lead story */}
          <Link
            href={lead.href}
            className="group flex flex-col gap-6 lg:col-span-7 lg:border-r lg:border-foreground/10 lg:pr-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted">
              <Image
                src={lead.image || "/placeholder.svg"}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur">
                Feature · {lead.category}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {lead.date}
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[2.5rem] text-balance">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead.excerpt}</p>
              <span className="mt-5 inline-flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors group-hover:text-accent">
                Read the full story
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>

          {/* Side stack */}
          <ul className="lg:col-span-5">
            {rest.map((n, i) => (
              <li key={n.id} className="border-b border-foreground/10 last:border-b-0">
                <Link href={n.href} className="group block py-6 first:pt-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {n.category}
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {n.date}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent text-balance">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
