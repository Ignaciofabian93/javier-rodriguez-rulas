import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  title,
  align = "left",
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`mb-12 ${align === "center" ? "text-center" : "max-w-2xl"}`}
    >
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold/50" aria-hidden />
        {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
