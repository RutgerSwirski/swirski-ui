export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute opacity-20 bg-[radial-gradient(#0B0B0C_1.2px,transparent_1.2px)] bg-size-[13px_13px] ${className}`}
    />
  );
}
