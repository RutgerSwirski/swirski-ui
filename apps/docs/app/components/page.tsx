import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
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

const cardStyles = ["bg-docs-surface", "docs-accent-yellow", "bg-docs-paper", "bg-docs-surface"];

const componentOnlyDocs = componentDocs;

const componentsWithIndex = componentOnlyDocs.map((component, index) => ({
  ...component,
  index,
}));

const categories = ["Foundations", "Forms", "Navigation", "Overlays", "Feedback", "Swirski patterns"] as const;
const navigation = new Set(["navbar", "breadcrumb", "pagination", "tabs"]);
const patterns = new Set(["cursor", "image-frame", "section-label"]);

function usageGroup(component: ComponentDoc) {
  if (navigation.has(component.slug)) return "Navigation";
  if (patterns.has(component.slug) || component.category === "Backgrounds") return "Swirski patterns";
  if (component.category === "Interaction") return "Overlays";
  if (component.category === "Forms" || component.category === "Feedback") return component.category;
  return "Foundations";
}

const componentsByCategory = categories.map((category) => ({
  category,
  components: componentsWithIndex.filter(
    (component) => usageGroup(component) === category,
  ),
}));

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-docs-paper text-docs-ink">
      <div className="relative border-b-4 border-docs-ink bg-docs-surface">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.12}
          spacing={14}
          dotSize={1}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            gap="xl"
            className="py-12 md:grid-cols-1 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] lg:items-start"
          >
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

            <Grid
              columns={2}
              gap="sm"
              className="w-full sm:max-w-sm lg:max-w-none"
            >
              <Card
                withShadow={false}
                interactive={false}
                className="docs-accent-yellow"
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
                    {componentOnlyDocs.length}
                  </Title>
                </CardContent>
              </Card>

              <Card
                interactive={false}
                withShadow={false}
                tone="blue"
                className="text-white"
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
                className="col-span-2 bg-docs-surface"
              >
                <CardContent>
                  <Text weight="bold">Missing a component?</Text>
                  <Button
                    withShadow={false}
                    className="mt-4 max-w-full"
                    target="_blank"
                    href="https://github.com/rutgerswirski/swirski-ui/issues/new?assignees=rutgerswirski&labels=missing-component&template=component.md&title=Add+%60[component-name]%60+component"
                    tone="white"
                  >
                    Open an issue
                  </Button>
                </CardContent>
              </Card>

              <Card interactive={false} className="col-span-2 docs-accent-yellow">
                <CardContent>
                  <Text weight="bold">Building in React Native?</Text>
                  <Button
                    withShadow={false}
                    className="mt-4 max-w-full"
                    href="/native#native-components"
                    tone="white"
                  >
                    Native components
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <Grid
          as="section"
          gap="xl"
          className="lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
        >
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <Card interactive={false} className="min-w-0 bg-docs-surface">
              <CardContent>
                <Text className="mb-4 uppercase" tone="muted" weight="black">
                  Categories
                </Text>
                <Grid gap="sm">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      href={`#${slugify(category)}`}
                      tone="white"
                      withShadow={false}
                      className="justify-start text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </aside>

          <Grid className="gap-12">
            {componentsByCategory.map(({ category, components }) => (
              <section
                key={category}
                id={slugify(category)}
                className="scroll-mt-8"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b-4 border-docs-ink pb-4">
                  <Title order={2} size="h3">
                    {category}
                  </Title>
                  <Badge withShadow={false} tone="white">
                    {components.length}{" "}
                    {components.length === 1 ? "component" : "components"}
                  </Badge>
                </div>

                <Grid gap="lg" className="md:grid-cols-2! grid-cols-1">
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
                                className="font-anton text-3xl leading-none text-docs-muted opacity-60"
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
                </Grid>
              </section>
            ))}
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
