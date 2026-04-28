import { Hero } from "@/components/home/hero"
import { DashboardSnapshot } from "@/components/home/dashboard-snapshot"
import { AdvisoriesSection } from "@/components/home/advisories-section"
import { ServicesGrid } from "@/components/home/services-grid"
import { NewsSection } from "@/components/home/news-section"
import { QuickLinks } from "@/components/home/quick-links"

export default function HomePage() {
  return (
    <>
      <Hero />
      <DashboardSnapshot />
      <AdvisoriesSection />
      <ServicesGrid />
      <NewsSection />
      <QuickLinks />
    </>
  )
}
