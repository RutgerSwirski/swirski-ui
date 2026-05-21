"use client";

import {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNavbar,
  AppShellSidebar,
  Badge,
  Button,
  Card,
  CardContent,
  Grid,
  Text,
  Title,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  booleanValue,
} from "../playground-utils";

export const appShellPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "side",
      label: "side",
      type: "select",
      defaultValue: "left",
      options: ["left", "right"],
    },
    {
      name: "width",
      label: "width",
      type: "select",
      defaultValue: "md",
      options: ["sm", "md", "lg"],
    },
    {
      name: "contentWidth",
      label: "contentWidth",
      type: "select",
      defaultValue: "lg",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    {
      name: "compact",
      label: "compact",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <AppShell
      className="w-full overflow-hidden border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] shadow-[var(--sw-shadow-md)]"
      style={{ minHeight: "28rem" }}
      variant={booleanValue(values, "compact") ? "compact" : "default"}
    >
      <AppShellSidebar
        aria-label="Playground navigation"
        className="gap-4 p-4"
        collapseBelow="never"
        side={textValue(values, "side") as "left" | "right"}
        sticky={false}
        style={{ minHeight: "100%" }}
        width={textValue(values, "width") as "sm" | "md" | "lg"}
      >
        <div>
          <Title order={3} size="h5">
            Studio
          </Title>
          <Text size="sm" tone="muted" weight="bold">
            Workspace
          </Text>
        </div>
        <Grid gap="sm">
          {["Overview", "Pieces", "Drops"].map((item, index) => (
            <Button
              className="justify-start shadow-none"
              href="#preview"
              key={item}
              tone={index === 0 ? "yellow" : "white"}
              variant="outline"
            >
              {item}
            </Button>
          ))}
        </Grid>
      </AppShellSidebar>
      <AppShellBody style={{ minHeight: "100%" }}>
        <AppShellNavbar className="justify-between" sticky={false}>
          <Text weight="black">Studio workspace</Text>
          <Badge tone="blue">Live</Badge>
        </AppShellNavbar>
        <AppShellMain className="bg-[var(--sw-color-paper)]">
          <AppShellContent
            className="space-y-4"
            width={
              textValue(values, "contentWidth") as
                | "sm"
                | "md"
                | "lg"
                | "xl"
                | "full"
            }
          >
            <div>
              <Title order={2} size="h4">
                Dashboard
              </Title>
              <Text size="sm" tone="muted" weight="bold">
                App chrome, content rail and regions move together.
              </Text>
            </div>
            <Grid className="sm:grid-cols-3" gap="sm">
              {["Orders", "Drafts", "Revenue"].map((item) => (
                <Card interactive={false} key={item} withShadow={false}>
                  <CardContent>
                    <Text size="sm" weight="black">
                      {item}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </AppShellContent>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
  getCode: (values) => `<AppShell${booleanValue(values, "compact") ? ' variant="compact"' : ""}>
  <AppShellSidebar
    aria-label="Workspace navigation"
    side=${jsxString(textValue(values, "side"))}
    width=${jsxString(textValue(values, "width"))}
  >
    <nav>...</nav>
  </AppShellSidebar>
  <AppShellBody>
    <AppShellNavbar>Studio workspace</AppShellNavbar>
    <AppShellMain>
      <AppShellContent width=${jsxString(textValue(values, "contentWidth"))}>
        Page content
      </AppShellContent>
    </AppShellMain>
  </AppShellBody>
</AppShell>`,
};
