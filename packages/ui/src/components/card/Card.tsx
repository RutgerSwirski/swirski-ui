// src/components/Card.tsx
import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

const base =
  "group relative border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-paper)] text-[var(--sw-color-ink)]";

const interactiveStyles =
  "transition-all duration-150 hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--sw-color-shadow)] active:translate-y-2 active:shadow-[4px_4px_0_var(--sw-color-shadow)]";

export function Card({ children, className, interactive = true }: CardProps) {
  return (
    <article
      className={clsx(base, interactive ? interactiveStyles : "", className)}
    >
      {children}
    </article>
  );
}
