"use client";

import Image from "next/image";
import { Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, dir, t, toggle } = useLanguage();
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1320px] rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.055)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 10px 34px rgba(0,0,0,0.45), 0 0 24px rgba(255,46,134,0.12)",
      }}
    >
      <div className="w-full h-[68px] sm:h-[76px] flex items-center px-6 sm:px-10 justify-between">

        {/* ── Brand logo (RTL start) — links to the live platform ── */}
        <a
          href="https://pic-events.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PIC - Parties & Events Platform"
          className="flex items-center select-none opacity-100 hover:opacity-85 transition-opacity duration-200"
        >
          <Image
            src="/images/header-logo.png"
            alt="PIC"
            width={64}
            height={67}
            priority
            className="h-12 sm:h-14 w-auto select-none"
            draggable={false}
          />
        </a>

        {/* ── CTA + language switcher (RTL end) ── */}
        <div className="flex items-center gap-4 sm:gap-5">

          {/* Contact Us / צרו קשר */}
          <a
            href="#lead-capture"
            aria-label={lang === "he" ? "קבלו גישה מוקדמת לפלטפורמת PIC" : "Get early access to PIC platform"}
            className="font-body font-bold text-xs sm:text-sm uppercase tracking-widest text-white btn-gradient-pink rounded-[10px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-[40px] sm:h-[44px]"
          >
            {t.nav.contactUs}
            <Chevron className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
          </a>

          {/* ── Language switcher: globe + country code (toggles he/en).
               Borderless by default; the pill/border appears only on hover. ── */}
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.langSwitcherLabel}
            className="flex items-center gap-2 h-[40px] sm:h-[44px] px-3 sm:px-3.5 rounded-lg border border-transparent text-white/80 transition-colors duration-200 hover:text-white hover:bg-primary-400/55 hover:border-white/15"
          >
            <Globe size={17} strokeWidth={1.8} aria-hidden="true" />
            <span className="font-body text-[0.72rem] sm:text-[0.8rem] font-bold tracking-wider">
              {lang === "he" ? "IL" : "US"}
            </span>
          </button>

        </div>

      </div>
    </nav>
  );
}
