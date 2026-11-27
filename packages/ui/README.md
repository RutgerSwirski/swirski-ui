# @swirski/ui

Swirski UI is a React component package for bold, graphic interfaces across web
and React Native.

## Web

```bash
pnpm add @swirski/ui
```

```tsx
import "@swirski/ui/styles.css";
import { Button, Card, Text, Title } from "@swirski/ui";
```

In Next.js App Router, put the stylesheet import in `app/layout.tsx`. Import
components from `@swirski/ui` in the pages or components that use them.

## Compose a hero

```tsx
import { Button, HeroActions, HeroKicker, HeroLead, HeroTitle } from "@swirski/ui";

export function StudioHero() {
  return (
    <section>
      <HeroKicker>Swirski Studio</HeroKicker>
      <HeroTitle order={1}>Made to be worn</HeroTitle>
      <HeroLead>One-off pieces and custom remakes.</HeroLead>
      <HeroActions>
        <Button href="/pieces" variant="outline" tone="blue">
          Browse pieces
        </Button>
      </HeroActions>
    </section>
  );
}
```

Use `variant` for the button treatment and `tone` for its color. On
`Title` and `HeroTitle`, `order` controls heading semantics and `size`
controls visual scale. In a `.tsx` file, trigger completion inside the JSX tag
or inside a prop value to see the available options.

## Common patterns

- **Typography:** Use `<Text as="span">` for inline text and
  `<Title order={2} size="h1">` for a section heading with a larger appearance.
  Use `asChild` when styling an element you already have.
- **Forms:** Use native `onChange` on `Input` and `Textarea`. For `Select`,
  start with `options` and `defaultValue`, or pair `value` with `onValueChange`
  when the parent owns the selection.
- **Overlays:** Start with a trigger and content. Use `defaultOpen` for initial
  state, or pair `open` with `onOpenChange` when the parent owns the state.
- **Layout:** Use `className="flex flex-col gap-4"` for a vertical stack and
  `className="flex flex-wrap items-center gap-3"` for an action row.

An empty list can use the same typography and actions as the rest of the page:

```tsx
<section className="flex flex-col items-start gap-3">
  <Title order={2} size="h3">No pieces found</Title>
  <Text tone="muted">Clear the filters to see all pieces.</Text>
  <Button onClick={clearFilters}>Clear filters</Button>
</section>
```

## Choose a hook

- Toggle a disclosure with `useDisclosure`.
- Read browser preferences with `useMediaQuery` or `useReducedMotion`.
- Copy text with `useClipboard` or persist a preference with `useLocalStorage`.
- Match navigation with `useIsPathnameActive` in React or `isPathnameActive`
  when you just need a comparison. Pass the current pathname in either case.
- Build custom behavior with `useClickOutside`, `useEscapeKey`,
  `useControllableState`, and `usePortalRoot`.

## React Native


```tsx
import { Button, Card, DotGrid, Text, Title } from "@swirski/ui/native";
```

Swirski UI ships native font assets with the package. Bare React Native apps
can run `pnpm exec swirski-native setup`, then rebuild the native app. See
[README.native.md](README.native.md).
