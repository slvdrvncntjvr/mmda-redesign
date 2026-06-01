"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowSquareOut,
  Buildings,
  ClipboardText,
  DownloadSimple,
  Files,
  FolderOpen,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { transparencyCategories } from "@/lib/transparency-data";

type TabId = "organizational-profile" | "citizen-charter" | "plans-and-reports";

const tabs: { id: TabId; icon: typeof Buildings; label: { en: string; fil: string } }[] = [
  { id: "organizational-profile", icon: Buildings, label: { en: "Organizational Profile", fil: "Organisasyonal na Profile" } },
  { id: "citizen-charter", icon: ClipboardText, label: { en: "Citizen Charter", fil: "Citizen Charter" } },
  { id: "plans-and-reports", icon: Files, label: { en: "Plans and Reports", fil: "Mga Plano at Ulat" } },
];

function getTabFromHash(hash: string): TabId | null {
  const value = hash.replace("#", "");
  return tabs.some((tab) => tab.id === value) ? (value as TabId) : null;
}

const organizationalHighlights = [
  { title: { en: "Legal basis", fil: "Legal na batayan" }, description: { en: "Republic Act No. 7924 establishes MMDA as the agency responsible for metro-wide services and coordination in Metro Manila.", fil: "Itinatag ng Republic Act No. 7924 ang MMDA bilang ahensyang may pananagutan sa metro-wide services at koordinasyon sa Metro Manila." } },
  { title: { en: "Vision", fil: "Bisyon" }, description: { en: "A safe, resilient, and mobility-ready Metro Manila for all residents.", fil: "Isang ligtas, matatag, at mobility-ready na Metro Manila para sa lahat ng residente." } },
  { title: { en: "Mission", fil: "Misyon" }, description: { en: "Deliver coordinated traffic, flood control, public safety, and urban management services through data-driven operations.", fil: "Maghatid ng koordinadong traffic, flood control, public safety, at urban management services gamit ang data-driven operations." } },
  { title: { en: "Operational scope", fil: "Saklaw ng operasyon" }, description: { en: "MMDA coordinates with 17 LGUs and partner national agencies for transport, disaster response, and road operations.", fil: "Nakikipag-ugnayan ang MMDA sa 17 LGU at partner national agencies para sa transport, disaster response, at road operations." } },
] as const;

const officeDirectory = [
  { office: { en: "Traffic Discipline Office", fil: "Traffic Discipline Office" }, function: { en: "Traffic management, enforcement operations, and corridor discipline support.", fil: "Pamamahala ng trapiko, enforcement operations, at corridor discipline support." }, contact: "traffic@mmda.gov.ph", hours: { en: "Mon-Fri, 8:00 AM to 5:00 PM", fil: "Lun-Biy, 8:00 AM hanggang 5:00 PM" } },
  { office: { en: "Flood Control and Sewerage Management", fil: "Flood Control and Sewerage Management" }, function: { en: "Flood mitigation, pumping station monitoring, and drainage response coordination.", fil: "Flood mitigation, pumping station monitoring, at drainage response coordination." }, contact: "floodcontrol@mmda.gov.ph", hours: { en: "24/7 monitoring operations", fil: "24/7 monitoring operations" } },
  { office: { en: "Public Safety Division", fil: "Public Safety Division" }, function: { en: "Incident reporting validation, rapid response coordination, and field deployment support.", fil: "Incident reporting validation, rapid response coordination, at field deployment support." }, contact: "safety@mmda.gov.ph", hours: { en: "Mon-Sat, 7:00 AM to 7:00 PM", fil: "Lun-Sab, 7:00 AM hanggang 7:00 PM" } },
] as const;

const charterCommitments = [
  { en: "No hidden fees", fil: "Walang hidden fees" },
  { en: "No fixers", fil: "Walang fixer" },
  { en: "Clear timelines", fil: "Malinaw na timeline" },
  { en: "Trackable requests", fil: "Nasusubaybayang request" },
] as const;

