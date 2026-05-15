"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import clsx from "clsx";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export type TabsProps = {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
} & HTMLAttributes<HTMLDivElement>;

function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be used inside Tabs.");
  }

  return context;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
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
      <div className={clsx("grid gap-4", className)} {...props} />
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex w-fit flex-wrap gap-2 border-4 border-black bg-white p-2 shadow-[6px_6px_0_#0B0B0C]",
        className,
      )}
      role="tablist"
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const tabs = useTabs();
  const isSelected = tabs.value === value;

  return (
    <button
      aria-selected={isSelected}
      className={clsx(
        "border-4 border-black px-4 py-2 text-sm font-black uppercase transition",
        isSelected ? "bg-[#0057FF] text-white" : "bg-white hover:bg-[#FFD400]",
        className,
      )}
      onClick={() => tabs.setValue(value)}
      role="tab"
      type="button"
      {...props}
    />
  );
}

export function TabsContent({
  value,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
  const tabs = useTabs();

  if (tabs.value !== value) {
    return null;
  }

  return (
    <div
      className={clsx(
        "border-4 border-black bg-white p-5 shadow-[6px_6px_0_#0B0B0C]",
        className,
      )}
      role="tabpanel"
      {...props}
    />
  );
}
