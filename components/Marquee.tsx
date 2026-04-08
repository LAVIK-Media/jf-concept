const WORDS = [
  "Präzision",
  "Performance",
  "Car Service",
  "Folierungen",
  "Quad Verleih",
  "Off-Road",
] as const;

function Item({ children, outline }: { children: string; outline?: boolean }) {
  return (
    <span
      className={[
        "font-display text-[clamp(28px,4vw,56px)] uppercase tracking-[0.08em] opacity-50",
        outline
          ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]"
          : "text-white/50",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function Marquee() {
  const row = Array.from({ length: 12 }, (_, i) => WORDS[i % WORDS.length]);
  const doubled = row.concat(row);

  return (
    <section aria-label="Marquee">
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((w, idx) => (
            <div key={`${w}-${idx}`} className="marquee-item">
              <Item outline={idx % 2 === 1}>{w}</Item>
              <span className="text-white/15">▶▶</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

