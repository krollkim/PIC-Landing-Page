"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  const glowARef  = useRef<HTMLDivElement>(null);
  const glowBRef  = useRef<HTMLDivElement>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
      const dist  = Math.min(Math.sqrt(xNorm * xNorm + yNorm * yNorm) / Math.SQRT2, 1);
      const scale = 1 + (1 - dist) * 0.1;

      gsap.to(glowARef.current, {
        xPercent: xNorm * 8, yPercent: yNorm * 8, scale,
        duration: 0.8, ease: "power2.out",
      });
      gsap.to(glowBRef.current, {
        xPercent: xNorm * 15, yPercent: yNorm * 15, scale,
        filter: "brightness(0.65) saturate(1.4)",
        duration: 0.8, ease: "power2.out",
      });

      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => {
        gsap.to(glowBRef.current, {
          filter: "brightness(1) saturate(1)",
          duration: 1.0, ease: "power3.out",
        });
      }, 120);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  return (
    <section
      aria-label={h.sectionLabel}
      className="relative w-full min-h-screen bg-white flex items-center justify-center px-6 pt-16 overflow-hidden"
    >

      {/* ── Grid ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: "100%", maxWidth: "1440px", height: "80vh",
            backgroundImage: `linear-gradient(to right, rgba(3,23,96,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(3,23,96,0.09) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Glow A ── */}
      <div ref={glowARef} className="absolute inset-0"
        style={{ zIndex: 1, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,165,233,0.15) 0%, transparent 60%)" }} />

      {/* ── Glow B ── */}
      <div ref={glowBRef} className="absolute inset-0"
        style={{ zIndex: 2, background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(14,165,233,0.35) 0%, transparent 70%)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8">

        {/* Logo */}
        <Image
          src="/images/pic-logo.jpeg"
          alt={h.logoAlt}
          width={220} height={96}
          style={{ borderRadius: "100%", height: "auto" }}
          priority
          className="w-[100px] md:w-[130px] select-none"
          draggable={false}
        />

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="block w-8 h-px bg-sky-400" />
          <span className="font-body text-[0.65rem] font-semibold text-sky-500 uppercase tracking-[0.28em]">
            {h.eyebrow}
          </span>
          <span className="block w-8 h-px bg-sky-400" />
        </div>

        {/* 3-tier headline */}
        <h1 className="flex flex-col items-center gap-0" style={{ textShadow: "0 0 20px rgba(255,255,255,0.8)" }}>
          <span className="font-display font-bold text-navy uppercase tracking-tighter leading-[0.88] text-[4.5rem] md:text-[7.5rem] lg:text-[10rem]">
            {h.h1[0]}
          </span>
          <span className="font-display font-bold uppercase tracking-tighter leading-[0.88] text-[4.5rem] md:text-[7.5rem] lg:text-[10rem] text-outline-navy">
            {h.h1[1]}
          </span>
          <span className="font-display font-bold text-navy uppercase tracking-tighter leading-[0.88] text-[4.5rem] md:text-[7.5rem] lg:text-[10rem]">
            {h.h1[2]}
          </span>
        </h1>

        {/* Body */}
        <p className="font-body text-gray-500 text-lg leading-relaxed mt-6" style={{ maxWidth: "600px" }}>
          {h.body}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 pb-16">
          <a
            href="#lead-capture"
            aria-label={h.ctaPrimary}
            className="font-body font-bold text-base uppercase tracking-wider text-white bg-navy hover:bg-navy-hover active:bg-navy-active transition-colors duration-150 rounded-md min-w-[240px] h-[64px] flex items-center justify-center"
          >
            {h.ctaPrimary}
          </a>
          <a
            href="https://pic-events.co.il/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={h.ctaSecondary}
            className="font-body font-bold text-base uppercase tracking-wider text-navy border-2 border-navy hover:bg-navy hover:text-white transition-all duration-200 rounded-md min-w-[240px] h-[64px] flex items-center justify-center"
          >
            {h.ctaSecondary}
          </a>
        </div>

      </div>
    </section>
  );
}
