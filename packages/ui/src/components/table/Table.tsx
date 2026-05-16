import {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  forwardRef,
} from "react";
import { cn, swirskiAttrs } from "../../system";

export type TableVariant = "default" | "compact";
export type TableSize = "sm" | "md" | "lg";
export type TableTone = "default" | "inverted";

export type TableProps = {
  variant?: TableVariant;
  size?: TableSize;
  tone?: TableTone;
  wrapperClassName?: string;
} & TableHTMLAttributes<HTMLTableElement>;

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({
  className,
  wrapperClassName,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  return (
    <div
      className={cn(
        "w-full min-w-0 max-w-full overflow-x-auto border-4 border-black bg-white shadow-[5px_5px_0_#0B0B0C] sm:shadow-[8px_8px_0_#0B0B0C]",
        wrapperClassName,
      )}
      {...swirskiAttrs("table-wrapper", { size, tone, variant })}
    >
      <table
        ref={ref}
        className={cn("w-full min-w-96 border-collapse text-left", className)}
        {...swirskiAttrs("table", { size, tone, variant })}
        {...props}
      />
    </div>
  );
});

Table.displayName = "Table";

export type TableHeadProps = {
  variant?: TableVariant;
  size?: TableSize;
  tone?: TableTone;
} & HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyProps = TableHeadProps;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  return (
    <thead
      ref={ref}
      className={cn("bg-[#0B0B0C] text-white", className)}
      {...swirskiAttrs("table-head", { size, tone, variant })}
      {...props}
    />
  );
});

TableHead.displayName = "TableHead";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  return (
    <tbody
      ref={ref}
      className={className}
      {...swirskiAttrs("table-body", { size, tone, variant })}
      {...props}
    />
  );
});

TableBody.displayName = "TableBody";

export type TableRowProps = {
  variant?: TableVariant;
  size?: TableSize;
  tone?: TableTone;
} & HTMLAttributes<HTMLTableRowElement>;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  return (
    <tr
      ref={ref}
      className={cn("border-b-4 border-black last:border-b-0", className)}
      {...swirskiAttrs("table-row", { size, tone, variant })}
      {...props}
    />
  );
});

TableRow.displayName = "TableRow";

export type TableHeaderProps = {
  variant?: TableVariant;
  size?: TableSize;
  tone?: TableTone;
} & ThHTMLAttributes<HTMLTableCellElement>;

const cellSizeStyles: Record<TableSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  function TableHeader({
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  return (
    <th
      ref={ref}
      className={cn("font-black uppercase", cellSizeStyles[size], className)}
      {...swirskiAttrs("table-header", { size, tone, variant })}
      {...props}
    />
  );
});

TableHeader.displayName = "TableHeader";

export type TableCellProps = {
  variant?: TableVariant;
  size?: TableSize;
  tone?: TableTone;
} & TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  return (
    <td
      ref={ref}
      className={cn("font-bold text-black/70", cellSizeStyles[size], className)}
      {...swirskiAttrs("table-cell", { size, tone, variant })}
      {...props}
    />
  );
});

TableCell.displayName = "TableCell";
