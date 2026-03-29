"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AccessibilityContent() {
  const { t } = useLanguage();
  const s = t.accessibility.statement;
  const sec = s.sections;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F9FAFB" }}>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div
        className="w-full px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#031760", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link
          href="/"
          className="font-body text-sm font-semibold uppercase tracking-widest transition-colors duration-150 hover:text-sky-400"
          style={{ color: "rgba(255,255,255,0.70)" }}
        >
          {s.backLink}
        </Link>
        <span className="font-display font-bold text-white uppercase tracking-[0.2em] text-xl select-none">
          PIC
        </span>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <main className="w-full max-w-3xl mx-auto px-6 py-20 flex flex-col gap-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
          <span
            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "#0EA5E9" }}
          >
            {s.eyebrow}
          </span>
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
        </div>

        {/* Title + meta */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-display font-bold uppercase tracking-tight leading-tight text-[2.4rem] md:text-[3.2rem]"
            style={{ color: "#031760" }}
          >
            {s.pageTitle}
          </h1>

          <div className="flex items-center gap-4 mt-2">
            <span
              className="font-display font-bold text-white text-sm px-3 py-1 rounded-lg select-none"
              style={{ backgroundColor: "#0EA5E9", letterSpacing: "0.12em" }}
            >
              {s.badge}
            </span>
            <p className="font-body text-sm" style={{ color: "rgba(3,23,96,0.45)" }}>
              {s.lastUpdated}
            </p>
          </div>

          <p className="font-body text-[0.95rem] leading-relaxed mt-1" style={{ color: "rgba(3,23,96,0.6)" }}>
            {s.standardDesc}
          </p>
        </div>

        {/* ── Sections ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">

          {/* 1 - What is digital accessibility */}
          <Section num="1" title={sec.whatIsA11y.title}>
            <p className="font-body text-[0.95rem] leading-relaxed" style={{ color: "rgba(3,23,96,0.65)" }}>
              {sec.whatIsA11y.body}
            </p>
          </Section>

          {/* 2 - Standard compliance */}
          <Section num="2" title={sec.standards.title}>
            <p className="font-body text-[0.95rem] leading-relaxed mb-4" style={{ color: "rgba(3,23,96,0.65)" }}>
              {sec.standards.intro}
            </p>
            <ul className="flex flex-col gap-2">
              {sec.standards.principles.map(({ term, desc }) => (
                <li key={term} className="flex gap-2 font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                  <span style={{ color: "#0EA5E9", flexShrink: 0 }}>◆</span>
                  <span><strong style={{ color: "#031760" }}>{term}</strong> - {desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 3 - Accommodations */}
          <Section num="3" title={sec.accommodations.title}>
            <ul className="flex flex-col gap-3">
              {sec.accommodations.items.map(({ term, desc }) => (
                <li key={term} className="flex gap-2 font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                  <span style={{ color: "#0EA5E9", flexShrink: 0 }}>◆</span>
                  <span><strong style={{ color: "#031760" }}>{term}</strong> - {desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 4 - Assistive technologies */}
          <Section num="4" title={sec.assistiveTech.title}>
            <p className="font-body text-[0.95rem] leading-relaxed mb-4" style={{ color: "rgba(3,23,96,0.65)" }}>
              {sec.assistiveTech.intro}
            </p>
            <ul className="flex flex-col gap-2">
              {sec.assistiveTech.tools.map((item) => (
                <li key={item} className="flex gap-2 font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                  <span style={{ color: "#0EA5E9", flexShrink: 0 }}>◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 5 - Known limitations */}
          <Section num="5" title={sec.limitations.title}>
            <p className="font-body text-[0.95rem] leading-relaxed" style={{ color: "rgba(3,23,96,0.65)" }}>
              {sec.limitations.body}
            </p>
          </Section>

          {/* 6 - Contact */}
          <Section num="6" title={sec.contact.title}>
            <p className="font-body text-[0.95rem] leading-relaxed mb-5" style={{ color: "rgba(3,23,96,0.65)" }}>
              {sec.contact.intro}
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                <strong style={{ color: "#031760" }}>{sec.contact.coordinatorLabel}</strong>{" "}PIC EVENTS
              </p>
              <p className="font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                <strong style={{ color: "#031760" }}>{sec.contact.emailLabel}</strong>{" "}
                <a
                  href="mailto:uribs3@gmail.com"
                  className="underline underline-offset-2 transition-colors duration-150 hover:text-sky-500"
                  style={{ color: "#031760" }}
                >
                  uribs3@gmail.com
                </a>
              </p>
              <p className="font-body text-[0.95rem] mt-1" style={{ color: "rgba(3,23,96,0.65)" }}>
                {sec.contact.responseTime}
              </p>
            </div>
          </Section>

        </div>

        {/* Back link */}
        <Link
          href="/"
          className="font-body text-sm font-semibold uppercase tracking-widest self-start transition-colors duration-150 hover:text-sky-400 flex items-center gap-2"
          style={{ color: "#031760" }}
        >
          {s.backLink}
        </Link>

      </main>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl px-8 py-8 flex flex-col gap-4"
      style={{ backgroundColor: "#ffffff", border: "1px solid rgba(3,23,96,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-display font-bold text-[0.75rem] uppercase tracking-widest"
          style={{ color: "#0EA5E9" }}
        >
          {num}.
        </span>
        <h2
          className="font-display font-bold uppercase tracking-tight text-[1.1rem] md:text-[1.3rem]"
          style={{ color: "#031760" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
