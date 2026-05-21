"use client";

import {
  Button,
  Grid,
  SwirskiProvider,
  Text,
  Title,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
} from "../playground-utils";

export const swirskiProviderPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "colorBlue",
      label: "colorBlue",
      type: "color",
      defaultValue: "#0057FF",
    },
    {
      name: "colorYellow",
      label: "colorYellow",
      type: "color",
      defaultValue: "#FFD400",
    },
    {
      name: "colorShadow",
      label: "colorShadow",
      type: "color",
      defaultValue: "#0B0B0C",
    },
    {
      name: "buttonLabel",
      label: "buttonLabel",
      type: "text",
      defaultValue: "Theme button",
    },
  ],
  render: (values) => (
    <SwirskiProvider
      theme={{
        colorBlue: textValue(values, "colorBlue"),
        colorYellow: textValue(values, "colorYellow"),
        colorShadow: textValue(values, "colorShadow"),
      }}
    >
      <Grid className="max-w-md gap-4 border-4 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-paper)] p-5 shadow-[var(--sw-shadow-md)]">
        <Title order={3} size="h4">
          Token tuned
        </Title>
        <Text tone="muted" weight="bold">
          Components inside the provider read the same CSS variables.
        </Text>
        <Button>{textValue(values, "buttonLabel")}</Button>
      </Grid>
    </SwirskiProvider>
  ),
  getCode: (values) => `const theme = createSwirskiTheme({
  colorBlue: ${jsxString(textValue(values, "colorBlue"))},
  colorYellow: ${jsxString(textValue(values, "colorYellow"))},
  colorShadow: ${jsxString(textValue(values, "colorShadow"))},
});

<SwirskiProvider theme={theme}>
  <Button>${jsxText(textValue(values, "buttonLabel"))}</Button>
</SwirskiProvider>`,
};
