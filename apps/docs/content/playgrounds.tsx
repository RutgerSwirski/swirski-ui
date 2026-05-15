"use client";

import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  Checkbox,
  CursorDock,
  CursorProvider,
  DiagonalLines,
  DotGrid,
  Field,
  FieldError,
  FieldHint,
  Input,
  Label,
  LineGrid,
  Switch,
  Text,
  Textarea,
  Title,
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
  badge: {
    controls: [
      {
        name: "children",
        label: "children",
        type: "text",
        defaultValue: "New drop",
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "yellow",
        options: ["yellow", "blue", "red", "white", "black"],
      },
      {
        name: "size",
        label: "size",
        type: "select",
        defaultValue: "md",
        options: ["sm", "md"],
      },
    ],
    render: (values) => (
      <Badge
        tone={
          textValue(values, "tone") as "blue" | "yellow" | "red" | "white" | "black"
        }
        size={textValue(values, "size") as "sm" | "md"}
      >
        {textValue(values, "children")}
      </Badge>
    ),
    getCode: (values) => `<Badge
  tone=${jsxString(textValue(values, "tone"))}
  size=${jsxString(textValue(values, "size"))}
>
  ${jsxText(textValue(values, "children"))}
</Badge>`,
  },

  alert: {
    controls: [
      {
        name: "title",
        label: "title",
        type: "text",
        defaultValue: "Heads up",
      },
      {
        name: "description",
        label: "description",
        type: "text",
        defaultValue: "New components are ready to try in your next interface.",
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "yellow",
        options: ["yellow", "blue", "red", "white"],
      },
    ],
    render: (values) => (
      <Alert
        tone={textValue(values, "tone") as "blue" | "yellow" | "red" | "white"}
      >
        <AlertTitle>{textValue(values, "title")}</AlertTitle>
        <AlertDescription>{textValue(values, "description")}</AlertDescription>
      </Alert>
    ),
    getCode: (values) => `<Alert tone=${jsxString(textValue(values, "tone"))}>
  <AlertTitle>${jsxText(textValue(values, "title"))}</AlertTitle>
  <AlertDescription>
    ${jsxText(textValue(values, "description"))}
  </AlertDescription>
</Alert>`,
  },

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
      {
        name: "icon",
        label: "icon",
        type: "select",
        defaultValue: "none",
        options: ["none", "arrow-up-right", "github"],
      },
      {
        name: "iconSide",
        label: "iconSide",
        type: "select",
        defaultValue: "left",
        options: ["left", "right"],
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
      const icon = textValue(values, "icon");

      return (
        <Button
          disabled={!asLink && booleanValue(values, "disabled")}
          href={asLink ? "#preview" : undefined}
          icon={
            icon === "none" ? undefined : (icon as "arrow-up-right" | "github")
          }
          iconSide={textValue(values, "iconSide") as "left" | "right"}
          variant={textValue(values, "variant") as "blue" | "yellow" | "white"}
        >
          {textValue(values, "children")}
        </Button>
      );
    },
    getCode: (values) => {
      const asLink = booleanValue(values, "href");
      const icon = textValue(values, "icon");
      const props = [
        asLink ? 'href="#preview"' : null,
        `variant=${jsxString(textValue(values, "variant"))}`,
        icon !== "none" ? `icon=${jsxString(icon)}` : null,
        icon !== "none"
          ? `iconSide=${jsxString(textValue(values, "iconSide"))}`
          : null,
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

  field: {
    controls: [
      {
        name: "label",
        label: "label",
        type: "text",
        defaultValue: "Email",
      },
      {
        name: "placeholder",
        label: "placeholder",
        type: "text",
        defaultValue: "studio@swirski.dev",
      },
      {
        name: "helper",
        label: "helper",
        type: "text",
        defaultValue: "Use the address where clients can reach you.",
      },
      {
        name: "state",
        label: "state",
        type: "select",
        defaultValue: "hint",
        options: ["hint", "error", "none"],
      },
      {
        name: "multiline",
        label: "multiline",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "disabled",
        label: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => {
      const multiline = booleanValue(values, "multiline");
      const state = textValue(values, "state");
      const id = "playground-field";
      const controlProps = {
        id,
        placeholder: textValue(values, "placeholder"),
        disabled: booleanValue(values, "disabled"),
      };

      return (
        <Field className="max-w-md">
          <Label htmlFor={id}>{textValue(values, "label")}</Label>
          {multiline ? <Textarea {...controlProps} /> : <Input {...controlProps} />}
          {state === "hint" && <FieldHint>{textValue(values, "helper")}</FieldHint>}
          {state === "error" && (
            <FieldError>{textValue(values, "helper")}</FieldError>
          )}
        </Field>
      );
    },
    getCode: (values) => {
      const multiline = booleanValue(values, "multiline");
      const state = textValue(values, "state");
      const controlName = multiline ? "Textarea" : "Input";
      const disabled = booleanValue(values, "disabled") ? " disabled" : "";
      const helper =
        state === "hint"
          ? `\n  <FieldHint>${jsxText(textValue(values, "helper"))}</FieldHint>`
          : state === "error"
            ? `\n  <FieldError>${jsxText(textValue(values, "helper"))}</FieldError>`
            : "";

      return `<Field>
  <Label htmlFor="swirski-field">${jsxText(textValue(values, "label"))}</Label>
  <${controlName}
    id="swirski-field"
    placeholder=${jsxString(textValue(values, "placeholder"))}${disabled}
  />${helper}
</Field>`;
    },
  },

  checkbox: {
    controls: [
      {
        name: "label",
        label: "label",
        type: "text",
        defaultValue: "Send launch updates",
      },
      {
        name: "description",
        label: "description",
        type: "text",
        defaultValue: "A compact, native checkbox with a custom Swirski mark.",
      },
      {
        name: "checked",
        label: "checked",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "disabled",
        label: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <Checkbox
        checked={booleanValue(values, "checked")}
        description={textValue(values, "description")}
        disabled={booleanValue(values, "disabled")}
        label={textValue(values, "label")}
        readOnly
      />
    ),
    getCode: (values) => {
      const props = [
        `label=${jsxString(textValue(values, "label"))}`,
        `description=${jsxString(textValue(values, "description"))}`,
        booleanValue(values, "checked") ? "defaultChecked" : null,
        booleanValue(values, "disabled") ? "disabled" : null,
      ].filter(Boolean);

      return `<Checkbox
  ${props.join("\n  ")}
/>`;
    },
  },

  switch: {
    controls: [
      {
        name: "label",
        label: "label",
        type: "text",
        defaultValue: "Studio mode",
      },
      {
        name: "description",
        label: "description",
        type: "text",
        defaultValue: "Use switch semantics without giving up native forms.",
      },
      {
        name: "checked",
        label: "checked",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "disabled",
        label: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <Switch
        checked={booleanValue(values, "checked")}
        description={textValue(values, "description")}
        disabled={booleanValue(values, "disabled")}
        label={textValue(values, "label")}
        readOnly
      />
    ),
    getCode: (values) => {
      const props = [
        `label=${jsxString(textValue(values, "label"))}`,
        `description=${jsxString(textValue(values, "description"))}`,
        booleanValue(values, "checked") ? "defaultChecked" : null,
        booleanValue(values, "disabled") ? "disabled" : null,
      ].filter(Boolean);

      return `<Switch
  ${props.join("\n  ")}
/>`;
    },
  },

  accordion: {
    controls: [
      {
        name: "firstTitle",
        label: "firstTitle",
        type: "text",
        defaultValue: "What makes it Swirski?",
      },
      {
        name: "secondTitle",
        label: "secondTitle",
        type: "text",
        defaultValue: "Can I customize it?",
      },
      {
        name: "firstOpen",
        label: "firstOpen",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "secondOpen",
        label: "secondOpen",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <Accordion className="max-w-xl">
        <AccordionItem open={booleanValue(values, "firstOpen")}>
          <AccordionTrigger>{textValue(values, "firstTitle")}</AccordionTrigger>
          <AccordionContent>
            Thick borders, punchy color, loud type and plain HTML behavior.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem open={booleanValue(values, "secondOpen")}>
          <AccordionTrigger>{textValue(values, "secondTitle")}</AccordionTrigger>
          <AccordionContent>
            Every piece accepts className and native element props.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    getCode: (values) => `<Accordion>
  <AccordionItem${booleanValue(values, "firstOpen") ? " open" : ""}>
    <AccordionTrigger>${jsxText(textValue(values, "firstTitle"))}</AccordionTrigger>
    <AccordionContent>
      Thick borders, punchy color, loud type and plain HTML behavior.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem${booleanValue(values, "secondOpen") ? " open" : ""}>
    <AccordionTrigger>${jsxText(textValue(values, "secondTitle"))}</AccordionTrigger>
    <AccordionContent>
      Every piece accepts className and native element props.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },

  title: {
    controls: [
      {
        name: "children",
        label: "children",
        type: "text",
        defaultValue: "Build expressive interfaces.",
      },
      {
        name: "order",
        label: "order",
        type: "select",
        defaultValue: "1",
        options: ["1", "2", "3", "4", "5", "6"],
      },
      {
        name: "size",
        label: "size",
        type: "select",
        defaultValue: "display",
        options: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "default",
        options: ["default", "muted", "inverted"],
      },
    ],
    render: (values) => (
      <Title
        order={numberValue(values, "order") as 1 | 2 | 3 | 4 | 5 | 6}
        size={
          textValue(values, "size") as
            | "display"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
        }
        tone={textValue(values, "tone") as "default" | "muted" | "inverted"}
        className="max-w-2xl"
      >
        {textValue(values, "children")}
      </Title>
    ),
    getCode: (values) => `<Title
  order={${numberValue(values, "order")}}
  size=${jsxString(textValue(values, "size"))}
  tone=${jsxString(textValue(values, "tone"))}
>
  ${jsxText(textValue(values, "children"))}
</Title>`,
  },

  text: {
    controls: [
      {
        name: "children",
        label: "children",
        type: "text",
        defaultValue:
          "A small UI library for expressive, editorial web interfaces.",
      },
      {
        name: "component",
        label: "component",
        type: "select",
        defaultValue: "p",
        options: ["p", "span", "div"],
      },
      {
        name: "size",
        label: "size",
        type: "select",
        defaultValue: "xl",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "muted",
        options: ["default", "muted", "subtle", "inverted"],
      },
      {
        name: "weight",
        label: "weight",
        type: "select",
        defaultValue: "bold",
        options: ["regular", "medium", "bold", "black"],
      },
    ],
    render: (values) => (
      <Text
        component={textValue(values, "component") as "p" | "span" | "div"}
        size={textValue(values, "size") as "xs" | "sm" | "md" | "lg" | "xl"}
        tone={
          textValue(values, "tone") as "default" | "muted" | "subtle" | "inverted"
        }
        weight={
          textValue(values, "weight") as
            | "regular"
            | "medium"
            | "bold"
            | "black"
        }
        className="max-w-xl"
      >
        {textValue(values, "children")}
      </Text>
    ),
    getCode: (values) => `<Text
  component=${jsxString(textValue(values, "component"))}
  size=${jsxString(textValue(values, "size"))}
  tone=${jsxString(textValue(values, "tone"))}
  weight=${jsxString(textValue(values, "weight"))}
>
  ${jsxText(textValue(values, "children"))}
</Text>`,
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
