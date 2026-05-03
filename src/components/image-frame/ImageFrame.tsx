export function ImageFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        relative overflow-hidden 
        border-2 border-black 
        bg-[#F5F5F3]
        shadow-[5px_5px_0_#0B0B0C]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
