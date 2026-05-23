import {
  Button,
  Grid,
  SwirskiProvider,
  Text,
  Title,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const swirskiProviderComponentDoc: ComponentDoc = {
  slug: "swirski-provider",
  title: "SwirskiProvider",
  description:
    "Theme provider for Swirski tokens, color schemes and per-app brand overrides.",
  category: "Theming",
  importCode: `import { SwirskiProvider, createSwirskiTheme } from "@swirski/ui";`,
  usageCode: `const theme = createSwirskiTheme({
  colorBlue: "#0047FF",
  colorYellow: "#FFE45C",
  shadowMd: "8px 8px 0 var(--sw-color-shadow)",
});

<SwirskiProvider theme={theme}>
  <App />
</SwirskiProvider>`,
  preview: (
    <SwirskiProvider
      theme={{
        colorBlue: "#5E2BFF",
        colorYellow: "#B8FF3D",
        colorShadow: "#5E2BFF",
      }}
    >
      <Grid className="max-w-md gap-4 border-4 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-paper)] p-5 shadow-[var(--sw-shadow-md)]">
        <Title order={3} size="h4">
          Token tuned
        </Title>
        <Text tone="muted" weight="bold">
          Components inside the provider read the same CSS variables.
        </Text>
        <Button>Theme button</Button>
      </Grid>
    </SwirskiProvider>
  ),
  props: [
    {
      name: "colorScheme",
      type: '"light" | "dark"',
      defaultValue: '"light"',
      description: "Selects the default light or dark token set.",
    },
    {
      name: "theme",
      type: "SwirskiTheme",
      description:
        "Overrides any Swirski token or adds custom CSS variables.",
    },
    {
      name: "createSwirskiTheme",
      type: "(theme: SwirskiTheme) => SwirskiTheme",
      description: "Small helper for typed theme objects.",
    },
    {
      name: "useSwirskiTheme",
      type: "() => SwirskiThemeTokens",
      description: "Reads the resolved theme inside React components.",
    },
  ],
};
