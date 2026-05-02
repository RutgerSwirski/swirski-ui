import { ReactNode } from "react";

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-anton text-2xl uppercase tracking-[-0.02em]">
      {children}
    </h3>
  );
}
