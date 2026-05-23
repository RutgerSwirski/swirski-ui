# Swirski UI

Swirski UI is a React component package for building bold, graphic, studio-flavored interfaces. It combines thick borders, hard shadows, expressive typography, custom cursors, and practical app primitives into a reusable design system.

The goal is to sit somewhere between shadcn/ui and Mantine:

- installable package primitives from `@swirski/ui`
- copy-into-your-app registry workflow through `@swirski/cli`
- shadcn-compatible hosted registry items from `ui.swirski.dev`
- theme tokens through `SwirskiProvider`
- docs, playgrounds, props tables, and examples for every component

## Choose your workflow

Swirski UI has three main ways in:

| Workflow | Best for | First command |
| --- | --- | --- |
| Component library | You want the easiest React package install. | `pnpm add @swirski/ui` |
| Swirski CLI | You want source copied into your app. | `pnpm add -D @swirski/cli` |
| shadcn registry | You already use shadcn and want remote registry items. | `pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json` |

Start with the package if you are unsure. Use copy workflows when you want to
own and edit the component source inside your app.

## Packages

This repository is a pnpm workspace.

```txt
apps/docs        Documentation site
packages/ui      React component package
packages/cli     Local registry CLI
registry         Component registry manifest
```

## Install as a component library

Use Swirski UI like a normal React component package.

```bash
pnpm add @swirski/ui
```

Import the package styles once in your app:

```tsx
import "@swirski/ui/styles.css";
```

Then import components:

```tsx
import { Button, Card, CardContent, Title, Text } from "@swirski/ui";

export function Example() {
  return (
    <Card className="max-w-md">
      <CardContent>
        <Title order={2} size="h3">
          Design loud.
        </Title>
        <Text tone="muted" weight="bold">
          Compose Swirski components with strong types, borders, shadows and
          practical interaction states.
        </Text>
        <Button className="mt-5">Ship sharp</Button>
      </CardContent>
    </Card>
  );
}
```

If your app uses Tailwind CSS v4 and imports components from the package, make
sure Tailwind scans the package output:

```css
@source "../node_modules/@swirski/ui/dist";
```

If you use the CLI to copy component source into your app, Tailwind will scan
those copied files naturally.

## Copy source with the Swirski CLI

Use the Swirski CLI when you want local component source that your app owns.

```bash
pnpm add -D @swirski/cli
```

Create a config and copy one or more items:

```bash
pnpm exec swirski init
pnpm exec swirski add button
pnpm exec swirski add button card dialog
pnpm exec swirski add --all
```

The CLI copies source folders from `registry/swirski.registry.json` into the
configured `componentsPath`.

## Install with shadcn

Use the hosted shadcn-compatible registry when your app already uses shadcn.

```bash
pnpm dlx shadcn@latest view https://ui.swirski.dev/r/button.json
pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json
```

You can also add a namespace to `components.json`:

```json
{
  "registries": {
    "@swirski": "https://ui.swirski.dev/r/{name}.json"
  }
}
```

Then install registry items by name:

```bash
pnpm dlx shadcn@latest add @swirski/button @swirski/dialog
```

For a full source copy of every Swirski entry, use the Swirski CLI:

```bash
pnpm exec swirski add --all
```

## Theme Provider

Wrap your app in `SwirskiProvider` to set the CSS token surface for colors, shadows, fonts, borders and color scheme.

```tsx
import {
  SwirskiProvider,
  createSwirskiTheme,
} from "@swirski/ui";

const theme = createSwirskiTheme({
  colorBlue: "#0047FF",
  colorYellow: "#FFE45C",
  shadowMd: "8px 8px 0 var(--sw-color-shadow)",
});

export function App() {
  return (
    <SwirskiProvider theme={theme}>
      <YourRoutes />
    </SwirskiProvider>
  );
}
```

Dark mode is available through `colorScheme`:

```tsx
<SwirskiProvider colorScheme="dark">
  <App />
</SwirskiProvider>
```

Core tokens include:

```txt
--sw-color-ink
--sw-color-paper
--sw-color-surface
--sw-color-muted
--sw-color-blue
--sw-color-yellow
--sw-color-red
--sw-color-shadow
--sw-color-focus
--sw-border-width
--sw-shadow-sm
--sw-shadow-md
--sw-shadow-lg
--sw-font-body
--sw-font-heading
--sw-font-display
```

## Components

Swirski UI currently includes:

