// CardContent.tsx
import { ReactNode } from "react";

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-5">{children}</div>;
}
