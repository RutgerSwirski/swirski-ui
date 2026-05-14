import {
  Button,
  Card,
  CardContent,
  CardTitle,
  CursorDock,
  CursorProvider,
  HeroTitle,
  HeroLead,
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
    | "Media"
    | "Interaction";
  importCode: string;
  usageCode: string;
  preview: React.ReactNode;
};

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    title: "Button",
    description:
      "A bold Swirski UI button used for links, actions and call-to-actions.",
    category: "Buttons",
    importCode: `import { Button } from "@swirski/ui";`,
    usageCode: `<Button href="/pieces">View pieces</Button>`,
    preview: <Button href="/pieces">View pieces</Button>,
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
  },
];
