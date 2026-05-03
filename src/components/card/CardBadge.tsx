export function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-2 top-2 z-20 border-2 border-black bg-transparent px-2 py-1 text-xs font-black uppercase">
      {children}
    </span>
  );
}