const charterServices = [
  { name: { en: "Report a road concern", fil: "Mag-ulat ng concern sa kalsada" }, requirements: { en: ["Location", "Concern type", "Photo (optional)", "Contact details"], fil: ["Lokasyon", "Uri ng concern", "Litrato (opsyonal)", "Contact details"] }, processing: { en: "24 to 48 hours initial validation", fil: "24 hanggang 48 oras na initial validation" }, fees: { en: "None", fil: "Wala" }, office: { en: "Public Safety and Operations Coordination", fil: "Public Safety at Operations Coordination" } },
  { name: { en: "Towing and impound inquiry", fil: "Towing at impound inquiry" }, requirements: { en: ["Plate number", "Valid ID", "Authorization letter (if representative)"], fil: ["Plate number", "Valid ID", "Authorization letter (kung kinatawan)"] }, processing: { en: "Same-day verification during service hours", fil: "Same-day verification sa oras ng serbisyo" }, fees: { en: "Based on published towing and storage schedule", fil: "Ayon sa published towing at storage schedule" }, office: { en: "Towing and Impound Management", fil: "Towing at Impound Management" } },
] as const;

const kpiCards = [
  { label: { en: "Average corridor speed", fil: "Average corridor speed" }, value: "26 km/h", note: { en: "on priority corridors", fil: "sa priority corridors" } },
  { label: { en: "Incident response time", fil: "Incident response time" }, value: "18 min", note: { en: "median dispatch-to-arrival", fil: "median dispatch-to-arrival" } },
  { label: { en: "Flood response readiness", fil: "Flood response readiness" }, value: "92%", note: { en: "pumping station uptime", fil: "pumping station uptime" } },
  { label: { en: "Cleared obstructions", fil: "Cleared obstructions" }, value: "1,240", note: { en: "clearing actions this quarter", fil: "clearing actions ngayong quarter" } },
] as const;

const projectTracker = [
  { project: { en: "EDSA signal timing optimization", fil: "EDSA signal timing optimization" }, status: { en: "Ongoing", fil: "Ongoing" }, progress: 68 },
  { project: { en: "Flood pump station modernization phase 2", fil: "Flood pump station modernization phase 2" }, status: { en: "Ongoing", fil: "Ongoing" }, progress: 54 },
  { project: { en: "Incident reporting dashboard revamp", fil: "Incident reporting dashboard revamp" }, status: { en: "Completed", fil: "Completed" }, progress: 100 },
] as const;

function isDownloadLink(url: string): boolean {
  return /\.(pdf|xlsx?|docx?|zip|csv)$/i.test(url);
}

