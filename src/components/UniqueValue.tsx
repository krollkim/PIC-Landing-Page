"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Network, BookImage, BarChart3, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Icons are UI concerns - kept here, not in translations
const FEATURE_ICONS: LucideIcon[] = [Network, BookImage, BarChart3];

const FILTER_IDLE  = "drop-shadow(0 0 24px rgba(51,175,255,0.22))";
const FILTER_PEAK  = "drop-shadow(0 0 52px rgba(51,175,255,0.50))";
const FILTER_BURST = "drop-shadow(0 0 80px rgba(51,175,255,0.90))";

export default function UniqueValue() {
  const { t, dir } = useLanguage();
  const uv = t.uniqueValue;

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLUListElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const pulseTl    = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const isMobile = ScrollTrigger.isTouch === 1;
    const items    = Array.from(listRef.current?.querySelectorAll("li") ?? []);
    // Direction multiplier: RTL slides in from the right (+x), LTR from the left (-x)
    const xSign    = dir === "rtl" ? 1 : -1;

    if (isMobile) {
      gsap.from(headingRef.current, {
        y: 24, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
      if (items.length) {
        gsap.from(items, {
          x: xSign * 24, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: listRef.current, start: "top 88%", toggleActions: "play none none none" },
        });
      }
    } else {
      gsap.timeline({
        scrollTrigger: { trigger: headingRef.current, start: "top 90%", end: "top 45%", scrub: 1 },
      }).from(headingRef.current, { x: xSign * 40, opacity: 0, ease: "power2.out" });

      if (items.length) {
        const listTl = gsap.timeline({
          scrollTrigger: { trigger: listRef.current, start: "top 88%", end: "bottom 55%", scrub: 1 },
        });
        items.forEach((item, i) => {
          listTl.from(item, { x: xSign * 40, opacity: 0, ease: "power2.out", duration: 0.4 }, i * 0.28);
        });
      }

      // 3IN1 parallax - y only, no direction dependency
      gsap.fromTo(
        graphicRef.current,
        { y: 80 },
        { y: -120, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } },
      );
    }

    // Infinite breathing pulse
    gsap.set(glowRef.current, { filter: FILTER_IDLE });
    pulseTl.current = gsap.timeline({ repeat: -1, yoyo: true }).to(
      glowRef.current,
      { filter: FILTER_PEAK, duration: 2.4, ease: "sine.inOut" },
    );
  }, { scope: sectionRef, dependencies: [dir], revertOnUpdate: true });

  const handleItemEnter = () => {
    pulseTl.current?.pause();
    gsap.to(glowRef.current, { filter: FILTER_BURST, duration: 0.35, ease: "power2.out" });
  };

  const handleItemLeave = () => {
    gsap.to(glowRef.current, {
      filter: FILTER_IDLE, duration: 0.6, ease: "power2.out",
      onComplete: () => { pulseTl.current?.restart(); },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="unique-value"
      aria-label="Our Unique Value"
      className="w-full py-28 md:py-36 px-6 overflow-hidden"
      style={{ backgroundColor: "#031760" }}
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-12">

          <div ref={headingRef} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]" style={{ color: "#33AFFF" }}>
                {uv.eyebrow}
              </span>
              <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
            </div>
            <h2 className="font-display font-bold uppercase tracking-tight leading-[1.0] text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] text-white">
              {uv.h2.part1}{" "}
              <span style={{ color: "#33AFFF" }}>{uv.h2.accent}</span>
            </h2>
          </div>

          <ul ref={listRef} className="flex flex-col gap-8">
            {uv.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <li
                  key={feature.title}
                  className="flex items-start gap-5 cursor-default"
                  onMouseEnter={handleItemEnter}
                  onMouseLeave={handleItemLeave}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "rgba(51,175,255,0.12)", border: "1px solid rgba(51,175,255,0.20)" }}
                  >
                    <Icon size={20} style={{ color: "#33AFFF" }} strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-bold uppercase tracking-tight text-[1.1rem] leading-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {feature.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

        </div>

        {/* ── RIGHT: 3IN1 graphic ── */}
        <div className="flex items-center justify-center">
          <div ref={graphicRef}>
            <div ref={glowRef} className="flex flex-col items-center select-none">
              <span
                className="font-display font-bold uppercase leading-[0.85] text-[7rem] md:text-[9rem] lg:text-[11rem]"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(51,175,255,0.70)", letterSpacing: "-0.04em" }}
              >
                3
              </span>
              <span
                className="font-display font-bold uppercase leading-[0.85] text-[7rem] md:text-[9rem] lg:text-[11rem]"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.90)", letterSpacing: "-0.04em" }}
              >
                IN
              </span>
              <span
                className="font-display font-bold uppercase leading-[0.85] text-[7rem] md:text-[9rem] lg:text-[11rem]"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(51,175,255,0.70)", letterSpacing: "-0.04em" }}
              >
                1
              </span>
              <p
                className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.3em] mt-6 text-center"
                style={{ color: "rgba(51,175,255,0.6)" }}
              >
                {uv.tagline}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
