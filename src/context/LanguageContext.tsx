"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DIR_MAP,
  translations,
  type Dir,
  type Language,
  type TranslationSet,
} from "@/lib/translations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  /** Active language code. */
  lang: Language;
  /** HTML dir value for the active language. */
  dir: Dir;
  /** Full translation set for the active language. */
  t: TranslationSet;
  /** Flip between "he" and "en". */
  toggle: () => void;
  /** Explicitly set a language. */
  setLang: (lang: Language) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "pic-lang";
const DEFAULT_LANG: Language = "he";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANG);

  // ── Hydrate from localStorage on first mount ────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "he") {
      setLangState(stored);
    }
  }, []);

  // ── Sync document attributes, persist, and refresh ScrollTrigger ──────────
  useEffect(() => {
    const dir = DIR_MAP[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, lang);

    /**
     * After a direction flip the browser needs one reflow cycle to recalculate
     * element positions (margins, padding, flex order all change).
     * requestAnimationFrame fires after paint - by then the layout is stable
     * and ScrollTrigger.refresh() can safely recalculate pin/scrub offsets.
     *
     * Dynamic import keeps this context free of a hard GSAP dependency;
     * if ScrollTrigger hasn't been registered yet (e.g. on the first render
     * before any component mounts it), the import simply resolves to an
     * object whose refresh() is a no-op.
     */
    const rafId = requestAnimationFrame(() => {
      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => { ScrollTrigger.refresh(); })
        .catch(() => { /* ScrollTrigger not yet registered - safe to ignore */ });
    });

    return () => cancelAnimationFrame(rafId);
  }, [lang]);

  const setLang = (next: Language) => setLangState(next);
  const toggle = () => setLangState((prev) => (prev === "he" ? "en" : "he"));

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir: DIR_MAP[lang],
        t: translations[lang],
        toggle,
        setLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return ctx;
}
