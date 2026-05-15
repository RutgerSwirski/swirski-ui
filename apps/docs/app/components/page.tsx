import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  SectionLabel,
  Text,
  Title,
} from "@swirski/ui";
import Link from "next/link";

const cardStyles = ["bg-white", "bg-[#FFD400]", "bg-[#F5F5F3]", "bg-white"];

const categories = Array.from(
  new Set(componentDocs.map((component) => component.category)),
);

const componentsWithIndex = componentDocs.map((component, index) => ({
  ...component,
  index,
}));

const componentsByCategory = categories.map((category) => ({
  category,
  components: componentsWithIndex.filter(
    (component) => component.category === category,
  ),
}));

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
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

          <section className="grid min-w-0 gap-8 py-12 md:grid-cols-1 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] lg:items-end">
            <div className="min-w-0 max-w-4xl">
              <SectionLabel>Components</SectionLabel>

              <Title className="mt-6 break-words" size="h1">
                Component index.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                Scan the shared primitives, jump into a component doc and keep
                the import close to the preview.
              </Text>
            </div>

            <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:max-w-sm lg:max-w-none">
              <Card
                withShadow={false}
                interactive={false}
                className="bg-[#FFD400]"
              >
                <CardContent>
                  <Text
                    className="uppercase"
                    size="xs"
                    tone="muted"
                    weight="black"
                  >
                    Components
                  </Text>
                  <Title className="mt-1" order={2} size="h2">
                    {componentDocs.length}
                  </Title>
                </CardContent>
              </Card>

              <Card
                interactive={false}
                withShadow={false}
                className="!bg-[#0057FF] !text-white"
              >
                <CardContent>
                  <Text
                    className="uppercase text-current"
                    size="xs"
                    weight="black"
                  >
                    Groups
                  </Text>
                  <Title className="mt-1 text-current" order={2} size="h2">
                    {categories.length}
                  </Title>
                </CardContent>
              </Card>

              <Card
                interactive={false}
                withShadow={false}
                className="col-span-2 bg-white"
              >
                <CardContent>
                  <Text weight="bold">Missing a component?</Text>
                  <Button
                    withShadow={false}
                    className="mt-4 max-w-full"
                    target="_blank"
                    href="https://github.com/rutgerswirski/swirski-ui/issues/new?assignees=rutgerswirski&labels=missing-component&template=component.md&title=Add+%60[component-name]%60+component"
                    variant="white"
                  >
                    Open an issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <section className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <Card interactive={false} className="min-w-0 bg-white">
              <CardContent>
                <Text className="mb-4 uppercase" tone="muted" weight="black">
                  Categories
                </Text>
                <div className="grid gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      href={`#${slugify(category)}`}
                      variant="white"
                      withShadow={false}
                      className="justify-start text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="grid min-w-0 gap-12">
            {componentsByCategory.map(({ category, components }) => (
              <section
                key={category}
                id={slugify(category)}
                className="scroll-mt-8"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4">
                  <Title order={2} size="h3">
                    {category}
                  </Title>
                  <Badge withShadow={false} tone="white">
                    {components.length}{" "}
                    {components.length === 1 ? "component" : "components"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {components.map((component) => {
                    return (
                      <Link
                        key={component.slug}
                        href={`/components/${component.slug}`}
                        className="group block min-w-0"
                      >
                        <Card
                          className={`${cardStyles[component.index % cardStyles.length]} flex h-full min-h-[12rem] flex-col`}
                        >
                          <CardContent className="flex h-full flex-col">
                            <div className="flex items-start justify-between gap-4">
                              <Badge withShadow={false} tone="white">
                                {component.category}
                              </Badge>

                              <Text
                                className="font-anton text-3xl leading-none text-black/25"
                                component="span"
                              >
                                {String(component.index + 1).padStart(2, "0")}
                              </Text>
                            </div>

                            <Title
                              className="mt-5 group-hover:underline"
                              order={3}
                              size="h4"
                            >
                              {component.title}
                            </Title>

                            <Text className="mt-4" tone="muted" weight="medium">
                              {component.description}
                            </Text>
                          </CardContent>
                        </Card>
                      </Link>
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
