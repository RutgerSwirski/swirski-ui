// HeroTitle.tsx
import type { ReactNode } from "react";

export function HeroTitle({
  children,
  className,
  variant = "editorial",
}: {
  children: ReactNode;
  className?: string;
  variant?: "editorial" | "loud";
}) {
  const variants = {
    editorial: "font-anton uppercase leading-[0.9] tracking-[-0.02em]",
    loud: "font-anton uppercase leading-[0.9] tracking-[-0.02em]",
  };

  return <h1 className={`${variants[variant]} ${className}`}>{children}</h1>;
}
