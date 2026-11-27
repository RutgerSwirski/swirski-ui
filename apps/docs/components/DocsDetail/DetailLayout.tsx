import { Button, Card, CardContent, Grid, Text } from "@swirski/ui";
import type { ReactNode } from "react";

export type BreakdownItem = {
  title: string;
};

export function DetailLayout({
  breakdownItems,
  children,
}: {
  breakdownItems: BreakdownItem[];
  children: ReactNode;
}) {
  return (
    <Grid className="gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
      <DocsSidebar items={breakdownItems} />
      <Grid className="gap-12">{children}</Grid>
    </Grid>
  );
}

function DocsSidebar({ items }: { items: BreakdownItem[] }) {
  return (
    <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
      <Card
        interactive={false}
        className="min-w-0 bg-docs-surface shadow-[7px_7px_0_var(--sw-color-shadow)]"
      >
        <CardContent>
          <Text className="mb-4 uppercase" size="xs" tone="muted" weight="black">
            Breakdown
          </Text>

          <Grid gap="sm">
            {items.map((item) => (
              <Button
                key={item.title}
                href={`#${item.title.toLowerCase()}`}
                tone="white"
                className="justify-start px-3 py-2 text-xs"
              >
                {item.title}
              </Button>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </aside>
  );
}
