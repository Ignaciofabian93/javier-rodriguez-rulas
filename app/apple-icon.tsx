import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Brand martini glass (gold stroke) on the dark "night" background, matching
// app/icon.svg. Rendered as a PNG for iOS / Android home-screen icons.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1814, #0b0a09)",
        }}
      >
        <svg
          width="108"
          height="108"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#e8c879"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M16 20 L32 36 L48 20 Z" />
            <path d="M16 20 H48" />
            <path d="M32 36 V48" />
            <path d="M24 48 H40" />
          </g>
          <circle cx="38" cy="26" r="2.8" fill="#e8c879" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
