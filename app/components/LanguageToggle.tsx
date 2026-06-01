"use client";

import { useLanguage } from "../i18n/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex items-center rounded-full border border-gold/30 bg-surface/60 p-0.5 text-xs font-semibold tracking-wide backdrop-blur ${className}`}
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === l
              ? "bg-gold text-night"
              : "text-muted hover:text-cream"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
