export function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    // <span className="absolute left-2 top-2 z-20 border-2 border-black bg-transparent px-2 py-1 text-xs font-black uppercase">
    //   {children}
    // </span>

    <span className="absolute left-3 top-3 z-20 -rotate-3 border-2 border-black bg-[#FFD400] px-2 py-1 font-anton text-sm uppercase shadow-[2px_2px_0_#0B0B0C]">
      {children}
    </span>
  );
}
