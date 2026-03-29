"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TransitionBar() {
  const { t } = useLanguage();
  const tb = t.transitionBar;

  const labelRef     = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  // y-only animation - direction-neutral, no xSign needed
  useGSAP(() => {
    gsap.from([labelRef.current, statementRef.current], {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: labelRef.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      aria-label={tb.eyebrow}
      id="Situation"
      style={{
        backgroundColor: "#30a5ff",
        borderTop: "1px solid rgba(3,23,96,0.10)",
      }}
      className="w-full py-[90px] px-6"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Eyebrow label */}
        <div ref={labelRef} className="flex items-center gap-3">
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
          <span
            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "#031760" }}
          >
            {tb.eyebrow}
          </span>
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
        </div>

        {/* Editorial statement */}
        <p
          ref={statementRef}
          className="font-display font-bold uppercase tracking-tight leading-[1.05] text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem]"
        >
          {/* Story text - white with subtle shadow for legibility on sky-blue bg */}
          <span style={{ color: "#FFFFFF", textShadow: "0 1px 2px rgba(0,0,0,0.10)" }}>
            {tb.statementPart1}{" "}
          </span>
          {/* Punchline - deep navy, heavy weight for maximum contrast */}
          <span style={{ color: "#031760", fontWeight: 900 }}>
            {tb.punchline}
          </span>
        </p>

      </div>
    </section>
  );
}
