"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function TimelineCard({
  icon,
  role,
  place,
  period,
  desc,
}: {
  icon: React.ReactNode;
  role: string;
  place: string;
  period: string;
  desc: string;
}) {
  return (
    <div className="relative pl-12">
      {/* node */}
      <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-surface text-gold">
        {icon}
      </span>
      <div className="rounded-2xl border border-gold/15 bg-surface p-6 transition-colors hover:border-gold/35">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-xl font-semibold text-cream">
            {role}
          </h3>
          <span className="text-xs font-medium uppercase tracking-wide text-gold-soft">
            {period}
          </span>
        </div>
        <p className="mt-0.5 text-sm font-medium text-gold">{place}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
      </div>
    </div>
  );
}

export function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-gold/10 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker={t.experience.kicker}
          title={t.experience.title}
        />

        <div className="relative">
          {/* vertical line */}
          <span
            aria-hidden
            className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent"
          />
          <div className="space-y-8">
            {t.experience.items.map((item) => (
              <Reveal key={item.role + item.place}>
                <TimelineCard
                  icon={<Briefcase className="h-4 w-4" aria-hidden />}
                  role={item.role}
                  place={item.place}
                  period={item.period}
                  desc={item.desc}
                />
              </Reveal>
            ))}

            <Reveal delay={100}>
              <TimelineCard
                icon={<GraduationCap className="h-4 w-4" aria-hidden />}
                role={t.experience.education.degree}
                place={t.experience.education.place}
                period={t.experience.education.period}
                desc={t.experience.education.desc}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
