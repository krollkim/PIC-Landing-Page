"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headset, Store, Ticket, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Icons are UI concerns - kept here, not in translations
const COLUMN_ICONS: LucideIcon[] = [Headset, Store, Ticket];
const COLUMN_NUMS = ["01", "02", "03"] as const;

export default function Solution() {
  const { t } = useLanguage();
  const s = t.solution;

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const scrollRefs      = useRef<(HTMLDivElement  | null)[]>([]);
  const hoverRefs       = useRef<(HTMLDivElement  | null)[]>([]);
  const iconRefs        = useRef<(HTMLDivElement  | null)[]>([]);
  const numRefs         = useRef<(HTMLSpanElement | null)[]>([]);
  const quickY          = useRef<Array<(v: number) => void>>([]);
  const quickIconScale  = useRef<Array<(v: number) => void>>([]);
  const quickNumOpacity = useRef<Array<(v: number) => void>>([]);

  // All animations are y-only - no direction dependency needed
  useGSAP(() => {
    const isMobile = ScrollTrigger.isTouch === 1;

    gsap.from(headingRef.current, {
      y: 24, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
    });

    if (isMobile) {
      gsap.set(scrollRefs.current, { y: 0, scale: 1, opacity: 1 });
      gsap.from(scrollRefs.current, {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    } else {
      gsap.set(scrollRefs.current, { y: 100, scale: 0.82, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: gridRef.current, start: "top 78%", end: "+=520", scrub: 1 },
      });
      tl.to(scrollRefs.current[0], { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }, 0);
      tl.to(scrollRefs.current[1], { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }, 0.25);
      tl.to(scrollRefs.current[2], { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }, 0.5);
    }

    gsap.set(numRefs.current, { opacity: 0.10 });
    gsap.set(iconRefs.current, { scale: 1 });

    hoverRefs.current.forEach((card, i) => {
      if (!card) return;
      quickY.current[i] = gsap.quickTo(card, "y", { duration: 0.4, ease: "power2.out" });
    });
    iconRefs.current.forEach((icon, i) => {
      if (!icon) return;
      quickIconScale.current[i] = gsap.quickTo(icon, "scale", { duration: 0.3, ease: "back.out(1.5)" });
    });
    numRefs.current.forEach((num, i) => {
      if (!num) return;
      quickNumOpacity.current[i] = gsap.quickTo(num, "opacity", { duration: 0.35 });
    });
  }, { scope: sectionRef });

  const handleEnter = (i: number) => {
    quickY.current[i]?.(-20);
    quickIconScale.current[i]?.(1.25);
    quickNumOpacity.current[i]?.(0.45);
    if (hoverRefs.current[i]) hoverRefs.current[i]!.style.boxShadow = "0 25px 60px rgba(3,23,96,0.16)";
  };

  const handleLeave = (i: number) => {
    quickY.current[i]?.(0);
    quickIconScale.current[i]?.(1.0);
    quickNumOpacity.current[i]?.(0.10);
    if (hoverRefs.current[i]) hoverRefs.current[i]!.style.boxShadow = "none";
  };

  return (
    <section
      ref={sectionRef}
      id="solution"
      aria-label="The Platform"
      className="w-full bg-white py-28 md:py-36 px-6"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-20">

        {/* ── Heading ── */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.28em]" style={{ color: "#33AFFF" }}>
              {s.eyebrow}
            </span>
            <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
          </div>
          <h2
            className="font-display font-bold uppercase tracking-tight leading-none text-[2.2rem] md:text-[3.2rem] lg:text-[4rem]"
            style={{ color: "#031760" }}
          >
            {s.h2.part1}{" "}
            <span style={{ color: "#33AFFF" }}>{s.h2.accent}</span>
          </h2>
          <p className="font-body text-gray-500 text-lg leading-relaxed" style={{ maxWidth: "560px" }}>
            {s.body}
          </p>
        </div>

        {/* ── Three-column grid ── */}
        <div ref={gridRef} className="w-full grid grid-cols-1 md:grid-cols-3 gap-0">
          {s.columns.map((col, i) => {
            const Icon = COLUMN_ICONS[i];
            return (
              <div
                key={COLUMN_NUMS[i]}
                ref={(el) => { scrollRefs.current[i] = el; }}
                className="px-2 md:px-4"
                style={{ transformOrigin: "center bottom" }}
              >
                <div
                  ref={(el) => { hoverRefs.current[i] = el; }}
                  className="flex flex-col gap-7 rounded-xl px-8 py-10 h-full"
                  style={{
                    border: "1px solid rgba(3,23,96,0.08)",
                    willChange: "transform",
                    cursor: "default",
                    transition: "box-shadow 0.35s ease",
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  {/* Ghost number */}
                  <span
                    ref={(el) => { numRefs.current[i] = el; }}
                    className="font-display font-bold text-[4rem] leading-none select-none"
                    style={{ color: "#031760" }}
                  >
                    {COLUMN_NUMS[i]}
                  </span>

                  {/* Icon badge */}
                  <div
                    ref={(el) => { iconRefs.current[i] = el; }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(51,175,255,0.12)", transformOrigin: "center" }}
                  >
                    <Icon size={22} style={{ color: "#33AFFF" }} strokeWidth={2} />
                  </div>

                  {/* Role */}
                  <h3
                    className="font-display font-bold uppercase tracking-tight leading-none text-[1.8rem] md:text-[2rem]"
                    style={{ color: "#031760" }}
                  >
                    {col.role}
                  </h3>

                  {/* Quote */}
                  <blockquote
                    className="font-body italic text-[0.95rem] leading-relaxed border-s-2 ps-4"
                    style={{ color: "rgba(3,23,96,0.55)", borderColor: "#33AFFF" }}
                  >
                    {col.quote}
                  </blockquote>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2">
                    {col.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#33AFFF" }} />
                        <span className="font-body text-gray-500 text-[0.9rem] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
