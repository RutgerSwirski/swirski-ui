"use client";

import { ButtonHTMLAttributes, HTMLAttributes, forwardRef } from "react";
import {
  cn,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";

export type PaginationVariant = "default" | "compact";
export type PaginationSize = "sm" | "md" | "lg";
export type PaginationTone = "blue" | "yellow" | "black";

export type PaginationProps = {
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  variant?: PaginationVariant;
  size?: PaginationSize;
  tone?: PaginationTone;
} & HTMLAttributes<HTMLDivElement>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      total,
      onPageChange,
      variant = "default",
      size = "md",
      tone = "blue",
      className,
      ...props
    },
    ref,
  ) {
    const pages = Array.from({ length: total }, (_, index) => index + 1);

    return (
      <nav
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        aria-label="Pagination"
        {...swirskiAttrs("pagination", { size, tone, variant })}
        {...props}
      >
        <PaginationButton
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          size={size}
          tone={tone}
          variant={variant}
        >
          Prev
        </PaginationButton>
        {pages.map((item) => (
          <PaginationButton
            key={item}
            aria-current={item === page ? "page" : undefined}
            active={item === page}
            onClick={() => onPageChange?.(item)}
            size={size}
            tone={tone}
            variant={variant}
          >
            {item}
          </PaginationButton>
        ))}
        <PaginationButton
          disabled={page >= total}
          onClick={() => onPageChange?.(page + 1)}
          size={size}
          tone={tone}
          variant={variant}
        >
          Next
        </PaginationButton>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

export type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  variant?: PaginationVariant;
  size?: PaginationSize;
  tone?: PaginationTone;
};

const sizeStyles: Record<PaginationSize, string> = {
  sm: "min-h-9 min-w-9 px-2 py-1 text-xs",
  md: "min-h-10 min-w-10 px-3 py-2 text-xs",
  lg: "min-h-12 min-w-12 px-4 py-3 text-sm",
};

const activeToneStyles: Record<PaginationTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-white",
  yellow: "bg-[var(--sw-color-yellow)] text-[var(--sw-color-black)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

export const PaginationButton = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationButton(
  {
    active = false,
    variant = "default",
    size = "md",
    tone = "blue",
    className,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] font-black uppercase shadow-[var(--sw-shadow-sm)] outline-none transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:bg-neutral-200 disabled:text-black/40 disabled:hover:shadow-[var(--sw-shadow-sm)]",
        focusVisibleStyles,
        disabledInteractiveStyles,
        sizeStyles[size],
        active ? activeToneStyles[tone] : "bg-[var(--sw-color-surface)]",
        variant === "compact" && "shadow-none disabled:hover:shadow-none",
        className,
      )}
      type="button"
      {...swirskiAttrs("pagination-button", { size, tone, variant })}
      data-active={active ? "" : undefined}
      {...props}
    />
  );
});

PaginationButton.displayName = "PaginationButton";
