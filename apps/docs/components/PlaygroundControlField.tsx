"use client";

import type {
  PlaygroundControl,
  PlaygroundValue,
} from "@/content/components/playgrounds";
import {
  Badge,
  Checkbox,
  Field,
  Grid,
  Input,
  Label,
  Select,
  Slider,
  Text,
} from "@swirski/ui";

type PlaygroundControlFieldProps = {
  control: PlaygroundControl;
  value: PlaygroundValue;
  onChange: (value: PlaygroundValue) => void;
};

function controlId(name: string) {
  return `playground-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

export default function PlaygroundControlField({
  control,
  value,
  onChange,
}: PlaygroundControlFieldProps) {
  const fieldId = controlId(control.name);

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
        <Grid gap="sm" className="grid-cols-[3rem_1fr]">
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
        </Grid>
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
