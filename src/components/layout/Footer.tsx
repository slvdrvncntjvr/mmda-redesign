"use client";

import Link from "next/link";
import Image from "next/image";

import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { FacebookLogo, Phone, XLogo } from "@phosphor-icons/react";

export function Footer() {
  const { language } = useSettingsStore();

  const year = new Date().getFullYear();



  return (
    <footer className="mt-auto border-t border-white/10 bg-[#06142d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/Bagong_Pilipinas.svg" alt="Bagong Pilipinas" width={40} height={40} className="size-10 object-contain" />
              <Image src="/Logo.svg" alt="MMDA Logo" width={40} height={40} className="size-10 object-contain" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                  MMDA
                </h3>
                <p className="mt-1 text-lg font-semibold text-white">
                  {language === "en"
                    ? "Metropolitan Manila Development Authority"
                    : "Metropolitan Manila Development Authority"}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/66">
              {t("footer.aboutDesc", language)}
            </p>
            <p className="mt-5 text-sm text-white/52">
              {language === "en"
                ? "A redesigned public-facing experience focused on clarity, accessibility, and service readiness."
                : "Isang inayos na public-facing experience na nakatuon sa kalinawan, accessibility, at kahandaan sa serbisyo."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              {t("footer.services", language)}
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              {[
                { label: "footer.driversLicense" as const, href: "/services/drivers-license" },
                { label: "footer.vehicleRegistration" as const, href: "/services/vehicle-registration" },
                { label: "footer.trafficViolations" as const, href: "/services/traffic-violations" },
                { label: "footer.towingImpound" as const, href: "/services/towing-impound" },
                { label: "footer.reportConcern" as const, href: "/services/report-concern" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t(item.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              {t("footer.resources", language)}
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              {[
                { label: "footer.trafficUpdates" as const, href: "/traffic" },
                { label: "footer.floodUpdates" as const, href: "/news?category=advisory" },
                { label: "footer.numberCoding" as const, href: "/traffic#number-coding" },
                { label: "footer.pressReleases" as const, href: "/news?category=press" },
                { label: "footer.careers" as const, href: "/transparency/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t(item.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              {t("footer.connect", language)}
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              <li>
                <a
                  href="tel:136"
                  className="inline-flex items-center gap-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Phone className="size-4" weight="bold" />
                  {t("footer.hotline", language)}
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/MMDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <XLogo className="size-4" weight="bold" />
                  {t("footer.followX", language)}
                  <span className="sr-only">({t("a11y.opensNewTab", language)})</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MMDAPH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <FacebookLogo className="size-4" weight="bold" />
                  {t("footer.followFacebook", language)}
                  <span className="sr-only">({t("a11y.opensNewTab", language)})</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/52">
            {t("footer.copyright", language).replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
