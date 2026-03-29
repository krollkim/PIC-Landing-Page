"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEP_NUMS = ["01", "02", "03", "04"] as const;

const CONNECTOR_END_POS = [0.28, 0.58, 0.88] as const;

const CIRCLE_ACTIVE = {
  borderColor: "#0EA5E9",
  backgroundColor: "rgba(14,165,233,0.08)",
  boxShadow: "0 0 0 6px rgba(14,165,233,0.10), 0 0 20px rgba(14,165,233,0.35)",
} as const;

const CIRCLE_IDLE = {
  borderColor: "rgba(3,23,96,0.20)",
  backgroundColor: "transparent",
  boxShadow: "none",
} as const;

export default function Process() {
  const { t, dir } = useLanguage();
  const p = t.process;

  const sectionRef    = useRef<HTMLElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  const circleRefs    = useRef<(HTMLDivElement  | null)[]>([]);
  const numRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs      = useRef<(HTMLDivElement  | null)[]>([]);
  const connectorRefs = useRef<(HTMLDivElement  | null)[]>([]);

  // Connector fill origin is direction-aware: RTL grows from right, LTR from left
  useGSAP(() => {
    const isMobile = ScrollTrigger.isTouch === 1;
    const connectorOrigin = dir === "rtl" ? "right center" : "left center";

    gsap.from(headingRef.current, {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
    });

    if (isMobile) {
      gsap.set(circleRefs.current,    CIRCLE_ACTIVE);
      gsap.set(numRefs.current,       { scale: 1.15, color: "#031760" });
      gsap.set(textRefs.current,      { y: 0, opacity: 1 });
      gsap.set(connectorRefs.current, { transformOrigin: connectorOrigin, scaleX: 1 });
    } else {
      gsap.set(circleRefs.current[0], CIRCLE_ACTIVE);
      gsap.set(numRefs.current[0],    { scale: 1.15, color: "#031760" });
      gsap.set(textRefs.current[0],   { y: 0, opacity: 1 });

      gsap.set(circleRefs.current.slice(1), CIRCLE_IDLE);
      gsap.set(numRefs.current.slice(1),    { scale: 1.0, color: "rgba(3,23,96,0.45)" });
      gsap.set(textRefs.current.slice(1),   { y: 20, opacity: 0 });
      gsap.set(connectorRefs.current,       { transformOrigin: connectorOrigin, scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%", end: "+=700", scrub: 1 },
      });

      CONNECTOR_END_POS.forEach((endPos, ci) => {
        const startPos   = ci === 0 ? 0.02 : CONNECTOR_END_POS[ci - 1] + 0.02;
        const nextCircle = ci + 1;
        tl.to(connectorRefs.current[ci],      { scaleX: 1, ease: "none", duration: endPos - startPos }, startPos);
        tl.to(circleRefs.current[nextCircle], { ...CIRCLE_ACTIVE, duration: 0.06, ease: "none" }, endPos);
        tl.to(numRefs.current[nextCircle],    { scale: 1.15, color: "#031760", duration: 0.06, ease: "none" }, endPos);
        tl.to(textRefs.current[nextCircle],   { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" }, endPos);
      });
    }
  }, { scope: sectionRef, dependencies: [dir], revertOnUpdate: true });

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="The Process"
      className="w-full bg-white py-28 md:py-36 px-6 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-20">

        {/* ── Heading ── */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]" style={{ color: "#33AFFF" }}>
              {p.eyebrow}
            </span>
            <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
          </div>
          <h2
            className="font-display font-bold uppercase tracking-tight leading-[1.0] text-[2.4rem] md:text-[3.4rem] lg:text-[4.2rem]"
            style={{ color: "#031760" }}
          >
            {p.h2.part1}{" "}
            <span style={{ color: "#33AFFF" }}>{p.h2.accent}</span>{" "}
            {p.h2.part2}
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="w-full flex flex-col gap-10">

          {/* Row 1: circles + connectors (desktop only) */}
          <div className="hidden md:flex items-center w-full">
            {p.steps.map((_, i) => (
              <div key={STEP_NUMS[i]} className="contents">
                <div
                  ref={(el) => { circleRefs.current[i] = el; }}
                  className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                  style={{ border: "2px solid rgba(3,23,96,0.20)", transition: "border-color 0.06s, box-shadow 0.06s, background-color 0.06s" }}
                >
                  <span
                    ref={(el) => { numRefs.current[i] = el; }}
                    className="font-display font-bold text-[0.85rem] leading-none tracking-wider"
                    style={{ transformOrigin: "center" }}
                  >
                    {STEP_NUMS[i]}
                  </span>
                </div>
                {i < p.steps.length - 1 && (
                  <div className="flex-1 relative h-[2px]" style={{ backgroundColor: "rgba(3,23,96,0.10)" }}>
                    <div
                      ref={(el) => { connectorRefs.current[i] = el; }}
                      className="absolute inset-0 origin-right"
                      style={{ backgroundColor: "#0EA5E9", boxShadow: "0 0 6px rgba(14,165,233,0.55)" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Row 2: step text labels */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {p.steps.map((step, i) => (
              <div key={STEP_NUMS[i]} className="flex flex-col gap-0">

                {/* Mobile-only circle */}
                <div
                  className="md:hidden flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ border: "2px solid #0EA5E9", boxShadow: "0 0 16px rgba(14,165,233,0.3)" }}
                >
                  <span className="font-display font-bold text-[0.85rem]" style={{ color: "#031760" }}>
                    {STEP_NUMS[i]}
                  </span>
                </div>

                {/* Step text */}
                <div
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="flex flex-col gap-2 text-center md:text-start"
                >
                  <h3
                    className="font-display font-bold uppercase tracking-tight text-[1.2rem] leading-tight"
                    style={{ color: "#031760" }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-body text-[0.88rem] leading-relaxed" style={{ color: "rgba(3,23,96,0.55)" }}>
                    {step.body.includes(":") ? (
                      <>
                        <strong style={{ color: "#031760", fontWeight: 700 }}>
                          {step.body.split(":")[0]}:
                        </strong>
                        {step.body.split(":").slice(1).join(":")}
                      </>
                    ) : step.body}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
