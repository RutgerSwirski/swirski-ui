import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Children,
  cloneElement,
  ElementType,
  ReactNode,
  forwardRef,
  type MouseEvent,
  type ReactElement,
} from "react";

import {
  resolveButtonStyleConfig,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "../../../shared/contracts";
import {
  Slot,
  cn,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";

export type { ButtonSize, ButtonTone, ButtonVariant } from "../../../shared/contracts";

type ButtonBaseProps = {
  as?: ElementType;
  asChild?: boolean;
  children?: ReactNode;
  icon?: "arrow-up-right" | "github";
  iconSide?: "left" | "right";
  /** Visual treatment. Defaults to solid. Color values here are legacy aliases. */
  variant?: ButtonVariant | ButtonTone;
  size?: ButtonSize;
  /** Button color. Defaults to blue unless a legacy color variant is supplied. */
  tone?: ButtonTone;
  withShadow?: boolean;
  disabled?: boolean;
  /** Prevent activation and expose a busy state while an action is pending. */
  loading?: boolean;
  className?: string;
};

type ButtonLinkProps = ButtonBaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonBaseProps | "color"
  > & {
    href: string;
  };

type ButtonNativeProps = ButtonBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps | "color"
  > & {
    href?: undefined;
  };

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

const baseStyles =
  "inline-flex max-w-full items-center justify-center gap-2 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] font-black uppercase outline-none sw-motion-shift transition-all duration-[var(--sw-motion-standard,200ms)] hover:cursor-pointer disabled:hover:cursor-not-allowed";

const shadowFeedbackStyles =
  "shadow-[var(--sw-shadow-md)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 active:scale-[0.99] disabled:hover:shadow-[var(--sw-shadow-md)] disabled:active:shadow-[var(--sw-shadow-md)]";

const flatFeedbackStyles =
  "hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.98] disabled:hover:brightness-100";

const toneStyles: Record<ButtonTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
  yellow: "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
  red: "bg-[var(--sw-color-red)] text-[color:var(--sw-color-on-red)]",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

const outlineToneStyles: Record<ButtonTone, string> = {
  blue: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-blue-text)]",
  yellow: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-yellow-text)]",
  red: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-red-text)]",
  white: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
};

const ghostToneStyles: Record<ButtonTone, string> = {
  blue: "border-transparent bg-transparent text-[color:var(--sw-color-blue-text)] shadow-none",
  yellow:
    "border-transparent bg-transparent text-[color:var(--sw-color-yellow-text)] shadow-none",
  red: "border-transparent bg-transparent text-[color:var(--sw-color-red-text)] shadow-none",
  white:
    "border-transparent bg-transparent text-[color:var(--sw-color-ink)] shadow-none",
  black:
    "border-transparent bg-transparent text-[var(--sw-color-ink)] shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-xs",
  md: "min-h-12 px-6 py-3 text-sm",
  lg: "min-h-14 px-7 py-4 text-base",
};

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    as,
    asChild = false,
    children,
    href,
    icon,
    iconSide = "left",
    variant = "solid",
    size = "md",
    tone,
    withShadow = true,
    disabled: disabledProp = false,
    loading = false,
    className,
    type,
    ...props
  }: ButtonProps,
  ref,
) {
  const disabled = disabledProp || loading;
  const { variant: normalizedVariant, tone: normalizedTone } = resolveButtonStyleConfig({
    variant,
    tone,
  });
  const styles = cn(
    baseStyles,
    focusVisibleStyles,
    disabledInteractiveStyles,
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    sizeStyles[size],
    normalizedVariant === "solid" && toneStyles[normalizedTone],
    normalizedVariant === "outline" && outlineToneStyles[normalizedTone],
    normalizedVariant === "ghost" && ghostToneStyles[normalizedTone],
    withShadow && normalizedVariant !== "ghost"
      ? shadowFeedbackStyles
      : flatFeedbackStyles,
    className,
  );

  const iconElement = icon ? <ButtonIcon icon={icon} /> : null;

  const content = (label: ReactNode) => (
    <>
      {iconSide === "left" && iconElement}
      <span className="min-w-0 break-words">{label}</span>
      {iconSide === "right" && iconElement}
    </>
  );

  const componentProps = {
    ...props,
    "aria-busy": loading || props["aria-busy"],
    "data-loading": loading ? "" : undefined,
    ...(href ? { href } : {}),
    ...(!href && !asChild ? { type: type ?? "button" } : type ? { type } : {}),
    ...swirskiAttrs("button", {
      size,
      tone: normalizedTone,
      variant: normalizedVariant,
    }),
    ref,
    className: styles,
  };

  const blockActivation = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const disabledLinkProps = {
    "aria-disabled": true,
    tabIndex: -1,
    onClickCapture: blockActivation,
    onAuxClickCapture: blockActivation,
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<ButtonHTMLAttributes<HTMLElement>>;
    const nativeButton = child.type === "button";
    const disabledProps = disabled
      ? (nativeButton ? { disabled: true } : disabledLinkProps)
      : undefined;
    const slottedChild = iconElement || disabledProps
      ? cloneElement(child, disabledProps, iconElement ? content(child.props.children) : child.props.children)
      : child;
    const typeProps = nativeButton
      ? { type: type ?? "button", disabled: disabled || undefined }
      : { type };

    return (
      <Slot {...componentProps} {...typeProps}>
        {slottedChild}
      </Slot>
    );
  }

  const Component = (as ?? (href ? "a" : "button")) as ElementType;
  const isLink = Component === "a" || Boolean(href);
  const disabledProps = isLink
    ? (disabled ? disabledLinkProps : undefined)
    : { disabled: disabled || undefined };
  return <Component {...componentProps} {...disabledProps}>{content(children)}</Component>;
});

Button.displayName = "Button";

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
