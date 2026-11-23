/**
 * Hand-drawn line-art cocktail glass (gold stroke), used as the hero badge.
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
