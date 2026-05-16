import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn, swirskiAttrs } from "../../system";

export type TextareaVariant = "default" | "filled";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaTone = "default" | "danger";

export type TextareaProps = {
  variant?: TextareaVariant;
  size?: TextareaSize;
  tone?: TextareaTone;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const sizeStyles: Record<TextareaSize, string> = {
  sm: "min-h-24 px-3 py-2 text-sm",
  md: "min-h-28 px-4 py-3 text-base",
  lg: "min-h-36 px-5 py-4 text-lg",
};

const toneStyles: Record<TextareaTone, string> = {
  default: "border-[color:var(--sw-color-ink)]",
  danger: "border-[color:var(--sw-color-red)]",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", size = "md", tone = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-y border-[length:var(--sw-border-width)] font-bold text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition placeholder:text-neutral-500 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_var(--sw-color-focus)] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500",
          variant === "default" ? "bg-[var(--sw-color-surface)]" : "bg-[var(--sw-color-paper)]",
          sizeStyles[size],
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("textarea", { size, tone, variant })}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
