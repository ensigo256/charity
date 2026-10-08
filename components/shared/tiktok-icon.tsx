interface TikTokIconProps {
  size?: number;
  className?: string;
}

export function TikTokIcon({ size = 18, className }: TikTokIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9v-3.45a6.35 6.35 0 1 0 3.45 5.66V9.1a8.2 8.2 0 0 0 4.8 1.55V7.2a4.85 4.85 0 0 1-1.03-.51Z" />
    </svg>
  );
}