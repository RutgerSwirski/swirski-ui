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
    ios: "Inter-Regular",
    android: "Inter_400Regular",
    default: "Inter_400Regular",
  })!,
  bodyMedium: Platform.select({
    web: "Inter Variable",
    ios: "Inter-Medium",
    android: "Inter_500Medium",
    default: "Inter_500Medium",
  })!,
  bodyBold: Platform.select({
    web: "Inter Variable",
    ios: "Inter-Bold",
    android: "Inter_700Bold",
    default: "Inter_700Bold",
  })!,
  bodyBlack: Platform.select({
    web: "Inter Variable",
    ios: "Inter-Black",
    android: "Inter_900Black",
    default: "Inter_900Black",
  })!,
  heading: Platform.select({
    web: "Anton",
    ios: "Anton-Regular",
    android: "Anton_400Regular",
    default: "Anton_400Regular",
  })!,
  display: Platform.select({
    web: "Bangers",
    ios: "Bangers-Regular",
    android: "Bangers_400Regular",
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
