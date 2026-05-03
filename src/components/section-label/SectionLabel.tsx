export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`w-fit -rotate-2 border-4 border-black bg-[#FFD400] px-4 py-2 font-bangers text-4xl uppercase tracking-wide shadow-[4px_4px_0_#0B0B0C] ${className}`}
    >
      {children}
    </h2>
  );
}
