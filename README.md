# Swirski UI

Swirski UI is a React component package for building bold, graphic, studio-flavored interfaces. It combines thick borders, hard shadows, expressive typography, custom cursors, and practical app primitives into a reusable design system.

The goal is to sit somewhere between shadcn/ui and Mantine:

- installable package primitives from `@swirski/ui`
- copy-into-your-app registry workflow through `@swirski/cli`
- theme tokens through `SwirskiProvider`
- docs, playgrounds, props tables, and examples for every component

## Packages

This repository is a pnpm workspace.

```txt
apps/docs        Documentation site
packages/ui      React component package
packages/cli     Local registry CLI
registry         Component registry manifest
```

## Install

```bash
pnpm add @swirski/ui
```

For the registry workflow:

```bash
pnpm add -D @swirski/cli
```

Import the package styles once in your app:

```tsx
import "@swirski/ui/styles.css";
```

If your app uses Tailwind CSS v4 and imports components from the package, make sure Tailwind scans the package output:

```css
@source "../node_modules/@swirski/ui/dist";
```

If you use the CLI to copy component source into your app, Tailwind will scan those copied files naturally.

## Basic Usage

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
          Compose Swirski components with strong type, borders, shadows and
          practical interaction states.
        </Text>
        <Button className="mt-5">Ship sharp</Button>
      </CardContent>
    </Card>
  );
}
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

## Current Status

Swirski UI is actively growing. The component surface is broad, but some complex interaction primitives are still early versions. The next quality pass should focus on:

- stronger accessibility for overlays and menus
- portal rendering and focus traps
- collision-aware positioning for popovers/tooltips/dropdowns
- interaction tests
- richer Storybook coverage
- shadcn-compatible remote registry output
- more composed app patterns like `AppShell`, `Sidebar`, `Command`, `DataTable`, `DatePicker`, and `Dropzone`

## License

License information has not been added yet.
