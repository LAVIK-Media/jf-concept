import { BookingWidget } from "./BookingWidget";

export function CTA() {
  return (
    <section id="kontakt" className="bg-black" aria-label="Kontakt">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 hud-line" />
        <div className="grid gap-10 rounded-2xl border border-white/10 bg-[color:var(--surface-1)] p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="label">Kontakt</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
              Bereit für den Unterschied?
            </h2>
            <p className="mt-5 text-[14px] leading-6 text-[var(--text-muted)]">
              Sag uns kurz, was du vorhast — wir melden uns mit einem klaren Plan
              und nächsten Schritten.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a className="btn-primary w-full sm:w-auto" href="mailto:info@jf-concept.at">
                Jetzt starten <span aria-hidden="true">▶▶</span>
              </a>
              <p className="label text-white/55">Antwort in 24–48h (Demo-Text)</p>
            </div>
          </div>

          <div className="grid gap-4">
            <ContactCard label="Telefon" value="+43 000 000000" />
            <ContactCard label="E-Mail" value="info@jf-concept.at" />
            <ContactCard label="Adresse" value="Tirol, Österreich (Platzhalter)" />
            <ContactCard label="Öffnungszeiten" value="Mo–Fr · 08:00–18:00" />
          </div>
        </div>

        <div className="mt-10">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="label">{label}</p>
      <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-white/90">{value}</p>
    </div>
  );
}

