export function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-3 top-3 -rotate-3 border-2 border-black bg-[#FFD400] px-2 py-1 font-anton text-sm uppercase shadow-[2px_2px_0_#0B0B0C]">
      {children}
    </span>
  );
}
