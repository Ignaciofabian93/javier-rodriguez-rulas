"use client";

import { useLanguage } from "../i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { DownloadCvButton } from "./DownloadCvButton";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-gold/10 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t.about.kicker} title={t.about.title} />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="pt-2">
              <DownloadCvButton variant="ghost" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/15 bg-gold/10">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="bg-surface p-5 sm:p-6">
                  <dt className="text-xs uppercase tracking-[0.15em] text-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold text-gold-soft">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
