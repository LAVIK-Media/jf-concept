export function PrecisionBanner() {
  return (
    <section aria-label="Precision Banner" className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--hairline)_0px,var(--hairline)_1px,transparent_1px,transparent_18px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_110%,var(--glow-red),transparent_60%)]" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20">
        <p className="label">Precision</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(44px,6vw,82px)] leading-[0.92] uppercase tracking-[0.02em] text-white">
            Jetzt den Unterschied spüren
          </h2>
          <div className="text-right">
            <p className="label text-white/70">▶▶ 500 PS</p>
            <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)]">
              Haarlinien · 0.25–0.5 pt Stärke · Präzision in jedem Detail
            </p>
          </div>
        </div>

        <div className="mt-10 hud-line" />
      </div>
    </section>
  );
}

