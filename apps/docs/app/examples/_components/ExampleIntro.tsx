import { SectionLabel, Text, Title } from "@swirski/ui";

type ExampleIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export default function ExampleIntro({
  eyebrow,
  title,
  body,
}: ExampleIntroProps) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <SectionLabel>{eyebrow}</SectionLabel>
        <Title className="mt-6 max-w-4xl" order={2} size="h2">
          {title}
        </Title>
      </div>
      <Text className="max-w-md" tone="muted" weight="bold">
        {body}
      </Text>
    </div>
  );
}
