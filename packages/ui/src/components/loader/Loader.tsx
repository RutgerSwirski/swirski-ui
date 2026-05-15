import { HTMLAttributes } from "react";
import clsx from "clsx";

export type LoaderProps = {
  size?: "sm" | "md" | "lg";
} & HTMLAttributes<HTMLSpanElement>;

const sizeStyles = {
  sm: "size-5 border-[3px]",
  md: "size-8 border-4",
  lg: "size-12 border-4",
};

export function Loader({ size = "md", className, ...props }: LoaderProps) {
  return (
    <span
      aria-label="Loading"
      className={clsx(
        "inline-block animate-spin border-black border-r-[#FFD400] border-t-[#0057FF]",
        sizeStyles[size],
        className,
      )}
      role="status"
      {...props}
    />
  );
}
