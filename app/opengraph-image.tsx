import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Javier Rodríguez Rulas — Bartender & Mixología";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Martini glass as an inline SVG data URI (gold stroke).
const martini = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 280" fill="none" stroke="#d4af37" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 60 L110 130 L180 60 Z"/>
    <path d="M40 60 H180"/>
    <path d="M110 130 V232"/>
    <path d="M70 236 H150"/>
    <circle cx="150" cy="78" r="9" fill="#e8c879" stroke="none"/>
    <path d="M150 69 C158 54 172 52 180 44" stroke="#e8c879"/>
  </svg>`,
)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "radial-gradient(900px 600px at 80% -10%, #1f1a14, #0b0a09 60%)",
          color: "#f7f3ec",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d4af37",
              fontFamily: "sans-serif",
            }}
          >
            Bartender · Mixología
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 24,
            }}
          >
            Javier Rodríguez
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, color: "#e8c879" }}>
            Rulas
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#b8ada0",
              marginTop: 28,
              fontFamily: "sans-serif",
            }}
          >
            Bartender internacional con mención en mixología
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            height: 420,
            borderRadius: 40,
            border: "2px solid rgba(212,175,55,0.35)",
            background: "linear-gradient(180deg, #261f1a, #0b0a09)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={martini} width={220} height={280} alt="" />
        </div>
      </div>
    ),
    { ...size },
  );
}
