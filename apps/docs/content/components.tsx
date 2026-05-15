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
  FieldHint,
  HeroTitle,
  HeroLead,
  Input,
  Label,
  LineGrid,
  Switch,
  Textarea,
} from "@swirski/ui";

export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  category:
    | "Typography"
    | "Layout"
    | "Cards"
    | "Buttons"
    | "Disclosure"
    | "Feedback"
    | "Forms"
    | "Media"
    | "Interaction"
    | "Backgrounds";
  importCode: string;
  usageCode: string;
  preview: React.ReactNode;
  props: PropDoc[];
};

export type PropDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

export const componentDocs: ComponentDoc[] = [
  {
    slug: "badge",
    title: "Badge",
    description:
      "A compact high-contrast label for statuses, tags and small interface signals.",
    category: "Feedback",
    importCode: `import { Badge } from "@swirski/ui";`,
    usageCode: `<Badge tone="yellow">New drop</Badge>`,
    preview: (
      <div className="flex flex-wrap gap-3">
        <Badge>New drop</Badge>
        <Badge tone="blue">Featured</Badge>
        <Badge tone="red">Live</Badge>
        <Badge tone="black">Studio</Badge>
      </div>
    ),
  },
  {
    slug: "alert",
    title: "Alert",
    description:
      "A loud composable feedback block for announcements, errors and status messages.",
    category: "Feedback",
    importCode: `import { Alert, AlertTitle, AlertDescription } from "@swirski/ui";`,
    usageCode: `<Alert tone="yellow">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>New components are ready to try.</AlertDescription>
</Alert>`,
    preview: (
      <Alert tone="yellow">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          New components are ready to try in your next interface.
        </AlertDescription>
      </Alert>
    ),
  },
  {
    slug: "button",
    title: "Button",
    description:
      "A bold Swirski UI button used for links, actions and call-to-actions.",
    category: "Buttons",
    importCode: `import { Button } from "@swirski/ui";`,
    usageCode: `<Button href="/pieces">View pieces</Button>`,
    preview: <Button href="/pieces">View pieces</Button>,
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Button label or inline content.",
      },
      {
        name: "href",
        type: "string",
        description: "Renders the button as an anchor when provided.",
      },
      {
        name: "variant",
        type: '"blue" | "yellow" | "white"',
        defaultValue: '"blue"',
        description: "Applies the Swirski color treatment.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the root button or anchor.",
      },
      {
        name: "...buttonProps",
        type: "ButtonHTMLAttributes<HTMLButtonElement>",
        description: "Forwarded when the component renders a button.",
      },
    ],
  },
  {
    slug: "cursor",
    title: "Cursor",
    description:
      "A playful pixel-art cursor provider with arrow, hover hand and click hand states.",
    category: "Interaction",
    importCode: `import { CursorProvider, CursorDock } from "@swirski/ui";`,
    usageCode: `<CursorProvider>
  <CursorDock />
  <main>Your app content</main>
</CursorProvider>`,
    preview: (
      <CursorProvider className="relative min-h-64 space-y-6 overflow-hidden p-2">
        <CursorDock position="absolute" />
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="yellow">Hover me</Button>
          <a className="font-black underline" href="/components/cursor">
            Link cursor
          </a>
        </div>
      </CursorProvider>
    ),
    props: [
      {
        name: "CursorProvider.children",
        type: "ReactNode",
        required: true,
        description: "Content that should receive the Swirski cursor styles.",
      },
      {
        name: "CursorProvider.cursor",
        type: "CursorId",
        description: "Controlled cursor id.",
      },
      {
        name: "CursorProvider.defaultCursor",
        type: "CursorId",
        defaultValue: '"bolt"',
        description: "Initial cursor when the provider is uncontrolled.",
      },
      {
        name: "CursorProvider.storageKey",
        type: "string | false",
        defaultValue: '"swirski-cursor"',
        description: "Local storage key, or false to skip persistence.",
      },
      {
        name: "CursorDock.position",
        type: '"fixed" | "absolute"',
        defaultValue: '"fixed"',
        description: "Positions the dock against the viewport or parent.",
      },
      {
        name: "CursorDock.side",
        type: '"left" | "right"',
        defaultValue: '"right"',
        description: "Side where the cursor dock opens.",
      },
      {
        name: "CursorDock.label",
        type: "string",
        defaultValue: '"Choose cursor"',
        description: "Accessible label for the dock trigger.",
      },
    ],
  },
  {
    slug: "field",
    title: "Field",
    description:
      "A form field set with label, input, textarea and hint primitives built from native elements.",
    category: "Forms",
    importCode: `import { Field, FieldHint, Input, Label, Textarea } from "@swirski/ui";`,
    usageCode: `<Field>
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="studio@swirski.dev" />
  <FieldHint>Use the address where clients can reach you.</FieldHint>
</Field>`,
    preview: (
      <div className="grid max-w-md gap-6">
        <Field>
          <Label htmlFor="docs-email">Email</Label>
          <Input id="docs-email" placeholder="studio@swirski.dev" />
          <FieldHint>Use the address where clients can reach you.</FieldHint>
        </Field>
        <Field>
          <Label htmlFor="docs-message">Message</Label>
          <Textarea id="docs-message" placeholder="Tell us what you are building." />
        </Field>
      </div>
    ),
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description:
      "A native checkbox with a chunky Swirski mark, label and optional description.",
    category: "Forms",
    importCode: `import { Checkbox } from "@swirski/ui";`,
    usageCode: `<Checkbox
  label="Send launch updates"
  description="A compact, native checkbox with a custom Swirski mark."
/>`,
    preview: (
      <Checkbox
        defaultChecked
        label="Send launch updates"
        description="A compact, native checkbox with a custom Swirski mark."
      />
    ),
  },
  {
    slug: "switch",
    title: "Switch",
    description:
      "A native checkbox presented as a switch for binary preferences and settings.",
    category: "Forms",
    importCode: `import { Switch } from "@swirski/ui";`,
    usageCode: `<Switch label="Studio mode" defaultChecked />`,
    preview: (
      <Switch
        defaultChecked
        label="Studio mode"
        description="Use switch semantics without giving up native form behavior."
      />
    ),
  },
  {
    slug: "accordion",
    title: "Accordion",
    description:
      "A disclosure component built on details and summary, with no client JavaScript required.",
    category: "Disclosure",
    importCode: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@swirski/ui";`,
    usageCode: `<Accordion>
  <AccordionItem open>
    <AccordionTrigger>What makes it Swirski?</AccordionTrigger>
    <AccordionContent>
      Thick borders, punchy color, loud type and plain HTML behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    preview: (
      <Accordion className="max-w-xl">
        <AccordionItem open>
          <AccordionTrigger>What makes it Swirski?</AccordionTrigger>
          <AccordionContent>
            Thick borders, punchy color, loud type and plain HTML behavior.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Can I customize it?</AccordionTrigger>
          <AccordionContent>
            Every piece accepts className and native element props.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    slug: "card",
    title: "Card",
    description:
      "A bordered content block for projects, pieces, links and previews.",
    category: "Cards",
    importCode: `import { Card, CardContent, CardTitle } from "@swirski/ui";`,
    usageCode: `<Card>
  <CardContent>
    <CardTitle>Patchwork Jacket</CardTitle>
  </CardContent>
</Card>`,
    preview: (
      <Card>
        <CardContent>
          <CardTitle>Patchwork Jacket</CardTitle>
        </CardContent>
      </Card>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Card body content.",
      },
      {
        name: "interactive",
        type: "boolean",
        defaultValue: "true",
        description: "Enables hover and active movement styles.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the card root.",
      },
      {
        name: "CardContent.className",
        type: "string",
        description: "Adds classes to the padded content wrapper.",
      },
      {
        name: "CardTitle.children",
        type: "ReactNode",
        required: true,
        description: "Title content rendered inside the card heading.",
      },
    ],
  },
  {
    slug: "hero-title",
    title: "HeroTitle",
    description:
      "A large expressive heading component for landing pages and editorial sections.",
    category: "Typography",
    importCode: `import { HeroTitle } from "@swirski/ui";`,
    usageCode: `<HeroTitle>Build expressive interfaces.</HeroTitle>`,
    preview: <HeroTitle>Build expressive interfaces.</HeroTitle>,
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Heading content.",
      },
      {
        name: "variant",
        type: '"editorial" | "loud"',
        defaultValue: '"editorial"',
        description: "Reserved visual variant hook for title treatments.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the heading.",
      },
    ],
  },
  {
    slug: "hero-lead",
    title: "HeroLead",
    description:
      "A supporting text component for hero sections and page introductions.",
    category: "Typography",
    importCode: `import { HeroLead } from "@swirski/ui";`,
    usageCode: `<HeroLead>
  A small UI library for expressive, editorial web interfaces.
</HeroLead>`,
    preview: (
      <HeroLead>
        A small UI library for expressive, editorial web interfaces.
      </HeroLead>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Lead paragraph content.",
      },
      {
        name: "className",
        type: "string",
        description: "Adds classes to the paragraph.",
      },
    ],
  },
  {
    slug: "dot-grid",
    title: "DotGrid",
    description:
      "A configurable dot-grid background for subtle texture, halftone fields and pop-art surfaces.",
    category: "Backgrounds",
    importCode: `import { DotGrid } from "@swirski/ui";`,
    usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <DotGrid
    className="inset-0"
    color="#0B0B0C"
    opacity={0.38}
    spacing={14}
    dotSize={1.8}
    accentColor="#FF3131"
    accentEvery={5}
    accentDotSize={5}
  />
</div>`,
    preview: (
      <div className="relative h-64 overflow-hidden bg-[#FFD400]">
        <DotGrid
          className="inset-0"
          color="#0B0B0C"
          opacity={0.38}
          spacing={14}
          dotSize={1.8}
          accentColor="#FF3131"
          accentEvery={5}
          accentDotSize={5}
        />
      </div>
    ),
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: '"currentColor"',
        description: "Primary dot color.",
      },
      {
        name: "opacity",
        type: "CSSProperties['opacity']",
        description: "Opacity applied to the grid layer.",
      },
      {
        name: "spacing",
        type: "number | string",
        defaultValue: "13",
        description: "Distance between dots.",
      },
      {
        name: "dotSize",
        type: "number | string",
        defaultValue: "1.2",
        description: "Primary dot radius.",
      },
      {
        name: "accentColor",
        type: "string",
        description: "Optional color for larger accent dots.",
      },
      {
        name: "accentEvery",
        type: "number",
        description: "Adds an accent dot every N grid cells when greater than 1.",
      },
      {
        name: "accentDotSize",
        type: "number | string",
        defaultValue: "3",
        description: "Accent dot radius.",
      },
      {
        name: "...divProps",
        type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
        description: "Forwarded to the root div.",
      },
    ],
  },
  {
    slug: "line-grid",
    title: "LineGrid",
    description:
      "A configurable line grid background with optional heavier accent lines for pop-art surfaces.",
    category: "Backgrounds",
    importCode: `import { LineGrid } from "@swirski/ui";`,
    usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <LineGrid
    className="inset-0"
    horizontalColor="#0B0B0C"
    horizontalSpacing={18}
    horizontalThickness={2}
    verticalColor="#0057FF"
    verticalSpacing={26}
    verticalThickness={1}
    opacity={0.34}
    accentColor="#FF3131"
    accentEvery={4}
    accentThickness={5}
  />
</div>`,
    preview: (
      <div className="relative h-64 overflow-hidden bg-[#FFD400]">
        <LineGrid
          className="inset-0"
          horizontalColor="#0B0B0C"
          horizontalSpacing={18}
          horizontalThickness={2}
          verticalColor="#0057FF"
          verticalSpacing={26}
          verticalThickness={1}
          opacity={0.34}
          accentColor="#FF3131"
          accentEvery={4}
          accentThickness={5}
        />
      </div>
    ),
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: '"#0B0B0C"',
        description: "Fallback color for horizontal and vertical lines.",
      },
      {
        name: "opacity",
        type: "CSSProperties['opacity']",
        defaultValue: "0.2",
        description: "Opacity applied to the grid layer.",
      },
      {
        name: "spacing",
        type: "number | string",
        defaultValue: "18",
        description: "Fallback spacing for both directions.",
      },
      {
        name: "thickness",
        type: "number | string",
        defaultValue: "1",
        description: "Fallback line thickness for both directions.",
      },
      {
        name: "direction",
        type: '"both" | "horizontal" | "vertical"',
        defaultValue: '"both"',
        description: "Which line directions to render.",
      },
      {
        name: "horizontalColor",
        type: "string",
        description: "Overrides the horizontal line color.",
      },
      {
        name: "verticalColor",
        type: "string",
        description: "Overrides the vertical line color.",
      },
      {
        name: "accentColor",
        type: "string",
        description: "Optional color for heavier accent lines.",
      },
      {
        name: "accentEvery",
        type: "number",
        description: "Adds accent lines every N cells when greater than 1.",
      },
      {
        name: "accentThickness",
        type: "number | string",
        defaultValue: "3",
        description: "Thickness for accent lines.",
      },
      {
        name: "...divProps",
        type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
        description: "Forwarded to the root div.",
      },
    ],
  },
  {
    slug: "diagonal-lines",
    title: "DiagonalLines",
    description:
      "A configurable diagonal stripe background for punchy poster and pop-art compositions.",
    category: "Backgrounds",
    importCode: `import { DiagonalLines } from "@swirski/ui";`,
    usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <DiagonalLines
    className="inset-0"
    angle={-35}
    color="#0B0B0C"
    opacity={0.3}
    spacing={18}
    thickness={2}
    accentColor="#FF3131"
    accentEvery={6}
    accentThickness={8}
  />
</div>`,
    preview: (
      <div className="relative h-64 overflow-hidden bg-[#FFD400]">
        <DiagonalLines
          className="inset-0"
          angle={-35}
          color="#0B0B0C"
          opacity={0.3}
          spacing={18}
          thickness={2}
          accentColor="#FF3131"
          accentEvery={6}
          accentThickness={8}
        />
      </div>
    ),
    props: [
      {
        name: "angle",
        type: "number | string",
        defaultValue: "-45",
        description: "Line angle in degrees or any CSS angle value.",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"#0B0B0C"',
        description: "Primary stripe color.",
      },
      {
        name: "opacity",
        type: "CSSProperties['opacity']",
        defaultValue: "0.2",
        description: "Opacity applied to the stripe layer.",
      },
      {
        name: "spacing",
        type: "number | string",
        defaultValue: "18",
        description: "Distance before the pattern repeats.",
      },
      {
        name: "thickness",
        type: "number | string",
        defaultValue: "2",
        description: "Primary stripe thickness.",
      },
      {
        name: "accentColor",
        type: "string",
        description: "Optional color for heavier accent stripes.",
      },
      {
        name: "accentEvery",
        type: "number",
        description: "Adds accent stripes every N repeats when greater than 1.",
      },
      {
        name: "accentThickness",
        type: "number | string",
        defaultValue: "5",
        description: "Thickness for accent stripes.",
      },
      {
        name: "...divProps",
        type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
        description: "Forwarded to the root div.",
      },
    ],
  },
];
