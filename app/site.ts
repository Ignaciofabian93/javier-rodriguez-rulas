/**
 * Shared site-wide constants used by metadata, robots, sitemap, manifest
 * and JSON-LD structured data.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment to the final
 * production domain so canonical URLs, sitemap entries and social-share
 * images resolve to absolute URLs.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.javierrodriguezrulas.cl"
).replace(/\/$/, "");

export const SITE_NAME = "Javier Rodríguez Rulas";

export const PERSON = {
  name: "Javier Eduardo Rodríguez Rulas",
  jobTitle: "Bartender — Mixología",
  city: "Santiago",
  region: "Región Metropolitana",
  country: "CL",
} as const;
