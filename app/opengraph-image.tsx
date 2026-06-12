import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Javier Rodríguez Rulas — Bartender & Mixología";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Embed the portrait directly (base64) so the scraper never has to fetch a
  // second URL — the most reliable way to get the image to render on
  // WhatsApp, X, Facebook, etc.
  const photo = await readFile(join(process.cwd(), "public", "javier.jpeg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          color: "#f7f3ec",
          fontFamily: "serif",
          backgroundColor: "#0b0a09",
        }}
      >
        {/* Full-bleed portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 22%",
          }}
        />

        {/* Dark scrim — stronger on the left where the text sits */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(11,10,9,0.94) 0%, rgba(11,10,9,0.78) 38%, rgba(11,10,9,0.25) 70%, rgba(11,10,9,0.05) 100%)",
          }}
        />
        {/* Bottom fade for legibility of the name */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(11,10,9,0.85) 0%, rgba(11,10,9,0) 45%)",
          }}
        />

        {/* Text */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            maxWidth: 760,
            padding: "80px 96px",
          }}
        >
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
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 18,
            }}
          >
            Javier Rodríguez
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, color: "#e8c879" }}>
            Rulas
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#d8cfc4",
              marginTop: 24,
              fontFamily: "sans-serif",
            }}
          >
            Bartender internacional con mención en mixología
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
