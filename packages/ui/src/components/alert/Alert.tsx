import { HTMLAttributes } from "react";
import clsx from "clsx";

export type AlertTone = "blue" | "yellow" | "red" | "white";

export type AlertProps = {
  tone?: AlertTone;
} & HTMLAttributes<HTMLDivElement>;

const toneStyles: Record<AlertTone, string> = {
  blue: "bg-[#0057FF] text-white",
  yellow: "bg-[#FFD400] text-black",
  red: "bg-[#FF3131] text-white",
  white: "bg-white text-black",
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
        "border-4 border-black p-5 shadow-[6px_6px_0_#0B0B0C]",
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
