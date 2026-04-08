"use client";

import { useMemo, useState } from "react";

const STEPS = [
  { id: 1, label: "Leistung" },
  { id: 2, label: "Termin" },
  { id: 3, label: "Kontakt" },
  { id: 4, label: "Bestätigung" },
] as const;

const SERVICES = [
  { id: "car_service", label: "Car Service", meta: "Wartung · Reparatur · Diagnose" },
  { id: "folierungen", label: "Folierungen", meta: "Vollfolierung · Teilfolierung · PPF" },
  { id: "quads", label: "Quad Verleih", meta: "Off-Road · Tirol" },
  { id: "other", label: "Sonstiges", meta: "Individuelle Anfrage" },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

export function BookingWidget() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceId | "">("");
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const serviceLabel = useMemo(() => {
    const s = SERVICES.find((x) => x.id === service);
    return s?.label ?? "—";
  }, [service]);

  const availableTimes = useMemo(() => {
    // Demo availability (Calendly-style list)
    return ["09:00", "09:30", "10:00", "10:30", "11:30", "12:00", "12:30", "13:00"] as const;
  }, []);

  const monthDate = useMemo(() => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + monthOffset);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [monthOffset]);

  const monthLabel = useMemo(() => {
    return monthDate.toLocaleDateString("de-AT", { month: "long", year: "numeric" });
  }, [monthDate]);

  const calendarDays = useMemo(() => {
    // Monday-start calendar grid
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const daysInMonth = last.getDate();

    const mondayIndex = (first.getDay() + 6) % 7; // 0..6 (Mon..Sun)
    const cells: Array<{ iso: string; day: number; inMonth: boolean; disabled: boolean }> = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setDate(max.getDate() + 30); // demo: next 30 days bookable

    // prev month fillers
    for (let i = 0; i < mondayIndex; i++) {
      const d = new Date(year, month, 1 - (mondayIndex - i));
      const iso = d.toISOString().slice(0, 10);
      cells.push({ iso, day: d.getDate(), inMonth: false, disabled: true });
    }

    // month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      d.setHours(0, 0, 0, 0);
      const iso = d.toISOString().slice(0, 10);
      const disabled = d < today || d > max;
      cells.push({ iso, day, inMonth: true, disabled });
    }

    // next month fillers to complete weeks (up to 42 cells)
    while (cells.length % 7 !== 0) {
      const idx = cells.length - (mondayIndex + daysInMonth) + 1;
      const d = new Date(year, month + 1, idx);
      const iso = d.toISOString().slice(0, 10);
      cells.push({ iso, day: d.getDate(), inMonth: false, disabled: true });
    }

    return cells;
  }, [monthDate]);

  const canNext1 = service !== "";
  const canNext2 = selectedDate.trim() !== "" && selectedTime.trim() !== "";
  const canNext3 =
    name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";

  function next() {
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function reset() {
    setStep(1);
    setService("");
    setMonthOffset(0);
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label text-[var(--accent)]">Demo · Buchung</p>
          <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.03em] text-white sm:text-3xl">
            Termin anfragen
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-[var(--text-muted)]">
            Nur UI für die Demo — keine Daten werden gesendet.
          </p>
        </div>
        <p className="label text-white/45">Schritt {step} / 4</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {STEPS.map((s) => {
          const active = s.id === step;
          const done = s.id < step;
          return (
            <div
              key={s.id}
              className={[
                "flex items-center gap-2 rounded-full border px-3 py-1.5",
                "label !text-[9px]",
                active
                  ? "border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_15%,transparent)] text-white"
                  : done
                    ? "border-white/20 bg-white/5 text-white/70"
                    : "border-white/10 bg-transparent text-white/40",
              ].join(" ")}
            >
              <span className="font-mono text-[10px] text-white/50">
                {String(s.id).padStart(2, "0")}
              </span>
              {s.label}
            </div>
          );
        })}
      </div>

      <div className="mt-8 min-h-[280px]">
        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const selected = service === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setService(s.id);
                    setStep(2);
                  }}
                  className={[
                    "rounded-xl border p-4 text-left transition",
                    selected
                      ? "border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_12%,transparent)]"
                      : "border-white/10 bg-white/5 hover:border-white/20",
                  ].join(" ")}
                >
                  <p className="font-display text-lg uppercase tracking-[0.03em] text-white">
                    {s.label}
                  </p>
                  <p className="mt-1 text-[12px] text-white/50">{s.meta}</p>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <p className="label text-white/70">Datum auswählen</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMonthOffset((v) => v - 1)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-black/40 text-white/70 hover:text-white"
                    aria-label="Vorheriger Monat"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setMonthOffset((v) => v + 1)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-black/40 text-white/70 hover:text-white"
                    aria-label="Nächster Monat"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <p className="font-display text-2xl uppercase tracking-[0.03em] text-white">
                  {monthLabel}
                </p>
                <p className="label text-white/40">Zeitzone: Europe/Vienna</p>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-2">
                {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                  <div key={d} className="label text-center !text-[9px] text-white/40">
                    {d}
                  </div>
                ))}
                {calendarDays.map((d) => {
                  const selected = selectedDate === d.iso;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      disabled={d.disabled}
                      onClick={() => {
                        setSelectedDate(d.iso);
                        setSelectedTime("");
                      }}
                      className={[
                        "h-10 rounded-lg border text-center text-[12px] tracking-[0.08em] transition",
                        d.inMonth ? "" : "opacity-40",
                        d.disabled
                          ? "border-white/5 bg-black/20 text-white/20"
                          : selected
                            ? "border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_14%,transparent)] text-white"
                            : "border-white/10 bg-black/30 text-white/70 hover:border-white/20 hover:text-white",
                      ].join(" ")}
                      aria-label={`Tag ${d.day}`}
                    >
                      {d.day}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-[12px] leading-5 text-white/40">
                Demo: auswählbar sind die nächsten 30 Tage.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="label text-white/70">Uhrzeiten</p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.08em] text-white/80">
                {selectedDate
                  ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("de-AT", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                    })
                  : "Bitte Datum wählen"}
              </p>

              <div className="mt-4 grid gap-2">
                {availableTimes.map((t) => {
                  const disabled = !selectedDate;
                  const selected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSelectedTime(t)}
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-left label !text-[10px] transition",
                        disabled
                          ? "border-white/5 bg-black/20 text-white/25"
                          : selected
                            ? "border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_14%,transparent)] text-white"
                            : "border-white/15 bg-black/40 text-white/70 hover:border-white/25 hover:text-white",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
                <p className="label text-white/60">Ausgewählt</p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-white/85">
                  {selectedDate && selectedTime
                    ? `${selectedDate} · ${selectedTime}`
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5">
            <div>
              <label htmlFor="booking-name" className="label">
                Name
              </label>
              <input
                id="booking-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="MAX MUSTERMANN"
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[13px] uppercase tracking-[0.06em] text-white placeholder:text-white/25 outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-email" className="label">
                  E-Mail
                </label>
                <input
                  id="booking-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="MAIL@BEISPIEL.AT"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[13px] tracking-[0.04em] text-white placeholder:text-white/25 outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="label">
                  Telefon
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+43 …"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[13px] tracking-[0.04em] text-white placeholder:text-white/25 outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="booking-notes" className="label">
                Anmerkungen (optional)
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="FAHRZEUG, WUNSCH, DETAILS …"
                className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[13px] uppercase tracking-[0.06em] text-white placeholder:text-white/25 outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="label text-[var(--accent)]">Zusammenfassung</p>
            <dl className="mt-6 space-y-4 text-[13px]">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="label text-white/50">Leistung</dt>
                <dd className="uppercase tracking-[0.08em] text-white">{serviceLabel}</dd>
              </div>
              <div className="hud-line opacity-50" />
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="label text-white/50">Termin</dt>
                <dd className="uppercase tracking-[0.08em] text-white">
                  {selectedDate && selectedTime ? `${selectedDate} · ${selectedTime}` : "—"}
                </dd>
              </div>
              <div className="hud-line opacity-50" />
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="label text-white/50">Kontakt</dt>
                <dd className="text-right uppercase tracking-[0.06em] text-white">
                  {name}
                  <br />
                  <span className="text-white/70">{email}</span>
                  <br />
                  <span className="text-white/70">{phone}</span>
                </dd>
              </div>
              {notes.trim() ? (
                <>
                  <div className="hud-line opacity-50" />
                  <div>
                    <dt className="label text-white/50">Notiz</dt>
                    <dd className="mt-2 text-[12px] leading-5 text-white/70">{notes}</dd>
                  </div>
                </>
              ) : null}
            </dl>

            <div className="mt-8 rounded-lg border border-[var(--accent)]/40 bg-[color:color-mix(in_oklab,var(--accent)_10%,transparent)] p-4">
              <p className="label text-white/80">Demo abgeschlossen</p>
              <p className="mt-2 text-[13px] leading-6 text-white/60">
                In der Live-Version würde hier die Anfrage per E-Mail, CRM oder Kalender-API
                weitergeleitet werden.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={back}
              className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 label text-white/80 transition hover:border-white/25 hover:text-white"
            >
              Zurück
            </button>
          ) : null}
          {step === 4 ? (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 label text-white/80 transition hover:border-white/25 hover:text-white"
            >
              Neu starten
            </button>
          ) : null}
        </div>
        <div className="sm:ml-auto">
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 1 && !canNext1) ||
                (step === 2 && !canNext2) ||
                (step === 3 && !canNext3)
              }
              className="btn-primary w-full sm:w-auto disabled:pointer-events-none disabled:opacity-35"
            >
              {step === 3 ? "Anfrage prüfen" : "Weiter"} <span aria-hidden="true">▶▶</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
