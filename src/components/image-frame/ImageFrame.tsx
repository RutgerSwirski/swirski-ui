export function ImageFrame({
  children,
  className = "",
  caption,
}: {
  children: React.ReactNode;
  className?: string;
  caption?: string;
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

      {caption && (
        <p className="absolute bottom-2 left-2 right-2 text-center text-xs font-black uppercase bg-[#F5F5F3] border-2 border-black w-fit p-2">
          {caption}
        </p>
      )}
    </div>
  );
}
