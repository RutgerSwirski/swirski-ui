export const swirskiFontFamilies = {
  body: {
    native: "Inter",
    web: 'var(--font-inter, "Inter Variable", "Inter", system-ui, sans-serif)',
  },
  heading: {
    native: "Anton",
    web: 'var(--font-anton, "Anton", Impact, sans-serif)',
  },
  display: {
    native: "Bangers",
    web: 'var(--font-bangers, "Bangers", Impact, fantasy)',
  },
} as const;

export const swirskiTypography = {
  fontFamilies: swirskiFontFamilies,
  button: {
    sm: {
      fontFamily: swirskiFontFamilies.body.native,
      fontSize: 12,
      fontWeight: "900" as const,
      lineHeight: 16,
      textTransform: "uppercase" as const,
    },
    md: {
      fontFamily: swirskiFontFamilies.body.native,
      fontSize: 14,
      fontWeight: "900" as const,
      lineHeight: 18,
      textTransform: "uppercase" as const,
    },
    lg: {
      fontFamily: swirskiFontFamilies.body.native,
      fontSize: 16,
      fontWeight: "900" as const,
      lineHeight: 20,
      textTransform: "uppercase" as const,
    },
  },
} as const;
