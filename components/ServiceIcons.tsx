export function ServiceIcons({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="Service Icons">
      <div className="flex items-center gap-3">
        <IconCircle>
          <CrosshairIcon />
        </IconCircle>
        <IconCircle>
          <SlashIcon />
        </IconCircle>
        <IconCircle>
          <PauseIcon />
        </IconCircle>
      </div>
    </div>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5">
      {children}
    </div>
  );
}

function CrosshairIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="text-white/80"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M9 1.6v3.2M9 13.2v3.2M1.6 9h3.2M13.2 9h3.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M5.1 5.1l2.2 2.2M10.7 10.7l2.2 2.2M12.9 5.1l-2.2 2.2M7.3 10.7l-2.2 2.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

function SlashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="text-white/80"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M5.1 12.9l7.8-7.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="text-white/80"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1" />
      <rect x="6.5" y="5.5" width="2.2" height="7" rx="1" fill="currentColor" />
      <rect x="9.3" y="5.5" width="2.2" height="7" rx="1" fill="currentColor" />
    </svg>
  );
}