export default function TransparencyOverviewPage() {
  const { language } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<TabId>("organizational-profile");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(transparencyCategories[0].id);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function syncTabFromHash() {
      const hashTab = getTabFromHash(window.location.hash);
      if (hashTab) setActiveTab(hashTab);
    }
    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);

  function handleTabChange(tabId: TabId) {
    setActiveTab(tabId);
    window.history.replaceState(null, "", `#${tabId}`);
    if (tabId === "plans-and-reports") {
      setSearch("");
      setMobileOpen(false);
    }
  }

  const activeCategory = transparencyCategories.find((c) => c.id === activeCategoryId) ?? transparencyCategories[0];

  const filteredLinks = search.trim()
    ? activeCategory.links.filter((l) =>
        l.text.toLowerCase().includes(search.toLowerCase()) ||
        l.url.toLowerCase().includes(search.toLowerCase())
      )
    : activeCategory.links;

  return (
    <section className="w-full max-w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <div className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity" style={{ backgroundImage: "url('/images/transparency/transparency.jpg')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.34),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.16),rgba(2,8,23,0.4))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en" ? "Public access to MMDA institutional information, service standards, and accountability reports." : "Pampublikong akses sa institutional information, service standards, at accountability reports ng MMDA."}
            </p>
            <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(2.6rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en" ? "Transparency Overview" : "Transparency Overview"}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en" ? "Use the tabs below to open Organizational Profile, Citizen Charter, and Plans and Reports." : "Gamitin ang mga tab sa ibaba para buksan ang Organizational Profile, Citizen Charter, at Plans and Reports."}
            </p>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 rounded-[1.25rem] border border-border bg-card p-3" role="tablist" aria-label={language === "en" ? "Transparency sections" : "Mga seksyon ng transparency"}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${tab.id}-tab`}
                aria-selected={active}
                aria-controls={`${tab.id}-panel`}
                onClick={() => handleTabChange(tab.id)}
                className={active
                  ? "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                }
              >
                <Icon className="size-4" weight="bold" />
                {language === "en" ? tab.label.en : tab.label.fil}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab panels */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">

        {/* Organizational Profile */}
        {activeTab === "organizational-profile" && (
          <article id="organizational-profile-panel" role="tabpanel" aria-labelledby="organizational-profile-tab" className="space-y-6 rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <Buildings className="size-4" weight="bold" />
              {language === "en" ? "Organizational profile" : "Organisasyonal na profile"}
            </div>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en" ? "This section explains MMDA's legal mandate, organizational structure, and office-level responsibilities for metro-wide operations." : "Ipinapaliwanag ng seksyong ito ang legal na mandato ng MMDA, istrukturang organisasyonal, at responsibilidad ng bawat opisina para sa metro-wide operations."}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {organizationalHighlights.map((item) => (
                <div key={item.title.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5">
                  <h3 className="text-base font-semibold text-foreground">{language === "en" ? item.title.en : item.title.fil}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{language === "en" ? item.description.en : item.description.fil}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto rounded-[1.2rem] border border-border">
              <div className="min-w-220">
                <div className="grid grid-cols-[minmax(11rem,1.3fr)_minmax(0,2.2fr)_minmax(10rem,1.2fr)_minmax(10rem,1fr)] items-center gap-x-6 border-b border-border bg-muted/40 px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <p>{language === "en" ? "Office" : "Opisina"}</p>
                  <p>{language === "en" ? "Core function" : "Pangunahing tungkulin"}</p>
                  <p>{language === "en" ? "Public contact" : "Public contact"}</p>
                  <p>{language === "en" ? "Hours" : "Oras"}</p>
                </div>
                {officeDirectory.map((office) => (
                  <div key={office.office.en} className="grid grid-cols-[minmax(11rem,1.3fr)_minmax(0,2.2fr)_minmax(10rem,1.2fr)_minmax(10rem,1fr)] items-start gap-x-6 border-b border-border/70 px-5 py-4 text-sm last:border-b-0">
                    <p className="font-medium leading-6 text-foreground">{language === "en" ? office.office.en : office.office.fil}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? office.function.en : office.function.fil}</p>
                    <p className="leading-6 text-muted-foreground">{office.contact}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? office.hours.en : office.hours.fil}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {/* Citizen Charter */}
        {activeTab === "citizen-charter" && (
          <article id="citizen-charter-panel" role="tabpanel" aria-labelledby="citizen-charter-tab" className="space-y-6 rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <ClipboardText className="size-4" weight="bold" />
              {language === "en" ? "Citizen charter" : "Citizen charter"}
            </div>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en" ? "The Citizen Charter defines service standards, processing steps, required documents, and expected turnaround times." : "Tinutukoy ng Citizen Charter ang service standards, processing steps, kinakailangang dokumento, at inaasahang turnaround time."}
            </p>
            <div className="flex flex-wrap gap-2">
              {charterCommitments.map((item) => (
                <span key={item.en} className="rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  {language === "en" ? item.en : item.fil}
                </span>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {charterServices.map((service) => (
                <article key={service.name.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5">
                  <h3 className="text-base font-semibold text-foreground">{language === "en" ? service.name.en : service.name.fil}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? "Requirements" : "Requirements"}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {(language === "en" ? service.requirements.en : service.requirements.fil).map((r) => <li key={r}>• {r}</li>)}
                  </ul>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p><span className="font-semibold text-foreground">{language === "en" ? "Processing time:" : "Processing time:"}</span> {language === "en" ? service.processing.en : service.processing.fil}</p>
                    <p><span className="font-semibold text-foreground">{language === "en" ? "Fees:" : "Fees:"}</span> {language === "en" ? service.fees.en : service.fees.fil}</p>
                    <p><span className="font-semibold text-foreground">{language === "en" ? "Responsible office:" : "Responsible office:"}</span> {language === "en" ? service.office.en : service.office.fil}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="rounded-[1.1rem] border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              {language === "en" ? "Need escalation? File service feedback, complaints, or commendations through Hotline 136 and the online feedback form." : "Kailangan ng escalation? Maghain ng service feedback, reklamo, o papuri sa Hotline 136 at online feedback form."}
            </p>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {language === "en" ? "Go to services" : "Pumunta sa mga serbisyo"}
              <ArrowRight className="size-4" weight="bold" />
            </Link>
          </article>
        )}

        {/* Plans and Reports */}
        {activeTab === "plans-and-reports" && (
          <article id="plans-and-reports-panel" role="tabpanel" aria-labelledby="plans-and-reports-tab" className="space-y-6">
            {/* KPI cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {kpiCards.map((item) => (
                <div key={item.label.en} className="rounded-[1.2rem] border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? item.label.en : item.label.fil}</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{language === "en" ? item.note.en : item.note.fil}</p>
                </div>
              ))}
            </div>

            {/* Transparency Seal document browser */}
            <div className="rounded-[1.9rem] border border-border bg-card shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Header */}
              <div className="border-b border-border px-7 py-5 md:px-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                      <Files className="size-4" weight="bold" />
                      {language === "en" ? "Transparency Seal — Official Documents" : "Transparency Seal — Mga Opisyal na Dokumento"}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                      {language === "en"
                        ? "Official accountability reports, financial disclosures, and procurement documents required under the Philippine Transparency Seal."
                        : "Mga opisyal na ulat ng pananagutan, financial disclosures, at mga dokumento sa procurement na kinakailangan sa ilalim ng Philippine Transparency Seal."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="flex flex-col lg:flex-row">
                {/* Sidebar — category list */}
                <nav
                  aria-label={language === "en" ? "Report categories" : "Mga kategorya ng ulat"}
                  className="shrink-0 lg:w-72 xl:w-80"
                >
                  {/* Mobile toggle */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 border-b border-border bg-muted/30 px-7 py-4 text-sm font-semibold text-foreground lg:hidden"
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-expanded={mobileOpen}
                    aria-controls="category-list"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="size-4 text-primary" weight="bold" />
                      {language === "en" ? activeCategory.labelEn : activeCategory.labelFil}
                    </span>
                    <span className={`text-muted-foreground transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>

                  <ul
                    id="category-list"
                    role="tablist"
                    aria-label={language === "en" ? "Report categories" : "Mga kategorya ng ulat"}
                    className={`${mobileOpen ? "flex" : "hidden"} flex-col border-b border-border/60 py-2 lg:flex lg:border-b-0 lg:border-r lg:border-border/60 lg:py-4`}
                  >
                    {transparencyCategories.map((cat, idx) => {
                      const isActive = cat.id === activeCategoryId;
                      return (
                        <li key={cat.id} role="presentation">
                          <button
                            type="button"
                            role="tab"
                            id={`cat-tab-${cat.id}`}
                            aria-selected={isActive}
                            aria-controls={`cat-panel-${cat.id}`}
                            onClick={() => {
                              setActiveCategoryId(cat.id);
                              setSearch("");
                              setMobileOpen(false);
                            }}
                            className={`w-full px-5 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                              isActive
                                ? "bg-primary/8 font-semibold text-primary"
                                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                            }`}
                          >
                            <span className="flex items-start gap-2.5">
                              <span className="mt-px shrink-0 text-xs font-semibold tabular-nums text-muted-foreground/60">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="leading-snug">
                                {language === "en" ? cat.labelEn : cat.labelFil}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Document panel */}
                <div
                  id={`cat-panel-${activeCategory.id}`}
                  role="tabpanel"
                  aria-labelledby={`cat-tab-${activeCategory.id}`}
                  className="min-w-0 flex-1"
                >
                  {/* Category header + search */}
                  <div className="border-b border-border/60 px-6 py-5 lg:px-8">
                    <h2 className="text-base font-semibold text-foreground">
                      {language === "en" ? activeCategory.labelEn : activeCategory.labelFil}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {language === "en" ? activeCategory.descriptionEn : activeCategory.descriptionFil}
                    </p>
                    {activeCategory.links.length > 5 && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2">
                        <MagnifyingGlass className="size-4 shrink-0 text-muted-foreground" weight="bold" />
                        <input
                          type="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder={language === "en" ? "Search documents in this category…" : "Maghanap ng dokumento sa kategoryang ito…"}
                          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                          aria-label={language === "en" ? "Search documents" : "Maghanap ng dokumento"}
                        />
                        {search && (
                          <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={language === "en" ? "Clear search" : "I-clear ang paghahanap"}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Document list */}
                  <ul className="divide-y divide-border/60" aria-label={language === "en" ? "Documents" : "Mga dokumento"}>
                    {filteredLinks.length === 0 ? (
                      <li className="flex flex-col items-center gap-3 px-6 py-12 text-center lg:px-8">
                        <FolderOpen className="size-10 text-muted-foreground/40" weight="duotone" />
                        <p className="text-sm text-muted-foreground">
                          {search
                            ? (language === "en" ? "No documents match your search." : "Walang dokumento na tumutugma sa iyong paghahanap.")
                            : (language === "en" ? "No documents available for this category." : "Walang mga dokumento para sa kategoryang ito.")}
                        </p>
                      </li>
                    ) : (
                      filteredLinks.map((link, idx) => {
                        const isDL = isDownloadLink(link.url);
                        const ext = isDL ? link.url.split(".").pop()?.toUpperCase() : null;
                        return (
                          <li key={`${link.url}-${idx}`}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary lg:px-8"
                            >
                              {/* File type badge */}
                              <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                ext === "PDF"
                                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                  : ext === "XLSX" || ext === "XLS"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : ext === "ZIP"
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  : "bg-primary/10 text-primary"
                              }`}>
                                {ext ?? "LINK"}
                              </span>

                              {/* Document name */}
                              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
                                {link.text}
                              </span>

                              {/* Action icon */}
                              <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true">
                                {isDL
                                  ? <DownloadSimple className="size-4" weight="bold" />
                                  : <ArrowSquareOut className="size-4" weight="bold" />}
                              </span>

                              <span className="sr-only">
                                {language === "en" ? "Opens in new tab" : "Magbubukas sa bagong tab"}
                              </span>
                            </a>
                          </li>
                        );
                      })
                    )}
                  </ul>

                  {/* Footer note */}
                  <div className="border-t border-border/60 px-6 py-4 lg:px-8">
                    <p className="text-xs text-muted-foreground">
                      {language === "en"
                        ? `${filteredLinks.length} document${filteredLinks.length !== 1 ? "s" : ""} in this category · Documents link to the official MMDA website (mmda.gov.ph).`
                        : `${filteredLinks.length} dokumento sa kategoryang ito · Ang mga dokumento ay naka-link sa opisyal na website ng MMDA (mmda.gov.ph).`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project tracker */}
            <div className="rounded-[1.2rem] border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? "Project status tracker" : "Project status tracker"}</p>
              <div className="mt-4 space-y-3">
                {projectTracker.map((item) => (
                  <div key={item.project.en} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-foreground">{language === "en" ? item.project.en : item.project.fil}</p>
                      <p className="shrink-0 text-muted-foreground">{language === "en" ? item.status.en : item.status.fil} • {item.progress}%</p>
                    </div>
                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted/60" aria-hidden="true">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={item.progress}
                        aria-label={`${language === "en" ? item.project.en : item.project.fil} progress`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}
      </section>
    </section>
  );
}
