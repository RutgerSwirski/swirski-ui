// src/components/Card.tsx
import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className, interactive = true }: CardProps) {
  return (
    <article
      className={clsx(
        "group relative border-4 border-black bg-[#F5F5F3] shadow-[8px_8px_0_#0B0B0C]",
        interactive &&
          "transition hover:-translate-y-2 hover:shadow-[12px_12px_0_#0B0B0C] hover:cursor-pointer",
        className
      )}
    >
      {children}
    </article>
  );
}