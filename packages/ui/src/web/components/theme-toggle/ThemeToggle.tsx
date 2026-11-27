"use client";

import { forwardRef } from "react";
import { swirskiAttrs } from "../../system";
import type { SwirskiColorScheme } from "../../theme";
import { Switch } from "../switch";
import type { SwitchProps } from "../switch";

export type ThemeToggleProps = Omit<
  SwitchProps,
  "checked" | "defaultChecked" | "onChange"
> & {
  colorScheme: SwirskiColorScheme;
  onColorSchemeChange: (colorScheme: SwirskiColorScheme) => void;
};

export const ThemeToggle = forwardRef<HTMLInputElement, ThemeToggleProps>(
  function ThemeToggle(
    { colorScheme, onColorSchemeChange, label = "Dark mode", ...props },
    ref,
  ) {
    return (
      <Switch
        {...swirskiAttrs("theme-toggle", {
          size: props.size ?? "md",
          tone: props.tone ?? "blue",
          variant: props.variant ?? "default",
        })}
        {...props}
        ref={ref}
        label={label}
        checked={colorScheme === "dark"}
        onChange={(event) =>
          onColorSchemeChange(event.currentTarget.checked ? "dark" : "light")
        }
      />
    );
  },
);

ThemeToggle.displayName = "ThemeToggle";
