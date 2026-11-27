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

Component styles include the Swirski theme tokens and scoped utilities. Your
app can keep its own reset and fonts. To opt into the previous bundled look,
load either optional entry:

```tsx
import "@swirski/ui/reset.css"; // Global Tailwind Preflight, if your app needs it.
import "@swirski/ui/fonts.css"; // Inter, Anton and Bangers.
import "@swirski/ui/styles.css";
```

**Upgrading from the bundled stylesheet:** add the optional reset and font
imports above if you relied on Swirski to provide them. Compile app-owned
Tailwind utilities in your app stylesheet. Load app CSS after the package CSS
when you want same-specificity `className` utilities to override package styles.

**Browser requirements:** the npm stylesheet uses standard selector guards
without requiring native CSS `@scope`. The
[Tailwind v4 browser baseline](https://tailwindcss.com/docs/compatibility#browser-support)
is Chrome 111+, Firefox 128+, and Safari 16.4+. That is an upstream baseline,
with Swirski's packed tests run on current Chromium, Firefox, and WebKit.
Copied CLI and registry styles compiled directly from source also require
[native CSS `@scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40scope#browser_compatibility).
Use Chrome/Edge 118+, Firefox 146+, or Safari 26.4+ for that path. Safari
17.4–18.x also supports `@scope`, but Safari 26.0–26.3 has known form-control
gaps with scoped rules. Use the npm stylesheet where native support is missing
or partial.

Swirski utilities can match class names on content nested inside a Swirski
component. Wrap third-party content in `<div data-swirski-unscoped>` to exclude
that subtree from Swirski utilities and its scoped reset. Theme tokens and
normally inherited properties still flow into the subtree. Keep Swirski
components outside that boundary when they need the package styles.

For Tailwind v3, disable its built-in Preflight with
`corePlugins: { preflight: false }` and use `@swirski/ui/reset.css` if you still
want a reset. V3 emits Preflight outside a cascade layer, where its global rules
can override layered component styles such as button borders. Tailwind v4's
layered Preflight works alongside the packaged CSS.

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

The npm stylesheet is precompiled. For a CLI or registry install, compile the
copied stylesheet as its own Tailwind CSS v4 entry.

## Install in React Native

Use the native entrypoint in React Native apps:

```tsx
import { Button, Card, Text, Title } from "@swirski/ui/native";
```

Swirski UI ships native font assets with the package. Bare React Native apps
can run `pnpm exec swirski-native setup`, then rebuild the native app. See
[`packages/ui/README.native.md`](packages/ui/README.native.md) for the full iOS,
Android, React Native Web, and Expo setup notes.

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

The CLI installs the registry snapshot bundled with its release. It keeps
components and their shared files under `componentsPath`. With the default
configuration, Button is at `src/components/ui/components/button` and the
stylesheet is at `src/components/ui/styles.css`. Install the dependencies
printed by the CLI and compile the copied stylesheet with Tailwind CSS v4.
Your application owns any global reset and font loading.

Use `--dry-run` to preview changes. Existing edits are protected unless you
pass `--overwrite`.

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
  "componentsPath": "src/components/ui"
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

### React compatibility

The web package supports React and React DOM 18 or 19. Use matching React and
React DOM releases and install types for the same major when using TypeScript.
CI installs the actual UI tarball into separate temporary applications:

| Installed React and React DOM | React / React DOM types | Next.js App Router fixture |
| --- | --- | --- |
| 18.3.1 | 18.3.32 / 18.3.7 | 14.2.35 |
| 19.3.1 | 19.3.3 / 19.3.0 | 16.4.6 |

Both rows check strict TypeScript declarations, Node server rendering,
Vite client rendering and hydration, and development StrictMode. The Next.js
checks build and hydrate the App Router fixture in production mode. Next.js may
bundle its own React runtime for the App Router; the fixture logs that runtime
separately. Next.js 14 is a compatibility fixture for existing React 18 apps.
Check the [Next.js support policy](https://nextjs.org/support-policy) when
choosing a framework version for production.

Web components use the React 18 hook surface. Slot uses the element ref on
React 18 and reads ref from props on React 19. Composed callback cleanup works
with both React 18's null detach and React 19's returned cleanup. Modal focus
uses a layout effect in the browser and avoids the server layout-effect warning.

```bash
pnpm build:ui
pnpm exec playwright install chromium
pnpm test:react-compatibility        # both React releases
pnpm test:react-compatibility 18     # only React 18
```

### Consumer and browser tests

Run `pnpm test:ui-consumers` to build and install the UI tarball into isolated
Next.js App Router and plain React fixtures. To run the browser checks used in CI:

```bash
pnpm exec playwright install chromium firefox webkit
UI_BROWSERS=chromium,firefox,webkit pnpm test:ui-consumers
```

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
