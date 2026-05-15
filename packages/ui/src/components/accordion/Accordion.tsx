import { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type AccordionProps = HTMLAttributes<HTMLDivElement>;

export function Accordion({ className, ...props }: AccordionProps) {
  return <div className={clsx("grid gap-3", className)} {...props} />;
}

export type AccordionItemProps = DetailsHTMLAttributes<HTMLDetailsElement>;

export function AccordionItem({
  className,
  ...props
}: AccordionItemProps) {
  return (
    <details
      className={clsx(
        "group border-4 border-black bg-white shadow-[5px_5px_0_#0B0B0C] transition open:bg-[#F5F5F3]",
        className,
      )}
      {...props}
    />
  );
}

export type AccordionTriggerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  return (
    <summary
      className={clsx(
        "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-black uppercase marker:hidden [&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="grid size-7 shrink-0 place-items-center border-2 border-black bg-[#FFD400] leading-none transition group-open:rotate-45">
        +
      </span>
    </summary>
  );
}

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;

export function AccordionContent({
  className,
  ...props
}: AccordionContentProps) {
  return (
    <div
      className={clsx(
        "border-t-4 border-black px-5 py-4 text-sm font-bold leading-6 text-neutral-700",
        className,
      )}
      {...props}
    />
  );
}
