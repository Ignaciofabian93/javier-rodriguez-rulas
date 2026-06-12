import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { SITE_NAME, SITE_URL, PERSON } from "./site";
import { CONTACT } from "./i18n/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "Javier Rodríguez Rulas — Bartender & Mixología";
// Spanish is the canonical language (html lang="es"); the English line keeps
// the page discoverable for English-speaking searches on the same URL.
const description =
  "Bartender internacional con mención en mixología. Portafolio profesional con cócteles de autor, clásicos y mocktails de fruta fresca. International bartender specialized in mixology — signature cocktails, classics and fresh-fruit mocktails.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s — Javier Rodríguez Rulas",
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "bartender",
    "bartender internacional",
    "mixología",
    "mixology",
    "mixólogo",
    "cocktails",
    "cócteles",
    "cócteles de autor",
    "mocktails",
    "coctelería",
    "Chile",
    "Santiago",
    "Javier Rodríguez",
    "Javier Rodríguez Rulas",
  ],
  authors: [{ name: PERSON.name }],
  creator: PERSON.name,
  publisher: PERSON.name,
  category: "Hospitality",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_CL",
    alternateLocale: ["en_US"],
    type: "profile",
    firstName: "Javier",
    lastName: "Rodríguez Rulas",
    // og:image / twitter:image are generated automatically from
    // app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// JSON-LD structured data (schema.org Person) for rich results.
const sameAs = [CONTACT.instagram, CONTACT.linkedin].filter(
  // Skip bare placeholder roots like "https://instagram.com/" — only emit
  // real profile URLs that carry a path segment.
  (url) => {
    try {
      return new URL(url).pathname.replace(/\/$/, "").length > 0;
    } catch {
      return false;
    }
  },
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  alternateName: "Javier Rodríguez Rulas",
  jobTitle: PERSON.jobTitle,
  description,
  url: SITE_URL,
  image: `${SITE_URL}/javier.jpeg`,
  knowsLanguage: ["es", "en"],
  address: {
    "@type": "PostalAddress",
    addressLocality: PERSON.city,
    addressRegion: PERSON.region,
    addressCountry: PERSON.country,
  },
  ...(sameAs.length ? { sameAs } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night text-cream">
        <script
          type="application/ld+json"
          // Escape "<" so a future content edit can never break out of the
          // <script> tag (e.g. a stray "</script>"). All data here is static,
          // but this keeps it safe as content.ts evolves.

          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
