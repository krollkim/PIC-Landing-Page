"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Uri's WhatsApp — same number the live pic-events.co.il site links to.
const WHATSAPP_PHONE = "972556604443";

export default function LeadCapture() {
  const { t } = useLanguage();
  const lc = t.leadCapture;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  // y-only - no direction dependency needed
  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 40, opacity: 0, duration: 1.0, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lc.whatsappMessage)}`;

  return (
    <section
      ref={sectionRef}
      id="lead-capture"
      aria-label={lc.eyebrow}
      className="w-full px-6 py-28 md:py-36"
      style={{
        background: "linear-gradient(to bottom, #0A0A12 0%, #2A0842 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8"
      >

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="block w-8 h-px" style={{ backgroundColor: "#FF0B70" }} />
          <span
            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "#FF4D9B" }}
          >
            {lc.eyebrow}
          </span>
          <span className="block w-8 h-px" style={{ backgroundColor: "#FF0B70" }} />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h2
            className="font-display font-bold uppercase tracking-tight leading-[1.0] text-[2.4rem] md:text-[3.4rem] lg:text-[4rem]"
            style={{ color: "#FFFFFF" }}
          >
            {lc.h2.part1}{" "}
            <span style={{ color: "#FF4D9B" }}>{lc.h2.accent}</span>
          </h2>
          <p
            className="font-body text-[1rem] leading-relaxed"
            style={{ color: "rgba(250,247,255,0.65)", maxWidth: "480px" }}
          >
            {lc.body}
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lc.cta}
          className="font-body font-bold text-sm sm:text-base uppercase tracking-wider text-white btn-gradient-pink rounded-[10px] inline-flex items-center justify-center gap-2.5 px-8 h-[56px] mt-2"
        >
          <MessageCircle size={19} strokeWidth={2} aria-hidden="true" />
          {lc.cta}
        </a>

      </div>
    </section>
  );
}
