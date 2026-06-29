"use client";

import CodeBlock from "@/components/CodeBlock";
import { useState, type ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Grid,
  SectionLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Title,
} from "@swirski/ui";

type NativeProp = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

type NativePropGroup = {
  title: string;
  props: NativeProp[];
};

type NativeComponentDoc = {
  name: string;
  tone: "blue" | "yellow" | "red" | "white" | "black";
  description: string;
  importCode: string;
  usageCode: string;
  structureCode?: string;
  notes: string[];
  propGroups: NativePropGroup[];
  webHref: string;
};

const nativeComponentDocs: NativeComponentDoc[] = [
  {
    name: "Button",
    tone: "yellow",
    description:
      "Pressable actions with Swirski borders, offset shadows, tones, sizes and native press animation.",
    importCode: `import { Button } from "@swirski/ui/native";`,
    usageCode: `<Button tone="yellow" onPress={handlePress}>
  Save changes
</Button>`,
    notes: [
      'Renders an Animated Pressable with accessibilityRole="button".',
      "The visible label is rendered inside a React Native Text node.",
      "Use textStyle when you need to override the inner label style.",
    ],
    propGroups: [
      {
        title: "Button",
        props: [
          {
            name: "variant",
            type: `"solid" | "outline" | "ghost"`,
            defaultValue: `"solid"`,
            description: "Visual treatment for the button container.",
          },
          {
            name: "tone",
            type: `"blue" | "yellow" | "red" | "white" | "black"`,
            defaultValue: `"blue"`,
            description: "Colorway for the button.",
          },
          {
            name: "size",
            type: `"sm" | "md" | "lg"`,
            defaultValue: `"md"`,
            description: "Controls height, padding and label size.",
          },
          {
            name: "withShadow",
            type: "boolean",
            defaultValue: "true",
            description: "Enables the hard offset shadow and pressed movement.",
          },
          {
            name: "disabled",
            type: "boolean",
            description: "Disables press handling and reduces opacity.",
          },
          {
            name: "onPress",
            type: 'PressableProps["onPress"]',
            description: "Native press callback from React Native Pressable.",
          },
          {
            name: "style",
            type: 'PressableProps["style"]',
            description:
              "Styles the Pressable container. Function styles receive pressed state.",
          },
          {
            name: "textStyle",
            type: "StyleProp<TextStyle>",
            description: "Styles the inner label Text node.",
          },
        ],
      },
    ],
    webHref: "/components/button",
  },
  {
    name: "Text",
    tone: "white",
    description:
      "Body copy for React Native screens, using Inter and Swirski tone, weight and size presets.",
    importCode: `import { Text } from "@swirski/ui/native";`,
    usageCode: `<Text size="lg" tone="muted" weight="bold">
  One-of-One
</Text>`,
    notes: [
      "Renders React Native Text and forwards native Text props.",
      "Font family is picked from the configured native Inter family for each weight.",
      "Use style for React Native TextStyle overrides.",
    ],
    propGroups: [
      {
        title: "Text",
        props: [
          {
            name: "variant",
            type: `"default" | "lead" | "caption"`,
            defaultValue: `"default"`,
            description: "Applies small structural text presets.",
          },
          {
            name: "size",
            type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`,
            defaultValue: `"md"`,
            description: "Controls font size and line height.",
          },
          {
            name: "tone",
            type: `"default" | "muted" | "subtle" | "inverted"`,
            defaultValue: `"default"`,
            description: "Text color preset.",
          },
          {
            name: "weight",
            type: `"regular" | "medium" | "bold" | "black"`,
            defaultValue: `"regular"`,
            description: "Font weight and matching native font family.",
          },
          {
            name: "style",
            type: "StyleProp<TextStyle>",
            description: "React Native Text style override.",
          },
          {
            name: "...textProps",
            type: "TextProps",
            description: "Forwards native Text props such as numberOfLines.",
          },
        ],
      },
    ],
    webHref: "/components/typography",
  },
  {
    name: "Title",
    tone: "red",
    description:
      "Chunky headings using the same display families as the web typography primitives.",
    importCode: `import { Title } from "@swirski/ui/native";`,
    usageCode: `<Title order={2} size="h3">
  Launch notes
</Title>`,
    notes: [
      'Renders React Native Text with accessibilityRole="header".',
      "The default variant uses the configured Anton heading family and uppercase text.",
      'Set variant="plain" to use the body font instead of the display heading font.',
    ],
    propGroups: [
      {
        title: "Title",
        props: [
          {
            name: "order",
            type: "1 | 2 | 3 | 4 | 5 | 6",
            defaultValue: "1",
            description:
              "Semantic heading order. Also chooses the default size.",
          },
          {
            name: "size",
            type: `"display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`,
            description: "Overrides the size derived from order.",
          },
          {
            name: "variant",
            type: `"default" | "plain"`,
            defaultValue: `"default"`,
            description: "Switches between heading font and body font.",
          },
          {
            name: "tone",
            type: `"default" | "muted" | "inverted"`,
            defaultValue: `"default"`,
            description: "Text color preset.",
          },
          {
            name: "style",
            type: "StyleProp<TextStyle>",
            description: "React Native Text style override.",
          },
          {
            name: "...textProps",
            type: "TextProps",
            description: "Forwards native Text props.",
          },
        ],
      },
    ],
    webHref: "/components/typography",
  },
  {
    name: "Badge",
    tone: "blue",
    description:
      "Compact uppercase labels for status, metadata and stickers, matched to the web badge styling.",
    importCode: `import { Badge } from "@swirski/ui/native";`,
    usageCode: `<Badge tone="black" size="sm">
  Archived
</Badge>`,
    notes: [
      "Renders React Native Text, so it works well inline or at the start of a View.",
      "Uses Inter Black by default with uppercase styling.",
      "withShadow adds native elevation and hard offset shadows.",
    ],
    propGroups: [
      {
        title: "Badge",
        props: [
          {
            name: "variant",
            type: `"solid" | "outline" | "soft"`,
            defaultValue: `"solid"`,
            description: "Visual treatment for the label.",
          },
          {
            name: "tone",
            type: `"blue" | "yellow" | "red" | "white" | "black"`,
            defaultValue: `"yellow"`,
            description: "Colorway for the label.",
          },
          {
            name: "size",
            type: `"sm" | "md" | "lg"`,
            defaultValue: `"md"`,
            description: "Controls font size and padding.",
          },
          {
            name: "withShadow",
            type: "boolean",
            defaultValue: "true",
            description: "Adds the hard Swirski text badge shadow.",
          },
          {
            name: "style",
            type: "StyleProp<TextStyle>",
            description: "React Native Text style override.",
          },
          {
            name: "...textProps",
            type: "TextProps",
            description: "Forwards native Text props.",
          },
        ],
      },
    ],
    webHref: "/components/badge",
  },
  {
    name: "Card",
    tone: "yellow",
    description:
      "Product and content cards with thick frames, hard shadows, press animation, media, sticker badges and text slots.",
    importCode: `import {
  Card,
  CardBadge,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle,
} from "@swirski/ui/native";`,
    usageCode: `<Card style={{ width: 360 }}>
  <CardBadge>Featured</CardBadge>
  <CardMedia aspect="4/5">
    <Image source={image} style={{ width: "100%", height: "100%" }} />
  </CardMedia>
  <CardContent size="lg">
    <CardTitle>Gary Rhodes Camp Collar Shirt</CardTitle>
    <CardMeta>Found Fabric / Tops / 2026</CardMeta>
    <Text tone="muted" style={{ marginTop: 16 }}>
      One-of-One
    </Text>
  </CardContent>
</Card>`,
    structureCode: `Card
|-- CardBadge
|-- CardMedia
\`-- CardContent
    |-- CardTitle
    |-- CardMeta
    \`-- Text`,
    notes: [
      "Card itself is an Animated Pressable. It can be static, or interactive with onPress.",
      "CardTitle and CardMeta read the parent card tone so text flips automatically on blue or black cards.",
      "CardBadge is absolutely positioned, so keep Card as the positioned wrapper.",
    ],
    propGroups: [
      {
        title: "Card",
        props: [
          {
            name: "variant",
            type: `"elevated" | "flat" | "outline"`,
            defaultValue: `"elevated"`,
            description: "Controls base treatment and default shadow behavior.",
          },
          {
            name: "tone",
            type: `"default" | "white" | "yellow" | "blue" | "black"`,
            defaultValue: `"default"`,
            description: "Card background and inherited text tone.",
          },
          {
            name: "size",
            type: `"sm" | "md" | "lg"`,
            defaultValue: `"md"`,
            description: "Controls the shadow offset size.",
          },
          {
            name: "interactive",
            type: "boolean",
            defaultValue: "true",
            description:
              "Enables press feedback when the card is not disabled.",
          },
          {
            name: "withShadow",
            type: "boolean",
            defaultValue: 'variant === "elevated"',
            description: "Overrides whether the hard offset shadow is shown.",
          },
          {
            name: "onPress",
            type: 'PressableProps["onPress"]',
            description:
              "Makes the card behave as a native button-like target.",
          },
          {
            name: "style",
            type: 'PressableProps["style"]',
            description:
              "Styles the card wrapper. Function styles receive pressed state.",
          },
        ],
      },
      {
        title: "CardContent",
        props: [
          {
            name: "size",
            type: `"sm" | "md" | "lg"`,
            defaultValue: `"md"`,
            description: "Controls content padding.",
          },
          {
            name: "variant",
            type: `"default" | "flush"`,
            defaultValue: `"default"`,
            description: "Use flush to remove the built-in padding.",
          },
          {
            name: "...viewProps",
            type: "ViewProps",
            description: "Forwards native View props.",
          },
        ],
      },
      {
        title: "CardMedia",
        props: [
          {
            name: "aspect",
            type: `number | \`\${number}/\${number}\``,
            defaultValue: `"4/3"`,
            description: "Sets the media aspect ratio.",
          },
          {
            name: "variant",
            type: `"default" | "flush"`,
            defaultValue: `"default"`,
            description:
              "Default adds the bottom border between media and content.",
          },
          {
            name: "...viewProps",
            type: "ViewProps",
            description: "Forwards native View props.",
          },
        ],
      },
      {
        title: "CardBadge",
        props: [
          {
            name: "position",
            type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`,
            defaultValue: `"top-left"`,
            description: "Absolute sticker position inside the card.",
          },
          {
            name: "tone",
            type: `"white" | "yellow" | "blue" | "red" | "black"`,
            defaultValue: `"white"`,
            description: "Sticker colorway.",
          },
          {
            name: "variant",
            type: `"solid" | "outline"`,
            defaultValue: `"solid"`,
            description: "Solid sticker or transparent outlined text.",
          },
          {
            name: "size",
            type: `"sm" | "md"`,
            defaultValue: `"sm"`,
            description: "Controls sticker text size and padding.",
          },
        ],
      },
      {
        title: "CardTitle and CardMeta",
        props: [
          {
            name: "CardTitle size",
            type: `"sm" | "md" | "lg"`,
            defaultValue: `"md"`,
            description: "Controls title scale.",
          },
          {
            name: "CardMeta size",
            type: `"sm" | "md"`,
            defaultValue: `"sm"`,
            description: "Controls metadata scale.",
          },
          {
            name: "tone",
            type: `"default" | "muted" | "inverted"`,
            description: "Overrides the text tone inherited from Card.",
          },
          {
            name: "style",
            type: "StyleProp<TextStyle>",
            description: "React Native Text style override.",
          },
        ],
      },
    ],
    webHref: "/components/card",
  },
  {
    name: "DotGrid",
    tone: "white",
    description:
      "A dotted native background layer for halftone texture, product cards and punchy Swirski surfaces.",
    importCode: `import { DotGrid } from "@swirski/ui/native";`,
    usageCode: `<View style={{ height: 240, position: "relative" }}>
  <DotGrid color="#0057FF" spacing={13} dotSize={1.2} />
  <Card>
    <CardContent>
      <CardTitle>Launch notes</CardTitle>
    </CardContent>
  </Card>
</View>`,
    notes: [
      "Renders an absolute-fill React Native View layer with repeated dot Views.",
      "The parent should have a measured size. For backgrounds, set the parent to position: \"relative\".",
      "Use accentEvery for larger periodic dots without adding another dependency.",
    ],
    propGroups: [
      {
        title: "DotGrid",
        props: [
          {
            name: "color",
            type: "string",
            defaultValue: `"#0B0B0C"`,
            description: "Primary dot color.",
          },
          {
            name: "opacity",
            type: "number",
            defaultValue: "0.2",
            description: "Opacity applied to the whole background layer.",
          },
          {
            name: "spacing",
            type: "number",
            defaultValue: "13",
            description: "Pixel spacing between repeated dot positions.",
          },
          {
            name: "dotSize",
            type: "number",
            defaultValue: "1.2",
            description: "Primary dot diameter.",
          },
          {
            name: "accentEvery",
            type: "number",
            description: "Adds an accent dot every N rows and columns.",
          },
          {
            name: "accentColor",
            type: "string",
            description: "Accent dot color. Defaults to color.",
          },
          {
            name: "accentDotSize",
            type: "number",
            defaultValue: "3",
            description: "Accent dot diameter.",
          },
          {
            name: "style",
            type: "StyleProp<ViewStyle>",
            description: "Styles the absolute-fill background wrapper.",
          },
        ],
      },
    ],
    webHref: "/components/dot-grid",
  },
  {
    name: "LineGrid",
    tone: "blue",
    description:
      "A native line-grid background layer with horizontal, vertical or combined grid directions.",
    importCode: `import { LineGrid } from "@swirski/ui/native";`,
    usageCode: `<View style={{ height: 240, position: "relative" }}>
  <LineGrid
    color="#0B0B0C"
    direction="both"
    spacing={18}
    thickness={1}
  />
</View>`,
    notes: [
      "Renders an absolute-fill React Native View layer with repeated horizontal and vertical line Views.",
      "Use direction to render only horizontal lines, only vertical lines or both.",
      "Accent lines are drawn at the same periodic positions as the web component.",
    ],
    propGroups: [
      {
        title: "LineGrid",
        props: [
          {
            name: "direction",
            type: `"both" | "horizontal" | "vertical"`,
            defaultValue: `"both"`,
            description: "Controls which line directions render.",
          },
          {
            name: "color",
            type: "string",
            defaultValue: `"#0B0B0C"`,
            description: "Default color for both line directions.",
          },
          {
            name: "opacity",
            type: "number",
            defaultValue: "0.2",
            description: "Opacity applied to the whole background layer.",
          },
          {
            name: "spacing",
            type: "number",
            defaultValue: "18",
            description: "Default spacing for horizontal and vertical lines.",
          },
          {
            name: "thickness",
            type: "number",
            defaultValue: "1",
            description: "Default line thickness.",
          },
          {
            name: "horizontalColor",
            type: "string",
            description: "Overrides the horizontal line color.",
          },
          {
            name: "horizontalSpacing",
            type: "number",
            description: "Overrides horizontal line spacing.",
          },
          {
            name: "horizontalThickness",
            type: "number",
            description: "Overrides horizontal line thickness.",
          },
          {
            name: "verticalColor",
            type: "string",
            description: "Overrides the vertical line color.",
          },
          {
            name: "verticalSpacing",
            type: "number",
            description: "Overrides vertical line spacing.",
          },
          {
            name: "verticalThickness",
            type: "number",
            description: "Overrides vertical line thickness.",
          },
          {
            name: "accentEvery",
            type: "number",
            description: "Draws accent lines every N rows or columns.",
          },
          {
            name: "accentColor",
            type: "string",
            description: "Accent line color. Defaults to the matching line color.",
          },
          {
            name: "accentThickness",
            type: "number",
            defaultValue: "3",
            description: "Accent line thickness.",
          },
        ],
      },
    ],
    webHref: "/components/line-grid",
  },
  {
    name: "DiagonalLines",
    tone: "red",
    description:
      "A native diagonal stripe background layer for editorial cards, callouts and loud section surfaces.",
    importCode: `import { DiagonalLines } from "@swirski/ui/native";`,
    usageCode: `<View style={{ height: 240, position: "relative" }}>
  <DiagonalLines
    angle={-45}
    color="#0B0B0C"
    spacing={18}
    thickness={2}
  />
</View>`,
    notes: [
      "Renders an absolute-fill clipped View with a rotated stripe layer.",
      "angle accepts a number of degrees or a deg string like \"-30deg\".",
      "Use accentEvery for larger periodic diagonal stripes.",
    ],
    propGroups: [
      {
        title: "DiagonalLines",
        props: [
          {
            name: "angle",
            type: `number | \`\${number}deg\``,
            defaultValue: "-45",
            description: "Stripe angle in degrees.",
          },
          {
            name: "color",
            type: "string",
            defaultValue: `"#0B0B0C"`,
            description: "Primary stripe color.",
          },
          {
            name: "opacity",
            type: "number",
            defaultValue: "0.2",
            description: "Opacity applied to the whole background layer.",
          },
          {
            name: "spacing",
            type: "number",
            defaultValue: "18",
            description: "Pixel spacing between stripes.",
          },
          {
            name: "thickness",
            type: "number",
            defaultValue: "2",
            description: "Primary stripe thickness.",
          },
          {
            name: "accentEvery",
            type: "number",
            description: "Draws an accent stripe every N stripes.",
          },
          {
            name: "accentColor",
            type: "string",
            description: "Accent stripe color. Defaults to color.",
          },
          {
            name: "accentThickness",
            type: "number",
            defaultValue: "5",
            description: "Accent stripe thickness.",
          },
          {
            name: "style",
            type: "StyleProp<ViewStyle>",
            description: "Styles the absolute-fill background wrapper.",
          },
        ],
      },
    ],
    webHref: "/components/diagonal-lines",
  },
];

