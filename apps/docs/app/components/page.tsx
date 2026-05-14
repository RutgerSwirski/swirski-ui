import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Container,
  DotGrid,
  SectionLabel,
} from "@swirski/ui";

const categoryStyles: Record<ComponentDoc["category"], string> = {
  Typography: "bg-[#FFD400] text-black",
  Layout: "bg-white text-black",
  Cards: "bg-[#0057FF] text-white",
  Buttons: "bg-[#FF3131] text-white",
  Media: "bg-[#F5F5F3] text-black",
  Interaction: "bg-[#FFD400] text-black",
  Backgrounds: "bg-[#0B0B0C] text-white",
};

const cardStyles = [
  "bg-white shadow-[7px_7px_0_#0B0B0C]",
  "bg-[#FFD400] shadow-[7px_7px_0_#0B0B0C]",
  "bg-[#F5F5F3] shadow-[7px_7px_0_#0057FF]",
  "bg-white shadow-[7px_7px_0_#FF3131]",
];

const categories = Array.from(
  new Set(componentDocs.map((component) => component.category)),
);

const componentsByCategory = categories.map((category) => ({
  category,
  components: componentDocs.filter((component) => component.category === category),
}));

export default function ComponentsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.12}
          spacing={14}
          dotSize={1}
        />

        <Container className="relative z-10">
          <NavBar />

          <section className="grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16">
            <div className="max-w-4xl">
              <SectionLabel>Components</SectionLabel>

              <h1 className="mt-6 font-anton text-5xl uppercase leading-none md:text-7xl">
                Component index.
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-black/70">
                Scan the shared primitives, jump into a component doc and keep
                the import close to the preview.
              </p>
            </div>

            <div className="grid w-full max-w-sm grid-cols-2 gap-3 md:w-80">
              <div className="border-4 border-black bg-[#FFD400] p-4 shadow-[6px_6px_0_#0B0B0C]">
                <p className="text-xs font-black uppercase text-black/55">
                  Parts
                </p>
                <p className="mt-1 font-anton text-5xl leading-none">
                  {componentDocs.length}
                </p>
              </div>
              <div className="border-4 border-black bg-[#0057FF] p-4 text-white shadow-[6px_6px_0_#0B0B0C]">
                <p className="text-xs font-black uppercase text-white/70">
                  Groups
                </p>
                <p className="mt-1 font-anton text-5xl leading-none">
                  {categories.length}
                </p>
              </div>
              <code className="col-span-2 border-4 border-black bg-white px-4 py-3 text-sm font-black shadow-[6px_6px_0_#0B0B0C]">
                import &#123; Button &#125; from "@swirski/ui";
              </code>
            </div>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border-4 border-black bg-white p-4 shadow-[7px_7px_0_#0B0B0C]">
              <p className="mb-4 text-xs font-black uppercase text-black/55">
                Categories
              </p>
              <div className="grid gap-3">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`#${category.toLowerCase()}`}
                    className={`border-4 border-black px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${categoryStyles[category]}`}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="grid gap-12">
            {componentsByCategory.map(({ category, components }) => (
              <section
                key={category}
                id={category.toLowerCase()}
                className="scroll-mt-8"
              >
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b-4 border-black pb-4">
                  <h2 className="font-anton text-4xl uppercase leading-none md:text-5xl">
                    {category}
                  </h2>
                  <p className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C]">
                    {components.length}{" "}
                    {components.length === 1 ? "component" : "components"}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {components.map((component) => {
                    const index = componentDocs.findIndex(
                      (item) => item.slug === component.slug,
                    );

                    return (
                      <Card
                        key={component.slug}
                        className={`${cardStyles[index % cardStyles.length]} flex min-h-[16rem] flex-col`}
                      >
                        <CardContent className="flex h-full flex-col">
                          <div className="flex items-start justify-between gap-4">
                            <p
                              className={`w-fit border-4 border-black px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C] ${categoryStyles[component.category]}`}
                            >
                              {component.category}
                            </p>
                            <span className="font-anton text-3xl leading-none text-black/25">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <CardTitle>{component.title}</CardTitle>

                          <p className="mt-4 text-sm font-bold leading-7 text-black/70">
                            {component.description}
                          </p>

                          <div className="mt-auto pt-6">
                            <Button
                              href={`/components/${component.slug}`}
                              variant={index % 2 === 0 ? "blue" : "white"}
                            >
                              Open docs
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
