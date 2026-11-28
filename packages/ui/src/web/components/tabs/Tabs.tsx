"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import {
  Slot,
  cn,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";

export type TabsVariant = "default" | "compact";
export type TabsSize = "sm" | "md" | "lg";
export type TabsTone = "blue" | "yellow" | "black";

type TabsContextValue = {
  id: string;
  variant: TabsVariant;
  size: TabsSize;
  tone: TabsTone;
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

type TabsSelection =
  | { value: string; defaultValue?: string }
  | { value?: string; defaultValue: string };

export type TabsProps = TabsSelection & {
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  tone?: TabsTone;
} & Omit<HTMLAttributes<HTMLDivElement>, "defaultValue">;

function partId(id: string, part: "tab" | "panel", value: string) {
  return `${id}-${part}-${encodeURIComponent(value)}`;
}

function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be used inside Tabs.");
  }

  return context;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value,
    defaultValue,
    onValueChange,
    variant = "default",
    size = "md",
    tone = "blue",
    className,
    ...props
  },
  ref,
) {
  const id = useId();
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });

  return (
    <TabsContext.Provider value={{ id, value: currentValue, setValue, variant, size, tone }}>
      <div
        ref={ref}
        className={cn("grid gap-4", className)}
        {...swirskiAttrs("tabs", { size, tone, variant })}
        {...props}
      />
    </TabsContext.Provider>
  );
});

Tabs.displayName = "Tabs";

export type TabsListProps = {
  asChild?: boolean;
  variant?: TabsVariant;
  size?: TabsSize;
  tone?: TabsTone;
} & HTMLAttributes<HTMLDivElement>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    {
      asChild = false,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const tabs = useContext(TabsContext);
    const variant = variantProp ?? tabs?.variant ?? "default";
    const size = sizeProp ?? tabs?.size ?? "md";
    const tone = toneProp ?? tabs?.tone ?? "blue";
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "flex w-fit flex-wrap gap-2 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-2",
          variant === "compact" ? "shadow-[var(--sw-shadow-sm)]" : "shadow-[var(--sw-shadow-md)]",
          className,
        )}
        role="tablist"
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          const list = event.currentTarget;
          const target = event.target;
          if (!(target instanceof Element)) return;
          const current = target.closest('[role="tab"]');
          if (!current || current.closest('[role="tablist"]') !== list) return;

          const tabs = Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]'))
            .filter(
              (tab) => tab.closest('[role="tablist"]') === list &&
                !tab.matches(':disabled, [aria-disabled="true"]'),
            );
          const index = tabs.findIndex((tab) => tab === current);
          if (index < 0) return;

          let nextIndex: number;
          if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
          } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            const rtl = getComputedStyle(list).direction === "rtl";
            const step = (event.key === "ArrowRight" ? 1 : -1) * (rtl ? -1 : 1);
            nextIndex = (index + step + tabs.length) % tabs.length;
          } else {
            return;
          }

          event.preventDefault();
          const next = tabs[nextIndex];
          if (next !== current) {
            next.focus();
            next.click();
          }
        }}
        {...swirskiAttrs("tabs-list", { size, tone, variant })}
        {...props}
      />
    );
  },
);

TabsList.displayName = "TabsList";

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  value: string;
  variant?: TabsVariant;
  size?: TabsSize;
  tone?: TabsTone;
};

const triggerSizeStyles: Record<TabsSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const selectedToneStyles: Record<TabsTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
  yellow: "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    {
      asChild = false,
      value,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) {
    const tabs = useTabs();
    const variant = variantProp ?? tabs.variant;
    const size = sizeProp ?? tabs.size;
    const tone = toneProp ?? tabs.tone;
    const isSelected = tabs.value === value;
    const isDisabled =
      disabled || props["aria-disabled"] === true ||
      props["aria-disabled"] === "true";
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        id={partId(tabs.id, "tab", value)}
        aria-controls={partId(tabs.id, "panel", value)}
        aria-selected={isSelected}
        disabled={asChild ? undefined : disabled}
        tabIndex={isSelected && !isDisabled ? 0 : -1}
        className={cn(
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] font-black uppercase outline-none sw-motion-shift transition-transform duration-[var(--sw-motion-fast,150ms)] active:scale-[0.98]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          triggerSizeStyles[size],
          isSelected
            ? selectedToneStyles[tone]
            : "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-ink)] hover:bg-[var(--sw-color-yellow)] hover:text-[color:var(--sw-color-on-yellow)] disabled:hover:bg-[var(--sw-color-surface)] disabled:hover:text-[color:var(--sw-color-ink)]",
          variant === "compact" && "border-2",
          className,
        )}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);

          if (!event.defaultPrevented) {
            tabs.setValue(value);
          }
        }}
        role="tab"
        type={asChild ? undefined : "button"}
        {...swirskiAttrs("tabs-trigger", { size, tone, variant })}
        data-state={isSelected ? "active" : "inactive"}
        data-active={isSelected ? "" : undefined}
        {...props}
        aria-disabled={isDisabled || undefined}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  value: string;
  variant?: TabsVariant;
  size?: TabsSize;
  tone?: TabsTone;
};

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent(
    {
      asChild = false,
      value,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const tabs = useTabs();
    const variant = variantProp ?? tabs.variant;
    const size = sizeProp ?? tabs.size;
    const tone = toneProp ?? tabs.tone;
    const id = props.id ?? partId(tabs.id, "panel", value);
    const labelledBy = props["aria-labelledby"] ?? partId(tabs.id, "tab", value);

    if (tabs.value !== value) {
      return <div id={id} role="tabpanel" aria-labelledby={labelledBy} data-state="inactive" hidden />;
    }

    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)]",
          variant === "compact" ? "p-4 shadow-[var(--sw-shadow-sm)]" : "p-5 shadow-[var(--sw-shadow-md)]",
          className,
        )}
        role="tabpanel"
        id={id}
        aria-labelledby={labelledBy}
        tabIndex={0}
        data-state="active"
        {...swirskiAttrs("tabs-content", { size, tone, variant })}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";
