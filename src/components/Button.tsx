import { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "blue" | "yellow" | "white";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "inline-block border-4 border-black px-6 py-3 font-black uppercase transition-all duration-200 shadow-[6px_6px_0_#0B0B0C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2";

const variants = {
  blue: "bg-[#0057FF] text-white",
  yellow: "bg-[#FFD400] text-black",
  white: "bg-white text-black",
};

export function Button({
  children,
  href,
  variant = "blue",
  className,
  ...props
}: ButtonProps) {
  const styles = clsx(baseStyles, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
