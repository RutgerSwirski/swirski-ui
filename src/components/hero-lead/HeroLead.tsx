// HeroLead.tsx
import clsx from "clsx";
import type { ReactNode } from "react";

export function HeroLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-6 max-w-xl text-lg leading-relaxed text-black/70 ${className}`}
    >
      {children}
    </p>
  );
}