### Foundations

- `SwirskiProvider`
- `Title`
- `Text`
- `Container`
- `Separator`
- `SectionLabel`

### Actions and Feedback

- `Button`
- `Badge`
- `Alert`
- `Toast`
- `Progress`
- `Loader`
- `Skeleton`

### Forms

- `Field`
- `Label`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Switch`
- `RadioGroup`
- `Slider`

### Overlays and Interaction

- `Dialog`
- `Drawer`
- `Popover`
- `DropdownMenu`
- `Tooltip`
- `Tabs`
- `Accordion`
- `CursorProvider`
- `CursorDock`
- `CursorPicker`

### Layout, Navigation and Data

- `Card`
- `Avatar`
- `Breadcrumb`
- `Pagination`
- `Table`

### Visual Texture

- `DotGrid`
- `LineGrid`
- `DiagonalLines`
- `ImageFrame`

## Registry CLI

Swirski UI also ships a first-pass registry workflow inspired by shadcn/ui. It can list available entries, create a config file, and copy component source into your app.

```bash
swirski init
swirski list
swirski add button card dialog
swirski add use-disclosure use-clipboard
swirski add --all
```

Local workspace examples:

```bash
pnpm registry:list
pnpm --filter @swirski/cli start add button card dialog
```

Generated config:

```json
{
  "componentsPath": "src/components/ui",
  "stylePath": "src/styles.css"
}
```

The registry manifest lives at:

```txt
registry/swirski.registry.json
```

## Release `@swirski/ui`

After a feature branch has been merged into `main`, prepare a release PR from a clean `main` checkout:

```bash
pnpm release:ui patch
```

Use `minor` for new backwards-compatible features and `major` for breaking changes:

```bash
pnpm release:ui minor
pnpm release:ui major
```

The release script creates a `release/swirski-ui-x.y.z` branch, bumps `packages/ui/package.json`, regenerates docs and registry artifacts, builds `packages/ui`, pushes the branch, and opens a PR.

After the release PR is merged, publish and tag the package from an updated `main` checkout:

```bash
git checkout main
git pull --ff-only
pnpm release:ui --publish
```

To preview either step without changing files:

```bash
pnpm release:ui patch --dry-run
pnpm release:ui --publish --dry-run
```

If npm asks for two-factor auth:

```bash
pnpm release:ui --publish --otp 123456
```

## Development

Install dependencies:

```bash
pnpm install
```

Run the docs app:

```bash
pnpm dev
```

Run Storybook:

```bash
pnpm storybook
```

Build the UI package:

```bash
pnpm build:ui
```

Build the docs site:

```bash
pnpm build
```

List registry components:

```bash
pnpm registry:list
```

## Design Principles

- Bold by default, customizable when needed.
- Native HTML behavior where it keeps components simple.
- `className` escape hatches everywhere.
- Controlled and uncontrolled APIs for interactive primitives.
- Theme tokens before one-off hardcoded styles.
- Copyable source workflow for teams that want ownership.
- Package imports for teams that want speed.

## LLM Context

The docs site publishes LLM-friendly project context at:

- `https://ui.swirski.dev/llms.txt`
- `https://ui.swirski.dev/llms-full.txt`

These files are generated from package metadata, the registry manifest, and docs
metadata with:

```bash
pnpm llms:build
```

## Generated Artifacts

Docs metadata, LLM context, and hosted registry JSON can be refreshed locally with:

```bash
pnpm artifacts:update
```

Branch pushes also run the `Update Generated Artifacts` workflow. When generated outputs change, it commits them back to the branch and starts `CI` for the updated commit. For normal GitHub event triggering from that auto-commit, configure a repository secret named `SWIRSKI_ARTIFACTS_TOKEN` with permission to push branches.

## Current Status

Swirski UI is actively growing. The component surface is broad, but some complex interaction primitives are still early versions. The next quality pass should focus on:

- validating hosted registry items in CI
- smoke testing remote shadcn installs for key components
- per-component install tabs for package, Swirski CLI and shadcn workflows
- continuing accessibility tests for complex interaction primitives
- interaction tests
- richer Storybook coverage
- shadcn-compatible remote registry output
- more hook docs and copied-source hook recipes
- more composed app patterns like `AppShell`, `Sidebar`, `Command`, `DataTable`, `DatePicker`, and `Dropzone`

## License

Swirski UI is released under the MIT License. See [LICENSE](./LICENSE).
