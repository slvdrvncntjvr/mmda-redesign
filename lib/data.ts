import type { TrafficStatus } from "@/components/status-badge"

export type RoadSegment = {
  road: string
  segment: string
  northbound: TrafficStatus
  southbound: TrafficStatus
  speed: number // kph average
}

export const trafficSegments: RoadSegment[] = [
  { road: "EDSA", segment: "Balintawak — North Ave.", northbound: "moderate", southbound: "heavy", speed: 22 },
  { road: "EDSA", segment: "North Ave. — Kamuning", northbound: "heavy", southbound: "moderate", speed: 14 },
  { road: "EDSA", segment: "Kamuning — Ortigas", northbound: "heavy", southbound: "heavy", speed: 11 },
  { road: "EDSA", segment: "Ortigas — Guadalupe", northbound: "moderate", southbound: "heavy", speed: 18 },
  { road: "EDSA", segment: "Guadalupe — Magallanes", northbound: "light", southbound: "moderate", speed: 34 },
  { road: "EDSA", segment: "Magallanes — Roxas Blvd.", northbound: "light", southbound: "light", speed: 41 },
  { road: "C5", segment: "Libis — Eastwood", northbound: "moderate", southbound: "heavy", speed: 19 },
  { road: "C5", segment: "Eastwood — Bagong Ilog", northbound: "heavy", southbound: "heavy", speed: 12 },
  { road: "C5", segment: "Bagong Ilog — Kalayaan", northbound: "moderate", southbound: "moderate", speed: 24 },
  { road: "Commonwealth", segment: "Fairview — Tandang Sora", northbound: "light", southbound: "moderate", speed: 38 },
  { road: "Commonwealth", segment: "Tandang Sora — Philcoa", northbound: "moderate", southbound: "heavy", speed: 21 },
  { road: "Roxas Blvd.", segment: "MOA — Quirino", northbound: "light", southbound: "light", speed: 45 },
  { road: "Roxas Blvd.", segment: "Quirino — Padre Burgos", northbound: "moderate", southbound: "moderate", speed: 28 },
  { road: "España", segment: "Welcome Rotonda — Lacson", northbound: "moderate", southbound: "heavy", speed: 17 },
  { road: "Quezon Ave.", segment: "Welcome Rotonda — Timog", northbound: "heavy", southbound: "heavy", speed: 13 },
]

export type FloodArea = {
  area: string
  city: string
  level: "passable" | "not-passable-light" | "not-passable-heavy"
  depth: string
  updated: string
}

export const floodAreas: FloodArea[] = [
  { area: "España Blvd. cor. Lacson", city: "Manila", level: "not-passable-light", depth: "Gutter-deep", updated: "07:42" },
  { area: "Araneta Ave. (both directions)", city: "Quezon City", level: "passable", depth: "Clear", updated: "07:38" },
  { area: "Taft Ave. cor. P. Faura", city: "Manila", level: "not-passable-light", depth: "Half-tire", updated: "07:40" },
  { area: "C5 SB near Kalayaan", city: "Taguig", level: "passable", depth: "Clear", updated: "07:35" },
  { area: "EDSA NB near Kamuning", city: "Quezon City", level: "passable", depth: "Clear", updated: "07:30" },
  { area: "Roxas Blvd. SB near Quirino", city: "Manila", level: "not-passable-heavy", depth: "Tire-deep", updated: "07:45" },
  { area: "Commonwealth Ave. NB", city: "Quezon City", level: "passable", depth: "Clear", updated: "07:33" },
  { area: "Marikina River — Sto. Niño", city: "Marikina", level: "passable", depth: "1st alarm: 15.0m", updated: "07:50" },
  { area: "Tomas Morato cor. Scout Reyes", city: "Quezon City", level: "not-passable-light", depth: "Gutter-deep", updated: "07:41" },
  { area: "Pasay Rotonda", city: "Pasay", level: "passable", depth: "Clear", updated: "07:36" },
]

export type Advisory = {
  id: string
  title: string
  type: "Road Closure" | "Weather" | "Public Notice" | "Event"
  severity: "info" | "warning" | "alert"
  effective: string
  area: string
  body: string
}

