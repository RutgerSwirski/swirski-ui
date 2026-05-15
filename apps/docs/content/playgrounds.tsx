"use client";

import type { ReactNode } from "react";
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

export type PlaygroundValue = string | number | boolean;
export type PlaygroundValues = Record<string, PlaygroundValue>;

type BaseControl = {
  name: string;
  label: string;
};

export type PlaygroundControl =
  | (BaseControl & {
      type: "text";
      defaultValue: string;
    })
  | (BaseControl & {
      type: "select";
      defaultValue: string;
      options: string[];
    })
  | (BaseControl & {
      type: "number";
      defaultValue: number;
      min: number;
      max: number;
      step?: number;
    })
  | (BaseControl & {
      type: "color";
      defaultValue: string;
    })
  | (BaseControl & {
      type: "boolean";
      defaultValue: boolean;
    });

export type PlaygroundDefinition = {
  controls: PlaygroundControl[];
  render: (values: PlaygroundValues) => ReactNode;
  getCode: (values: PlaygroundValues) => string;
};

function jsxString(value: string) {
  return JSON.stringify(value);
}

function jsxText(value: string) {
  return value.replace(/[{}<>]/g, (character) => {
    if (character === "{") {
      return "&#123;";
    }

    if (character === "}") {
      return "&#125;";
    }

    if (character === "<") {
      return "&lt;";
    }

    return "&gt;";
  });
}

function textValue(values: PlaygroundValues, key: string) {
  return String(values[key] ?? "");
}

function numberValue(values: PlaygroundValues, key: string) {
  const value = values[key];
  return typeof value === "number" ? value : Number(value);
}

function booleanValue(values: PlaygroundValues, key: string) {
  return Boolean(values[key]);
}

const cardSurfaceClasses = {
  cream: "bg-[#F5F5F3]",
  white: "bg-white",
  yellow: "bg-[#FFD400]",
};

