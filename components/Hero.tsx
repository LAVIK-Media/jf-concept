"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { ServiceIcons } from "./ServiceIcons";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-black"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_85%,var(--glow-red),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_50%_10%,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-10 pt-24 sm:pb-12 sm:pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-3xl"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="w-[min(640px,100%)]"
          >
            <Logo variant="primaryNegative" priority />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-6"
          >
            <p className="label">Car Service · Quad Verleih · Folierungen</p>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-3 font-display text-[clamp(40px,5.4vw,72px)] leading-[0.92] uppercase tracking-[0.02em] text-white"
          >
            Jetzt den Unterschied spüren
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-4 max-w-2xl text-[13px] leading-6 text-[var(--text-muted)]"
          >
            Präzise Handarbeit, technische Prozesse und kompromisslose Qualität — vom
            Service über Folierung bis zum Off-Road-Erlebnis.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"
          >
            <a href="#kontakt" className="btn-primary w-full sm:w-auto">
              Jetzt starten <span aria-hidden="true">▶▶</span>
            </a>
            <div
              className="flex cursor-default select-none items-center gap-4 border-t border-white/10 pt-4 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0"
              role="group"
              aria-label="Markenzeichen und Standort Tirol"
            >
              <ServiceIcons />
              <span className="label whitespace-nowrap text-white/45">TIROL</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 opacity-70">
          <span className="label">Scroll</span>
          <span className="h-8 w-px bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </section>
  );
}

