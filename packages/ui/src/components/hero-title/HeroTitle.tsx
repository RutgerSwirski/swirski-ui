// HeroTitle.tsx
import type { ReactNode } from "react";

export function HeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-anton uppercase text-8xl leading-[0.9] tracking-[-0.02em] ${className}`}
    >
      {children}
    </h1>
  );
}
