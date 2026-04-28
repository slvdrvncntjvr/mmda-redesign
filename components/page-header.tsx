import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function PageHeader({
  eyebrow,
  sectionNumber,
  title,
  italic,
  description,
  breadcrumbs,
  meta,
}: {
  eyebrow?: string
  sectionNumber?: string
  title: string
  /** A trailing italic phrase appended to the title in serif italic */
  italic?: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  meta?: { label: string; value: string }[]
}) {
  return (
    <section className="border-b border-foreground/10 bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="border-b border-foreground/5 py-3">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {breadcrumbs.map((b, i) => (
                <li key={`${b.label}-${i}`} className="flex items-center gap-1.5">
                  {b.href ? (
                    <Link href={b.href} className="hover:text-foreground">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{b.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-3">
              {sectionNumber && (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {sectionNumber}
                </span>
              )}
              {eyebrow && (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {eyebrow}
                </span>
              )}
            </div>
            <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-foreground text-balance">
              {title}
              {italic && (
                <>
                  {" "}
                  <span className="italic text-accent">{italic}</span>
                </>
              )}
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {meta && meta.length > 0 && (
            <aside className="lg:col-span-4 lg:border-l lg:border-foreground/10 lg:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Bulletin meta
              </p>
              <dl className="mt-4 divide-y divide-foreground/10">
                {meta.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-3 py-2.5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {m.label}
                    </dt>
                    <dd className="font-mono text-xs text-foreground">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
