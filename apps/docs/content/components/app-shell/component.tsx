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
import type { ComponentDoc } from "../../types";

export const appShellComponentDoc: ComponentDoc = {
  slug: "app-shell",
  title: "AppShell",
  description:
    "Composable application layout primitives for sidebars, navbars and bounded page content.",
  category: "Layout",
  importCode: `import {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNavbar,
  AppShellSidebar,
} from "@swirski/ui";`,
  usageCode: `<AppShell>
  <AppShellSidebar aria-label="Workspace navigation">
    <nav>...</nav>
  </AppShellSidebar>
  <AppShellBody>
    <AppShellNavbar>Studio workspace</AppShellNavbar>
    <AppShellMain>
      <AppShellContent>
        Page content
      </AppShellContent>
    </AppShellMain>
  </AppShellBody>
</AppShell>`,
  compositionCode: `AppShell
|-- AppShellSidebar
\`-- AppShellBody
    |-- AppShellNavbar
    \`-- AppShellMain
        \`-- AppShellContent`,
  preview: (
    <AppShell
      className="w-full overflow-hidden border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] shadow-[var(--sw-shadow-md)]"
      style={{ minHeight: "28rem" }}
    >
      <AppShellSidebar
        aria-label="Project navigation"
        className="gap-4 p-4"
        collapseBelow="never"
        sticky={false}
        style={{ minHeight: "100%" }}
        width="sm"
      >
        <div>
          <Title order={3} size="h5">
            Studio
          </Title>
          <Text size="sm" tone="muted" weight="bold">
            Command center
          </Text>
        </div>
        <nav aria-label="Project sections" className="grid gap-2">
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
        </nav>
      </AppShellSidebar>
      <AppShellBody style={{ minHeight: "100%" }}>
        <AppShellNavbar className="justify-between" sticky={false}>
          <Text weight="black">Studio workspace</Text>
          <Badge tone="blue">Live</Badge>
        </AppShellNavbar>
        <AppShellMain className="bg-[var(--sw-color-paper)]">
          <AppShellContent className="space-y-4" width="md">
            <div>
              <Title order={2} size="h4">
                Dashboard
              </Title>
              <Text size="sm" tone="muted" weight="bold">
                Sidebar, navbar and content rail stay aligned.
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
  props: [
    {
      name: "AppShell.children",
      type: "ReactNode",
      required: true,
      description: "Composed shell regions, usually sidebar and body.",
    },
    {
      name: "AppShell.size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Controls shared spacing and navbar height.",
    },
    {
      name: "AppShell.variant",
      type: '"default" | "compact"',
      defaultValue: '"default"',
      description: "Switches between regular and denser shell chrome.",
    },
    {
      name: "AppShell.tone",
      type: '"default" | "white" | "black"',
      defaultValue: '"default"',
      description: "Applies the root shell surface treatment.",
    },
    {
      name: "AppShell.asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the child as the root shell element.",
    },
    {
      name: "AppShellSidebar.width",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Controls the responsive sidebar width.",
    },
    {
      name: "AppShellSidebar.collapseBelow",
      type: '"md" | "lg" | "never"',
      defaultValue: '"md"',
      description: "Viewport where the sidebar is hidden below.",
    },
    {
      name: "AppShellSidebar.side",
      type: '"left" | "right"',
      defaultValue: '"left"',
      description: "Places the sidebar on either side of the shell.",
    },
    {
      name: "AppShellSidebar.sticky",
      type: "boolean",
      defaultValue: "true",
      description: "Pins the sidebar during page scrolling.",
    },
    {
      name: "AppShellNavbar.sticky",
      type: "boolean",
      defaultValue: "true",
      description: "Pins the navbar to the top edge while scrolling.",
    },
    {
      name: "AppShellContent.width",
      type: '"sm" | "md" | "lg" | "xl" | "full"',
      defaultValue: '"lg"',
      description: "Controls the maximum width of the content rail.",
    },
  ],
};
