import { forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "min-h-28 w-full resize-y border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] px-4 py-3 font-bold text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition placeholder:text-neutral-500 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_var(--sw-color-focus)] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
