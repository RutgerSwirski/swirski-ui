// apps/docs/app/page.tsx

import CodeBlock from "@/components/CodeBlock";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  Grid,
  SectionLabel,
  Text,
  Title,
} from "@swirski/ui";
import Link from "next/link";

const foundations = [
  {
    label: "01",
    title: "Full component library",
    body: "Install @swirski/ui and import ready-made React components with consistent props, strong defaults and a bold graphic visual language.",
  },
  {
    label: "02",
    title: "Copy-source workflow",
    body: "Use the CLI to pull selected components into your own project. The code becomes yours to edit, remix and reshape.",
  },
  {
    label: "03",
    title: "shadcn registry access",
    body: "Install hosted Swirski registry items with the shadcn CLI when your project already uses that workflow.",
  },
];

const showcaseComponents = [
  {
    name: "Button",
    description:
      "Action primitive with bold borders, graphic tones, loading states and asChild support.",
    href: "/components/button",
  },
  {
    name: "Card",
    description:
      "Flexible surface for content blocks, docs panels, previews and hard-shadow layouts.",
    href: "/components/card",
  },
  {
    name: "Dialog",
    description:
      "Accessible overlay pattern for focused interactions, confirmations and modal content.",
    href: "/components/dialog",
  },
  {
    name: "Select",
    description:
      "Styled selection control with consistent sizing, tones and Swirski system props.",
    href: "/components/select",
  },
  {
    name: "Loader",
    description:
      "Pixel-art loading indicators with chunky outlines, pop-art tones and reduced-motion support.",
    href: "/components/loader",
  },
  {
    name: "DotGrid",
    description:
      "Graphic background texture for docs, hero sections, panels and Swirski-style surfaces.",
    href: "/components/dot-grid",
  },
  {
    name: "ImageFrame",
    description:
      "Framed media primitive for screenshots, product shots, visual examples and editorial layouts.",
    href: "/components/image-frame",
  },
  {
    name: "Typography",
    description: "Heading and body text primitives with reusable size scales.",
    href: "/components/typography",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.16}
          spacing={13}
          dotSize={1.2}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            align="center"
            className="min-h-[calc(100vh-5rem)] gap-12 py-16 lg:grid-cols-[1fr_0.92fr] lg:py-20"
          >
            <Hero />

            <Grid gap="md" className="max-w-xl">
              <Card
                interactive={false}
                className="shadow-(color:--sw-color-yellow) "
              >
                <CardContent className="p-4 ">
                  <Badge tone="yellow">Library</Badge>

                  <Title className="mt-3" order={3} size="h4">
                    Start Building!
                  </Title>

                  <Text className="mt-2" size="xs" weight="bold">
                    Install Swirski UI as a React component library and build
                    with ready-made components, consistent props and bold
                    defaults.
                  </Text>

                  <CodeBlock className="mt-4" code="pnpm add @swirski/ui" />
                </CardContent>
              </Card>

              <Card
                interactive={false}
                className="shadow-(color:--sw-color-red)"
              >
                <CardContent className="p-4">
                  <Badge tone="red">CLI</Badge>

                  <Title className="mt-3" order={3} size="h4">
                    Or Own The Source!
                  </Title>

                  <Text className="mt-2" size="xs" weight="bold">
                    Use the CLI to copy components into your app, then customize
                    the markup, tokens, classes and behaviour as your own.
                  </Text>

                  <CodeBlock
                    className="mt-4"
                    code="pnpm exec swirski add button card dialog"
                  />
                </CardContent>
              </Card>

              {/* <Card
                interactive={false}
                className="shadow-(color:--sw-color-blue)"
              >
                <CardContent className="p-4">
                  <Badge tone="blue">shadcn</Badge>

                  <Title className="mt-3" order={3} size="h4">
                    Or Use The Registry!
                  </Title>

                  <Text className="mt-2" size="xs" weight="bold">
                    Add Swirski items with the shadcn CLI when your app already
                    uses remote registries and copied component source.
                  </Text>

                  <CodeBlock
                    className="mt-4"
                    code="pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json"
                  />
                </CardContent>
              </Card> */}
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <section id="system">
          <div className="flex flex-col justify-between gap-5 md:flex-row ">
            <div>
              <SectionLabel>System</SectionLabel>
              <Title className="mt-6 max-w-3xl" order={2} size="h1">
                One system. Three ways to build.
              </Title>
            </div>
            <Text className="max-w-xl" tone="muted" weight="bold">
              Use Swirski UI as a component library, copy pieces with the
              Swirski CLI, or install hosted registry items with shadcn. The
              same props, tokens and styling hooks keep everything consistent.
            </Text>
          </div>

          <Grid gap="lg" className="mt-10 md:grid-cols-3 lg:grid-cols-4">
            {foundations.map((item) => (
              <Card
                key={item.title}
                interactive={false}
                className="bg-white shadow-[7px_7px_0_#0B0B0C]"
              >
                <CardContent>
                  <Badge className="mb-6" tone="red">
                    {item.label}
                  </Badge>
                  <Title order={3} size="h4">
                    {item.title}
                  </Title>
                  <Text className="mt-4" size="sm" tone="muted" weight="bold">
                    {item.body}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </section>

        <section id="components" className="pt-16 md:pt-20">
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div>
              <SectionLabel>Components</SectionLabel>

              <Title className="mt-6 max-w-3xl" order={2} size="h1">
                Useful primitives with a graphic point of view.
              </Title>
            </div>
          </div>

          <Grid gap="md" className="mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseComponents.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="block"
              >
                <Card
                  key={component.name}
                  interactive
                  className="h-full min-h-52 bg-white shadow-[5px_5px_0_#0B0B0C]"
                >
                  <CardContent className="p-4">
                    <Badge tone="yellow">Component</Badge>

                    <Title className="mt-4" order={3} size="h5">
                      {component.name}
                    </Title>

                    <Text
                      className="mt-2"
                      size="sm"
                      tone="muted"
                      weight="medium"
                    >
                      {component.description}
                    </Text>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Grid>

          <Button href="/components" tone="white" className="mt-10">
            Browse components
          </Button>
        </section>

        <section className="pt-16 md:pt-20">
          <Card
            interactive={false}
            className="bg-[#FFD400] shadow-[8px_8px_0_#0B0B0C]"
          >
            <CardContent className="p-6 md:p-8">
              <Grid gap="lg">
                <div>
                  <Badge tone="black">Start</Badge>

                  <Title className="mt-5" order={2} size="h2">
                    Build with the library, or own the source.
                  </Title>

                  <Text className="mt-4 max-w-2xl" weight="bold">
                    Install Swirski UI for fast imports, or use the CLI to copy
                    components into your project and customize everything.
                  </Text>
                </div>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  <Button href="/get-started" tone="white">
                    Get started
                  </Button>

                  <Button href="/components" tone="black">
                    Components
                  </Button>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
