import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, AlertTriangle, CalendarClock, MapPin } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { advisories, news } from "@/lib/data"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "News & Advisories",
  description: "Press releases, road advisories, and public notices from the MMDA.",
}

const severityStyles = {
  info: "bg-secondary text-foreground border-border",
  warning: "bg-status-moderate-bg text-status-moderate border-status-moderate/30",
  alert: "bg-status-heavy-bg text-status-heavy border-status-heavy/30",
} as const

// Extended news set for the news page
const allNews = [
  ...news,
  {
    id: "n-04",
    title: "MMDA partners with LGUs on unified bike lane network",
    excerpt: "Cities of Pasig, Mandaluyong, and Makati commit to harmonized bike lane standards under the new MOA.",
    category: "Infrastructure",
    date: "Apr 19, 2026",
    image: "/images/news-road-rehab.jpg",
    href: "#",
  },
  {
    id: "n-05",
    title: "Drivers' Academy graduates 1,800 motorists in March",
    excerpt:
      "Quarterly turnout reaches a 5-year high as more cited motorists complete the road safety seminar.",
    category: "Operations",
    date: "Apr 15, 2026",
    image: "/images/news-traffic-enforcer.jpg",
    href: "#",
  },
  {
    id: "n-06",
    title: "Annual desilting of 19 priority esteros now underway",
    excerpt:
      "Pre-rainy season cleanup targets esteros with the highest historical risk of overflowing during typhoons.",
    category: "Flood Control",
    date: "Apr 10, 2026",
    image: "/images/news-flood-team.jpg",
    href: "#",
  },
]

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="News, advisories, and public notices"
        description="Stay informed with the latest from MMDA — operational updates, road advisories, and press releases."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Advisories" }]}
      />

      <section className="border-b border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Active advisories</h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
              {advisories.length} active
            </span>
          </div>
          <ul className="grid gap-4 lg:grid-cols-2">
            {advisories.map((a) => (
              <li
                key={a.id}
                className="flex flex-col rounded-lg border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      severityStyles[a.severity],
                    )}
                  >
                    <AlertTriangle className="h-3 w-3" aria-hidden />
                    {a.type}
                  </span>
                  <span className="text-xs text-muted-foreground">#{a.id.toUpperCase()}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug text-foreground text-balance">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                    <span className="font-mono">{a.effective}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {a.area}
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight">Press releases</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allNews.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={n.image || "/placeholder.svg"}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">
                        {n.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" aria-hidden />
                        <span className="font-mono">{n.date}</span>
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-foreground text-balance">
                      {n.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Read story
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
