import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "../components/Navigation";

const ppTelegraf = localFont({
  variable: "--font-display",
  src: [
    { path: "../public/fonts/PPTelegraf-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/PPTelegraf-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const ppSupplyMono = localFont({
  variable: "--font-mono",
  src: [{ path: "../public/fonts/PPSupplyMono-Medium.otf", weight: "500", style: "normal" }],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JF Concept — Car Service · Quad Verleih · Folierungen | Tirol",
  description:
    "JF Concept aus Tirol: Car Service, Quad Verleih und Folierungen — präzise Handarbeit, Performance und Leidenschaft.",
  openGraph: {
    title: "JF Concept — Car Service · Quad Verleih · Folierungen | Tirol",
    description:
      "Car Service, Quad Verleih und Folierungen in Tirol — Präzision in jedem Detail.",
    type: "website",
    locale: "de_AT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${ppTelegraf.variable} ${ppSupplyMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="diagonal-overlay" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
