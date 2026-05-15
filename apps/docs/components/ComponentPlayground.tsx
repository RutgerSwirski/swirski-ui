"use client";

import { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import {
  playgroundDefinitions,
  type PlaygroundControl,
  type PlaygroundValue,
  type PlaygroundValues,
} from "@/content/playgrounds";
import {
  Badge,
  Card,
  CardContent,
  Checkbox,
  Field,
  Input,
  Label,
  Select,
  Slider,
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

function ControlField({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl;
  value: PlaygroundValue;
  onChange: (value: PlaygroundValue) => void;
}) {
  const fieldId = `playground-${control.name
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()}`;

  if (control.type === "select") {
    return (
      <Field>
        <Label>{control.label}</Label>
        <Select
          options={control.options.map((option) => ({
            value: option,
            label: option,
          }))}
          value={String(value)}
          onValueChange={onChange}
        />
      </Field>
    );
  }

  if (control.type === "text") {
    return (
      <Field>
        <Label htmlFor={fieldId}>{control.label}</Label>
        <Input
          id={fieldId}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      </Field>
    );
  }

  if (control.type === "number") {
    const numberValue = typeof value === "number" ? value : Number(value);

    return (
      <Field>
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={fieldId}>{control.label}</Label>
          <Badge size="sm" tone="white">
            {numberValue}
          </Badge>
        </div>
        <Slider
          id={fieldId}
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          value={numberValue}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </Field>
    );
  }

  if (control.type === "color") {
    return (
      <Field>
        <Label htmlFor={fieldId}>{control.label}</Label>
        <div className="grid grid-cols-[3rem_1fr] gap-3">
          <Input
            id={fieldId}
            className="p-1"
            type="color"
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
          />
          <Input
            aria-label={`${control.label} value`}
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </Field>
    );
  }

  return (
    <Field className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#0B0B0C]">
      <Checkbox
        label={
          <Text component="span" size="xs" weight="black" className="uppercase">
            {control.label}
          </Text>
        }
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    </Field>
  );
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
        <section id="playground" className="scroll-mt-8">
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
            className="bg-white shadow-[10px_10px_0_#0B0B0C]"
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
      <section id="playground" className="scroll-mt-8">
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
          className="grid bg-white shadow-[10px_10px_0_#0B0B0C] lg:grid-cols-[1fr_18rem]"
        >
          <div className="min-h-80 bg-[#F5F5F3] p-6 md:p-10">
            {definition.render(values)}
          </div>

          <div className="border-t-4 border-black bg-white p-5 lg:border-l-4 lg:border-t-0">
            <Text
              className="mb-4 uppercase"
              size="xs"
              tone="muted"
              weight="black"
            >
              Controls
            </Text>
            <div className="grid gap-4">
              {definition.controls.map((control) => (
                <ControlField
                  key={control.name}
                  control={control}
                  value={values[control.name] ?? control.defaultValue}
                  onChange={(value) => updateValue(control.name, value)}
                />
              ))}
            </div>
          </div>
        </Card>
      </section>

      <UsageCodePanel code={definition.getCode(values)} />
    </>
  );
}
