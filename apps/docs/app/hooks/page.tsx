import CodeBlock from "@/components/CodeBlock";
import NavBar from "@/components/NavBar";
import { componentDocs } from "@/content/components";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
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
import Link from "next/link";

const hookDocs = componentDocs.filter(
  (component) => component.category === "Hooks",
);

const hookGroups = [
  {
    title: "State",
    hooks: ["useDisclosure", "useControllableState", "useLocalStorage"],
  },
  {
    title: "Environment",
    hooks: ["useMediaQuery", "useReducedMotion"],
  },
  {
    title: "Interaction",
    hooks: ["useClickOutside", "useEscapeKey", "useClipboard"],
  },
];

const recipes = [
  {
    hook: "useDisclosure",
    use: "Dialogs, drawers, popovers, accordions and custom show/hide UI.",
  },
  {
    hook: "useControllableState",
    use: "Components that support both controlled and uncontrolled props.",
  },
  {
    hook: "useClickOutside",
    use: "Menus, custom selects, floating panels and dismissible surfaces.",
  },
  {
    hook: "useClipboard",
    use: "Copy buttons, registry commands, install snippets and code blocks.",
  },
];

export default function HooksPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#FF3131"
          opacity={0.12}
          spacing={14}
          dotSize={1}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            gap="xl"
            className="py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16"
          >
            <div className="max-w-4xl">
              <SectionLabel>Hooks</SectionLabel>

              <Title className="mt-6" size="display">
                Behavior helpers.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                Swirski hooks are small client-side utilities for the behavior
                that shows up across components: disclosure state, controlled
                state, outside clicks, keyboard escape, clipboard, storage and
                responsive preferences.
              </Text>
            </div>

            <Card
              interactive={false}
              className="w-full max-w-sm bg-[#FF3131] text-white shadow-[8px_8px_0_#0B0B0C] md:w-80"
            >
              <CardContent>
                <Badge tone="black">Hook entries</Badge>
                <Title className="mt-5 text-current" order={2} size="h2">
                  {hookDocs.length}
                </Title>
                <Text className="mt-2" size="sm" weight="bold">
                  documented hooks, exported from @swirski/ui and installable
                  through the registry CLI.
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Grid as={Container} className="gap-14 py-16 md:py-20">
        <Grid as="section" gap="xl" className="lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Install</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Import or copy.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              Hooks can be imported from the package or copied into an app with
              the registry CLI. Copied hooks follow dependency metadata, so
              `useDisclosure` also brings `useControllableState`.
            </Text>
          </div>

          <Grid gap="lg">
            <CodeBlock
              code={`import { useDisclosure, useClipboard } from "@swirski/ui";`}
            />
            <CodeBlock code="swirski add use-disclosure use-clipboard" />
          </Grid>
        </Grid>

        <Grid as="section" gap="lg" className="md:grid-cols-3">
          {hookGroups.map((group, index) => (
            <Card
              key={group.title}
              interactive={false}
              className="bg-white shadow-[7px_7px_0_#0B0B0C]"
            >
              <CardContent>
                <Badge
                  tone={index === 2 ? "red" : index === 1 ? "blue" : "yellow"}
                >
                  {group.title}
                </Badge>
                <Grid gap="sm" className="mt-5">
                  {group.hooks.map((hook) => {
                    const doc = hookDocs.find((item) => item.title === hook);

                    return (
                      <Button
                        withShadow={false}
                        key={hook}
                        href={doc ? `/hooks/${doc.slug}` : "/hooks"}
                        tone="white"
                        className="justify-start text-sm"
                      >
                        {hook}
                      </Button>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid as="section" gap="xl" className="lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Recipes</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Where hooks fit.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              These hooks are deliberately small. They cover the behavioral
              patterns that repeat across Swirski components and app screens.
            </Text>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Hook</TableHeader>
                <TableHeader>Use it for</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => {
                const doc = hookDocs.find((item) => item.title === recipe.hook);

                return (
                  <TableRow key={recipe.hook}>
                    <TableCell>
                      <Link
                        href={doc ? `/hooks/${doc.slug}` : "/hooks"}
                        className="font-black text-[#0B0B0C] underline decoration-4 underline-offset-4"
                      >
                        {recipe.hook}
                      </Link>
                    </TableCell>
                    <TableCell>{recipe.use}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>

        <Grid
          as="section"
          gap="xl"
          className="border-y-4 border-black py-14 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <SectionLabel>Example</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Disclosure state.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              `useDisclosure` is the everyday hook for open/close UI. It returns
              the current boolean state and a small handler object.
            </Text>
            <Button className="mt-6" href="/hooks/use-disclosure">
              Open hook docs
            </Button>
          </div>

          <CodeBlock
            code={`const [opened, handlers] = useDisclosure(false);

return (
  <>
    <Button onClick={handlers.open}>Open</Button>
    <Button onClick={handlers.close}>Close</Button>
    <Button onClick={handlers.toggle}>Toggle</Button>
  </>
);`}
          />
        </Grid>

        <Grid as="section" gap="lg" className="md:grid-cols-2">
          {hookDocs.map((hook) => (
            <Link
              key={hook.slug}
              href={`/hooks/${hook.slug}`}
              className="group block min-w-0"
            >
              <Card className="flex h-full min-h-48 flex-col bg-white">
                <CardContent className="flex h-full flex-col">
                  <Badge tone="red">Hook</Badge>
                  <Title className="mt-5" order={3} size="h4">
                    {hook.title}
                  </Title>
                  <Text className="mt-3" tone="muted" weight="bold">
                    {hook.description}
                  </Text>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Grid>
      </Grid>
    </main>
  );
}
