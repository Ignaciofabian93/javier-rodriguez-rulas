"use client";

import Image from "next/image";
import { Mail, Martini } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { MartiniGlass } from "./CocktailArt";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-soft hover:shadow-(--shadow-glow)"
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

        {/* Portrait */}
        <div className="reveal is-visible flex justify-center lg:justify-end">
          <div className="group relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-4xl bg-linear-to-br from-gold/30 via-transparent to-gold-deep/20 blur-xl"
            />
            <div className="relative aspect-3/4 w-84 overflow-hidden rounded-4xl border border-gold/30 bg-linear-to-b from-surface-2 to-night shadow-2xl md:w-70 lg:w-120">
              <Image
                src="/javier.jpeg"
                alt="Javier Rodríguez Rulas"
                fill
                priority
                sizes="(min-width: 640px) 18rem, 16rem"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Blend the bottom into the dark frame */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-night/80 via-night/20 to-transparent"
              />
            </div>

            {/* Floating cocktail badge */}
            <div
              aria-hidden
              className="absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-night/90 text-gold shadow-lg backdrop-blur sm:-left-5"
            >
              <MartiniGlass className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {/* <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-faint transition-colors hover:text-gold sm:flex"
      >
        {t.hero.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
      </a> */}
    </section>
  );
}
