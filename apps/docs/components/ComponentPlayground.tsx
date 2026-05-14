"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  CursorDock,
  CursorProvider,
  DiagonalLines,
  DotGrid,
  HeroLead,
  HeroTitle,
  LineGrid,
  swirskiCursors,
} from "@swirski/ui";
import type { CursorId } from "@swirski/ui";

type ComponentPlaygroundProps = {
  slug: string;
};

type LineDirection = "both" | "horizontal" | "vertical";

const fieldClass =
  "w-full border-4 border-black bg-white px-3 py-2 text-sm font-black shadow-[4px_4px_0_#0B0B0C]";

const controlLabelClass = "grid gap-2 text-xs font-black uppercase text-black/60";

function SelectControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className={controlLabelClass}>
      {label}
      <select
        className={fieldClass}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={controlLabelClass}>
      {label}
      <input
        className={fieldClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function NumberControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className={controlLabelClass}>
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="text-black">{value}</span>
      </span>
      <input
        className="accent-[#0057FF]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={controlLabelClass}>
      {label}
      <span className="grid grid-cols-[3rem_1fr] gap-3">
        <input
          aria-label={label}
          className="h-11 w-full border-4 border-black bg-white p-1 shadow-[4px_4px_0_#0B0B0C]"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          className={fieldClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </span>
    </label>
  );
}

