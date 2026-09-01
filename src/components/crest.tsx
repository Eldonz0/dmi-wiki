export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dmi-crest" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffc14a" />
          <stop offset="55%" stopColor="#e07a12" />
          <stop offset="100%" stopColor="#9a3f08" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0d1016" stroke="url(#dmi-crest)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#ffb347" strokeWidth="1.2" opacity="0.55" />
      <path
        d="M32 10 L38 26 H26 Z M32 54 L26 38 H38 Z M10 32 L26 26 V38 Z M54 32 L38 38 V26 Z"
        fill="url(#dmi-crest)"
      />
      <circle cx="32" cy="32" r="6" fill="#0d1016" stroke="#ffe08a" strokeWidth="1.6" />
    </svg>
  );
}
