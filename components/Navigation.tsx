"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#galerie", label: "Galerie" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "w-full transition",
          scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/10" : "bg-transparent",
        ].join(" ")}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
          aria-label="Hauptnavigation"
        >
          <Link href="#top" className="flex items-center gap-3">
            <div className="w-[132px]">
              <Logo variant="secondaryNegative" priority />
            </div>
          </Link>

          <div className="hidden min-w-0 items-center gap-8 md:flex">
            <div className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group label text-white/80 hover:text-white transition relative"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
                  </span>
                </a>
              ))}
            </div>
            <a href="#kontakt" className="btn-primary">
              Jetzt anfragen
            </a>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="label text-white/90 tracking-[0.22em]">
              {open ? "Close" : "Menu"}
            </span>
          </button>
        </nav>
      </div>

      {open ? (
        <div className="md:hidden fixed inset-0 z-50 bg-black">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-5 py-5">
            <div className="flex items-center justify-between">
              <Link
                href="#top"
                className="flex items-center gap-3"
                onClick={() => setOpen(false)}
              >
                <div className="w-[132px]">
                  <Logo variant="secondaryNegative" />
                </div>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
              >
                <span className="label text-white/90 tracking-[0.22em]">Close</span>
              </button>
            </div>

            <div className="mt-10 hud-line" />

            <div className="mt-10 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-display text-4xl uppercase tracking-[0.04em] text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <a
                href="#kontakt"
                className="btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Jetzt starten
              </a>
              <p className="label mt-6 text-white/50">
                Car Service · Quad Verleih · Folierungen
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

