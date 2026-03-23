"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-10"
      style={{ backgroundColor: "#031760", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Left: copyright + studio credit */}
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <p
            className="font-body text-[0.78rem]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            PIC · Parties &amp; Events Platform · Copyright 2026 ©
          </p>
          <p className="font-body text-[0.72rem]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Crafted with ❤️ by{" "}
            <a
              href="https://smileysolution.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0EA5E9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
            >
              Smiley Solution
            </a>
          </p>
        </div>

        {/* Right: PIC logo */}
        <Image
          src="/images/pic-logo.jpeg"
          alt="PIC Platform logo"
          width={80}
          height={36}
          className="h-9 w-auto select-none opacity-80 hover:opacity-100 transition-opacity duration-200"
          style={{ borderRadius: "6px" }}
          draggable={false}
        />

      </div>
    </footer>
  );
}
