import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement-PIC Platform",
  description: "PIC Platform accessibility statement. This website meets the requirements of Israeli Standard 5568 (based on WCAG 2.1) at level AA.",
};

export default function AccessibilityPage() {
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
          ← Back to Home
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
          <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]" style={{ color: "#0EA5E9" }}>
            Accessibility
          </span>
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
        </div>

        {/* Title + meta */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-display font-bold uppercase tracking-tight leading-tight text-[2.4rem] md:text-[3.2rem]"
            style={{ color: "#031760" }}
          >
            Accessibility Statement
          </h1>

          {/* AA badge + date */}
          <div className="flex items-center gap-4 mt-2">
            <span
              className="font-display font-bold text-white text-sm px-3 py-1 rounded-lg select-none"
              style={{ backgroundColor: "#0EA5E9", letterSpacing: "0.12em" }}
            >
              AA
            </span>
            <p className="font-body text-sm" style={{ color: "rgba(3,23,96,0.45)" }}>
              Last updated: March 2025
            </p>
          </div>

          <p className="font-body text-[0.95rem] leading-relaxed mt-1" style={{ color: "rgba(3,23,96,0.6)" }}>
            This website meets the requirements of Israeli Standard 5568 (based on WCAG 2.1) at level AA.
          </p>
        </div>

        {/* ── Sections ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">

          <Section num="1" title="What is Digital Accessibility?">
            <p className="font-body text-[0.95rem] leading-relaxed" style={{ color: "rgba(3,23,96,0.65)" }}>
              Digital accessibility means that people with disabilities-including visual, auditory, motor, and cognitive impairments-can use the website fully and independently. We are committed to this not only legally, but from a deep value of inclusion.
            </p>
          </Section>

          <Section num="2" title="Standard Compliance">
            <p className="font-body text-[0.95rem] leading-relaxed mb-4" style={{ color: "rgba(3,23,96,0.65)" }}>
              This website was built in accordance with Israeli Standard 5568 at level AA, including the following guidelines:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ["Perceivable", "Content can be presented in different ways without loss of information"],
                ["Operable", "The website can be used with keyboard only"],
                ["Understandable", "Content is clear and behavior is predictable"],
                ["Robust", "The website is compatible with leading assistive technologies"],
              ].map(([term, desc]) => (
                <li key={term} className="flex gap-2 font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                  <span style={{ color: "#0EA5E9", flexShrink: 0 }}>◆</span>
                  <span><strong style={{ color: "#031760" }}>{term}</strong>-{desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section num="3" title="Accommodations We've Made">
            <ul className="flex flex-col gap-3">
              {[
                ["Full Keyboard Navigation", "All interactive elements are accessible via Tab / Enter / Escape. The Tab order follows the logical structure of the page."],
                ["Floating Accessibility Menu", "The accessibility button in the corner of the screen enables text enlargement, high contrast, and grayscale mode. Preferences are saved for the next visit."],
                ["Text Alternatives", "Every image and icon includes a textual description (alt / aria-label) for use with screen readers."],
                ["Color Contrast Ratios", "All colors meet a minimum contrast ratio of 4.5:1 for regular text and 3:1 for large text."],
                ["Semantic Structure", "All headings, buttons, forms, and regions are defined with semantic HTML tags and ARIA roles."],
                ["RTL Support", "The website is built with right-to-left support, including reading direction, Tab order, and layout."],
                ["Reduced Motion", "The website respects the operating system's prefers-reduced-motion setting and also offers a manual toggle in the accessibility menu."],
              ].map(([term, desc]) => (
                <li key={term} className="flex gap-2 font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                  <span style={{ color: "#0EA5E9", flexShrink: 0 }}>◆</span>
                  <span><strong style={{ color: "#031760" }}>{term}</strong>-{desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section num="4" title="Supported Assistive Technologies">
            <p className="font-body text-[0.95rem] leading-relaxed mb-4" style={{ color: "rgba(3,23,96,0.65)" }}>
              The website has been tested and designed to work with:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "NVDA + Firefox (Windows)",
                "VoiceOver + Safari (macOS / iOS)",
                "TalkBack (Android)",
                "Keyboard-only navigation-Chrome, Firefox, Safari, Edge",
              ].map((item) => (
                <li key={item} className="flex gap-2 font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                  <span style={{ color: "#0EA5E9", flexShrink: 0 }}>◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section num="5" title="Known Limitations">
            <p className="font-body text-[0.95rem] leading-relaxed" style={{ color: "rgba(3,23,96,0.65)" }}>
              We strive for full accessibility and invest in continuous improvement. Content created by third parties (such as external forms) may not yet meet all standard requirements. We are working to address these findings as quickly as possible.
            </p>
          </Section>

          <Section num="6" title="Contact the Accessibility Coordinator">
            <p className="font-body text-[0.95rem] leading-relaxed mb-5" style={{ color: "rgba(3,23,96,0.65)" }}>
              Found an accessibility issue? Have a question or request? We&apos;d love to hear from you and fix it quickly.
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                <strong style={{ color: "#031760" }}>Accessibility Coordinator:</strong> PIC EVENTS
              </p>
              <p className="font-body text-[0.95rem]" style={{ color: "rgba(3,23,96,0.65)" }}>
                <strong style={{ color: "#031760" }}>Email:</strong>{" "}
                <a
                  href="mailto:uribs3@gmail.com"
                  className="underline underline-offset-2 transition-colors duration-150 hover:text-sky-500"
                  style={{ color: "#031760" }}
                >
                  uribs3@gmail.com
                </a>
              </p>
              <p className="font-body text-[0.95rem] mt-1" style={{ color: "rgba(3,23,96,0.65)" }}>
                We are committed to responding to every inquiry within 5 business days.
              </p>
            </div>
          </Section>

        </div>

        {/* Back link */}
        <Link
          href="/"
          className="font-body text-sm font-semibold uppercase tracking-widest self-start transition-colors duration-150 hover:text-sky-400"
          style={{ color: "#031760" }}
        >
          ← Back to Home
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
        <span className="font-display font-bold text-[0.75rem] uppercase tracking-widest" style={{ color: "#0EA5E9" }}>
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
