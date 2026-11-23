"use client";

import { Download } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

const CV_FILE = "Javier_Rodriguez_Rulas.pdf";

export function DownloadCvButton({
  className = "",
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "ghost";
}) {
  const { t } = useLanguage();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300";
  const styles =
    variant === "solid"
      ? "bg-gold text-night hover:bg-gold-soft hover:shadow-(--shadow-glow)"
      : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10";

  return (
    <a
      href={`/${CV_FILE}`}
      download={CV_FILE}
      className={`${base} ${styles} ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden />
      {t.nav.downloadCv}
    </a>
  );
}
