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

const createdFiles = [
  "packages/ui/src/components/empty-state/EmptyState.tsx",
  "packages/ui/src/components/empty-state/EmptyState.stories.tsx",
  "packages/ui/src/components/empty-state/index.ts",
  "packages/ui/src/components/empty-state/EmptyState.test.tsx",
  "packages/ui/src/index.ts",
  "registry/swirski.registry.json",
];

const createCommand = `pnpm create:component empty-state`;

const optionsCommand = `pnpm create:component pricing-card \\
  --category cards \\
  --description "Pricing card surface."`;

const dryRunCommand = `pnpm create:component empty-state --dry-run`;

const docsSnippet = [
  `// apps/docs/content/components/empty-state/component.tsx`,
  `import { EmptyState } from "@swirski/ui";`,
  `import type { ComponentDoc } from "../../types";`,
  ``,
  `export const emptyStateComponentDoc: ComponentDoc = {`,
  `  slug: "empty-state",`,
  `  title: "EmptyState",`,
  `  category: "Feedback",`,
  `  description: "A framed empty-state panel for blank or completed states.",`,
  `  importCode: \`import { EmptyState } from "@swirski/ui";\`,`,
  `  usageCode: \`<EmptyState`,
  `  title="No projects yet"`,
  `  description="Create your first project to get started."`,
  `/>\`,`,
  `  preview: (`,
  `    <EmptyState`,
  `      title="No projects yet"`,
  `      description="Create your first project to get started."`,
  `    />`,
  `  ),`,
  `  props: [`,
  `    {`,
  `      name: "title",`,
  `      type: "string",`,
  `      required: true,`,
  `      description: "Main heading rendered inside the component.",`,
  `    },`,
  `    {`,
  `      name: "description",`,
  `      type: "string",`,
  `      description: "Optional supporting copy.",`,
  `    },`,
  `  ],`,
  `};`,
  ``,
  `// Then add emptyStateComponentDoc to apps/docs/content/components/index.ts.`,
].join("\n");

const playgroundSnippet = [
  `// apps/docs/content/components/empty-state/playground.tsx`,
  `"use client";`,
  ``,
  `import { EmptyState } from "@swirski/ui";`,
  `import type { PlaygroundDefinition } from "../../types";`,
  `import { jsxString, textValue } from "../playground-utils";`,
  ``,
  `export const emptyStatePlayground: PlaygroundDefinition = {`,
  `  controls: [`,
  `    {`,
  `      name: "title",`,
  `      label: "title",`,
  `      type: "text",`,
  `      defaultValue: "No projects yet",`,
  `    },`,
  `    {`,
  `      name: "description",`,
  `      label: "description",`,
  `      type: "text",`,
  `      defaultValue: "Create your first project to get started.",`,
  `    },`,
  `  ],`,
  `  render: (values) => (`,
  `    <EmptyState`,
  `      title={textValue(values, "title")}`,
  `      description={textValue(values, "description")}`,
  `    />`,
  `  ),`,
  `  getCode: (values) => \`<EmptyState`,
  `  title=\${jsxString(textValue(values, "title"))}`,
  `  description=\${jsxString(textValue(values, "description"))}`,
  `/>\`,`,
  `};`,
  ``,
  `// Then add emptyStatePlayground to apps/docs/content/components/playgrounds.ts.`,
].join("\n");

const verifyCommands = `pnpm docs:metadata
pnpm test:ui
pnpm registry:shadcn
pnpm build`;

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
                Create a component in one command.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                Use the scaffold command, edit the generated component, add the
                docs entry, then run the checks. That is the happy path.
              </Text>
            </div>

            <Card interactive={false} className="bg-[#FFD400]">
              <CardContent>
                <Badge tone="black">Command</Badge>
                <code className="mt-5 block break-words border-4 border-black bg-white px-4 py-3 text-sm font-black shadow-[4px_4px_0_#0B0B0C] sm:text-base">
                  pnpm create:component empty-state
                </code>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Grid
        as={Container}
        gap="xl"
        className="py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Step 1</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Run the scaffold.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            Give it a kebab-case name. The script creates the component files,
            adds the package export, and adds the registry entry.
          </Text>
        </div>

        <Grid gap="lg">
          <CodeBlock code={createCommand} />
          <CodeBlock code={optionsCommand} />
          <CodeBlock code={dryRunCommand} />
        </Grid>
      </Grid>

      <Container className="pb-14 md:pb-20">
        <Card interactive={false} className="bg-white">
          <CardContent>
            <Grid gap="xl" className="lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Badge tone="blue">Generated for you</Badge>
                <Title className="mt-5" order={2} size="h2">
                  The command handles the boring setup.
                </Title>
                <Text className="mt-4" tone="muted" weight="bold">
                  For <code>empty-state</code>, the scaffold creates or updates
                  these files. You can start editing immediately.
                </Text>
              </div>

              <Grid gap="sm">
                {createdFiles.map((file) => (
                  <Text
                    key={file}
                    className="break-words"
                    size="sm"
                    weight="black"
                  >
                    <code>{file}</code>
                  </Text>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Grid
        as={Container}
        gap="xl"
        className="border-y-4 border-black py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Step 2</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Finish the human parts.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            The script cannot decide the API, write tasteful docs, or design the
            preview for you. Those are the only pieces you still shape by hand.
          </Text>
        </div>

        <Grid gap="lg" className="md:grid-cols-1">
          <Card interactive={false}>
            <CardContent>
              <Badge tone="yellow">Component</Badge>
              <Title size="h3" className="mt-5">
                Fill in the component
              </Title>
              <Text className="mt-3">
                Open the generated source file and replace the starter markup,
                props, and styles with the real component.
              </Text>
            </CardContent>
          </Card>

          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="red">Documentation</Badge>
              <Title className="mt-5" order={2} size="h3">
                Add the component docs.
              </Title>
              <Text className="mt-3">
                Create <code>component.tsx</code> inside the component docs
                folder, then add it to the content index.
              </Text>
              <div className="mt-5">
                <CodeBlock code={docsSnippet} />
              </div>
            </CardContent>
          </Card>

          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="blue">Playground</Badge>
              <Title className="mt-5" order={2} size="h3">
                Add editable playground controls.
              </Title>
              <Text className="mt-3" tone="muted" weight="bold">
                Create <code>playground.tsx</code> beside the docs file, then
                register a key that matches the docs slug.
              </Text>
              <div className="mt-5">
                <CodeBlock code={playgroundSnippet} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        as={Container}
        gap="xl"
        className="py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Step 3</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Run the checks.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            These commands catch missing exports, docs metadata mistakes,
            registry drift, and production build issues.
          </Text>
          <Button
            className="mt-6"
            href="/templates/component/README.md"
            tone="white"
          >
            Open template files
          </Button>
        </div>

        <CodeBlock code={verifyCommands} />
      </Grid>
    </main>
  );
}
