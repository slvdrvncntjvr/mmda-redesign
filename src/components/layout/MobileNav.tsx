"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { CaretDown } from "@phosphor-icons/react";
import { t, type TranslationKey } from "@/lib/translations";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ReadonlyArray<{ key: TranslationKey; href: string }>;
  pathname: string;
}

export function MobileNav({ open, onOpenChange, items, pathname }: MobileNavProps) {
  const { language } = useSettingsStore();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));
  const trafficItem = items.find((item) => item.href === "/traffic");
  const servicesItem = items.find((item) => item.href === "/services");
  const newsItem = items.find((item) => item.href === "/news");
  const aboutItem = items.find((item) => item.href === "/about");
  const contactItem = items.find((item) => item.href === "/contact");
  const homeItem = items.find((item) => item.href === "/");
  const servicesLabel = t("nav.services", language);
  const [aboutOpen, setAboutOpen] = useState(
    pathname.startsWith("/about") || pathname.startsWith("/transparency")
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-85 border-l border-white/10 bg-[#06142d] p-0 text-white">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Image src="/Bagong_Pilipinas.svg" alt="Bagong Pilipinas" width={36} height={36} className="size-9 object-contain" />
            <Image src="/Logo.svg" alt="MMDA Logo" width={36} height={36} className="size-9 object-contain" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
                MMDA
              </p>
              <p className="text-sm font-semibold text-white">
                {language === "en" ? "Public Service Navigation" : "Nabigasyon ng Serbisyo Publiko"}
              </p>
            </div>
          </div>
        </div>

        <nav
          className="flex flex-col gap-2 px-4 py-5"
          aria-label={t("a11y.mainNav", language)}
        >
          {homeItem && (
            <Link
              href={homeItem.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                pathname === "/"
                  ? "bg-white text-slate-950"
                  : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
              )}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              {t(homeItem.key, language)}
            </Link>
          )}

          {trafficItem && (
            <Link
              href={trafficItem.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                pathname === trafficItem.href || pathname.startsWith(trafficItem.href + "/")
                  ? "bg-white text-slate-950"
                  : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
              )}
              aria-current={pathname === trafficItem.href || pathname.startsWith(trafficItem.href + "/") ? "page" : undefined}
            >
              {t(trafficItem.key, language)}
            </Link>
          )}

          {servicesItem && (
            <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    pathname.startsWith("/services")
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                  aria-haspopup="menu"
                >
                  {servicesLabel}
                  <CaretDown className={cn("size-4 transition-transform", servicesOpen && "rotate-180")} weight="bold" />
                </button>
              </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2 pl-4">
                <Link
                  href={servicesItem.href}
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname === "/services"
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "All services" : "Lahat ng serbisyo"}
                </Link>
                <Link
                  href="/services/traffic-violations"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/traffic-violations")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Traffic violations" : "Paglabag sa trapiko"}
                </Link>
                <Link
                  href="/services/unpaid-fines"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/unpaid-fines")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Pay fines" : "Magbayad ng multa"}
                </Link>
                <Link
                  href="/services/drivers-license"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/drivers-license")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Driver's license" : "Lisensya sa pagmamaneho"}
                </Link>
                <Link
                  href="/services/vehicle-registration"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/vehicle-registration")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Vehicle registration" : "Rehistro ng sasakyan"}
                </Link>
                <Link
                  href="/services/construction-permits"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/construction-permits")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Construction permits" : "Permit sa konstruksyon"}
                </Link>
                <Link
                  href="/services/event-permits"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/event-permits")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Event permits" : "Permit sa event"}
                </Link>
                <Link
                  href="/services/special-permits"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/special-permits")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Special permits" : "Espesyal na permit"}
                </Link>
                <Link
                  href="/services/report-concern"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/report-concern")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
                </Link>
                <Link
                  href="/services/roadside-assistance"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/roadside-assistance")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Roadside assistance" : "Tulong sa kalsada"}
                </Link>
                <Link
                  href="/services/towing-impound"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/towing-impound")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Towing & impound" : "Pag-tow at impound"}
                </Link>
              </CollapsibleContent>
            </Collapsible>
          )}

          {newsItem && (
            <Link
              href={newsItem.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                pathname === newsItem.href || pathname.startsWith(newsItem.href + "/")
                  ? "bg-white text-slate-950"
                  : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
              )}
              aria-current={pathname === newsItem.href || pathname.startsWith(newsItem.href + "/") ? "page" : undefined}
            >
              {t(newsItem.key, language)}
            </Link>
          )}

          {aboutItem && (
            <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    pathname.startsWith("/about") || pathname.startsWith("/transparency")
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                  aria-haspopup="menu"
                >
                  {t("nav.about", language)}
                  <CaretDown className={cn("size-4 transition-transform", aboutOpen && "rotate-180")} weight="bold" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2 pl-4">
                <Link
                  href="/about"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    pathname === "/about"
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {language === "en" ? "About MMDA" : "Tungkol sa MMDA"}
                </Link>
                <Link
                  href="/transparency"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    pathname === "/transparency"
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {language === "en" ? "Transparency overview" : "Pangkalahatang transparency"}
                </Link>
                <Link
                  href="/transparency#organizational-profile"
                  onClick={() => onOpenChange(false)}
                  className="block rounded-[1rem] border border-white/10 bg-white/6 px-5 py-4 text-base font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {language === "en" ? "Organizational profile" : "Organisasyonal na profile"}
                </Link>
                <Link
                  href="/transparency#citizen-charter"
                  onClick={() => onOpenChange(false)}
                  className="block rounded-[1rem] border border-white/10 bg-white/6 px-5 py-4 text-base font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {language === "en" ? "Citizen charter" : "Citizen charter"}
                </Link>
                <Link
                  href="/transparency#plans-and-reports"
                  onClick={() => onOpenChange(false)}
                  className="block rounded-[1rem] border border-white/10 bg-white/6 px-5 py-4 text-base font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {language === "en" ? "Plans and reports" : "Mga plano at ulat"}
                </Link>
              </CollapsibleContent>
            </Collapsible>
          )}

          {contactItem && (
            <Link
              href={contactItem.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                pathname === contactItem.href || pathname.startsWith(contactItem.href + "/")
                  ? "bg-white text-slate-950"
                  : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
              )}
              aria-current={pathname === contactItem.href || pathname.startsWith(contactItem.href + "/") ? "page" : undefined}
            >
              {t(contactItem.key, language)}
            </Link>
          )}
        </nav>

        {/* Metrobase 136 removed from mobile navigation per request */}
      </SheetContent>
    </Sheet>
  );
}
