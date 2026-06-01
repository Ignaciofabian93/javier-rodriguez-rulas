"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

export function DownloadCvButton({
  className = "",
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "ghost";
}) {
  const { locale, t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Dynamically import the PDF renderer so it stays out of the main bundle.
      const [{ pdf }, { ResumeDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumeDocument"),
      ]);
      const blob = await pdf(<ResumeDocument locale={locale} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        locale === "es"
          ? "CV-Javier-Rodriguez-Rulas.pdf"
          : "Resume-Javier-Rodriguez-Rulas.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate CV PDF", err);
    } finally {
      setLoading(false);
    }
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
      disabled={loading}
      className={`${base} ${styles} ${className}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Download className="h-4 w-4" aria-hidden />
      )}
      {loading
        ? locale === "es"
          ? "Generando..."
          : "Generating..."
        : t.nav.downloadCv}
    </button>
  );
}
