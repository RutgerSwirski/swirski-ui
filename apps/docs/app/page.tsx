// apps/docs/app/page.tsx

import CopyToClipboard from "@/components/CopyToClipboard";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  ImageFrame,
  SectionLabel,
  Text,
  Title,
  MobileMenu,
  MobileMenuContent,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuTrigger,
  NavbarActions,
} from "@swirski/ui";

const foundations = [
  {
    label: "01",
    title: "Editorial bones",
    body: "Big condensed type, direct copy and layouts that feel composed before they feel decorated.",
  },
  {
    label: "02",
    title: "Studio contrast",
    body: "Black structure, warm surfaces and primary-color accents carried through the component API.",
  },
  {
    label: "03",
    title: "Dev-ready parts",
    body: "React primitives with predictable props, Tailwind-friendly class hooks and docs that stay close to usage.",
  },
];

const packageLinks = [
  "Button",
  "Card",
  "Container",
  "DiagonalLines",
  "DotGrid",
  "LineGrid",
  "SwirskiProvider",
  "Title",
  "Text",
  "ImageFrame",
  "Dialog",
  "Select",
];

const workflow = [
  {
    title: "Install",
    body: "Install the package, or use the CLI to copy components into your app.",
  },
  {
    title: "Theme",
    body: "Wrap your app in SwirskiProvider and override tokens when the brand needs it.",
  },
  {
    title: "Compose",
    body: "Use imports or registry-copied source with the same Swirski tokens.",
  },
];

function getComponentHref(name: string) {
  return `/components/${name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()}`;
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F5F3] text-[#0B0B0C]">
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

          <section className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.92fr] lg:py-20">
            <Hero />

            <ImageFrame className="border-4 bg-[#0B0B0C] p-4 text-white shadow-[14px_14px_0_#0057FF]">
              <div className="flex items-center justify-between border-b-4 border-white pb-4">
                <Title order={2} size="h5" tone="inverted">
                  Docs
                </Title>
                <Badge>@swirski/ui</Badge>
              </div>

              <div className="mt-4 grid gap-4">
                <Card interactive={false} className="bg-white">
                  <CardContent className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <Text
                        className="uppercase"
                        size="xs"
                        tone="muted"
                        weight="black"
                      >
                        Install
                      </Text>
                      <code className="mt-2 block break-words text-lg font-black">
                        pnpm add @swirski/ui @swirski/cli
                      </code>
                    </div>

                    <CopyToClipboard
                      value="pnpm add @swirski/ui @swirski/cli"
                      label="Copy"
                      copiedLabel="Copied"
                    />
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card interactive={false} className="bg-[#FFD400] ">
                    <CardContent>
                      <Title order={3} size="h5">
                        Studio
                      </Title>
                      <Text className="mt-3" size="sm" weight="bold">
                        Clean hierarchy with hard graphic accents and useful
                        component states.
                      </Text>
                    </CardContent>
                  </Card>

                  <Card
                    interactive={false}
                    className="bg-[#0057FF] text-white "
                  >
                    <CardContent>
                      <Title order={3} size="h5" tone="inverted">
                        Dev
                      </Title>
                      <Text
                        className="mt-3"
                        size="sm"
                        tone="inverted"
                        weight="bold"
                      >
                        Built for docs, portfolio surfaces and production
                        interfaces.
                      </Text>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ImageFrame>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <section id="system">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>System</SectionLabel>
              <Title className="mt-6 max-w-3xl" order={2} size="h1">
                The same language, calmer docs.
              </Title>
            </div>
            <Text className="max-w-sm" tone="muted" weight="bold">
              The docs should feel like a working studio surface: clear first,
              expressive second, unmistakably Swirski throughout.
            </Text>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
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
          </div>
        </section>

        <section className="grid gap-8 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20">
          <div>
            <SectionLabel>Library</SectionLabel>
            <Text className="mt-6" size="lg" tone="muted" weight="bold">
              A compact component surface for building Swirski pages without
              rebuilding the style rules on every screen.
            </Text>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {packageLinks.map((item) => (
              <Button variant="white" key={item} href={getComponentHref(item)}>
                {item}
              </Button>
            ))}
          </div>
        </section>

        <section
          id="start"
          className="grid gap-8 border-y-4 border-black py-16 md:grid-cols-[1fr_1fr]"
        >
          <div>
            <SectionLabel>Start</SectionLabel>
            <Title className="mt-6" order={2} size="h1">
              Compose the page, then tune the voice.
            </Title>
          </div>

          <Card
            interactive={false}
            className="bg-[#0B0B0C] text-white shadow-[10px_10px_0_#FFD400]"
          >
            <CardContent className="p-6">
              <ol className="grid gap-4">
                {workflow.map(({ title, body }, index) => (
                  <li
                    key={title}
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b-4 border-white/20 pb-4 last:border-b-0 last:pb-0"
                  >
                    <Text
                      className="font-anton text-3xl leading-none text-current"
                      component="span"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    <div className="grid gap-1">
                      <Text
                        component="span"
                        size="xl"
                        tone="inverted"
                        weight="bold"
                      >
                        {title}
                      </Text>
                      <Text className="text-white/75" size="sm">
                        {body}
                      </Text>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-4 border-black bg-[#FFD400] p-4 font-black text-black">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <Text
                      className="uppercase"
                      size="xs"
                      tone="muted"
                      weight="black"
                    >
                      CLI
                    </Text>
                    <code className="mt-2 block break-words">
                      swirski init && swirski add button card dialog
                    </code>
                  </div>
                  <Button href="/cli" variant="white">
                    CLI docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
