"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type UserType = "producer" | "vendor" | null;

export default function LeadCapture() {
  const { t } = useLanguage();
  const lc = t.leadCapture;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  const [selected,  setSelected]  = useState<UserType>(null);
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  // y-only - no direction dependency needed
  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 40, opacity: 0, duration: 1.0, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userType: selected }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? lc.errorFallback);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : lc.errorFallback);
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    { id: "producer" as const, label: lc.roles.producer },
    { id: "vendor"   as const, label: lc.roles.vendor },
  ];

  return (
    <section
      ref={sectionRef}
      id="lead-capture"
      aria-label={lc.eyebrow}
      className="w-full px-6 py-28 md:py-36"
      style={{
        background: "linear-gradient(to bottom, #ffffff 0%, #D9E9FF 100%)",
        borderTop: "1px solid rgba(3,23,96,0.08)",
      }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8"
      >

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
          <span
            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "#031760" }}
          >
            {lc.eyebrow}
          </span>
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h2
            className="font-display font-bold uppercase tracking-tight leading-[1.0] text-[2.4rem] md:text-[3.4rem] lg:text-[4rem]"
            style={{ color: "#031760" }}
          >
            {lc.h2.part1}{" "}
            <span style={{ color: "#0EA5E9" }}>{lc.h2.accent}</span>
          </h2>
          <p
            className="font-body text-[1rem] leading-relaxed"
            style={{ color: "rgba(3,23,96,0.65)", maxWidth: "480px" }}
          >
            {lc.body}
          </p>
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div
            className="w-full rounded-2xl px-8 py-10 flex flex-col items-center gap-3"
            style={{ backgroundColor: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.25)" }}
          >
            <span
              className="font-display font-bold text-[1.5rem] uppercase tracking-tight"
              style={{ color: "#031760" }}
            >
              {lc.success.heading}
            </span>
            <p className="font-body text-[0.9rem]" style={{ color: "rgba(3,23,96,0.6)" }}>
              {lc.success.body}
            </p>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

            {/* Role selector */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              role="group"
              aria-label={lc.eyebrow}
            >
              {userTypes.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected === id}
                  aria-label={label}
                  onClick={() => setSelected(id)}
                  className="font-body text-sm font-semibold uppercase tracking-wider rounded-lg px-5 py-3 min-w-[148px] transition-all duration-200"
                  style={
                    selected === id
                      ? { backgroundColor: "#031760", color: "#ffffff", boxShadow: "0 4px 16px rgba(3,23,96,0.25)" }
                      : { backgroundColor: "rgba(3,23,96,0.06)", color: "rgba(3,23,96,0.70)", border: "1px solid rgba(3,23,96,0.15)" }
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Email + submit */}
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <input
                type="email"
                required
                id="early-access-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lc.emailPlaceholder}
                aria-label={lc.emailPlaceholder}
                aria-describedby="early-access-hint"
                className="flex-1 font-body text-[0.95rem] rounded-lg px-5 h-[56px] outline-none"
                style={{ border: "1px solid rgba(3,23,96,0.20)", backgroundColor: "#ffffff", color: "#031760" }}
              />
              <button
                type="submit"
                disabled={loading}
                aria-label={loading ? lc.submit.loading : lc.submit.idle}
                className="font-body font-bold text-sm uppercase tracking-wider text-white rounded-lg px-7 h-[56px] flex-shrink-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#031760" }}
                onMouseEnter={(e) => {
                  if (loading) return;
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(3,23,96,0.30)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {loading ? lc.submit.loading : lc.submit.idle}
              </button>
            </div>

            {error && (
              <p className="font-body text-[0.82rem]" style={{ color: "#dc2626" }}>
                {error}
              </p>
            )}

            <p id="early-access-hint" className="font-body text-[0.75rem]" style={{ color: "rgba(3,23,96,0.40)" }}>
              {lc.disclaimer}
            </p>

          </form>
        )}

      </div>
    </section>
  );
}
