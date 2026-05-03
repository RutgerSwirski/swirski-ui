import { ReactNode } from "react";

export function CardMeta({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-black uppercase">
      {children}
    </div>
  );
}
