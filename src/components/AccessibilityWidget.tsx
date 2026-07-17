'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Accessibility, X, ZoomIn, Contrast, Glasses, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// ─── Types ────────────────────────────────────────────────────────────────────
type Prefs = {
  largeText:    boolean;
  highContrast: boolean;
  grayscale:    boolean;
};

const STORAGE_KEY = 'pic-a11y-prefs';

const defaultPrefs: Prefs = {
  largeText:    false,
  highContrast: false,
  grayscale:    false,
};

// ─── Apply prefs to <html> via CSS classes ────────────────────────────────────
function applyPrefs(p: Prefs) {
  const cl = document.documentElement.classList;
  cl.toggle('a11y-large-text',    p.largeText);
  cl.toggle('a11y-high-contrast', p.highContrast);
  cl.toggle('a11y-grayscale',     p.grayscale);
}

// ─── Toggle Row ───────────────────────────────────────────────────────────────
function ToggleRow({
  icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#FF4D9B]"
      style={
        active
          ? { backgroundColor: 'rgba(255,11,112,0.08)', border: '1px solid rgba(255,11,112,0.25)' }
          : { border: '1px solid transparent' }
      }
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = ''; }}
    >
      {/* Icon + Label */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          style={{ color: active ? '#FF4D9B' : '#8C8CA3' }}
          className="transition-colors duration-200"
        >
          {icon}
        </span>
        <span
          className="transition-colors duration-200"
          style={{ color: active ? '#FFFFFF' : '#8C8CA3' }}
        >
          {label}
        </span>
      </div>

      {/* Toggle pill - dir="ltr" so left/right is always LTR regardless of page dir */}
      <div
        dir="ltr"
        aria-hidden="true"
        className="relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-300"
        style={{ backgroundColor: active ? '#FF0B70' : '#5A5A70' }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
          style={{ left: active ? '22px' : '2px' }}
        />
      </div>
    </button>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export default function AccessibilityWidget() {
  const { t } = useLanguage();
  const w = t.accessibility.widget;

  const [open,    setOpen]    = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefs,   setPrefs]   = useState<Prefs>(defaultPrefs);

  const panelRef   = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // ── Hydrate from localStorage ──────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Prefs;
        setPrefs(parsed);
        applyPrefs(parsed);
      }
    } catch {
      // localStorage unavailable - silently skip
    }
  }, []);

  // ── Close on Escape ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // ── Close on outside click ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // ── Toggle individual pref ─────────────────────────────────────────────────
  const toggle = useCallback((key: keyof Prefs) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      applyPrefs(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── Floating trigger ─────────────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? w.closeMenu : w.openMenu}
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="fixed right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF4D9B] bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:bottom-24"
        style={{
          backgroundColor: open ? '#17001A' : '#1A0428',
          border: '2px solid #FF4D9B',
          boxShadow: '0 4px 20px rgba(255,11,112,0.35)',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {open
          ? <X            size={22} strokeWidth={1.5} className="text-white" aria-hidden="true" />
          : <Accessibility size={22} strokeWidth={1.5} className="text-white" aria-hidden="true" />
        }
      </button>

      {/* ── Panel ────────────────────────────────────────────────────────────── */}
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="region"
          aria-label={w.header}
          className="fixed right-6 z-[9999] w-72 rounded-2xl overflow-hidden bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] md:bottom-40"
          style={{
            backgroundColor: '#17001A',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: '#070012' }}>
            <Accessibility size={16} strokeWidth={1.5} className="text-white/80 flex-shrink-0" aria-hidden="true" />
            <span className="font-body text-sm font-medium text-white tracking-wide">
              {w.header}
            </span>
          </div>

          {/* Toggle rows */}
          <div className="p-3 flex flex-col gap-1">
            <ToggleRow
              icon={<ZoomIn   size={17} strokeWidth={1.5} />}
              label={w.largeText}
              active={prefs.largeText}
              onToggle={() => toggle('largeText')}
            />
            <ToggleRow
              icon={<Contrast size={17} strokeWidth={1.5} />}
              label={w.highContrast}
              active={prefs.highContrast}
              onToggle={() => toggle('highContrast')}
            />
            <ToggleRow
              icon={<Glasses  size={17} strokeWidth={1.5} />}
              label={w.grayscale}
              active={prefs.grayscale}
              onToggle={() => toggle('grayscale')}
            />
          </div>

          {/* Accessibility statement link */}
          <div className="px-3 pb-3">
            <a
              href="/accessibility"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-body text-sm transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#8C8CA3' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                (e.currentTarget as HTMLAnchorElement).style.color = '#8C8CA3';
              }}
            >
              <span>{w.statementLink}</span>
              <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
