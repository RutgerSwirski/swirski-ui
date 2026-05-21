"use client";

import { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import PlaygroundControlField from "@/components/PlaygroundControlField";
import {
  playgroundDefinitions,
  type PlaygroundControl,
  type PlaygroundValue,
  type PlaygroundValues,
} from "@/content/components/playgrounds";
import {
  Badge,
  Card,
  CardContent,
  Grid,
  Text,
  Title,
} from "@swirski/ui";

type ComponentPlaygroundProps = {
  slug: string;
  fallbackUsageCode: string;
};

function getDefaultValues(controls: PlaygroundControl[]) {
  return controls.reduce<PlaygroundValues>((values, control) => {
    values[control.name] = control.defaultValue;
    return values;
  }, {});
}

function UsageCodePanel({ code }: { code: string }) {
  return (
    <section id="usage" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
        <Title order={2} size="h3">
          Usage
        </Title>
      </div>

      <CodeBlock code={code} />
    </section>
  );
}

export default function ComponentPlayground({
  slug,
  fallbackUsageCode,
}: ComponentPlaygroundProps) {
  const definition = playgroundDefinitions[slug];
  const defaultValues = useMemo(
    () => (definition ? getDefaultValues(definition.controls) : {}),
    [definition],
  );
  const [values, setValues] = useState<PlaygroundValues>(defaultValues);

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  if (!definition) {
    return (
      <>
        <section id="playground" className="min-w-0 scroll-mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-5 w-5 border-4 border-black bg-[#0057FF]" />
              <Title order={2} size="h3">
                Playground
              </Title>
            </div>
          </div>

          <Card
            interactive={false}
            className="min-w-0 overflow-hidden bg-white shadow-[6px_6px_0_#0B0B0C] sm:shadow-[10px_10px_0_#0B0B0C]"
          >
            <CardContent>
              <Text weight="bold">
                This component does not have editable controls yet.
              </Text>
            </CardContent>
          </Card>
        </section>

        <UsageCodePanel code={fallbackUsageCode} />
      </>
    );
  }

  function updateValue(name: string, value: PlaygroundValue) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  return (
    <>
      <section id="playground" className="min-w-0 scroll-mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 border-4 border-black bg-[#0057FF]" />
            <Title order={2} size="h3">
              Playground
            </Title>
          </div>

          <Badge tone="white">
            {definition.controls.length} controls
          </Badge>
        </div>

        <Card
          interactive={false}
          className="min-w-0 overflow-hidden bg-white shadow-[6px_6px_0_#0B0B0C] sm:shadow-[10px_10px_0_#0B0B0C]"
        >
          <Grid className="lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-visible bg-[#F5F5F3] p-4 sm:min-h-80 sm:p-6 md:p-10">
              <div className="w-max min-w-full max-w-none">
                {definition.render(values)}
              </div>
            </div>

            <div className="min-w-0 border-t-4 border-black bg-white p-4 sm:p-5 lg:border-l-4 lg:border-t-0">
              <Text
                className="mb-4 uppercase"
                size="xs"
                tone="muted"
                weight="black"
              >
                Controls
              </Text>
              <Grid gap="md">
                {definition.controls.map((control) => (
                  <PlaygroundControlField
                    key={control.name}
                    control={control}
                    value={values[control.name] ?? control.defaultValue}
                    onChange={(value) => updateValue(control.name, value)}
                  />
                ))}
              </Grid>
            </div>
          </Grid>
        </Card>
      </section>

      <UsageCodePanel code={definition.getCode(values)} />
    </>
  );
}
