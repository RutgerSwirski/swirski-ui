import type { PlaygroundValues } from "../types";

export function jsxString(value: string) {
  return JSON.stringify(value);
}

export function jsxText(value: string) {
  return value.replace(/[{}<>]/g, (character) => {
    if (character === "{") {
      return "&#123;";
    }

    if (character === "}") {
      return "&#125;";
    }

    if (character === "<") {
      return "&lt;";
    }

    return "&gt;";
  });
}

export function textValue(values: PlaygroundValues, key: string) {
  return String(values[key] ?? "");
}

export function numberValue(values: PlaygroundValues, key: string) {
  const value = values[key];
  return typeof value === "number" ? value : Number(value);
}

export function booleanValue(values: PlaygroundValues, key: string) {
  return Boolean(values[key]);
}

export const cardSurfaceClasses = {
  cream: "bg-[#F5F5F3]",
  white: "bg-white",
  yellow: "bg-[#FFD400]",
};

export const gridColumnOptions = ["1", "2", "3", "4", "6"] as const;
export const gridGapOptions = ["xs", "sm", "md", "lg", "xl"] as const;
export const toastToneOptions = ["yellow", "blue", "red", "white"] as const;
