"use client";

import { useSyncExternalStore } from "react";
import { Martini } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

const noopSubscribe = () => () => {};

export function Footer({ buildYear }: { buildYear: number }) {
  const { t } = useLanguage();
  // The page is prerendered, so the HTML carries the build year. Hydrate with
  // that same value, then show the visitor's current year — no mismatch if
  // the site isn't redeployed after New Year.
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );

  return (
    <footer className="border-t border-gold/10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2 font-display text-base font-semibold text-cream">
          <Martini className="h-4 w-4 text-gold" aria-hidden />
          Javier Rodríguez Rulas
        </div>
        <p className="text-xs text-faint">
          © {year} Javier Rodríguez Rulas. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