export const advisories: Advisory[] = [
  {
    id: "ad-001",
    title: "Lane closure along EDSA southbound near Ortigas for road rehabilitation",
    type: "Road Closure",
    severity: "warning",
    effective: "Apr 28 — May 3, 10:00 PM to 5:00 AM",
    area: "EDSA SB, Ortigas",
    body:
      "One lane will be closed nightly for asphalt overlay works. Motorists are advised to take alternate routes via Shaw Boulevard or Meralco Avenue.",
  },
  {
    id: "ad-002",
    title: "PAGASA: Yellow rainfall warning over Metro Manila",
    type: "Weather",
    severity: "alert",
    effective: "Apr 28, 06:00 AM until further notice",
    area: "Metro Manila",
    body:
      "Flooding is possible in low-lying areas. MMDA flood control teams are pre-positioned at known flood-prone intersections.",
  },
  {
    id: "ad-003",
    title: "Number Coding Scheme: regular implementation resumes Monday",
    type: "Public Notice",
    severity: "info",
    effective: "Effective Apr 28, Monday",
    area: "Metro Manila",
    body:
      "The Unified Vehicular Volume Reduction Program will resume regular implementation from 7:00 AM to 8:00 PM on weekdays.",
  },
  {
    id: "ad-004",
    title: "Roxas Boulevard partial closure for marathon event",
    type: "Event",
    severity: "warning",
    effective: "May 4, 04:00 AM — 9:00 AM",
    area: "Roxas Blvd., Manila — Pasay",
    body:
      "Southbound lanes from Quirino to MOA will be closed during the event. Coastal Road and Macapagal Boulevard are recommended alternates.",
  },
]

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  href: string
}

export const news: NewsItem[] = [
  {
    id: "n-01",
    title: "MMDA deploys 2,500 traffic personnel for Holy Week return",
    excerpt:
      "Additional enforcers will be stationed across major thoroughfares to manage the influx of returning vacationers.",
    category: "Operations",
    date: "Apr 26, 2026",
    image: "/images/news-traffic-enforcer.jpg",
    href: "/news/holy-week-deployment",
  },
  {
    id: "n-02",
    title: "Estero clean-up operations intensify ahead of rainy season",
    excerpt:
      "Flood control task force clears over 1,200 cubic meters of silt and debris from Manila waterways this week.",
    category: "Flood Control",
    date: "Apr 24, 2026",
    image: "/images/news-flood-team.jpg",
    href: "/news/estero-cleanup",
  },
  {
    id: "n-03",
    title: "Commonwealth Avenue rehabilitation enters final phase",
    excerpt:
      "The 8.2-kilometer concrete reblocking project is on track to be completed by end of June 2026.",
    category: "Infrastructure",
    date: "Apr 22, 2026",
    image: "/images/news-road-rehab.jpg",
    href: "/news/commonwealth-rehab",
  },
]

export type Service = {
  id: string
  title: string
  description: string
  category: "Traffic" | "Vehicle" | "Public Safety" | "Permits"
  href: string
}

export const services: Service[] = [
  {
    id: "impounded",
    title: "Redemption of Impounded Vehicles",
    description: "Process for retrieving towed or impounded vehicles from MMDA impound facilities.",
    category: "Vehicle",
    href: "/services#impounded",
  },
  {
    id: "violations",
    title: "Contesting Traffic Violations",
    description: "File a formal contest for traffic citations issued by MMDA enforcers.",
    category: "Traffic",
    href: "/services#violations",
  },
  {
    id: "towing",
    title: "Towing Concerns & Complaints",
    description: "Report unauthorized towing or file a complaint about a private towing operator.",
    category: "Public Safety",
    href: "/services#towing",
  },
  {
    id: "id",
    title: "MMDA Identification Card",
    description: "Issuance and renewal of official MMDA identification cards for personnel.",
    category: "Permits",
    href: "/services#id",
  },
  {
    id: "drivers-academy",
    title: "Road Safety & Drivers' Academy",
    description: "Mandatory road safety seminars for cited motorists and the public.",
    category: "Traffic",
    href: "/services#academy",
  },
  {
    id: "permit-to-tow",
    title: "Permit to Operate (Towing)",
    description: "Application for accreditation of private towing service providers in Metro Manila.",
    category: "Permits",
    href: "/services#permit-to-tow",
  },
  {
    id: "metrobase",
    title: "Metrobase Coordination Center",
    description: "Centralized command center for traffic, flood, and emergency response coordination.",
    category: "Public Safety",
    href: "/services#metrobase",
  },
  {
    id: "uvvrp",
    title: "Number Coding (UVVRP)",
    description: "Information on the Unified Vehicular Volume Reduction Program schedule and exemptions.",
    category: "Traffic",
    href: "/services#uvvrp",
  },
]
