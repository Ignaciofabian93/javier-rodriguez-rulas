"use client";

import { ArrowDown, Mail, Martini } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text */}
        <div className="reveal is-visible">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-surface/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
            <Martini className="h-3.5 w-3.5" aria-hidden />
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            {t.hero.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-gold sm:text-2xl">
            {t.hero.role}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.tagline}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-soft hover:shadow-[var(--shadow-glow)]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t.hero.ctaContact}
            </a>
            <a
              href="#skills"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              {t.hero.ctaDrinks}
            </a>
          </div>
        </div>

        {/* Portrait placeholder */}
        <div className="reveal is-visible flex justify-center lg:justify-end">
          <div className="group relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/30 via-transparent to-gold-deep/20 blur-xl"
            />
            <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-b from-surface-2 to-night shadow-2xl sm:w-72">
              {/*
                PLACEHOLDER PORTRAIT.
                To use a real photo: drop the file at public/javier.jpg and
                replace this block with:
                  <Image src="/javier.jpg" alt="Javier Rodríguez" fill
                    className="object-cover" priority />
                (import Image from "next/image")
              */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                <span className="font-display text-7xl font-bold text-gold/80">
                  JR
                </span>
                <span className="px-6 text-xs uppercase tracking-[0.2em] text-faint">
                  Foto / Photo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-faint transition-colors hover:text-gold sm:flex"
      >
        {t.hero.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
