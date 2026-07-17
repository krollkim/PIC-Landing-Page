/**
 * Tailwind CSS v4 - Design Tokens
 *
 * In Tailwind v4, custom tokens are declared in CSS via @theme (see globals.css).
 * This file documents the token architecture for the Lead Architect's reference.
 *
 * Active tokens (registered in src/app/globals.css @theme) — pic-events dark palette:
 *   --color-primary-300..800: #52117E #3E0D5F #2A0842 #1A0428 #17001A #070012
 *   --color-accent-400..800:  #FF4D9B #FF0B70 #D9005C #A60047 #730033
 *   --color-bg-page:    #0A0A12   → page background
 *   --color-text-soft:  #FAF7FF
 *   --color-text-muted: #8C8CA3
 *   --color-text-dim:   #5A5A70
 *   --font-display:     Barlow Condensed, sans-serif
 *   --font-body:        Inter, sans-serif
 *
 * Primary CTA gradient lives in globals.css as .btn-gradient-pink
 * (linear-gradient #FF0B70 → #730033, per the brand "Dark mode main button").
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-300": "#52117E",
        "primary-400": "#3E0D5F",
        "primary-500": "#2A0842",
        "primary-600": "#1A0428",
        "primary-700": "#17001A",
        "primary-800": "#070012",
        "accent-400":  "#FF4D9B",
        "accent-500":  "#FF0B70",
        "accent-600":  "#D9005C",
        "accent-700":  "#A60047",
        "accent-800":  "#730033",
        "bg-page":     "#0A0A12",
        "text-soft":   "#FAF7FF",
        "text-muted":  "#8C8CA3",
        "text-dim":    "#5A5A70",
      },
    },
  },
};

export default config;
