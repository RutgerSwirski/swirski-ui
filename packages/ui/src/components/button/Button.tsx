import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonBaseProps = {
  children: ReactNode;
  icon?: "arrow-up-right" | "github";
  iconSide?: "left" | "right";
  variant?: "blue" | "yellow" | "white";
  withShadow?: boolean;
  className?: string;
};

type ButtonLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonNativeProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 hover:cursor-pointer border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-6 py-3 font-black uppercase transition-all duration-200";

const shadowStyles =
  "shadow-[var(--sw-shadow-md)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2";

const variants = {
  blue: "bg-[var(--sw-color-blue)] text-white",
  yellow: "bg-[var(--sw-color-yellow)] text-[var(--sw-color-ink)]",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
};

export function Button({
  children,
  href,
  icon,
  iconSide = "left",
  variant = "blue",
  withShadow = true,
  className,
  ...props
}: ButtonProps) {
  const styles = clsx(
    baseStyles,
    variants[variant],
    withShadow && shadowStyles,
    className,
  );

  const iconElement = icon ? <ButtonIcon icon={icon} /> : null;

  const content = (
    <>
      {iconSide === "left" && iconElement}
      <span>{children}</span>
      {iconSide === "right" && iconElement}
    </>
  );

  if (href) {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        className={styles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={styles}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

function ButtonIcon({ icon }: { icon: "arrow-up-right" | "github" }) {
  if (icon === "github") {
    return (
      <svg
        aria-hidden="true"
        className="size-5 shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
