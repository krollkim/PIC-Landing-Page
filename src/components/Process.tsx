"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Register",
    body: "Create your profile: Sign up as a Producer or Vendor and join the professional network in minutes.",
  },
  {
    num: "02",
    title: "Set Up",
    body: "Build your base: Set up your personalized event dashboard or upload your business portfolio to start showcasing your work.",
  },
  {
    num: "03",
    title: "Connect",
    body: "Find exactly what you need: browse a verified network of vendors. Choose the best professionals tailored specifically to your event\'s needs, budget, and style.",
  },
  {
    num: "04",
    title: "LAUNCH",
    body: "Success for everyone: The event comes to life. Producers enjoy a fully managed, professional production, while Vendors get hired and paid securely. Everything is documented and seamless from start to finish.",
  },
] as const;

// Timeline positions at which each connector COMPLETES its fill
// (and the next circle activates immediately after)
const CONNECTOR_END_POS = [0.28, 0.58, 0.88] as const;

// Active circle style (sky blue)
const CIRCLE_ACTIVE = {
  borderColor: "#0EA5E9",
  backgroundColor: "rgba(14,165,233,0.08)",
  boxShadow: "0 0 0 6px rgba(14,165,233,0.10), 0 0 20px rgba(14,165,233,0.35)",
} as const;

// Inactive circle style (faint navy)
const CIRCLE_IDLE = {
  borderColor: "rgba(3,23,96,0.20)",
  backgroundColor: "transparent",
  boxShadow: "none",
} as const;

export default function Process() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  // 4 circles, 4 number spans, 4 text blocks
  const circleRefs    = useRef<(HTMLDivElement  | null)[]>([]);
  const numRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs      = useRef<(HTMLDivElement  | null)[]>([]);
  // 3 connector progress fills (between circles 1-2, 2-3, 3-4)
  const connectorRefs = useRef<(HTMLDivElement  | null)[]>([]);

  useGSAP(() => {
    const isMobile = ScrollTrigger.isTouch === 1;

    // ── Heading ──────────────────────────────────────────────────────────────
    gsap.from(headingRef.current, {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
    });

    if (isMobile) {
      // ── Mobile: show all steps fully active, animate in as one block ───────
      gsap.set(circleRefs.current,  CIRCLE_ACTIVE);
      gsap.set(numRefs.current,     { scale: 1.15, color: "#031760" });
      gsap.set(textRefs.current,    { y: 0, opacity: 1 });
      gsap.set(connectorRefs.current, { scaleX: 1 });
    } else {
      // ── Desktop: scrubbed timeline ─────────────────────────────────────────
      gsap.set(circleRefs.current[0], CIRCLE_ACTIVE);
      gsap.set(numRefs.current[0],    { scale: 1.15, color: "#031760" });
      gsap.set(textRefs.current[0],   { y: 0, opacity: 1 });

      gsap.set(circleRefs.current.slice(1), CIRCLE_IDLE);
      gsap.set(numRefs.current.slice(1),    { scale: 1.0, color: "rgba(3,23,96,0.45)" });
      gsap.set(textRefs.current.slice(1),   { y: 20, opacity: 0 });
      gsap.set(connectorRefs.current,       { scaleX: 0 });

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
  }, { scope: sectionRef });

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
            <span
              className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
              style={{ color: "#33AFFF" }}
            >
              The Process
            </span>
            <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
          </div>
          <h2
            className="font-display font-bold uppercase tracking-tight leading-[1.0] text-[2.4rem] md:text-[3.4rem] lg:text-[4.2rem]"
            style={{ color: "#031760" }}
          >
            Simple.{" "}
            <span style={{ color: "#33AFFF" }}>Fast.</span>{" "}
            Smart.
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="w-full flex flex-col gap-10">

          {/* Row 1: circles connected by the animated line */}
          {/* Flex: each circle is flex-shrink-0; connectors are flex-1 */}
          <div className="hidden md:flex items-center w-full">
            {STEPS.map(({ num }, i) => (
              <div key={num} className="contents">

                {/* Circle */}
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
                    {num}
                  </span>
                </div>

                {/* Connector (only between circles, not after the last) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 relative h-[2px]"
                    style={{ backgroundColor: "rgba(3,23,96,0.10)" }}
                  >
                    {/* Sky blue fill - scaleX animated from 0 → 1 */}
                    <div
                      ref={(el) => { connectorRefs.current[i] = el; }}
                      className="absolute inset-0 origin-left"
                      style={{
                        backgroundColor: "#0EA5E9",
                        boxShadow: "0 0 6px rgba(14,165,233,0.55)",
                      }}
                    />
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Row 2: step text labels - aligned below each circle */}
          {/* On desktop: 4-column grid matches circle positions */}
          {/* On mobile: vertical stack with circles inline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {STEPS.map(({ num, title, body }, i) => (
              <div key={num} className="flex flex-col gap-0">

                {/* Mobile-only: circle above text (hidden on md+) */}
                <div
                  className="md:hidden flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ border: "2px solid #0EA5E9", boxShadow: "0 0 16px rgba(14,165,233,0.3)" }}
                >
                  <span className="font-display font-bold text-[0.85rem]" style={{ color: "#031760" }}>
                    {num}
                  </span>
                </div>

                {/* Step text */}
                <div
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="flex flex-col gap-2 text-center md:text-left"
                >
                  <h3
                    className="font-display font-bold uppercase tracking-tight text-[1.2rem] leading-tight"
                    style={{ color: "#031760" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="font-body text-[0.88rem] leading-relaxed"
                    style={{ color: "rgba(3,23,96,0.55)" }}
                  >
                    {body.includes(":") ? (
                      <>
                        <strong style={{ color: "#031760", fontWeight: 700 }}>
                          {body.split(":")[0]}:
                        </strong>
                        {body.split(":").slice(1).join(":")}
                      </>
                    ) : body}
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
