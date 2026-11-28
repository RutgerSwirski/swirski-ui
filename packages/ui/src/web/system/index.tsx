import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  version,
  type ComponentRef,
  type CSSProperties,
  type ElementType,
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
type PolymorphicProps<Props> = Props extends unknown
  ? Omit<Props, "as" | "asChild" | "ref">
  : never;

/** Intrinsic refs follow the default or explicit tag. A JSX slot accepts an HTMLElement ref. */
export type PolymorphicComponent<Props, DefaultElement extends HTMLElement> = {
  <As extends ElementType | undefined = undefined, Slotted extends boolean = false>(
    props: PolymorphicProps<Props>
      & ("as" extends keyof Props ? { as?: As } : { as?: never })
      & ("asChild" extends keyof Props ? { asChild?: Slotted } : { asChild?: never })
      & { ref?: Ref<
        true extends Slotted ? HTMLElement
          : [As] extends [undefined] ? DefaultElement
          : As extends ElementType ? ComponentRef<As> : DefaultElement
      > },
  ): ReactNode;
  displayName?: string;
  readonly $$typeof: symbol;
};

// combines class names
export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

export const focusVisibleStyles =
  "focus-visible:outline focus-visible:outline-[length:var(--sw-border-width)] focus-visible:outline-offset-2 focus-visible:outline-[var(--sw-color-focus)] forced-colors:focus-visible:outline-solid";

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
const supportsRefCleanup = Number.parseInt(version, 10) >= 19;

export function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  let legacyCleanup: (() => void) | undefined;
  return (node: T | null) => {
    if (node === null && legacyCleanup) {
      const cleanup = legacyCleanup;
      legacyCleanup = undefined;
      cleanup();
      return;
    }

    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    });

    if (node !== null && cleanups.some((cleanup) => typeof cleanup === "function")) {
      const cleanupRefs = () => {
        refs.forEach((ref, index) => {
          const cleanup = cleanups[index];
          if (typeof cleanup === "function") cleanup();
          else if (typeof ref === "function") ref(null);
          else if (ref) ref.current = null;
        });
      };
      if (supportsRefCleanup) return cleanupRefs;
      // React 18 detaches with null and warns if the callback returns a cleanup.
      legacyCleanup = cleanupRefs;
    }
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
        if (!(event as { defaultPrevented?: boolean } | undefined)?.defaultPrevented) {
          (slotValue as (event: unknown) => void)(event);
        }
      }) as never;
    }
  }

  const ariaDisabled = [slotProps["aria-disabled"], childProps["aria-disabled"]]
    .some((value) => value === true || value === "true");
  if (ariaDisabled) {
    const blockActivation: NonNullable<HTMLAttributes<HTMLElement>["onClickCapture"]> = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    mergedProps["aria-disabled"] = true;
    mergedProps.onClickCapture = blockActivation;
    mergedProps.onAuxClickCapture = blockActivation;
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

    if (!isValidElement(child) || child.type === Fragment) {
      throw new Error("Swirski asChild expects one element that can receive DOM props and a ref.");
    }

    const childElement = child as ReactElement<HTMLAttributes<HTMLElement>>;
    const childRef = supportsRefCleanup
      ? (childElement.props as { ref?: Ref<HTMLElement> }).ref
      : (childElement as ReactElement & { ref?: Ref<HTMLElement> }).ref;
    const ref = useMemo(() => composeRefs(forwardedRef, childRef), [forwardedRef, childRef]);

    return cloneElement(childElement, {
      ...mergeSlotProps(props, childElement.props),
      ref,
    } as HTMLAttributes<HTMLElement> & { ref: Ref<HTMLElement> });
  },
);

Slot.displayName = "Slot";