const nativeCardStyles = [
  "bg-white",
  "bg-[#FFD400]",
  "bg-[#F5F5F3]",
  "bg-white",
];

function PropTable({ group }: { group: NativePropGroup }) {
  return (
    <div className="min-w-0 max-w-full">
      <Title className="mb-3" order={3} size="h5">
        {group.title}
      </Title>
      <div className="min-w-0 max-w-full overflow-x-auto">
        <Table
          className="min-w-[44rem]"
          size="sm"
          wrapperClassName="min-w-[44rem]"
        >
          <TableHead>
            <TableRow>
              <TableHeader>Prop</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Default</TableHeader>
              <TableHeader>Details</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.props.map((prop) => (
              <TableRow key={`${group.title}-${prop.name}`}>
                <TableCell>
                  <code className="font-black text-[#0B0B0C]">
                    {prop.name}
                  </code>
                </TableCell>
                <TableCell>
                  <code>{prop.type}</code>
                </TableCell>
                <TableCell>
                  {prop.defaultValue ? <code>{prop.defaultValue}</code> : "-"}
                </TableCell>
                <TableCell>{prop.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function NativeComponentDetails({
  children,
  component,
}: {
  children: (openDetails: () => void) => ReactNode;
  component: NativeComponentDoc;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children(() => setOpen(true))}
      <DialogContent
        className="max-h-[88dvh] w-[calc(100vw-2rem)] overflow-y-auto"
        size="lg"
      >
        <DialogHeader>
          <Badge tone={component.tone}>{component.name}</Badge>
          <DialogTitle className="mt-3">{component.name}</DialogTitle>
          <DialogDescription>{component.description}</DialogDescription>
        </DialogHeader>

        <Grid gap="lg" className="mt-6">
          <Grid gap="md" className="lg:grid-cols-1">
            <div>
              <Text
                className="mb-3 uppercase"
                size="xs"
                tone="muted"
                weight="black"
              >
                Import
              </Text>
              <CodeBlock code={component.importCode} wrap />
            </div>
            <div>
              <Text
                className="mb-3 uppercase"
                size="xs"
                tone="muted"
                weight="black"
              >
                Usage
              </Text>
              <CodeBlock code={component.usageCode} wrap />
            </div>
          </Grid>

          {component.structureCode ? (
            <div>
              <Text
                className="mb-3 uppercase"
                size="xs"
                tone="muted"
                weight="black"
              >
                Native structure
              </Text>
              <CodeBlock code={component.structureCode} wrap />
            </div>
          ) : null}

          <Card interactive={false} className="bg-[#F5F5F3]" withShadow={false}>
            <CardContent className="p-5">
              <Text className="uppercase" size="xs" tone="muted" weight="black">
                Notes
              </Text>
              <ul className="mt-3 grid gap-2 pl-5 text-sm font-bold leading-6 text-black/70">
                {component.notes.map((note) => (
                  <li key={note} className="list-square">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Grid gap="lg">
            {component.propGroups.map((group) => (
              <PropTable
                key={`${component.name}-${group.title}`}
                group={group}
              />
            ))}
          </Grid>
        </Grid>

        <DialogFooter>
          <Button href={component.webHref} tone="white" withShadow={false}>
            Compare web docs
          </Button>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function NativeComponentIndex() {
  return (
    <section id="native-components" className="scroll-mt-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b-4 border-black pb-5">
        <div>
          <SectionLabel>Components</SectionLabel>
          <Title className="mt-6" order={2} size="h2">
            Native component index.
          </Title>
          <Text className="mt-5 max-w-2xl" tone="muted" weight="bold">
            Native starts with the shared primitives that make the biggest
            difference in real app screens. Open a component to see its native
            structure, usage, and props.
          </Text>
        </div>

        <Badge tone="white" withShadow={false}>
          {nativeComponentDocs.length} component groups
        </Badge>
      </div>

      <Grid gap="lg" className="md:grid-cols-2">
        {nativeComponentDocs.map((component, index) => (
          <NativeComponentDetails key={component.name} component={component}>
            {(openDetails) => (
              <Card
                asChild
                className={`${nativeCardStyles[index % nativeCardStyles.length]} group flex h-full min-h-[12rem] w-full cursor-pointer flex-col appearance-none p-0 text-left focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#0057FF]`}
              >
                <button onClick={openDetails} type="button">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <Badge withShadow={false} tone="white">
                        Native
                      </Badge>

                      <Text
                        className="font-anton text-3xl leading-none text-black/25"
                        component="span"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                    </div>

                    <Title
                      className="mt-5 group-hover:underline"
                      order={3}
                      size="h4"
                    >
                      {component.name}
                    </Title>

                    <Text className="mt-4" tone="muted" weight="medium">
                      {component.description}
                    </Text>
                  </CardContent>
                </button>
              </Card>
            )}
          </NativeComponentDetails>
        ))}
      </Grid>
    </section>
  );
}
