export function HeroActions({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-9 flex flex-wrap items-center gap-5 ${className}`}>
      {children}
    </div>
  );
}
