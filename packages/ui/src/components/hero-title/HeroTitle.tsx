import type { ReactNode } from "react";
import { Title } from "../typography";

export function HeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Title order={1} size="display" className={className}>
      {children}
    </Title>
  );
}
