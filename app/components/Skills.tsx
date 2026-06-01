"use client";

import { Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import {
  MartiniGlass,
  HighballGlass,
  SpritzGlass,
  TumblerGlass,
  MocktailGlass,
} from "./CocktailArt";

// Glassware per drink, matched to the order of `drinks` in content.ts
// (Mojito, Tom Collins, Aperol Spritz, Electric Lemonade, Blue Curaçao,
//  Margarita, Martini, Fruit mocktails).
const GLASSES = [
  HighballGlass,
  HighballGlass,
  SpritzGlass,
  HighballGlass,
  TumblerGlass,
  MartiniGlass,
  MartiniGlass,
  MocktailGlass,
];

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

        {/* Drinks grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.skills.drinks.map((drink, i) => {
            const Glass = GLASSES[i] ?? MocktailGlass;
            return (
              <Reveal
                key={drink.name}
                delay={(i % 4) * 80}
                className="group relative flex flex-col rounded-2xl border border-gold/15 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-(--shadow-glow)"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-night">
                  <Glass className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold text-cream">
                  {drink.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                  {drink.desc}
                </p>
                <span className="mt-4 inline-block w-fit rounded-full border border-gold/25 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold-soft">
                  {drink.tag}
                </span>
              </Reveal>
            );
          })}
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
