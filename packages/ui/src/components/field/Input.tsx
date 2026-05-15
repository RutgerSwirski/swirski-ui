import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full border-4 border-black bg-white px-4 font-bold text-black shadow-[4px_4px_0_#0B0B0C] outline-none transition placeholder:text-neutral-500 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_#0057FF] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
