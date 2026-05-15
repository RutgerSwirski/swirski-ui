import clsx from "clsx";
import type { ReactNode } from "react";
import { Text } from "../typography";

export function HeroLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Text size="lg" tone="muted" className={clsx("mt-6 max-w-xl", className)}>
      {children}
    </Text>
  );
}
