// src/components/Card.tsx
import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

const base = "group relative border-4 border-black bg-[#F5F5F3]";

const interactiveStyles =
  "transition-all duration-150 hover:-translate-y-2 hover:shadow-[12px_12px_0_#0B0B0C] active:translate-y-2 active:shadow-[4px_4px_0_#0B0B0C] cursor-pointer";

export function Card({ children, className, interactive = true }: CardProps) {
  return (
    <article
      className={clsx(base, interactive ? interactiveStyles : "", className)}
    >
      {children}
    </article>
  );
}
