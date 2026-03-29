"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, t, toggle } = useLanguage();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="w-full h-16 flex items-center px-8 sm:px-12 lg:px-24 justify-between">

        {/* ── Start group: CTA + language toggle ── */}
        <div className="flex items-center gap-3">

          {/* Contact Us / צרו קשר */}
          <a
            href="#lead-capture"
            aria-label={lang === "he" ? "קבלו גישה מוקדמת לפלטפורמת PIC" : "Get early access to PIC platform"}
            className="font-body font-bold text-xs sm:text-sm uppercase tracking-widest text-white bg-navy hover:bg-navy-hover active:bg-navy-active transition-colors duration-150 rounded-md min-w-[120px] sm:min-w-[160px] h-[36px] sm:h-[40px] flex items-center justify-center"
          >
            {t.nav.contactUs}
          </a>

          {/* ── Language Toggle ── */}
          <div
            role="group"
            aria-label={t.nav.langSwitcherLabel}
            className="flex items-center rounded-md overflow-hidden h-[36px] sm:h-[40px]"
          style={{ border: "1px solid rgba(51,175,255,0.45)" }}
          >
            <LangButton
              code="he"
              label="עב"
              active={lang === "he"}
              onClick={toggle}
              ariaLabel="עברית - החלף לעברית"
            />

            {/* Divider */}
            <span
              aria-hidden="true"
              className="w-px self-stretch"
              style={{ backgroundColor: "rgba(3,23,96,0.10)" }}
            />

            <LangButton
              code="en"
              label="EN"
              active={lang === "en"}
              onClick={toggle}
              ariaLabel="English - Switch to English"
            />
          </div>

        </div>

        {/* ── Brand ── */}
        <span
          aria-label="PIC - Parties & Events Platform"
          className="font-display font-bold text-navy uppercase tracking-[0.2em] text-sm sm:text-xl select-none whitespace-nowrap"
        >
          PIC EVENTS
        </span>

      </div>
    </nav>
  );
}

// ─── LangButton ───────────────────────────────────────────────────────────────

interface LangButtonProps {
  code: string;
  label: string;
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}

function LangButton({ label, active, onClick, ariaLabel }: LangButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className="font-body text-[0.7rem] sm:text-[0.75rem] font-bold tracking-wider px-2.5 sm:px-3 h-full transition-all duration-200"
      style={
        active
          ? {
              color: "#031760",
              backgroundColor: "rgba(3,23,96,0.06)",
            }
          : {
              color: "rgba(3,23,96,0.35)",
              backgroundColor: "transparent",
            }
      }
      onMouseEnter={(e) => {
        if (active) return;
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(3,23,96,0.65)";
      }}
      onMouseLeave={(e) => {
        if (active) return;
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(3,23,96,0.35)";
      }}
    >
      {label}
    </button>
  );
}
