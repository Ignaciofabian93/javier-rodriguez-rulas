import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

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

export const metadata: Metadata = {
  title: "Javier Rodríguez Rulas — Bartender & Mixología",
  description:
    "Bartender internacional con mención en mixología. Portafolio profesional, cócteles de autor y mocktails. International bartender specialized in mixology.",
  keywords: [
    "bartender",
    "mixología",
    "mixology",
    "cocktails",
    "cócteles",
    "Chile",
    "Javier Rodríguez",
  ],
  authors: [{ name: "Javier Eduardo Rodríguez Rulas" }],
  openGraph: {
    title: "Javier Rodríguez Rulas — Bartender & Mixología",
    description:
      "Bartender internacional con mención en mixología. Cócteles de autor y mocktails.",
    type: "website",
  },
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
