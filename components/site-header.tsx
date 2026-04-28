"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", num: "00" },
  { href: "/traffic", label: "Traffic", num: "01" },
  { href: "/flood-monitoring", label: "Flood", num: "02" },
  { href: "/services", label: "Services", num: "03" },
  { href: "/news", label: "Bulletin", num: "04" },
  { href: "/about", label: "About", num: "05" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Utility row */}
      <div className="border-b border-foreground/10">
        <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-between gap-4 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:px-6 lg:px-10">
          <p className="hidden items-center gap-3 sm:flex">
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-light" aria-hidden />
              Live
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>Republic of the Philippines</span>
            <span className="text-muted-foreground/60">·</span>
            <span>Official Portal</span>
          </p>
          <p className="sm:hidden">
            <span className="text-foreground">MMDA</span> · Official Portal
          </p>
          <p className="flex items-center gap-3">
            <a href="tel:136" className="hover:text-foreground">
              Hotline <span className="text-foreground">136</span>
            </a>
            <span className="hidden text-muted-foreground/60 md:inline">·</span>
            <button type="button" className="hidden hover:text-foreground md:inline">
              EN <span className="text-muted-foreground/60">/</span> FIL
            </button>
          </p>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-baseline gap-3" aria-label="MMDA Home">
          <Wordmark />
          <span className="hidden text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground md:inline">
            Metropolitan Manila
            <br />
            Development Authority
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-baseline gap-1.5 px-3 py-2 text-sm transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70">
                      {item.num}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <span
                        className="pointer-events-none absolute inset-x-3 -bottom-[17px] h-px bg-foreground"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-sm border border-foreground/15 bg-card px-3 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" aria-hidden />
            <span>Search</span>
            <kbd className="ml-2 rounded-sm border border-foreground/10 bg-background px-1 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-foreground/15 bg-card text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-foreground/10 bg-background lg:hidden" aria-label="Mobile primary">
          <ul className="mx-auto flex max-w-[1400px] flex-col px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline justify-between gap-3 border-b border-foreground/5 py-3 text-sm last:border-b-0",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                        {item.num}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </span>
                    {active && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                        active
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}

function Wordmark() {
  return (
    <span className="flex items-baseline" aria-hidden>
      <span className="font-serif text-3xl leading-none tracking-tight text-foreground">
        M<span className="italic">m</span>da
      </span>
      <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">·</span>
      <span className="ml-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">PH</span>
    </span>
  )
}
