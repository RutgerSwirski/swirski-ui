export function HeroKicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-5 inline-block w-fit -rotate-3 border-3 border-black bg-[#FFD400] px-4 py-1 font-bangers text-xl uppercase tracking-wide md:text-2xl ${className}`}
    >
      {children}
    </p>
  );
}
