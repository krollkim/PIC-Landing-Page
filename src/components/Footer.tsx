"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer
      className="w-full px-6 py-10"
      style={{ backgroundColor: "#070012", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Copyright + studio credit */}
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <p
            className="font-body text-[0.78rem]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {f.copyright}
          </p>
          <p className="font-body text-[0.72rem]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {f.craftedBy}{" "}
            <a
              href="https://smileysolution.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FF4D9B")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
            >
              Smiley Solution
            </a>
          </p>
        </div>

        {/* PIC logo - brand mark, intentionally not translated. Links to the live platform. */}
        <a
          href="https://pic-events.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PIC Events"
          className="rounded-full select-none opacity-80 hover:opacity-100 transition-opacity duration-200 inline-block"
          style={{
            padding: "0.7px",
            background: "linear-gradient(to top right, #BD4DFF 0%, #F03DB8 50%, #FF33C4 100%)",
            boxShadow: "0 0 8px rgba(240,61,184,0.28)",
            lineHeight: 0,
          }}
        >
          <Image
            src="/images/new-logo.png"
            alt={f.logoAlt}
            width={100}
            height={100}
            className="h-9 w-9 rounded-full block"
            draggable={false}
          />
        </a>

      </div>
    </footer>
  );
}
