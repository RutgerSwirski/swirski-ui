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
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardTitle,
  Checkbox,
  CursorDock,
  CursorProvider,
  DiagonalLines,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DotGrid,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  FieldError,
  FieldHint,
  Grid,
  Input,
  Label,
  LineGrid,
  Loader,
  MobileMenu,
  MobileMenuClose,
  MobileMenuContent,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuTitle,
  MobileMenuTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Switch,
  SwirskiProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Title,
  Toast,
  ToastDescription,
  ToastTitle,
  Tooltip,
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

const gridColumnOptions = ["1", "2", "3", "4", "6"] as const;
const gridGapOptions = ["xs", "sm", "md", "lg", "xl"] as const;
const toastToneOptions = ["yellow", "blue", "red", "white"] as const;

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
          textValue(values, "tone") as
            | "blue"
            | "yellow"
            | "red"
            | "white"
            | "black"
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
        name: "tone",
        label: "tone",
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
        name: "variant",
        label: "variant",
        type: "select",
        defaultValue: "solid",
        options: ["solid", "outline", "ghost"],
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
          tone={textValue(values, "tone") as "blue" | "yellow" | "white"}
          variant={
            textValue(values, "variant") as "solid" | "outline" | "ghost"
          }
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
        `tone=${jsxString(textValue(values, "tone"))}`,
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
            <Text className="mt-3" size="sm" tone="muted" weight="bold">
              A framed content primitive with Swirski borders and shadows.
            </Text>
          </CardContent>
        </Card>
      );
    },
    getCode: (values) => {
      const surface = textValue(values, "surface");
      const surfaceClass =
        cardSurfaceClasses[surface as keyof typeof cardSurfaceClasses];
      const interactive = booleanValue(values, "interactive");

      return `<Card
  className=${jsxString(`max-w-sm ${surfaceClass} shadow-[8px_8px_0_#0B0B0C]`)}
  interactive={${interactive}}
>
  <CardContent>
    <CardTitle>${jsxText(textValue(values, "title"))}</CardTitle>
    <Text className="mt-3" size="sm" tone="muted" weight="bold">
      A framed content primitive with Swirski borders and shadows.
    </Text>
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
          {multiline ? (
            <Textarea {...controlProps} />
          ) : (
            <Input {...controlProps} />
          )}
          {state === "hint" && (
            <FieldHint>{textValue(values, "helper")}</FieldHint>
          )}
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

  select: {
    controls: [
      {
        name: "value",
        label: "value",
        type: "select",
        defaultValue: "yellow",
        options: ["yellow", "blue", "red", "white"],
      },
      {
        name: "placeholder",
        label: "placeholder",
        type: "text",
        defaultValue: "Pick a tone",
      },
      {
        name: "disabled",
        label: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <div className="max-w-sm">
        <Select
          key={textValue(values, "value")}
          defaultValue={textValue(values, "value")}
          disabled={booleanValue(values, "disabled")}
          options={[
            { value: "yellow", label: "Yellow" },
            { value: "blue", label: "Blue" },
            { value: "red", label: "Red" },
            { value: "white", label: "White" },
          ]}
          placeholder={textValue(values, "placeholder")}
        />
      </div>
    ),
    getCode: (values) => {
      const props = [
        `placeholder=${jsxString(textValue(values, "placeholder"))}`,
        `defaultValue=${jsxString(textValue(values, "value"))}`,
        booleanValue(values, "disabled") ? "disabled" : null,
      ].filter(Boolean);

      return `<Select
  ${props.join("\n  ")}
  options={[
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
  ]}
/>`;
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
          <AccordionTrigger>
            {textValue(values, "secondTitle")}
          </AccordionTrigger>
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
          textValue(values, "tone") as
            | "default"
            | "muted"
            | "subtle"
            | "inverted"
        }
        weight={
          textValue(values, "weight") as "regular" | "medium" | "bold" | "black"
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
    getCode: (
      values,
    ) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
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
    getCode: (
      values,
    ) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
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
    getCode: (
      values,
    ) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
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
          <Button tone="yellow">Hover me</Button>
          <Button className="w-fit" href="#preview" tone="white">
            Link cursor
          </Button>
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
    <Button tone="yellow">Hover me</Button>
    <Button className="w-fit" href="#preview" tone="white">
      Link cursor
    </Button>
  </div>
</CursorProvider>`,
  },

  "swirski-provider": {
    controls: [
      {
        name: "colorBlue",
        label: "colorBlue",
        type: "color",
        defaultValue: "#0057FF",
      },
      {
        name: "colorYellow",
        label: "colorYellow",
        type: "color",
        defaultValue: "#FFD400",
      },
      {
        name: "colorShadow",
        label: "colorShadow",
        type: "color",
        defaultValue: "#0B0B0C",
      },
      {
        name: "buttonLabel",
        label: "buttonLabel",
        type: "text",
        defaultValue: "Theme button",
      },
    ],
    render: (values) => (
      <SwirskiProvider
        theme={{
          colorBlue: textValue(values, "colorBlue"),
          colorYellow: textValue(values, "colorYellow"),
          colorShadow: textValue(values, "colorShadow"),
        }}
      >
        <Grid className="max-w-md gap-4 border-4 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-paper)] p-5 shadow-[var(--sw-shadow-md)]">
          <Title order={3} size="h4">
            Token tuned
          </Title>
          <Text tone="muted" weight="bold">
            Components inside the provider read the same CSS variables.
          </Text>
          <Button>{textValue(values, "buttonLabel")}</Button>
        </Grid>
      </SwirskiProvider>
    ),
    getCode: (values) => `const theme = createSwirskiTheme({
  colorBlue: ${jsxString(textValue(values, "colorBlue"))},
  colorYellow: ${jsxString(textValue(values, "colorYellow"))},
  colorShadow: ${jsxString(textValue(values, "colorShadow"))},
});

<SwirskiProvider theme={theme}>
  <Button>${jsxText(textValue(values, "buttonLabel"))}</Button>
</SwirskiProvider>`,
  },

  dialog: {
    controls: [
      {
        name: "title",
        label: "title",
        type: "text",
        defaultValue: "Publish changes",
      },
      {
        name: "description",
        label: "description",
        type: "text",
        defaultValue: "Review the release notes before this goes live.",
      },
      {
        name: "defaultOpen",
        label: "defaultOpen",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <Dialog
        key={String(booleanValue(values, "defaultOpen"))}
        defaultOpen={booleanValue(values, "defaultOpen")}
      >
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{textValue(values, "title")}</DialogTitle>
            <DialogDescription>
              {textValue(values, "description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogClose className="bg-[#0057FF] text-white">
              Publish
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    getCode: (
      values,
    ) => `<Dialog${booleanValue(values, "defaultOpen") ? " defaultOpen" : ""}>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>${jsxText(textValue(values, "title"))}</DialogTitle>
      <DialogDescription>
        ${jsxText(textValue(values, "description"))}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
      <DialogClose className="bg-[#0057FF] text-white">Publish</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },

  popover: {
    controls: [
      {
        name: "trigger",
        label: "trigger",
        type: "text",
        defaultValue: "Open note",
      },
      {
        name: "align",
        label: "align",
        type: "select",
        defaultValue: "start",
        options: ["start", "end"],
      },
      {
        name: "defaultOpen",
        label: "defaultOpen",
        type: "boolean",
        defaultValue: true,
      },
    ],
    render: (values) => (
      <Popover
        key={`${textValue(values, "align")}-${booleanValue(values, "defaultOpen")}`}
        defaultOpen={booleanValue(values, "defaultOpen")}
      >
        <PopoverTrigger>{textValue(values, "trigger")}</PopoverTrigger>
        <PopoverContent align={textValue(values, "align") as "start" | "end"}>
          <Text size="sm" tone="muted" weight="bold">
            Popovers are useful for compact context, filters and quick actions.
          </Text>
        </PopoverContent>
      </Popover>
    ),
    getCode: (
      values,
    ) => `<Popover${booleanValue(values, "defaultOpen") ? " defaultOpen" : ""}>
  <PopoverTrigger>${jsxText(textValue(values, "trigger"))}</PopoverTrigger>
  <PopoverContent align=${jsxString(textValue(values, "align"))}>
    Popover content
  </PopoverContent>
</Popover>`,
  },

  "dropdown-menu": {
    controls: [
      {
        name: "trigger",
        label: "trigger",
        type: "text",
        defaultValue: "Actions",
      },
      {
        name: "align",
        label: "align",
        type: "select",
        defaultValue: "start",
        options: ["start", "end"],
      },
      {
        name: "dangerItem",
        label: "dangerItem",
        type: "boolean",
        defaultValue: true,
      },
    ],
    render: (values) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          {textValue(values, "trigger")}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={textValue(values, "align") as "start" | "end"}
        >
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          {booleanValue(values, "dangerItem") && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#FF3131]">
                Archive
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    getCode: (values) => `<DropdownMenu>
  <DropdownMenuTrigger>${jsxText(textValue(values, "trigger"))}</DropdownMenuTrigger>
  <DropdownMenuContent align=${jsxString(textValue(values, "align"))}>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>${
      booleanValue(values, "dangerItem")
        ? `\n    <DropdownMenuSeparator />\n    <DropdownMenuItem className="text-[#FF3131]">Archive</DropdownMenuItem>`
        : ""
    }
  </DropdownMenuContent>
</DropdownMenu>`,
  },

  tooltip: {
    controls: [
      {
        name: "label",
        label: "label",
        type: "text",
        defaultValue: "Hover me",
      },
      {
        name: "content",
        label: "content",
        type: "text",
        defaultValue: "Helpful context",
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "blue",
        options: ["blue", "yellow", "white"],
      },
    ],
    render: (values) => (
      <Tooltip content={textValue(values, "content")}>
        <Button tone={textValue(values, "tone") as "blue" | "yellow" | "white"}>
          {textValue(values, "label")}
        </Button>
      </Tooltip>
    ),
    getCode: (
      values,
    ) => `<Tooltip content=${jsxString(textValue(values, "content"))}>
  <Button tone=${jsxString(textValue(values, "tone"))}>
    ${jsxText(textValue(values, "label"))}
  </Button>
</Tooltip>`,
  },

  tabs: {
    controls: [
      {
        name: "defaultValue",
        label: "defaultValue",
        type: "select",
        defaultValue: "preview",
        options: ["preview", "code", "notes"],
      },
      {
        name: "showNotes",
        label: "showNotes",
        type: "boolean",
        defaultValue: true,
      },
    ],
    render: (values) => (
      <Tabs
        key={`${textValue(values, "defaultValue")}-${booleanValue(values, "showNotes")}`}
        defaultValue={textValue(values, "defaultValue")}
      >
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          {booleanValue(values, "showNotes") && (
            <TabsTrigger value="notes">Notes</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="preview">Preview content</TabsContent>
        <TabsContent value="code">Code content</TabsContent>
        {booleanValue(values, "showNotes") && (
          <TabsContent value="notes">Notes content</TabsContent>
        )}
      </Tabs>
    ),
    getCode: (
      values,
    ) => `<Tabs defaultValue=${jsxString(textValue(values, "defaultValue"))}>
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>${
      booleanValue(values, "showNotes")
        ? `\n    <TabsTrigger value="notes">Notes</TabsTrigger>`
        : ""
    }
  </TabsList>
  <TabsContent value="preview">Preview content</TabsContent>
  <TabsContent value="code">Code content</TabsContent>${
    booleanValue(values, "showNotes")
      ? `\n  <TabsContent value="notes">Notes content</TabsContent>`
      : ""
  }
</Tabs>`,
  },

  table: {
    controls: [
      {
        name: "rows",
        label: "rows",
        type: "number",
        defaultValue: 3,
        min: 1,
        max: 5,
      },
      {
        name: "showValue",
        label: "showValue",
        type: "boolean",
        defaultValue: true,
      },
    ],
    render: (values) => {
      const rows = Math.round(numberValue(values, "rows"));

      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Status</TableHeader>
              {booleanValue(values, "showValue") && (
                <TableHeader>Value</TableHeader>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }, (_, index) => (
              <TableRow key={index}>
                <TableCell>Project {index + 1}</TableCell>
                <TableCell>{index % 2 === 0 ? "Live" : "Draft"}</TableCell>
                {booleanValue(values, "showValue") && (
                  <TableCell>{`${72 + index * 8}%`}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    },
    getCode: (values) => `<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Status</TableHeader>${
        booleanValue(values, "showValue")
          ? "\n      <TableHeader>Value</TableHeader>"
          : ""
      }
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.name}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.status}</TableCell>${
          booleanValue(values, "showValue")
            ? "\n        <TableCell>{row.value}</TableCell>"
            : ""
        }
      </TableRow>
    ))}
  </TableBody>
</Table>`,
  },

  grid: {
    controls: [
      {
        name: "columns",
        label: "columns",
        type: "select",
        defaultValue: "3",
        options: [...gridColumnOptions],
      },
      {
        name: "gap",
        label: "gap",
        type: "select",
        defaultValue: "md",
        options: [...gridGapOptions],
      },
      {
        name: "items",
        label: "items",
        type: "number",
        defaultValue: 3,
        min: 1,
        max: 6,
      },
    ],
    render: (values) => (
      <Grid
        columns={Number(textValue(values, "columns")) as 1 | 2 | 3 | 4 | 6}
        gap={textValue(values, "gap") as "xs" | "sm" | "md" | "lg" | "xl"}
        className="w-full"
      >
        {Array.from(
          { length: Math.round(numberValue(values, "items")) },
          (_, index) => (
            <Card interactive={false} key={index} withShadow={false}>
              <CardContent>
                <Text weight="black">Item {index + 1}</Text>
              </CardContent>
            </Card>
          ),
        )}
      </Grid>
    ),
    getCode: (
      values,
    ) => `<Grid columns={${Number(textValue(values, "columns"))}} gap=${jsxString(textValue(values, "gap"))}>
  {items.map((item) => (
    <Card key={item.id}>
      <CardContent>{item.label}</CardContent>
    </Card>
  ))}
</Grid>`,
  },

  toast: {
    controls: [
      {
        name: "title",
        label: "title",
        type: "text",
        defaultValue: "Saved",
      },
      {
        name: "description",
        label: "description",
        type: "text",
        defaultValue: "Your changes are live.",
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "yellow",
        options: [...toastToneOptions],
      },
    ],
    render: (values) => (
      <Toast
        tone={textValue(values, "tone") as "blue" | "yellow" | "red" | "white"}
      >
        <ToastTitle>{textValue(values, "title")}</ToastTitle>
        <ToastDescription>{textValue(values, "description")}</ToastDescription>
      </Toast>
    ),
    getCode: (values) => `<Toast tone=${jsxString(textValue(values, "tone"))}>
  <ToastTitle>${jsxText(textValue(values, "title"))}</ToastTitle>
  <ToastDescription>
    ${jsxText(textValue(values, "description"))}
  </ToastDescription>
</Toast>`,
  },

  progress: {
    controls: [
      {
        name: "value",
        label: "value",
        type: "number",
        defaultValue: 64,
        min: 0,
        max: 100,
      },
      {
        name: "height",
        label: "height",
        type: "select",
        defaultValue: "default",
        options: ["default", "short", "tall"],
      },
    ],
    render: (values) => (
      <Progress
        value={numberValue(values, "value")}
        className={
          textValue(values, "height") === "short"
            ? "h-3"
            : textValue(values, "height") === "tall"
              ? "h-10"
              : undefined
        }
      />
    ),
    getCode: (values) => {
      const height = textValue(values, "height");
      const className =
        height === "short"
          ? ' className="h-3"'
          : height === "tall"
            ? ' className="h-10"'
            : "";

      return `<Progress value={${numberValue(values, "value")}}${className} />`;
    },
  },

  loader: {
    controls: [
      {
        name: "size",
        label: "size",
        type: "select",
        defaultValue: "lg",
        options: ["sm", "md", "lg", "xl", "2xl"],
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "blue",
        options: ["blue", "yellow", "red", "black"],
      },
      {
        name: "variant",
        label: "variant",
        type: "select",
        defaultValue: "spinner",
        options: ["spinner", "pixel-dots", "pixel-bars", "pixel-blocks"],
      },
    ],
    render: (values) => (
      <Loader
        tone={textValue(values, "tone") as "blue" | "yellow" | "red" | "black"}
        size={textValue(values, "size") as "sm" | "md" | "lg" | "xl" | "2xl"}
        variant={
          textValue(values, "variant") as
            | "spinner"
            | "pixel-dots"
            | "pixel-bars"
            | "pixel-blocks"
        }
      />
    ),
    getCode: (values) =>
      `<Loader 
    tone=${jsxString(textValue(values, "tone"))}
    size=${jsxString(textValue(values, "size"))} 
    variant=${jsxString(textValue(values, "variant"))}
    />`,
  },

  skeleton: {
    controls: [
      {
        name: "lines",
        label: "lines",
        type: "number",
        defaultValue: 2,
        min: 1,
        max: 5,
      },
      {
        name: "blockHeight",
        label: "blockHeight",
        type: "select",
        defaultValue: "medium",
        options: ["small", "medium", "large"],
      },
    ],
    render: (values) => {
      const heightClass =
        textValue(values, "blockHeight") === "small"
          ? "h-8"
          : textValue(values, "blockHeight") === "large"
            ? "h-24"
            : "h-14";

      return (
        <Grid gap="sm" className="w-full max-w-sm">
          {Array.from(
            { length: Math.round(numberValue(values, "lines")) },
            (_, index) => (
              <Skeleton
                className={`${index === 0 ? "w-3/4" : "w-full"} ${heightClass}`}
                key={index}
              />
            ),
          )}
        </Grid>
      );
    },
    getCode: (values) => {
      const heightClass =
        textValue(values, "blockHeight") === "small"
          ? "h-8"
          : textValue(values, "blockHeight") === "large"
            ? "h-24"
            : "h-14";

      return `<Grid gap="sm" className="max-w-sm">
  <Skeleton className="w-3/4 ${heightClass}" />
  <Skeleton className="w-full ${heightClass}" />
</Grid>`;
    },
  },

  "radio-group": {
    controls: [
      {
        name: "value",
        label: "value",
        type: "select",
        defaultValue: "blue",
        options: ["blue", "yellow", "red"],
      },
      {
        name: "disabledOption",
        label: "disabledOption",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <RadioGroup
        key={`${textValue(values, "value")}-${booleanValue(values, "disabledOption")}`}
        name="playground-tone"
        defaultValue={textValue(values, "value")}
        options={[
          {
            value: "blue",
            label: "Blue",
            description: "Sharp product surfaces.",
          },
          {
            value: "yellow",
            label: "Yellow",
            description: "Loud editorial moments.",
          },
          {
            value: "red",
            label: "Red",
            description: "Urgent launch signals.",
            disabled: booleanValue(values, "disabledOption"),
          },
        ]}
      />
    ),
    getCode: (values) => `<RadioGroup
  name="tone"
  defaultValue=${jsxString(textValue(values, "value"))}
  options={[
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
    { value: "red", label: "Red"${booleanValue(values, "disabledOption") ? ", disabled: true" : ""} },
  ]}
/>`,
  },

  slider: {
    controls: [
      {
        name: "defaultValue",
        label: "defaultValue",
        type: "number",
        defaultValue: 64,
        min: 0,
        max: 100,
      },
      {
        name: "max",
        label: "max",
        type: "number",
        defaultValue: 100,
        min: 10,
        max: 200,
        step: 10,
      },
    ],
    render: (values) => (
      <div className="w-full max-w-sm">
        <Slider
          key={`${numberValue(values, "defaultValue")}-${numberValue(values, "max")}`}
          defaultValue={numberValue(values, "defaultValue")}
          min={0}
          max={numberValue(values, "max")}
        />
      </div>
    ),
    getCode: (values) => `<Slider
  defaultValue={${numberValue(values, "defaultValue")}}
  min={0}
  max={${numberValue(values, "max")}}
/>`,
  },

  avatar: {
    controls: [
      {
        name: "fallback",
        label: "fallback",
        type: "text",
        defaultValue: "RS",
      },
      {
        name: "size",
        label: "size",
        type: "select",
        defaultValue: "md",
        options: ["sm", "md", "lg"],
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "yellow",
        options: ["yellow", "blue", "red"],
      },
    ],
    render: (values) => {
      const sizeClass =
        textValue(values, "size") === "sm"
          ? "size-10"
          : textValue(values, "size") === "lg"
            ? "size-16 text-lg"
            : "";
      const toneClass =
        textValue(values, "tone") === "blue"
          ? "bg-[#0057FF] text-white"
          : textValue(values, "tone") === "red"
            ? "bg-[#FF3131] text-white"
            : "bg-[#FFD400]";

      return (
        <Avatar className={`${sizeClass} ${toneClass}`}>
          <AvatarFallback>{textValue(values, "fallback")}</AvatarFallback>
        </Avatar>
      );
    },
    getCode: (values) => `<Avatar>
  <AvatarFallback>${jsxText(textValue(values, "fallback"))}</AvatarFallback>
</Avatar>`,
  },

  navbar: {
    controls: [
      {
        name: "brand",
        label: "brand",
        type: "text",
        defaultValue: "Swirski UI",
      },
      {
        name: "active",
        label: "active",
        type: "select",
        defaultValue: "Components",
        options: ["Components", "Hooks", "CLI"],
      },
      {
        name: "mobileOpen",
        label: "mobileOpen",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "mobileSide",
        label: "mobileSide",
        type: "select",
        defaultValue: "right",
        options: ["left", "right"],
      },
    ],
    render: (values) => (
      <Navbar className="w-full border-[length:var(--sw-border-width)] bg-white">
        <NavbarBrand href="#preview">{textValue(values, "brand")}</NavbarBrand>
        <NavbarNav aria-label="Playground navigation">
          {["Components", "Hooks", "CLI"].map((item) => (
            <NavbarLink
              active={textValue(values, "active") === item}
              href="#preview"
              key={item}
            >
              {item}
            </NavbarLink>
          ))}
        </NavbarNav>
        <NavbarActions>
          <MobileMenu
            key={`${booleanValue(values, "mobileOpen")}-${textValue(values, "mobileSide")}`}
            defaultOpen={booleanValue(values, "mobileOpen")}
          >
            <MobileMenuTrigger />
            <MobileMenuContent
              side={textValue(values, "mobileSide") as "left" | "right"}
            >
              <MobileMenuHeader>
                <MobileMenuTitle>Menu</MobileMenuTitle>
                <MobileMenuClose aria-label="Close navigation menu">
                  x
                </MobileMenuClose>
              </MobileMenuHeader>
              <MobileMenuNav aria-label="Mobile playground navigation">
                {["Components", "Hooks", "CLI"].map((item) => (
                  <MobileMenuLink
                    active={textValue(values, "active") === item}
                    href="#preview"
                    key={item}
                  >
                    {item}
                  </MobileMenuLink>
                ))}
              </MobileMenuNav>
            </MobileMenuContent>
          </MobileMenu>
        </NavbarActions>
      </Navbar>
    ),
    getCode: (values) => `<Navbar>
  <NavbarBrand href="/">${jsxText(textValue(values, "brand"))}</NavbarBrand>
  <NavbarNav aria-label="Main navigation">
    <NavbarLink href="/components"${textValue(values, "active") === "Components" ? " active" : ""}>Components</NavbarLink>
    <NavbarLink href="/hooks"${textValue(values, "active") === "Hooks" ? " active" : ""}>Hooks</NavbarLink>
    <NavbarLink href="/cli"${textValue(values, "active") === "CLI" ? " active" : ""}>CLI</NavbarLink>
  </NavbarNav>
</Navbar>`,
  },

  breadcrumb: {
    controls: [
      {
        name: "current",
        label: "current",
        type: "text",
        defaultValue: "Components",
      },
      {
        name: "separator",
        label: "separator",
        type: "select",
        defaultValue: "/",
        options: ["/", ">", "|"],
      },
      {
        name: "includeMiddle",
        label: "includeMiddle",
        type: "boolean",
        defaultValue: true,
      },
    ],
    render: (values) => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#preview">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            {textValue(values, "separator")}
          </BreadcrumbSeparator>
          {booleanValue(values, "includeMiddle") && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="#preview">Library</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                {textValue(values, "separator")}
              </BreadcrumbSeparator>
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{textValue(values, "current")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    getCode: (values) => `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>${jsxText(textValue(values, "separator"))}</BreadcrumbSeparator>${
      booleanValue(values, "includeMiddle")
        ? `\n    <BreadcrumbItem><BreadcrumbLink href="/components">Library</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator>${jsxText(textValue(values, "separator"))}</BreadcrumbSeparator>`
        : ""
    }
    <BreadcrumbItem><BreadcrumbPage>${jsxText(textValue(values, "current"))}</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },

  pagination: {
    controls: [
      {
        name: "page",
        label: "page",
        type: "number",
        defaultValue: 2,
        min: 1,
        max: 8,
      },
      {
        name: "total",
        label: "total",
        type: "number",
        defaultValue: 5,
        min: 2,
        max: 8,
      },
    ],
    render: (values) => {
      const total = Math.round(numberValue(values, "total"));
      const page = Math.min(Math.round(numberValue(values, "page")), total);

      return <Pagination page={page} total={total} />;
    },
    getCode: (values) => {
      const total = Math.round(numberValue(values, "total"));
      const page = Math.min(Math.round(numberValue(values, "page")), total);

      return `<Pagination page={${page}} total={${total}} />`;
    },
  },

  separator: {
    controls: [
      {
        name: "orientation",
        label: "orientation",
        type: "select",
        defaultValue: "horizontal",
        options: ["horizontal", "vertical"],
      },
      {
        name: "tone",
        label: "tone",
        type: "select",
        defaultValue: "black",
        options: ["black", "blue", "red"],
      },
    ],
    render: (values) => {
      const toneClass =
        textValue(values, "tone") === "blue"
          ? "bg-[#0057FF]"
          : textValue(values, "tone") === "red"
            ? "bg-[#FF3131]"
            : "bg-black";

      return (
        <div
          className={
            textValue(values, "orientation") === "vertical" ? "h-40" : "w-full"
          }
        >
          <Separator
            orientation={
              textValue(values, "orientation") as "horizontal" | "vertical"
            }
            className={toneClass}
          />
        </div>
      );
    },
    getCode: (values) => `<Separator
  orientation=${jsxString(textValue(values, "orientation"))}
  className=${jsxString(
    textValue(values, "tone") === "blue"
      ? "bg-[#0057FF]"
      : textValue(values, "tone") === "red"
        ? "bg-[#FF3131]"
        : "bg-black",
  )}
/>`,
  },

  drawer: {
    controls: [
      {
        name: "title",
        label: "title",
        type: "text",
        defaultValue: "Settings",
      },
      {
        name: "side",
        label: "side",
        type: "select",
        defaultValue: "right",
        options: ["left", "right", "top", "bottom"],
      },
      {
        name: "defaultOpen",
        label: "defaultOpen",
        type: "boolean",
        defaultValue: false,
      },
    ],
    render: (values) => (
      <Drawer
        key={`${textValue(values, "side")}-${booleanValue(values, "defaultOpen")}`}
        defaultOpen={booleanValue(values, "defaultOpen")}
      >
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent
          side={
            textValue(values, "side") as "left" | "right" | "top" | "bottom"
          }
        >
          <DrawerHeader>
            <DrawerTitle>{textValue(values, "title")}</DrawerTitle>
            <DrawerDescription>Panel content lives here.</DrawerDescription>
          </DrawerHeader>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    ),
    getCode: (
      values,
    ) => `<Drawer${booleanValue(values, "defaultOpen") ? " defaultOpen" : ""}>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent side=${jsxString(textValue(values, "side"))}>
    <DrawerHeader>
      <DrawerTitle>${jsxText(textValue(values, "title"))}</DrawerTitle>
      <DrawerDescription>Panel content lives here.</DrawerDescription>
    </DrawerHeader>
    <DrawerClose>Close</DrawerClose>
  </DrawerContent>
</Drawer>`,
  },
};
