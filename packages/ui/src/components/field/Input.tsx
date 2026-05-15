import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] px-4 font-bold text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition placeholder:text-neutral-500 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_var(--sw-color-focus)] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
