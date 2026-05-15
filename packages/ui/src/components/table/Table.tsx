import { TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import clsx from "clsx";

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto border-4 border-black bg-white shadow-[5px_5px_0_#0B0B0C] sm:shadow-[8px_8px_0_#0B0B0C]">
      <table
        className={clsx("w-full min-w-96 border-collapse text-left", className)}
        {...props}
      />
    </div>
  );
}

export function TableHead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("bg-[#0B0B0C] text-white", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />;
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={clsx("border-b-4 border-black last:border-b-0", className)} {...props} />
  );
}

export function TableHeader({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={clsx("px-4 py-3 text-xs font-black uppercase", className)} {...props} />
  );
}

export function TableCell({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={clsx("px-4 py-3 text-sm font-bold text-black/70", className)} {...props} />
  );
}
