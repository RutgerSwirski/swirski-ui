export function CardBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`absolute left-3 top-3 z-20 -rotate-3 border-2 border-black bg-white px-2 py-1 font-anton text-sm uppercase shadow-[2px_2px_0_#0B0B0C] ${className} `}
    >
      {children}
    </span>
  );
}
