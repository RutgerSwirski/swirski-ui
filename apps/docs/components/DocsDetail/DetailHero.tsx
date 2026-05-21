import {
  Button,
  DotGrid,
  Grid,
  SectionLabel,
  Text,
  Title,
} from "@swirski/ui";
import type { ReactNode } from "react";

type DetailHeroAction = {
  href?: string;
  label: string;
};

type DetailHeroProps = {
  action: DetailHeroAction;
  description: string;
  eyebrow: string;
  index: number;
  metaLabel: string;
  title: string;
  toneClassName: string;
};

export function DetailHero({
  action,
  description,
  eyebrow,
  index,
  metaLabel,
  title,
  toneClassName,
}: DetailHeroProps) {
  return (
    <Grid
      as="section"
      gap="xl"
      className="py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] lg:items-end"
    >
      <div className="min-w-0 max-w-4xl">
        <SectionLabel>{eyebrow}</SectionLabel>

        <Title className="mt-6 break-words" size="display">
          {title}
        </Title>

        <Text className="mt-6 max-w-2xl" size="lg" tone="muted" weight="bold">
          {description}
        </Text>
      </div>

      <Grid gap="sm" className="w-full max-w-sm sm:max-w-sm lg:max-w-none">
        <div
          className={`border-4 border-black p-4 shadow-[6px_6px_0_#0B0B0C] ${toneClassName}`}
        >
          <Text className="uppercase text-current opacity-80" size="xs" weight="black">
            {metaLabel}
          </Text>

          <Title className="mt-1 text-current" order={2} size="h2">
            {String(index + 1).padStart(2, "0")}
          </Title>
        </div>

        <Button className="w-full" href={action.href}>
          {action.label}
        </Button>
      </Grid>
    </Grid>
  );
}

export function DetailHeaderFrame({
  accentColor,
  children,
}: {
  accentColor: string;
  children: ReactNode;
}) {
  return (
    <div className="relative border-b-4 border-black bg-white">
      <DotGrid
        className="inset-0"
        color={accentColor}
        opacity={0.12}
        spacing={14}
        dotSize={1}
      />

      {children}
    </div>
  );
}