// Add a new entry keyed by component slug to give that docs page editable controls.
export const playgroundDefinitions: Record<string, PlaygroundDefinition> = {
  button: {
    controls: [
      {
        name: "children",
        label: "children",
        type: "text",
        defaultValue: "View pieces",
      },
      {
        name: "variant",
        label: "variant",
        type: "select",
        defaultValue: "blue",
        options: ["blue", "yellow", "white"],
      },
      { name: "href", label: "href", type: "boolean", defaultValue: true },
      {
        name: "disabled",
        label: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => {
      const asLink = booleanValue(values, "href");

      return (
        <Button
          disabled={!asLink && booleanValue(values, "disabled")}
          href={asLink ? "#preview" : undefined}
          variant={textValue(values, "variant") as "blue" | "yellow" | "white"}
        >
          {textValue(values, "children")}
        </Button>
      );
    },
    getCode: (values) => {
      const asLink = booleanValue(values, "href");
      const props = [
        asLink ? 'href="#preview"' : null,
        `variant=${jsxString(textValue(values, "variant"))}`,
        !asLink && booleanValue(values, "disabled") ? "disabled" : null,
      ].filter(Boolean);

      return `<Button ${props.join(" ")}>
  ${jsxText(textValue(values, "children"))}
</Button>`;
    },
  },

  card: {
    controls: [
      {
        name: "title",
        label: "title",
        type: "text",
        defaultValue: "Patchwork Jacket",
      },
      {
        name: "surface",
        label: "surface",
        type: "select",
        defaultValue: "cream",
        options: ["cream", "white", "yellow"],
      },
      {
        name: "interactive",
        label: "interactive",
        type: "boolean",
        defaultValue: true,
      },
    ],
    render: (values) => {
      const surface = textValue(
        values,
        "surface",
      ) as keyof typeof cardSurfaceClasses;

      return (
        <Card
          className={`max-w-sm ${cardSurfaceClasses[surface]} shadow-[8px_8px_0_#0B0B0C]`}
          interactive={booleanValue(values, "interactive")}
        >
          <CardContent>
            <CardTitle>{textValue(values, "title")}</CardTitle>
            <p className="mt-3 text-sm font-bold leading-6 text-black/65">
              A framed content primitive with Swirski borders and shadows.
            </p>
          </CardContent>
        </Card>
      );
    },
    getCode: (values) => {
      const surface = textValue(values, "surface");
      const surfaceClass = cardSurfaceClasses[surface as keyof typeof cardSurfaceClasses];
      const interactive = booleanValue(values, "interactive");

      return `<Card
  className=${jsxString(`max-w-sm ${surfaceClass} shadow-[8px_8px_0_#0B0B0C]`)}
  interactive={${interactive}}
>
  <CardContent>
    <CardTitle>${jsxText(textValue(values, "title"))}</CardTitle>
    <p className="mt-3 text-sm font-bold leading-6 text-black/65">
      A framed content primitive with Swirski borders and shadows.
    </p>
  </CardContent>
</Card>`;
    },
  },

  "hero-title": {
    controls: [
      {
        name: "children",
        label: "children",
        type: "text",
        defaultValue: "Build expressive interfaces.",
      },
      {
        name: "size",
        label: "size",
        type: "select",
        defaultValue: "large",
        options: ["large", "compact"],
      },
    ],
    render: (values) => (
      <HeroTitle
        className={
          textValue(values, "size") === "large"
            ? "max-w-2xl text-6xl md:text-8xl"
            : "max-w-xl text-4xl md:text-6xl"
        }
      >
        {textValue(values, "children")}
      </HeroTitle>
    ),
    getCode: (values) => {
      const className =
        textValue(values, "size") === "large"
          ? "max-w-2xl text-6xl md:text-8xl"
          : "max-w-xl text-4xl md:text-6xl";

      return `<HeroTitle className=${jsxString(className)}>
  ${jsxText(textValue(values, "children"))}
</HeroTitle>`;
    },
  },

  "hero-lead": {
    controls: [
      {
        name: "children",
        label: "children",
        type: "text",
        defaultValue:
          "A small UI library for expressive, editorial web interfaces.",
      },
    ],
    render: (values) => (
      <HeroLead className="text-xl">{textValue(values, "children")}</HeroLead>
    ),
    getCode: (values) => `<HeroLead className="text-xl">
  ${jsxText(textValue(values, "children"))}
</HeroLead>`,
  },

  "dot-grid": {
    controls: [
      { name: "color", label: "color", type: "color", defaultValue: "#0B0B0C" },
      {
        name: "accentColor",
        label: "accentColor",
        type: "color",
        defaultValue: "#FF3131",
      },
      {
        name: "opacity",
        label: "opacity",
        type: "number",
        defaultValue: 0.38,
        min: 0.05,
        max: 1,
        step: 0.01,
      },
      {
        name: "spacing",
        label: "spacing",
        type: "number",
        defaultValue: 14,
        min: 6,
        max: 40,
      },
      {
        name: "dotSize",
        label: "dotSize",
        type: "number",
        defaultValue: 1.8,
        min: 0.5,
        max: 6,
        step: 0.1,
      },
      {
        name: "accentEvery",
        label: "accentEvery",
        type: "number",
        defaultValue: 5,
        min: 0,
        max: 10,
      },
    ],
    render: (values) => (
      <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
        <DotGrid
          className="inset-0"
          color={textValue(values, "color")}
          opacity={numberValue(values, "opacity")}
          spacing={numberValue(values, "spacing")}
          dotSize={numberValue(values, "dotSize")}
          accentColor={textValue(values, "accentColor")}
          accentEvery={numberValue(values, "accentEvery")}
          accentDotSize={5}
        />
      </div>
    ),
    getCode: (values) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
  <DotGrid
    className="inset-0"
    color=${jsxString(textValue(values, "color"))}
    opacity={${numberValue(values, "opacity")}}
    spacing={${numberValue(values, "spacing")}}
    dotSize={${numberValue(values, "dotSize")}}
    accentColor=${jsxString(textValue(values, "accentColor"))}
    accentEvery={${numberValue(values, "accentEvery")}}
    accentDotSize={5}
  />
</div>`,
  },

  "line-grid": {
    controls: [
      { name: "color", label: "color", type: "color", defaultValue: "#0B0B0C" },
      {
        name: "accentColor",
        label: "accentColor",
        type: "color",
        defaultValue: "#FF3131",
      },
      {
        name: "direction",
        label: "direction",
        type: "select",
        defaultValue: "both",
        options: ["both", "horizontal", "vertical"],
      },
      {
        name: "opacity",
        label: "opacity",
        type: "number",
        defaultValue: 0.34,
        min: 0.05,
        max: 1,
        step: 0.01,
      },
      {
        name: "spacing",
        label: "spacing",
        type: "number",
        defaultValue: 18,
        min: 6,
        max: 48,
      },
      {
        name: "thickness",
        label: "thickness",
        type: "number",
        defaultValue: 2,
        min: 1,
        max: 10,
      },
      {
        name: "accentEvery",
        label: "accentEvery",
        type: "number",
        defaultValue: 4,
        min: 0,
        max: 10,
      },
    ],
    render: (values) => (
      <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
        <LineGrid
          className="inset-0"
          color={textValue(values, "color")}
          opacity={numberValue(values, "opacity")}
          spacing={numberValue(values, "spacing")}
          thickness={numberValue(values, "thickness")}
          direction={
            textValue(values, "direction") as "both" | "horizontal" | "vertical"
          }
          accentColor={textValue(values, "accentColor")}
          accentEvery={numberValue(values, "accentEvery")}
          accentThickness={5}
        />
      </div>
    ),
    getCode: (values) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
  <LineGrid
    className="inset-0"
    color=${jsxString(textValue(values, "color"))}
    opacity={${numberValue(values, "opacity")}}
    spacing={${numberValue(values, "spacing")}}
    thickness={${numberValue(values, "thickness")}}
    direction=${jsxString(textValue(values, "direction"))}
    accentColor=${jsxString(textValue(values, "accentColor"))}
    accentEvery={${numberValue(values, "accentEvery")}}
    accentThickness={5}
  />
</div>`,
  },

  "diagonal-lines": {
    controls: [
      { name: "color", label: "color", type: "color", defaultValue: "#0B0B0C" },
      {
        name: "accentColor",
        label: "accentColor",
        type: "color",
        defaultValue: "#FF3131",
      },
      {
        name: "angle",
        label: "angle",
        type: "number",
        defaultValue: -35,
        min: -90,
        max: 90,
      },
      {
        name: "opacity",
        label: "opacity",
        type: "number",
        defaultValue: 0.3,
        min: 0.05,
        max: 1,
        step: 0.01,
      },
      {
        name: "spacing",
        label: "spacing",
        type: "number",
        defaultValue: 18,
        min: 6,
        max: 48,
      },
      {
        name: "thickness",
        label: "thickness",
        type: "number",
        defaultValue: 2,
        min: 1,
        max: 10,
      },
      {
        name: "accentEvery",
        label: "accentEvery",
        type: "number",
        defaultValue: 6,
        min: 0,
        max: 10,
      },
    ],
    render: (values) => (
      <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
        <DiagonalLines
          className="inset-0"
          angle={numberValue(values, "angle")}
          color={textValue(values, "color")}
          opacity={numberValue(values, "opacity")}
          spacing={numberValue(values, "spacing")}
          thickness={numberValue(values, "thickness")}
          accentColor={textValue(values, "accentColor")}
          accentEvery={numberValue(values, "accentEvery")}
          accentThickness={8}
        />
      </div>
    ),
    getCode: (values) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
  <DiagonalLines
    className="inset-0"
    angle={${numberValue(values, "angle")}}
    color=${jsxString(textValue(values, "color"))}
    opacity={${numberValue(values, "opacity")}}
    spacing={${numberValue(values, "spacing")}}
    thickness={${numberValue(values, "thickness")}}
    accentColor=${jsxString(textValue(values, "accentColor"))}
    accentEvery={${numberValue(values, "accentEvery")}}
    accentThickness={8}
  />
</div>`,
  },

  cursor: {
    controls: [
      {
        name: "cursor",
        label: "cursor",
        type: "select",
        defaultValue: String(swirskiCursors[0]?.id ?? "bolt"),
        options: swirskiCursors.map((cursor) => String(cursor.id)),
      },
      {
        name: "side",
        label: "side",
        type: "select",
        defaultValue: "right",
        options: ["left", "right"],
      },
    ],
    render: (values) => (
      <CursorProvider
        className="relative min-h-72 overflow-hidden border-4 border-black bg-[#F5F5F3] p-6"
        cursor={textValue(values, "cursor") as CursorId}
        storageKey={false}
      >
        <CursorDock
          position="absolute"
          side={textValue(values, "side") as "left" | "right"}
        />
        <div className="flex min-h-48 flex-col justify-center gap-5">
          <Button variant="yellow">Hover me</Button>
          <a className="w-fit font-black underline" href="#preview">
            Link cursor
          </a>
        </div>
      </CursorProvider>
    ),
    getCode: (values) => `<CursorProvider
  className="relative min-h-72 overflow-hidden border-4 border-black bg-[#F5F5F3] p-6"
  cursor=${jsxString(textValue(values, "cursor"))}
  storageKey={false}
>
  <CursorDock position="absolute" side=${jsxString(textValue(values, "side"))} />
  <div className="flex min-h-48 flex-col justify-center gap-5">
    <Button variant="yellow">Hover me</Button>
    <a className="w-fit font-black underline" href="#preview">
      Link cursor
    </a>
  </div>
</CursorProvider>`,
  },
};
