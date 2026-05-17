import CodeBlock from "@/components/CodeBlock";
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

const starterFiles = [
  {
    label: "Source",
    href: "/templates/component/ComponentName.tsx.template",
    file: "ComponentName.tsx.template",
  },
  {
    label: "Export",
    href: "/templates/component/index.ts.template",
    file: "index.ts.template",
  },
  {
    label: "Test",
    href: "/templates/component/ComponentName.test.tsx.template",
    file: "ComponentName.test.tsx.template",
  },
  {
    label: "Docs",
    href: "/templates/component/docs-entry.tsx.template",
    file: "docs-entry.tsx.template",
  },
  {
    label: "Playground",
    href: "/templates/component/playground-entry.tsx.template",
    file: "playground-entry.tsx.template",
  },
  {
    label: "Registry",
    href: "/templates/component/registry-entry.json",
    file: "registry-entry.json",
  },
];

const steps = [
  {
    label: "01",
    title: "Copy the template",
    body: "Start with the boring files already made for you. This gives you source, export, test, docs, playground, and registry starters.",
  },
  {
    label: "02",
    title: "Rename the placeholders",
    body: "Replace the example names with your component name. Do this before changing the design.",
  },
  {
    label: "03",
    title: "Make the component yours",
    body: "Change the markup, styles, props, and preview until the component does the one job it is supposed to do.",
  },
  {
    label: "04",
    title: "Add it everywhere",
    body: "Export it from the package, add it to the docs, and add it to the registry so all install paths can find it.",
  },
  {
    label: "05",
    title: "Run the checks",
    body: "Build the docs, run tests, and regenerate registry output before opening the PR.",
  },
];

const tinyContract = [
  "It has a clear name.",
  "It forwards a ref to the useful element.",
  "It accepts `className`.",
  "It uses `variant`, `size`, or `tone` only when those choices help.",
  "It adds `swirskiAttrs` so the DOM is easy to inspect and style.",
  "It has docs and a registry entry.",
];

const filesToTouch = [
  "packages/ui/src/components/<slug>/<Name>.tsx",
  "packages/ui/src/components/<slug>/index.ts",
  "packages/ui/src/index.ts",
  "apps/docs/content/components.tsx",
  "apps/docs/content/playgrounds.tsx",
  "registry/swirski.registry.json",
];

const copyCommands = `mkdir -p packages/ui/src/components/empty-state
cp apps/docs/public/templates/component/ComponentName.tsx.template packages/ui/src/components/empty-state/EmptyState.tsx
cp apps/docs/public/templates/component/index.ts.template packages/ui/src/components/empty-state/index.ts
cp apps/docs/public/templates/component/ComponentName.test.tsx.template packages/ui/src/components/empty-state/EmptyState.test.tsx`;

const renameChecklist = `ComponentName -> EmptyState
component-name -> empty-state
Component name -> Empty state
feedback -> feedback, forms, layout, interaction, etc.`;

const exportSnippet = `// packages/ui/src/index.ts
export * from "./components/empty-state/index";`;

const registrySnippet = `{ "name": "empty-state", "category": "feedback", "description": "Framed empty-state panel.", "source": "packages/ui/src/components/empty-state" }`;

const verifyCommands = `pnpm docs:metadata
pnpm test:ui
pnpm registry:shadcn
pnpm build`;

function StepCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <Card interactive={false} className="h-full bg-white">
      <CardContent>
        <Badge tone={label === "03" ? "red" : label === "05" ? "blue" : "yellow"}>
          {label}
        </Badge>
        <Title className="mt-5" order={2} size="h4">
          {title}
        </Title>
        <Text className="mt-3" tone="muted" weight="bold">
          {body}
        </Text>
      </CardContent>
    </Card>
  );
}

export default function BuildComponentPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative overflow-hidden border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.14}
          spacing={14}
          dotSize={1}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            gap="xl"
            className="py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-end"
          >
            <div className="max-w-4xl">
              <SectionLabel>Build</SectionLabel>

              <Title className="mt-6 max-w-4xl" order={1} size="display">
                Build a Swirski component.
              </Title>

              <Text className="mt-6 max-w-2xl" size="lg" tone="muted" weight="bold">
                Copy the starter kit, rename the placeholders, make the
                component useful, then add it to docs and registry metadata.
                That is the whole workflow.
              </Text>
            </div>

            <Card interactive={false} className="bg-[#FFD400]">
              <CardContent>
                <Badge tone="black">Short version</Badge>
                <Text className="mt-5" weight="black">
                  Start from the template. Keep the API small. Make sure users
                  can install it from every Swirski workflow.
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <Grid gap="lg" className="md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </Grid>
      </Container>

      <Grid
        as={Container}
        gap="xl"
        className="pb-14 md:pb-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Template</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Use the starter kit.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            The template is intentionally plain. It gives you a working shape
            without asking you to remember every Swirski convention.
          </Text>
        </div>

        <Card interactive={false} className="bg-white">
          <CardContent>
            <Badge tone="yellow">Copy these files</Badge>
            <Grid gap="sm" className="mt-5 sm:grid-cols-2">
              {starterFiles.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  tone="white"
                  className="justify-start text-xs"
                >
                  {item.label}: {item.file}
                </Button>
              ))}
            </Grid>
            <div className="mt-6">
              <CodeBlock code={copyCommands} />
            </div>
            <div className="mt-5">
              <CodeBlock code={renameChecklist} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        as={Container}
        gap="xl"
        className="border-y-4 border-black py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Contract</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            The tiny component contract.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            This is the part to remember. A component does not need a big API.
            It needs to be predictable, inspectable, and easy to copy.
          </Text>
        </div>

        <Grid gap="sm" className="sm:grid-cols-2">
          {tinyContract.map((item, index) => (
            <div
              key={item}
              className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#0B0B0C]"
            >
              <Badge tone={index % 3 === 0 ? "yellow" : index % 3 === 1 ? "red" : "blue"}>
                {String(index + 1).padStart(2, "0")}
              </Badge>
              <Text className="mt-4" weight="black">
                {item}
              </Text>
            </div>
          ))}
        </Grid>
      </Grid>

      <Grid as={Container} gap="xl" className="py-14 md:py-20 lg:grid-cols-2">
        <Card interactive={false} className="bg-white">
          <CardContent>
            <Badge tone="red">Add it</Badge>
            <Title className="mt-5" order={2} size="h3">
              Files you usually touch
            </Title>
            <Grid gap="sm" className="mt-5">
              {filesToTouch.map((file) => (
                <Text key={file} className="break-words" size="sm" weight="black">
                  <code>{file}</code>
                </Text>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Grid gap="lg">
          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="blue">Export</Badge>
              <Title className="mt-5" order={2} size="h3">
                Package export
              </Title>
              <div className="mt-5">
                <CodeBlock code={exportSnippet} />
              </div>
            </CardContent>
          </Card>

          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="yellow">Registry</Badge>
              <Title className="mt-5" order={2} size="h3">
                Registry entry
              </Title>
              <div className="mt-5">
                <CodeBlock code={registrySnippet} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        as={Container}
        gap="xl"
        className="border-t-4 border-black py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Done</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Run the checks.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            These commands catch most missing exports, docs metadata mistakes,
            registry drift, and production build issues.
          </Text>
          <Button className="mt-6" href="/templates/component/README.md" tone="white">
            Open template README
          </Button>
        </div>

        <CodeBlock code={verifyCommands} />
      </Grid>
    </main>
  );
}
