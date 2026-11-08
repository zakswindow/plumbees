export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.94 6.18 6.76.9-4.95 4.7 1.24 6.72L12 17.7l-5.99 3.3 1.24-6.72-4.95-4.7 6.76-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}
