import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import clsx, { type ClassValue } from "clsx";

// create the swirski tone system
export type SwirskiTone =
  | "muted"
  | "subtle"
  | "inverted"
  | "blue"
  | "yellow"
  | "red"
  | "white"
  | "black";

// create the swirski size system
export type SwirskiSize = "xs" | "sm" | "md" | "lg" | "xl" | "display";

// create the swirski variant system
export type SwirskiVariant = "solid" | "outline" | "soft" | "ghost" | "plain";

export type SwirskiSystemProps<
  Variant extends string = SwirskiVariant,
  Size extends string = SwirskiSize,
  Tone extends string = SwirskiTone,
> = {
  className?: string;
  variant?: Variant;
  size?: Size;
  tone?: Tone;
};

export type SwirskiPolymorphicProps = {
  asChild?: boolean;
  children?: ReactNode;
};
// combines class names
export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

export const focusVisibleStyles =
  "focus-visible:outline focus-visible:outline-[length:var(--sw-border-width)] focus-visible:outline-offset-2 focus-visible:outline-[var(--sw-color-focus)]";

export const disabledInteractiveStyles =
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:scale-100";

// apply swirski data attributes to component
export function swirskiAttrs(
  component: string,
  options: {
    size?: string;
    tone?: string;
    variant?: string;
  } = {},
) {
  return {
    "data-swirski-component": component,
    "data-swirski-size": options.size,
    "data-swirski-tone": options.tone,
    "data-swirski-variant": options.variant,
  };
}
// compose the refs so that refs and passed refs will work together
export function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(node);
        return;
      }

      ref.current = node;
    });
  };
}

function isEventHandler(key: string, value: unknown) {
  return /^on[A-Z]/.test(key) && typeof value === "function";
}

function mergeSlotProps(
  slotProps: HTMLAttributes<HTMLElement>,
  childProps: HTMLAttributes<HTMLElement>,
) {
  const mergedProps = { ...slotProps, ...childProps };

  for (const key of Object.keys(childProps)) {
    const slotValue = slotProps[key as keyof HTMLAttributes<HTMLElement>];
    const childValue = childProps[key as keyof HTMLAttributes<HTMLElement>];

    if (isEventHandler(key, slotValue) && isEventHandler(key, childValue)) {
      mergedProps[key as keyof HTMLAttributes<HTMLElement>] = ((
        event: unknown,
      ) => {
        (childValue as (event: unknown) => void)(event);
        (slotValue as (event: unknown) => void)(event);
      }) as never;
    }
  }

  return {
    ...mergedProps,
    "aria-describedby": mergeAriaIds(
      childProps["aria-describedby"],
      slotProps["aria-describedby"],
    ),
    className: cn(slotProps.className, childProps.className),
    style: {
      ...(slotProps.style as CSSProperties | undefined),
      ...(childProps.style as CSSProperties | undefined),
    },
  };
}

function mergeAriaIds(...values: Array<string | undefined>) {
  const ids = values.flatMap((value) => value?.split(/\s+/) ?? []);
  const uniqueIds = Array.from(new Set(ids.filter(Boolean)));

  return uniqueIds.length ? uniqueIds.join(" ") : undefined;
}

export type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, forwardedRef) => {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error("Swirski asChild expects a single valid React element.");
    }

    const childElement = child as ReactElement<HTMLAttributes<HTMLElement>>;
    const childRef = (childElement.props as { ref?: Ref<HTMLElement> }).ref;

    return cloneElement(childElement, {
      ...mergeSlotProps(props, childElement.props),
      ref: composeRefs(forwardedRef, childRef),
    } as HTMLAttributes<HTMLElement> & { ref: Ref<HTMLElement> });
  },
);

Slot.displayName = "Slot";
