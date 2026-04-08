export function About() {
  return (
    <section id="ueber-uns" className="bg-black" aria-label="Über uns">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="label">Über uns</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
              Technik. Handwerk. Tirol.
            </h2>
            <p className="mt-6 text-[14px] leading-6 text-[var(--text-muted)]">
              JF Concept steht für präzise Abläufe, saubere Details und ein Setup,
              das im Alltag funktioniert. Ob Service, Folierung oder Quad-Verleih:
              der Anspruch bleibt gleich — Qualität, die man sieht und spürt.
            </p>
          </div>

          <div className="grid gap-4">
            <Stat value="TIROL" label="Standort" />
            <Stat value="PRÄZISION" label="Detailfokus" />
            <Stat value="03" label="Bereiche" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[color:var(--surface-1)] p-6">
      <p className="font-display text-5xl uppercase tracking-[0.02em] text-white">
        {value}
      </p>
      <p className="mt-3 label">{label}</p>
      <div className="mt-6 h-[2px] w-16 bg-[var(--accent)]/80" />
    </div>
  );
}

