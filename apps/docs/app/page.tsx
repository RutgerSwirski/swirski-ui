// apps/docs/app/page.tsx

import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Container,
  DotGrid,
  ImageFrame,
  SectionLabel,
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
  "Hero",
  "ImageFrame",
  "SectionLabel",
];

const workflow = [
  {
    title: "Install",
    body: "Install the package in a Next.js or React app.",
  },
  {
    title: "Import",
    body: "Import only the primitives the screen needs.",
  },
  {
    title: "Compose",
    body: "Compose with Swirski type, borders, shadows and accent color.",
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

            <ImageFrame className="bg-[#0B0B0C] p-4 border-4 text-black shadow-[14px_14px_0_#0057FF]">
              {/* <div className="border-4 border-black bg-[#F5F5F3] p-4 text-[#0B0B0C]"> */}
              <div className="flex items-center justify-between border-b-4 border-black pb-4">
                <span className="font-anton text-3xl uppercase">Docs</span>
                <code className="border-2 border-black bg-[#FFD400] px-3 py-2 text-xs font-black uppercase">
                  @swirski/ui
                </code>
              </div>

              <div className="mt-4 grid gap-4">
                <Card interactive={false} className="bg-white">
                  <CardContent className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <p className="text-xs font-black uppercase text-black/55">
                        Install
                      </p>
                      <code className="mt-2 block break-words text-lg font-black">
                        pnpm add @swirski/ui
                      </code>
                    </div>

                    {/* insert copy to clipboard button */}
                    <Button variant="white" className="ml-auto mt-4 md:mt-0">
                      Copy
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card interactive={false} className="bg-[#FFD400] ">
                    <CardContent>
                      <CardTitle>Studio</CardTitle>
                      <p className="mt-3 text-sm font-bold leading-6">
                        Clean hierarchy with hard graphic accents and useful
                        component states.
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    interactive={false}
                    className="bg-[#0057FF] text-black "
                  >
                    <CardContent>
                      <CardTitle>Dev</CardTitle>
                      <p className="mt-3 text-sm font-bold leading-6">
                        Built for docs, portfolio surfaces and production
                        interfaces.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {/* </div> */}
            </ImageFrame>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <section id="system">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>System</SectionLabel>
              <h2 className="mt-6 max-w-3xl font-anton text-5xl uppercase leading-none md:text-7xl">
                The same language, calmer docs.
              </h2>
            </div>
            <p className="max-w-sm text-base font-bold leading-7 text-black/65">
              The docs should feel like a working studio surface: clear first,
              expressive second, unmistakably Swirski throughout.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {foundations.map((item) => (
              <Card
                key={item.title}
                interactive={false}
                className="bg-white shadow-[7px_7px_0_#0B0B0C]"
              >
                <CardContent>
                  <p className="mb-6 w-fit border-4 border-black bg-[#FF3131] px-3 py-2 font-anton text-xl uppercase text-black">
                    {item.label}
                  </p>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="mt-4 text-sm font-bold leading-7 text-black/70">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20">
          <div>
            <SectionLabel>Library</SectionLabel>
            <p className="mt-6 text-lg font-bold leading-8 text-black/70">
              A compact component surface for building Swirski pages without
              rebuilding the style rules on every screen.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {packageLinks.map((item) => (
              <Button
                variant="white"
                key={item}
                href={getComponentHref(item)}
                // className="text-black border-4 border-black bg-white px-5 py-5 font-black uppercase transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
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
            <h2 className="mt-6 font-anton text-5xl uppercase leading-none md:text-7xl">
              Compose the page, then tune the voice.
            </h2>
          </div>

          <Card
            interactive={false}
            className="bg-[#0B0B0C] text-black shadow-[10px_10px_0_#FFD400]"
          >
            <CardContent className="p-6">
              <ol className="grid gap-4">
                {workflow.map(({ title, body }, index) => (
                  <li
                    key={title}
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b-4 border-black/20 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="font-anton text-3xl text-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="grid gap-1">
                      <span className="text-xl font-bold leading-7">
                        {title}
                      </span>
                      <p className="text-sm leading-7 text-black/70">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
