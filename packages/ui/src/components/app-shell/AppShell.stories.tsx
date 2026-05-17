import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../badge/Badge";
import { Button } from "../button/Button";
import { Card } from "../card/Card";
import { CardContent } from "../card/CardContent";
import { Grid } from "../grid/Grid";
import { Text } from "../typography/Text";
import { Title } from "../typography/Title";
import {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNavbar,
  AppShellSidebar,
} from "./AppShell";

const meta = {
  title: "Components/AppShell",
  component: AppShell,
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof AppShell>;

const navItems = ["Overview", "Pieces", "Orders", "Settings"];
const metricItems = ["Orders", "Drafts", "Revenue"];

function ShellSidebar({
  active = "Overview",
}: {
  active?: string;
}) {
  return (
    <>
      <div>
        <Title order={2} size="h5">
          Studio
        </Title>
        <Text size="sm" tone="muted" weight="bold">
          Workspace
        </Text>
      </div>

      <nav aria-label="Studio sections" className="grid gap-2">
        {navItems.map((item) => (
          <Button
            className="justify-start shadow-none"
            href="#"
            key={item}
            tone={item === active ? "yellow" : "white"}
            variant="outline"
          >
            {item}
          </Button>
        ))}
      </nav>
    </>
  );
}

function ShellContent() {
  return (
    <AppShellContent className="space-y-5">
      <div>
        <Title order={1} size="h3">
          Dashboard
        </Title>
        <Text tone="muted" weight="bold">
          Review active drops, drafts and storefront activity.
        </Text>
      </div>

      <Grid className="md:grid-cols-3" gap="md">
        {metricItems.map((item) => (
          <Card interactive={false} key={item} withShadow={false}>
            <CardContent>
              <Text size="sm" tone="muted" weight="bold">
                {item}
              </Text>
              <Title order={2} size="h4">
                {item === "Revenue" ? "$12.8k" : item === "Drafts" ? "8" : "24"}
              </Title>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Card interactive={false} withShadow={false}>
        <CardContent>
          <Title order={2} size="h4">
            Launch queue
          </Title>
          <Text tone="muted" weight="bold">
            A roomy content rail for tables, forms and repeated app workflows.
          </Text>
        </CardContent>
      </Card>
    </AppShellContent>
  );
}

export const Default: Story = {
  render: () => (
    <AppShell>
      <AppShellSidebar aria-label="Workspace navigation" className="gap-5 p-5">
        <ShellSidebar />
      </AppShellSidebar>

      <AppShellBody>
        <AppShellNavbar className="justify-between">
          <Text weight="black">Studio workspace</Text>
          <Badge tone="blue">Live</Badge>
        </AppShellNavbar>

        <AppShellMain>
          <ShellContent />
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};

export const CompactRightSidebar: Story = {
  render: () => (
    <AppShell size="sm" variant="compact">
      <AppShellSidebar
        aria-label="Workspace navigation"
        className="gap-4 p-4"
        side="right"
        width="sm"
      >
        <ShellSidebar active="Orders" />
      </AppShellSidebar>

      <AppShellBody>
        <AppShellNavbar className="justify-between">
          <Text weight="black">Compact workspace</Text>
          <Badge tone="yellow">Queued</Badge>
        </AppShellNavbar>

        <AppShellMain>
          <ShellContent />
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};
