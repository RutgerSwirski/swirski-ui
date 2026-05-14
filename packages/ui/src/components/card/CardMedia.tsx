// CardMedia.tsx
import { ReactNode } from "react";
import clsx from "clsx";

type CardMediaProps = {
  children: ReactNode;
  className?: string;
  aspect?: string; // "4/3", "4/5"
};

export function CardMedia({
  children,
  className,
  aspect = "4/3",
}: CardMediaProps) {
  return (
    <div className={clsx("border-b-4 border-black", className)}>
      <div
        className={clsx(
          "relative overflow-hidden bg-white",
          `aspect-[${aspect}]`,
        )}
      >
        {children}
      </div>
    </div>
  );
}
