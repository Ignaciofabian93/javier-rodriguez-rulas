"use client";

import { Download } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

export function DownloadCvButton({
  className = "",
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "ghost";
}) {
  const { t } = useLanguage();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Javier_Rodriguez_CV.pdf";
    link.download = "Javier_Rodriguez_CV.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-70";
  const styles =
    variant === "solid"
      ? "bg-gold text-night hover:bg-gold-soft hover:shadow-[var(--shadow-glow)]"
      : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10";

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`${base} ${styles} ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden />
      {t.nav.downloadCv}
    </button>
  );
}
