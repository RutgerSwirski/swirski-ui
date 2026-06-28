"use client";

import { CSSProperties, HTMLAttributes, ReactNode, createContext, useContext } from "react";
import clsx from "clsx";

export type SwirskiColorScheme = "light" | "dark";

export type SwirskiThemeTokens = {
  colorInk: string;
  colorPaper: string;
  colorSurface: string;
  colorMuted: string;
  colorBlue: string;
  colorYellow: string;
  colorRed: string;
  colorWhite: string;
  colorBlack: string;
  colorShadow: string;
  colorFocus: string;
  borderWidth: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  fontBody: string;
  fontHeading: string;
  fontDisplay: string;
};

export type SwirskiTheme = Partial<SwirskiThemeTokens> & {
  cssVariables?: Record<string, string>;
};

export type SwirskiProviderProps = {
  children: ReactNode;
  colorScheme?: SwirskiColorScheme;
  theme?: SwirskiTheme;
} & HTMLAttributes<HTMLDivElement>;

const defaultTokens: SwirskiThemeTokens = {
  colorInk: "#0B0B0C",
  colorPaper: "#F5F5F3",
  colorSurface: "#FFFFFF",
  colorMuted: "rgba(11, 11, 12, 0.68)",
  colorBlue: "#0057FF",
  colorYellow: "#FFD400",
  colorRed: "#FF3131",
  colorWhite: "#FFFFFF",
  colorBlack: "#0B0B0C",
  colorShadow: "#0B0B0C",
  colorFocus: "#0057FF",
  borderWidth: "4px",
  shadowSm: "3px 3px 0 var(--sw-color-shadow)",
  shadowMd: "6px 6px 0 var(--sw-color-shadow)",
  shadowLg: "10px 10px 0 var(--sw-color-shadow)",
  fontBody: 'var(--font-inter, "Inter Variable", "Inter", system-ui, sans-serif)',
  fontHeading: 'var(--font-anton, "Anton", Impact, sans-serif)',
  fontDisplay: 'var(--font-bangers, "Bangers", Impact, fantasy)',
};

const darkTokens: Partial<SwirskiThemeTokens> = {
  colorInk: "#F7F7F2",
  colorPaper: "#121212",
  colorSurface: "#1D1D1F",
  colorMuted: "rgba(247, 247, 242, 0.68)",
  colorWhite: "#1D1D1F",
  colorBlack: "#F7F7F2",
  colorShadow: "#FFD400",
  colorFocus: "#FFD400",
};

const tokenVariables: Record<keyof SwirskiThemeTokens, string> = {
  colorInk: "--sw-color-ink",
  colorPaper: "--sw-color-paper",
  colorSurface: "--sw-color-surface",
  colorMuted: "--sw-color-muted",
  colorBlue: "--sw-color-blue",
  colorYellow: "--sw-color-yellow",
  colorRed: "--sw-color-red",
  colorWhite: "--sw-color-white",
  colorBlack: "--sw-color-black",
  colorShadow: "--sw-color-shadow",
  colorFocus: "--sw-color-focus",
  borderWidth: "--sw-border-width",
  shadowSm: "--sw-shadow-sm",
  shadowMd: "--sw-shadow-md",
  shadowLg: "--sw-shadow-lg",
  fontBody: "--sw-font-body",
  fontHeading: "--sw-font-heading",
  fontDisplay: "--sw-font-display",
};

const SwirskiThemeContext = createContext<SwirskiThemeTokens>(defaultTokens);

export const swirskiDefaultTheme = defaultTokens;
export const swirskiDarkTheme = { ...defaultTokens, ...darkTokens };

function resolveTheme(
  colorScheme: SwirskiColorScheme,
  theme?: SwirskiTheme,
): SwirskiThemeTokens {
  const schemeTokens =
    colorScheme === "dark" ? swirskiDarkTheme : swirskiDefaultTheme;

  return {
    ...schemeTokens,
    ...theme,
  };
}

function themeToStyle(theme: SwirskiThemeTokens, extra?: SwirskiTheme) {
  const style: Record<string, string> = {};

  Object.entries(tokenVariables).forEach(([tokenName, variableName]) => {
    style[variableName] = theme[tokenName as keyof SwirskiThemeTokens];
  });

  Object.entries(extra?.cssVariables ?? {}).forEach(([name, value]) => {
    style[name] = value;
  });

  return style as CSSProperties;
}

export function createSwirskiTheme(theme: SwirskiTheme) {
  return theme;
}

export function SwirskiProvider({
  children,
  className,
  colorScheme = "light",
  style,
  theme,
  ...props
}: SwirskiProviderProps) {
  const resolvedTheme = resolveTheme(colorScheme, theme);

  return (
    <SwirskiThemeContext.Provider value={resolvedTheme}>
      <div
        className={clsx(
          "swirski-provider min-h-full bg-[var(--sw-color-paper)] text-[var(--sw-color-ink)]",
          className,
        )}
        data-swirski-color-scheme={colorScheme}
        style={{ ...themeToStyle(resolvedTheme, theme), ...style }}
        {...props}
      >
        {children}
      </div>
    </SwirskiThemeContext.Provider>
  );
}

export function useSwirskiTheme() {
  return useContext(SwirskiThemeContext);
}