function ToggleControl({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase text-black/60 shadow-[4px_4px_0_#0B0B0C]">
      {label}
      <input
        className="size-5 accent-[#0057FF]"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

export default function ComponentPlayground({ slug }: ComponentPlaygroundProps) {
  const [buttonVariant, setButtonVariant] = useState<"blue" | "yellow" | "white">(
    "blue",
  );
  const [buttonLabel, setButtonLabel] = useState("View pieces");
  const [buttonAsLink, setButtonAsLink] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [cardInteractive, setCardInteractive] = useState(true);
  const [cardTitle, setCardTitle] = useState("Patchwork Jacket");
  const [cardSurface, setCardSurface] = useState<"cream" | "white" | "yellow">(
    "cream",
  );

  const [heroText, setHeroText] = useState("Build expressive interfaces.");
  const [heroSize, setHeroSize] = useState<"compact" | "large">("large");
  const [leadText, setLeadText] = useState(
    "A small UI library for expressive, editorial web interfaces.",
  );

  const [dotColor, setDotColor] = useState("#0B0B0C");
  const [dotAccentColor, setDotAccentColor] = useState("#FF3131");
  const [dotOpacity, setDotOpacity] = useState(0.38);
  const [dotSpacing, setDotSpacing] = useState(14);
  const [dotSize, setDotSize] = useState(1.8);
  const [dotAccentEvery, setDotAccentEvery] = useState(5);

  const [lineColor, setLineColor] = useState("#0B0B0C");
  const [lineAccentColor, setLineAccentColor] = useState("#FF3131");
  const [lineDirection, setLineDirection] = useState<LineDirection>("both");
  const [lineOpacity, setLineOpacity] = useState(0.34);
  const [lineSpacing, setLineSpacing] = useState(18);
  const [lineThickness, setLineThickness] = useState(2);
  const [lineAccentEvery, setLineAccentEvery] = useState(4);

  const [diagonalColor, setDiagonalColor] = useState("#0B0B0C");
  const [diagonalAccentColor, setDiagonalAccentColor] = useState("#FF3131");
  const [diagonalAngle, setDiagonalAngle] = useState(-35);
  const [diagonalOpacity, setDiagonalOpacity] = useState(0.3);
  const [diagonalSpacing, setDiagonalSpacing] = useState(18);
  const [diagonalThickness, setDiagonalThickness] = useState(2);
  const [diagonalAccentEvery, setDiagonalAccentEvery] = useState(6);

  const [cursorId, setCursorId] = useState(String(swirskiCursors[0]?.id ?? "bolt"));
  const [cursorSide, setCursorSide] = useState<"left" | "right">("right");

  const cardSurfaceClass = {
    cream: "bg-[#F5F5F3]",
    white: "bg-white",
    yellow: "bg-[#FFD400]",
  }[cardSurface];

  const renderPreview = () => {
    if (slug === "button") {
      return (
        <Button
          disabled={!buttonAsLink && buttonDisabled}
          href={buttonAsLink ? "#preview" : undefined}
          variant={buttonVariant}
        >
          {buttonLabel}
        </Button>
      );
    }

    if (slug === "card") {
      return (
        <Card
          className={`max-w-sm ${cardSurfaceClass} shadow-[8px_8px_0_#0B0B0C]`}
          interactive={cardInteractive}
        >
          <CardContent>
            <CardTitle>{cardTitle}</CardTitle>
            <p className="mt-3 text-sm font-bold leading-6 text-black/65">
              A framed content primitive with Swirski borders and shadows.
            </p>
          </CardContent>
        </Card>
      );
    }

    if (slug === "hero-title") {
      return (
        <HeroTitle
          className={
            heroSize === "large"
              ? "max-w-2xl text-6xl md:text-8xl"
              : "max-w-xl text-4xl md:text-6xl"
          }
        >
          {heroText}
        </HeroTitle>
      );
    }

    if (slug === "hero-lead") {
      return <HeroLead className="text-xl">{leadText}</HeroLead>;
    }

    if (slug === "dot-grid") {
      return (
        <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
          <DotGrid
            className="inset-0"
            color={dotColor}
            opacity={dotOpacity}
            spacing={dotSpacing}
            dotSize={dotSize}
            accentColor={dotAccentColor}
            accentEvery={dotAccentEvery}
            accentDotSize={5}
          />
        </div>
      );
    }

    if (slug === "line-grid") {
      return (
        <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
          <LineGrid
            className="inset-0"
            color={lineColor}
            opacity={lineOpacity}
            spacing={lineSpacing}
            thickness={lineThickness}
            direction={lineDirection}
            accentColor={lineAccentColor}
            accentEvery={lineAccentEvery}
            accentThickness={5}
          />
        </div>
      );
    }

    if (slug === "diagonal-lines") {
      return (
        <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
          <DiagonalLines
            className="inset-0"
            angle={diagonalAngle}
            color={diagonalColor}
            opacity={diagonalOpacity}
            spacing={diagonalSpacing}
            thickness={diagonalThickness}
            accentColor={diagonalAccentColor}
            accentEvery={diagonalAccentEvery}
            accentThickness={8}
          />
        </div>
      );
    }

    if (slug === "cursor") {
      return (
        <CursorProvider
          className="relative min-h-72 overflow-hidden border-4 border-black bg-[#F5F5F3] p-6"
          cursor={cursorId as CursorId}
          storageKey={false}
        >
          <CursorDock position="absolute" side={cursorSide} />
          <div className="flex min-h-48 flex-col justify-center gap-5">
            <Button variant="yellow">Hover me</Button>
            <a className="w-fit font-black underline" href="#preview">
              Link cursor
            </a>
          </div>
        </CursorProvider>
      );
    }

    return (
      <p className="text-sm font-bold leading-6 text-black/65">
        This component does not have editable controls yet.
      </p>
    );
  };

  const renderControls = () => {
    if (slug === "button") {
      return (
        <>
          <TextControl label="children" value={buttonLabel} onChange={setButtonLabel} />
          <SelectControl
            label="variant"
            value={buttonVariant}
            options={["blue", "yellow", "white"]}
            onChange={setButtonVariant}
          />
          <ToggleControl label="href" checked={buttonAsLink} onChange={setButtonAsLink} />
          <ToggleControl
            label="disabled"
            checked={buttonDisabled}
            onChange={setButtonDisabled}
          />
        </>
      );
    }

    if (slug === "card") {
      return (
        <>
          <TextControl label="title" value={cardTitle} onChange={setCardTitle} />
          <SelectControl
            label="surface"
            value={cardSurface}
            options={["cream", "white", "yellow"]}
            onChange={setCardSurface}
          />
          <ToggleControl
            label="interactive"
            checked={cardInteractive}
            onChange={setCardInteractive}
          />
        </>
      );
    }

    if (slug === "hero-title") {
      return (
        <>
          <TextControl label="children" value={heroText} onChange={setHeroText} />
          <SelectControl
            label="size"
            value={heroSize}
            options={["large", "compact"]}
            onChange={setHeroSize}
          />
        </>
      );
    }

    if (slug === "hero-lead") {
      return <TextControl label="children" value={leadText} onChange={setLeadText} />;
    }

    if (slug === "dot-grid") {
      return (
        <>
          <ColorControl label="color" value={dotColor} onChange={setDotColor} />
          <ColorControl
            label="accentColor"
            value={dotAccentColor}
            onChange={setDotAccentColor}
          />
          <NumberControl
            label="opacity"
            value={dotOpacity}
            min={0.05}
            max={1}
            step={0.01}
            onChange={setDotOpacity}
          />
          <NumberControl
            label="spacing"
            value={dotSpacing}
            min={6}
            max={40}
            onChange={setDotSpacing}
          />
          <NumberControl
            label="dotSize"
            value={dotSize}
            min={0.5}
            max={6}
            step={0.1}
            onChange={setDotSize}
          />
          <NumberControl
            label="accentEvery"
            value={dotAccentEvery}
            min={0}
            max={10}
            onChange={setDotAccentEvery}
          />
        </>
      );
    }

    if (slug === "line-grid") {
      return (
        <>
          <ColorControl label="color" value={lineColor} onChange={setLineColor} />
          <ColorControl
            label="accentColor"
            value={lineAccentColor}
            onChange={setLineAccentColor}
          />
          <SelectControl
            label="direction"
            value={lineDirection}
            options={["both", "horizontal", "vertical"]}
            onChange={setLineDirection}
          />
          <NumberControl
            label="opacity"
            value={lineOpacity}
            min={0.05}
            max={1}
            step={0.01}
            onChange={setLineOpacity}
          />
          <NumberControl
            label="spacing"
            value={lineSpacing}
            min={6}
            max={48}
            onChange={setLineSpacing}
          />
          <NumberControl
            label="thickness"
            value={lineThickness}
            min={1}
            max={10}
            onChange={setLineThickness}
          />
          <NumberControl
            label="accentEvery"
            value={lineAccentEvery}
            min={0}
            max={10}
            onChange={setLineAccentEvery}
          />
        </>
      );
    }

    if (slug === "diagonal-lines") {
      return (
        <>
          <ColorControl
            label="color"
            value={diagonalColor}
            onChange={setDiagonalColor}
          />
          <ColorControl
            label="accentColor"
            value={diagonalAccentColor}
            onChange={setDiagonalAccentColor}
          />
          <NumberControl
            label="angle"
            value={diagonalAngle}
            min={-90}
            max={90}
            onChange={setDiagonalAngle}
          />
          <NumberControl
            label="opacity"
            value={diagonalOpacity}
            min={0.05}
            max={1}
            step={0.01}
            onChange={setDiagonalOpacity}
          />
          <NumberControl
            label="spacing"
            value={diagonalSpacing}
            min={6}
            max={48}
            onChange={setDiagonalSpacing}
          />
          <NumberControl
            label="thickness"
            value={diagonalThickness}
            min={1}
            max={10}
            onChange={setDiagonalThickness}
          />
          <NumberControl
            label="accentEvery"
            value={diagonalAccentEvery}
            min={0}
            max={10}
            onChange={setDiagonalAccentEvery}
          />
        </>
      );
    }

    if (slug === "cursor") {
      return (
        <>
          <SelectControl
            label="cursor"
            value={cursorId}
            options={swirskiCursors.map((cursor) => String(cursor.id))}
            onChange={setCursorId}
          />
          <SelectControl
            label="side"
            value={cursorSide}
            options={["left", "right"]}
            onChange={setCursorSide}
          />
        </>
      );
    }

    return null;
  };

  return (
    <section id="playground" className="scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#0057FF]" />
          <h2 className="font-anton text-4xl uppercase leading-none">
            Playground
          </h2>
        </div>

        <p className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C]">
          Editable props
        </p>
      </div>

      <div className="grid border-4 border-black bg-white shadow-[10px_10px_0_#0B0B0C] lg:grid-cols-[1fr_18rem]">
        <div className="min-h-80 bg-[#F5F5F3] p-6 md:p-10">
          {renderPreview()}
        </div>

        <div className="border-t-4 border-black bg-white p-5 lg:border-l-4 lg:border-t-0">
          <p className="mb-4 text-xs font-black uppercase text-black/55">
            Controls
          </p>
          <div className="grid gap-4">{renderControls()}</div>
        </div>
      </div>
    </section>
  );
}
