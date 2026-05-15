"use client";

import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import clsx from "clsx";

export type PaginationProps = {
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export function Pagination({
  page,
  total,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav
      className={clsx("flex flex-wrap items-center gap-2", className)}
      aria-label="Pagination"
      {...props}
    >
      <PaginationButton
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        Prev
      </PaginationButton>
      {pages.map((item) => (
        <PaginationButton
          key={item}
          aria-current={item === page ? "page" : undefined}
          active={item === page}
          onClick={() => onPageChange?.(item)}
        >
          {item}
        </PaginationButton>
      ))}
      <PaginationButton
        disabled={page >= total}
        onClick={() => onPageChange?.(page + 1)}
      >
        Next
      </PaginationButton>
    </nav>
  );
}

export function PaginationButton({
  active = false,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={clsx(
        "min-h-10 min-w-10 border-4 border-black px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0_#0B0B0C] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-black/40",
        active ? "bg-[#0057FF] text-white" : "bg-white",
        className,
      )}
      type="button"
      {...props}
    />
  );
}
