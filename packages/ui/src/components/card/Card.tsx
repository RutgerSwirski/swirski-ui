// src/components/Card.tsx
import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  withShadow?: boolean;
};

const base =
  "group relative border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-paper)] text-[var(--sw-color-ink)]";

const shadowStyles = "shadow-[8px_8px_0_var(--sw-color-shadow)]";

const interactiveStyles =
  "transition-all duration-150 hover:-translate-y-2 active:translate-y-2";

const interactiveShadowStyles =
  "hover:shadow-[12px_12px_0_var(--sw-color-shadow)] active:shadow-[4px_4px_0_var(--sw-color-shadow)]";

export function Card({
  children,
  className,
  interactive = true,
  withShadow = true,
}: CardProps) {
  return (
    <article
      className={clsx(
        base,
        withShadow && shadowStyles,
        interactive && interactiveStyles,
        interactive && withShadow && interactiveShadowStyles,
        className,
      )}
    >
      {children}
    </article>
  );
}
