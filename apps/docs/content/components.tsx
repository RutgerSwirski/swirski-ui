import {
  Button,
  Card,
  CardContent,
  CardTitle,
  DiagonalLines,
  DotGrid,
  HeroTitle,
  HeroLead,
  LineGrid,
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
    | "Backgrounds";
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
  },
];
