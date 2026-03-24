import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) for iOS notch/home indicator
};

export const metadata: Metadata = {
  title: "PIC - The Operating System for Events",
  description:
    "PIC connects event producers, service vendors, and party-goers on one platform. Book sound, lighting, catering, security, and more - all in one place. Join the early-access list.",
  keywords: [
    "event production platform",
    "event management software",
    "event vendors marketplace",
    "party planning app",
    "event suppliers",
    "sound lighting catering events",
    "PIC platform",
  ],
  openGraph: {
    title: "PIC - The Operating System for Events",
    description:
      "One platform connecting event producers, service vendors, and party-goers. Book every supplier you need - sound, lighting, catering, security, and more.",
    type: "website",
    siteName: "PIC Platform",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PIC - The Operating System for Events",
    description:
      "One platform connecting event producers, service vendors, and party-goers. Join the early-access list.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico",        rel: "shortcut icon" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
