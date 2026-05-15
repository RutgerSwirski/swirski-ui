"use client";

import { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import {
  playgroundDefinitions,
  type PlaygroundControl,
  type PlaygroundValue,
  type PlaygroundValues,
} from "@/content/playgrounds";
import { Select } from "@swirski/ui";

type ComponentPlaygroundProps = {
  slug: string;
  fallbackUsageCode: string;
};

const fieldClass =
  "w-full border-4 border-black bg-white px-3 py-2 text-sm font-black shadow-[4px_4px_0_#0B0B0C]";

const controlLabelClass = "grid gap-2 text-xs font-black uppercase text-black/60";

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
  if (control.type === "select") {
    return (
      <div className={controlLabelClass}>
        <span>{control.label}</span>
        <Select
          options={control.options.map((option) => ({
            value: option,
            label: option,
          }))}
          value={String(value)}
          onValueChange={onChange}
        />
      </div>
    );
  }

  if (control.type === "text") {
    return (
      <label className={controlLabelClass}>
        {control.label}
        <input
          className={fieldClass}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  if (control.type === "number") {
    const numberValue = typeof value === "number" ? value : Number(value);

    return (
      <label className={controlLabelClass}>
        <span className="flex items-center justify-between gap-3">
          {control.label}
          <span className="text-black">{numberValue}</span>
        </span>
        <input
          className="accent-[#0057FF]"
          type="range"
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          value={numberValue}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </label>
    );
  }

  if (control.type === "color") {
    return (
      <label className={controlLabelClass}>
        {control.label}
        <span className="grid grid-cols-[3rem_1fr] gap-3">
          <input
            aria-label={control.label}
            className="h-11 w-full border-4 border-black bg-white p-1 shadow-[4px_4px_0_#0B0B0C]"
            type="color"
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
          />
          <input
            className={fieldClass}
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
          />
        </span>
      </label>
    );
  }

  return (
    <label className="flex items-center justify-between gap-4 border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase text-black/60 shadow-[4px_4px_0_#0B0B0C]">
      {control.label}
      <input
        className="size-5 accent-[#0057FF]"
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function UsageCodePanel({ code }: { code: string }) {
  return (
    <section id="usage" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
        <h2 className="font-anton text-4xl uppercase leading-none">Usage</h2>
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
              <h2 className="font-anton text-4xl uppercase leading-none">
                Playground
              </h2>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 font-bold leading-7 shadow-[10px_10px_0_#0B0B0C]">
            This component does not have editable controls yet.
          </div>
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
            <h2 className="font-anton text-4xl uppercase leading-none">
              Playground
            </h2>
          </div>

          <p className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C]">
            {definition.controls.length} controls
          </p>
        </div>

        <div className="grid border-4 border-black bg-white shadow-[10px_10px_0_#0B0B0C] lg:grid-cols-[1fr_18rem]">
          <div className="min-h-80 bg-[#F5F5F3] p-6 md:p-10">
            {definition.render(values)}
          </div>

          <div className="border-t-4 border-black bg-white p-5 lg:border-l-4 lg:border-t-0">
            <p className="mb-4 text-xs font-black uppercase text-black/55">
              Controls
            </p>
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
        </div>
      </section>

      <UsageCodePanel code={definition.getCode(values)} />
    </>
  );
}
