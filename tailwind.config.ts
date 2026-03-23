/**
 * Tailwind CSS v4 — Design Tokens
 *
 * In Tailwind v4, custom tokens are declared in CSS via @theme (see globals.css).
 * This file documents the token architecture for the Lead Architect's reference.
 *
 * Active tokens (registered in src/app/globals.css @theme):
 *   --color-navy:        #031760   → bg-navy, text-navy, border-navy
 *   --color-navy-hover:  #052080   → bg-navy-hover
 *   --color-navy-active: #021245   → bg-navy-active
 *   --color-slate-bg:    #F9FAFB   → bg-slate-bg
 *   --font-display:      Barlow Condensed, sans-serif
 *   --font-body:         Inter, sans-serif
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:        "#031760",
        "navy-hover":  "#052080",
        "navy-active": "#021245",
        "slate-bg":    "#F9FAFB",
      },
    },
  },
};

export default config;
