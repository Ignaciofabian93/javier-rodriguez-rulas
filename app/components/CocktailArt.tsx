/**
 * Hand-drawn line-art cocktail glasses (gold stroke).
 * Used to give each drink card its own glassware instead of a repeated icon.
 */
type GlassProps = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children, className }: GlassProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
      {children}
    </svg>
  );
}

/** Martini / coupe — Martini, Margarita */
export function MartiniGlass({ className }: GlassProps) {
  return (
    <Frame className={className}>
      <path d="M10 13 L24 27 L38 13 Z" />
      <path d="M10 13 H38" />
      <path d="M24 27 V40" />
      <path d="M16 40 H32" />
      <circle cx="30" cy="18.5" r="1.6" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Highball / Collins — Tom Collins, Electric Lemonade, Mojito */
export function HighballGlass({ className }: GlassProps) {
  return (
    <Frame className={className}>
      <path d="M18 8 H30 L28.5 40 H19.5 Z" />
      <path d="M18.6 16 H29.4" />
      <path d="M27 5 V12" />
      <path d="M24 4 V11" />
    </Frame>
  );
}

/** Spritz / wine — Aperol Spritz */
export function SpritzGlass({ className }: GlassProps) {
  return (
    <Frame className={className}>
      <path d="M14 10 C14 20 18 26 24 26 C30 26 34 20 34 10 Z" />
      <path d="M24 26 V40" />
      <path d="M17 40 H31" />
      <path d="M14.5 13 H33.5" />
    </Frame>
  );
}

/** Curaçao / tumbler — Blue Curaçao */
export function TumblerGlass({ className }: GlassProps) {
  return (
    <Frame className={className}>
      <path d="M15 12 H33 L31.5 38 H16.5 Z" />
      <path d="M16 22 H32" />
      <circle cx="20" cy="30" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="26" cy="33" r="1.4" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Mocktail — fruit + straw */
export function MocktailGlass({ className }: GlassProps) {
  return (
    <Frame className={className}>
      <path d="M14 14 H34 L30 40 H18 Z" />
      <path d="M28 9 L31 40" />
      <path d="M19 14 C20 9 28 9 29 14" />
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Decorative hero centerpiece — coupe with rising bubbles & shine */
export function HeroCocktail({ className }: GlassProps) {
  return (
    <svg
      viewBox="0 0 220 280"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* bowl */}
      <path d="M50 70 C50 120 78 150 110 150 C142 150 170 120 170 70 Z" />
      <path d="M50 70 H170" />
      {/* liquid line */}
      <path d="M62 82 C70 96 92 106 110 106 C128 106 150 96 158 82" opacity="0.7" />
      {/* stem + base */}
      <path d="M110 150 V228" />
      <path d="M78 232 C78 224 142 224 142 232" />
      <path d="M70 236 H150" />
      {/* garnish: cherry on rim */}
      <circle cx="150" cy="74" r="7" fill="currentColor" stroke="none" />
      <path d="M150 67 C156 56 168 54 174 46" />
      {/* bubbles */}
      <circle cx="100" cy="60" r="3" opacity="0.8" />
      <circle cx="118" cy="44" r="2.4" opacity="0.6" />
      <circle cx="92" cy="36" r="2" opacity="0.5" />
      <circle cx="126" cy="66" r="2.2" opacity="0.7" />
    </svg>
  );
}
