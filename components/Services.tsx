import { ServiceIcons } from "./ServiceIcons";

const SERVICES = [
  {
    title: "Car Service",
    desc: "Professionelle KFZ-Wartung, Diagnose und Reparatur — sauber dokumentiert, präzise ausgeführt.",
    href: "#kontakt",
  },
  {
    title: "Quad Verleih",
    desc: "Off-Road-Erlebnisse in Tirol. Robuste Maschinen, klare Einweisung, maximaler Fahrspaß.",
    href: "#kontakt",
  },
  {
    title: "Folierungen",
    desc: "Individuelle Fahrzeugfolierung auf höchstem Niveau — Passgenauigkeit, Kanten, Finish.",
    href: "#kontakt",
  },
] as const;

export function Services() {
  return (
    <section id="leistungen" className="bg-black" aria-label="Leistungen">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-10">
          <div>
            <p className="label">Leistungen</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
              Drei Bereiche. Ein Anspruch.
            </h2>
          </div>
          <div className="hidden md:block">
            <ServiceIcons />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--surface-1)] p-7 transition hover:bg-[color:var(--surface-2)]"
            >
              <div className="flex items-center justify-between">
                <span className="label text-white/60">Service</span>
                <span className="label text-white/60">▶▶</span>
              </div>
              <h3 className="mt-5 font-display text-3xl uppercase tracking-[0.03em] text-white">
                {s.title}
              </h3>
              <p className="mt-4 text-[14px] leading-6 text-[var(--text-muted)]">
                {s.desc}
              </p>
              <p className="mt-8 label text-white/75">Mehr erfahren</p>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

