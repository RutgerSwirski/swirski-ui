"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";
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
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export type TabsProps = {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  tone?: TabsTone;
} & HTMLAttributes<HTMLDivElement>;

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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = value ?? internalValue;

  function setValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
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
      variant = "default",
      size = "md",
      tone = "blue",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "flex w-fit flex-wrap gap-2 border-4 border-black bg-white p-2 shadow-[6px_6px_0_#0B0B0C]",
          variant === "compact" && "shadow-[3px_3px_0_#0B0B0C]",
          className,
        )}
        role="tablist"
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
  blue: "bg-[var(--sw-color-blue)] text-white",
  yellow: "bg-[var(--sw-color-yellow)] text-[var(--sw-color-black)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    {
      asChild = false,
      value,
      className,
      variant = "default",
      size = "md",
      tone = "blue",
      onClick,
      ...props
    },
    ref,
  ) {
    const tabs = useTabs();
    const isSelected = tabs.value === value;
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        aria-selected={isSelected}
        className={cn(
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] font-black uppercase outline-none transition-all duration-150 active:scale-[0.98]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          triggerSizeStyles[size],
          isSelected
            ? selectedToneStyles[tone]
            : "bg-[var(--sw-color-surface)] hover:bg-[var(--sw-color-yellow)] disabled:hover:bg-[var(--sw-color-surface)]",
          variant === "compact" && "border-2",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            tabs.setValue(value);
          }
        }}
        role="tab"
        type={asChild ? undefined : "button"}
        {...swirskiAttrs("tabs-trigger", { size, tone, variant })}
        data-active={isSelected ? "" : undefined}
        {...props}
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
      variant = "default",
      size = "md",
      tone = "blue",
      ...props
    },
    ref,
  ) {
    const tabs = useTabs();

    if (tabs.value !== value) {
      return null;
    }

    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "border-4 border-black bg-white p-5 shadow-[6px_6px_0_#0B0B0C]",
          variant === "compact" && "p-4 shadow-[3px_3px_0_#0B0B0C]",
          className,
        )}
        role="tabpanel"
        {...swirskiAttrs("tabs-content", { size, tone, variant })}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";
