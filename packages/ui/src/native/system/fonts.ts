import { Platform } from "react-native";

export type NativeFontFamilies = {
  body: string;
  bodyMedium: string;
  bodyBold: string;
  bodyBlack: string;
  heading: string;
  display: string;
};

const defaultNativeFontFamilies: NativeFontFamilies = {
  body: Platform.select({
    web: "Inter Variable",
    default: "Inter_400Regular",
  })!,
  bodyMedium: Platform.select({
    web: "Inter Variable",
    default: "Inter_500Medium",
  })!,
  bodyBold: Platform.select({
    web: "Inter Variable",
    default: "Inter_700Bold",
  })!,
  bodyBlack: Platform.select({
    web: "Inter Variable",
    default: "Inter_900Black",
  })!,
  heading: Platform.select({
    web: "Anton",
    default: "Anton_400Regular",
  })!,
  display: Platform.select({
    web: "Bangers",
    default: "Bangers_400Regular",
  })!,
};

export const nativeFontFamilies: NativeFontFamilies = {
  ...defaultNativeFontFamilies,
};

export type NativeFontWeight = "regular" | "medium" | "bold" | "black";

export function configureSwirskiNativeFonts(
  fontFamilies: Partial<NativeFontFamilies>,
) {
  Object.assign(nativeFontFamilies, fontFamilies);
}

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
