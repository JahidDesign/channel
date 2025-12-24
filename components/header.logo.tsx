'use client';

export function LogoIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="24" fill="url(#logoGradient)" />
      <circle cx="60" cy="60" r="28" fill="white" />
      <path d="M54 48v24l18-12z" fill="#DC2626" />
    </svg>
  );
}
