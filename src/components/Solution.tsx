"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headset, Store, Ticket } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COLUMNS = [
  {
    num: "01",
    icon: Headset,
    role: "Producers",
    quote: '"I used to waste days on endless calls and WhatsApp chaos. Now, everything is in one place."',
    bullets: [
      "Plan in Minutes: Go from an idea to a live event with a few clicks.",
      "Verified vendors: Instant access to a network of vendors you can trust.",
      "Total Control: Track your tasks, schedule, and budget on one dashboard.",
      "Stop the Mess: No more lost messages, all communication is organized.",
      "Easy Payments: Manage and pay vendors securely.",
    ],
  },
  {
    num: "02",
    icon: Store,
    role: "Vendors",
    quote: '"I\'m a pro at what I do, but if clients can\'t find me, it doesn\'t matter. With PIC, my next job is one click away."',
    bullets: [
      "Strong Business Profile: A professional gallery to show off your best work.",
      "Smart Leads: Get matched with clients who fit your style and budget.",
      "Instant Booking: Manage your calendar and get hired on the spot.",
      "Build Your Name: Verified reviews and ratings that build real trust.",
      "Direct Access: Chat directly with clients without the 'middleman.'",
    ],
  },
  {
    num: "03",
    icon: Ticket,
    role: "Attendees",
    quote: '"Never miss out on the events that matter."',
    bullets: [
      "Discover events that match your interests",
      "Buy tickets quickly and securely",
      "Stay updated on upcoming events",
      "Get access to exclusive drops and releases",
    ],
  },
] as const;

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  // Outer wrappers - owned by scrubbed ScrollTrigger (y + scale + opacity)
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Inner cards - owned by hover quickTo (y only), never touched by scroll anim
  const hoverRefs  = useRef<(HTMLDivElement | null)[]>([]);
  // Icon badge refs for scale burst
  const iconRefs   = useRef<(HTMLDivElement | null)[]>([]);
  // Number span refs for opacity anchor
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  const quickY          = useRef<Array<(v: number) => void>>([]);
  const quickIconScale  = useRef<Array<(v: number) => void>>([]);
  const quickNumOpacity = useRef<Array<(v: number) => void>>([]);

  useGSAP(() => {
    const isMobile = ScrollTrigger.isTouch === 1;

    // ── Heading reveal ───────────────────────────────────────────────────────
    gsap.from(headingRef.current, {
      y: 24, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    if (isMobile) {
      // ── Mobile: simple one-shot stagger (no scrub) ────────────────────────
      gsap.set(scrollRefs.current, { y: 0, scale: 1, opacity: 1 });
      gsap.from(scrollRefs.current, {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      // ── Desktop: scrubbed staggered timeline ──────────────────────────────
      gsap.set(scrollRefs.current, { y: 100, scale: 0.82, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 78%",
          end: "+=520",
          scrub: 1,
        },
      });

      tl.to(scrollRefs.current[0], { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }, 0);
      tl.to(scrollRefs.current[1], { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }, 0.25);
      tl.to(scrollRefs.current[2], { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }, 0.5);
    }

    // ── Number initial opacity (element opacity, not color alpha) ───────────
    gsap.set(numRefs.current, { opacity: 0.10 });

    // Give GSAP ownership of scale on icon elements so quickTo can reset it
    gsap.set(iconRefs.current, { scale: 1 });

    // ── QuickTo functions (operate on inner hover divs - no conflict) ───────
    hoverRefs.current.forEach((card, i) => {
      if (!card) return;
      quickY.current[i] = gsap.quickTo(card, "y", {
        duration: 0.4, ease: "power2.out",
      });
    });
    iconRefs.current.forEach((icon, i) => {
      if (!icon) return;
      quickIconScale.current[i] = gsap.quickTo(icon, "scale", {
        duration: 0.3, ease: "back.out(1.5)",
      });
    });
    numRefs.current.forEach((num, i) => {
      if (!num) return;
      quickNumOpacity.current[i] = gsap.quickTo(num, "opacity", {
        duration: 0.35,
      });
    });
  }, { scope: sectionRef });

  const handleEnter = (i: number) => {
    quickY.current[i]?.(-20);
    quickIconScale.current[i]?.(1.25);
    quickNumOpacity.current[i]?.(0.45);   // number gets DARKER on hover - anchors the card
    if (hoverRefs.current[i]) {
      hoverRefs.current[i]!.style.boxShadow = "0 25px 60px rgba(3,23,96,0.16)";
    }
  };

  const handleLeave = (i: number) => {
    quickY.current[i]?.(0);
    quickIconScale.current[i]?.(1.0);
    quickNumOpacity.current[i]?.(0.10);   // number fades back to ghost
    if (hoverRefs.current[i]) {
      hoverRefs.current[i]!.style.boxShadow = "none";
    }
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
              Who It&apos;s For
            </span>
            <span className="block w-8 h-px" style={{ backgroundColor: "#33AFFF" }} />
          </div>
          <h2
            className="font-display font-bold uppercase tracking-tight leading-[1.0] text-[2.2rem] md:text-[3.2rem] lg:text-[4rem]"
            style={{ color: "#031760" }}
          >
            One Platform.{" "}
            <span style={{ color: "#33AFFF" }}>All Sides.</span>
          </h2>
          <p className="font-body text-gray-500 text-lg leading-relaxed" style={{ maxWidth: "560px" }}>
            FOR EVERY TYPE OF EVENT - Where producers, vendors, and attendees come together.
          </p>
        </div>

        {/* ── Three-column grid ── */}
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-0"
        >
          {COLUMNS.map(({ num, icon: Icon, role, quote, bullets }, i) => (
            // Outer wrapper: ScrollTrigger scrub controls y + scale + opacity
            <div
              key={num}
              ref={(el) => { scrollRefs.current[i] = el; }}
              className="px-2 md:px-4"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Inner card: hover quickTo controls y + shadow, never conflicts */}
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
                {/* Ghost process number */}
                <span
                  ref={(el) => { numRefs.current[i] = el; }}
                  className="font-display font-bold text-[4rem] leading-none select-none"
                  style={{ color: "#031760" }}
                >
                  {num}
                </span>

                {/* Icon badge */}
                <div
                  ref={(el) => { iconRefs.current[i] = el; }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(51,175,255,0.12)", transformOrigin: "center" }}
                >
                  <Icon size={22} style={{ color: "#33AFFF" }} strokeWidth={2} />
                </div>

                {/* Role title */}
                <h3
                  className="font-display font-bold uppercase tracking-tight leading-none text-[1.8rem] md:text-[2rem]"
                  style={{ color: "#031760" }}
                >
                  {role}
                </h3>

                {/* Quote */}
                <blockquote
                  className="font-body italic text-[0.95rem] leading-relaxed border-l-2 pl-4"
                  style={{ color: "rgba(3,23,96,0.55)", borderColor: "#33AFFF" }}
                >
                  {quote}
                </blockquote>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[6px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#33AFFF" }} />
                      <span className="font-body text-gray-500 text-[0.9rem] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
