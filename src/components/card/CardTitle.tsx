import { ReactNode } from "react";

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-3 font-anton text-2xl uppercase tracking-[-0.02em] group-hover:underline">
      {children}
    </h3>
  );
}
