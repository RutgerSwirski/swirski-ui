import { Platform } from "react-native";

export const nativeFontFamilies = {
  body: Platform.select({
    web: "Inter Variable",
    default: "Inter_400Regular",
  }),
  bodyMedium: Platform.select({
    web: "Inter Variable",
    default: "Inter_500Medium",
  }),
  bodyBold: Platform.select({
    web: "Inter Variable",
    default: "Inter_700Bold",
  }),
  bodyBlack: Platform.select({
    web: "Inter Variable",
    default: "Inter_900Black",
  }),
  heading: Platform.select({
    web: "Anton",
    default: "Anton_400Regular",
  }),
  display: Platform.select({
    web: "Bangers",
    default: "Bangers_400Regular",
  }),
} as const;

export type NativeFontWeight = "regular" | "medium" | "bold" | "black";

export function nativeBodyFontForWeight(weight: NativeFontWeight) {
  if (weight === "medium") {
    return nativeFontFamilies.bodyMedium;
  }

  if (weight === "bold") {
    return nativeFontFamilies.bodyBold;
  }

  if (weight === "black") {
    return nativeFontFamilies.bodyBlack;
  }

  return nativeFontFamilies.body;
}
