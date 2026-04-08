import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-black" aria-label="Footer">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10">
        <div className="hud-line" />

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <div className="w-[150px]">
              <Logo variant="secondaryNegative" />
            </div>
            <p className="label mt-5 text-white/50">
              Car Service · Quad Verleih · Folierungen
            </p>
          </div>

          <div className="grid gap-3">
            <a className="label text-white/70 hover:text-white" href="#">
              Impressum
            </a>
            <a className="label text-white/70 hover:text-white" href="#">
              Datenschutz
            </a>
            <a className="label text-white/70 hover:text-white" href="#">
              AGB
            </a>
          </div>

          <div className="flex items-start gap-3 md:justify-end">
            <Social label="Instagram" />
            <Social label="Facebook" />
            <Social label="TikTok" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="label text-white/45">© 2026 JF Concept</p>
          <p className="label text-white/35">
            Demo Website — Design nach Brandbook
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-white/70 transition hover:border-[var(--accent)] hover:text-white"
      aria-label={label}
    >
      <span className="label !text-[9px] !tracking-[0.18em]">{label.slice(0, 2)}</span>
    </a>
  );
}

