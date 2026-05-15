import { HTMLAttributes } from "react";
import clsx from "clsx";

export type AlertTone = "blue" | "yellow" | "red" | "white";

export type AlertProps = {
  tone?: AlertTone;
} & HTMLAttributes<HTMLDivElement>;

const toneStyles: Record<AlertTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-white",
  yellow: "bg-[var(--sw-color-yellow)] text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-red)] text-white",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
};

export function Alert({
  tone = "yellow",
  className,
  children,
  role = "status",
  ...props
}: AlertProps) {
  return (
    <div
      role={role}
      className={clsx(
        "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] p-5 shadow-[var(--sw-shadow-md)]",
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
