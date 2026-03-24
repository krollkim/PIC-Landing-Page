"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TransitionBar() {
  const labelRef     = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

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
      aria-label="The Current Situation"
      id="Situation"
      style={{
        backgroundColor: "#30a5ff",
        borderTop: "1px solid rgba(3,23,96,0.10)",
      }}
      className="w-full py-[90px] px-6"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Label - Deep Navy: the 'important takeaway' tone */}
        <div ref={labelRef} className="flex items-center gap-3">
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
          <span
            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "#031760" }}
          >
            The Current Situation
          </span>
          <span className="block w-8 h-px" style={{ backgroundColor: "#031760" }} />
        </div>

        {/* Editorial statement */}
        <p
          ref={statementRef}
          className="font-display font-bold uppercase tracking-tight leading-[1.05] text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem]"
        >
          {/* Story text - White with subtle shadow for legibility */}
          <span style={{ color: "#FFFFFF", textShadow: "0 1px 2px rgba(0,0,0,0.10)" }}>
            Planning an event today is complicated, time consuming, and spread across too many platforms,{" "}
          </span>
          {/* Punchline - Deep Navy, black-weight for maximum punch */}
          <span style={{ color: "#031760", fontWeight: 900 }}>
            Now it&apos;s simple.
          </span>
        </p>

      </div>
    </section>
  );
}
