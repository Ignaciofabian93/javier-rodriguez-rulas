"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-gold/10 bg-charcoal/40 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t.skills.kicker} title={t.skills.title} />

        <Reveal className="mb-12 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {t.skills.intro}
        </Reveal>

        {/* Drinks gallery */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.drinks.map((drink, i) => (
            <Reveal
              key={drink.name}
              delay={(i % 3) * 90}
              className="group relative aspect-4/5 overflow-hidden rounded-2xl border border-gold/15 bg-surface shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-(--shadow-glow)"
            >
              <Image
                src={drink.image}
                alt={drink.name}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />

              {/* Legibility gradient */}
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-night via-night/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* Gold sheen on hover */}
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-tr from-transparent via-transparent to-gold/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Tag chip */}
              <span className="absolute left-4 top-4 inline-block rounded-full border border-gold/30 bg-night/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold-soft backdrop-blur">
                {drink.tag}
              </span>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl font-semibold text-cream drop-shadow-sm">
                  {drink.name}
                </h3>
                <p className="mt-1 max-h-24 overflow-hidden text-sm leading-relaxed text-muted opacity-100 transition-all duration-500 ease-out lg:max-h-0 lg:translate-y-1 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  {drink.desc}
                </p>
                <span
                  aria-hidden
                  className="mt-3 block h-px w-10 origin-left scale-x-100 bg-gold/60 transition-transform duration-500 group-hover:w-16"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mocktails highlight + core skills */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="rounded-2xl border border-gold/20 bg-linear-to-br from-surface-2 to-surface p-8">
            <h3 className="font-display text-2xl font-semibold text-gold-soft">
              {t.skills.mocktailTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {t.skills.mocktailDesc}
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-2xl border border-gold/15 bg-surface p-8"
          >
            <h3 className="mb-5 font-display text-2xl font-semibold text-cream">
              {t.skills.coreTitle}
            </h3>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {t.skills.core.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    aria-hidden
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
