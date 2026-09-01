export function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crest-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ee7ff" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="none" stroke="url(#crest-fill)" strokeWidth="2.2" />
      <circle cx="24" cy="24" r="16" fill="none" stroke="#5ee7ff" strokeWidth="1.4" opacity="0.7" />
      <path
        d="M24 8 L30 20 H18 Z M24 40 L18 28 H30 Z M8 24 L20 18 V30 Z M40 24 L28 30 V18 Z"
        fill="url(#crest-fill)"
        opacity="0.95"
      />
      <circle cx="24" cy="24" r="4.5" fill="#0b1220" stroke="#5ee7ff" strokeWidth="1.5" />
    </svg>
  );
}
